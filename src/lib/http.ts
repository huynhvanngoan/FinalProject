/* eslint-disable @typescript-eslint/no-explicit-any */
import { isServer } from "@/utils/env";

// Types & Interfaces
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
// type JSONValue =
//     | string
//     | number
//     | boolean
//     | null
//     | JSONValue[]
//     | { [key: string]: JSONValue };

interface BaseRequestConfig
    extends Omit<RequestInit, "cache" | "method" | "body"> {
    baseUrl?: string;
    params?: Record<string, string>;
    useCache?: boolean;
    cacheTime?: number;
    retry?: number;
    retryDelay?: number;
    showProgress?: boolean;
}

interface RequestConfig<T = unknown> extends BaseRequestConfig {
    url: string;
    method: HTTPMethod;
    body?: T;
}

type InterceptorFn<T> = (config: T) => Promise<T> | T;

// Error Classes
class HttpError extends Error {
    constructor(
        public status: number,
        public payload: unknown,
        message?: string
    ) {
        super(message ?? `HTTP Error: ${status}`);
        this.name = "HttpError";
    }
}

// Cache Implementation
class RequestCache {
    private cache = new Map<string, { data: unknown; timestamp: number }>();

    set(key: string, data: unknown, cacheTime: number): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now() + cacheTime,
        });
    }

    get(key: string): unknown | null {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() > item.timestamp) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    clear(): void {
        this.cache.clear();
    }
}

// Progress Bar Implementation
class ProgressBar {
    private static instance: ProgressBar;
    private nprogress: any;
    private count = 0;

    private constructor() {
        if (!isServer) {
            import("nprogress").then((module) => {
                this.nprogress = module.default;
                this.nprogress.configure({ showSpinner: false });
            });
        }
    }

    static getInstance(): ProgressBar {
        if (!ProgressBar.instance) {
            ProgressBar.instance = new ProgressBar();
        }
        return ProgressBar.instance;
    }

    show(): void {
        if (isServer || !this.nprogress) return;
        this.count++;
        this.nprogress.start();
    }

    hide(): void {
        if (isServer || !this.nprogress) return;
        this.count--;
        if (this.count <= 0) {
            this.count = 0;
            this.nprogress.done();
        }
    }
}

// Main HTTP Client
class HttpClient {
    private readonly requestInterceptors: Array<InterceptorFn<RequestConfig>> =
        [];
    private readonly responseInterceptors: Array<InterceptorFn<unknown>> = [];
    private readonly errorInterceptors: Array<InterceptorFn<unknown>> = [];
    private readonly cache = new RequestCache();
    private readonly progress = ProgressBar.getInstance();

    constructor(private readonly baseUrl: string = "") {}

    addRequestInterceptor(
        interceptor: InterceptorFn<RequestConfig>
    ): () => void {
        this.requestInterceptors.push(interceptor);
        return () => {
            const index = this.requestInterceptors.indexOf(interceptor);
            if (index !== -1) this.requestInterceptors.splice(index, 1);
        };
    }

    addResponseInterceptor(interceptor: InterceptorFn<unknown>): () => void {
        this.responseInterceptors.push(interceptor);
        return () => {
            const index = this.responseInterceptors.indexOf(interceptor);
            if (index !== -1) this.responseInterceptors.splice(index, 1);
        };
    }

    addErrorInterceptor(interceptor: InterceptorFn<unknown>): () => void {
        this.errorInterceptors.push(interceptor);
        return () => {
            const index = this.errorInterceptors.indexOf(interceptor);
            if (index !== -1) this.errorInterceptors.splice(index, 1);
        };
    }

    private async runInterceptors<T>(
        value: T,
        interceptors: Array<InterceptorFn<T>>
    ): Promise<T> {
        let result = value;
        for (const interceptor of interceptors) {
            result = await interceptor(result);
        }
        return result;
    }

    private getCacheKey(config: RequestConfig): string {
        const { method, url, params, body } = config;
        return `${method}-${url}-${JSON.stringify(params)}-${JSON.stringify(
            body
        )}`;
    }

    private createUrl(url: string, params?: Record<string, string>): string {
        const baseUrl = url.startsWith("http") ? "" : this.baseUrl;
        const queryString = params ? `?${new URLSearchParams(params)}` : "";
        return `${baseUrl}${url}${queryString}`;
    }

    private async parseResponse(response: Response): Promise<unknown> {
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
            return response.json();
        }
        return response.text();
    }

    private async handleRequest<T>(
        config: RequestConfig<T>,
        retryCount = 0
    ): Promise<unknown> {
        try {
            // Run request interceptors
            const interceptedConfig = await this.runInterceptors(
                config,
                this.requestInterceptors
            );

            // Check cache
            if (interceptedConfig.useCache) {
                const cacheKey = this.getCacheKey(interceptedConfig);
                const cachedData = this.cache.get(cacheKey);
                if (cachedData) return cachedData;
            }

            // Show progress
            if (interceptedConfig.showProgress) {
                this.progress.show();
            }

            // Prepare request
            const url = this.createUrl(
                interceptedConfig.url,
                interceptedConfig.params
            );
            const {
                method,
                body,
                headers = {},
                ...options
            } = interceptedConfig;

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    ...headers,
                },
                body: body ? JSON.stringify(body) : undefined,
                ...options,
            });

            const data = await this.parseResponse(response);

            if (!response.ok) {
                throw new HttpError(response.status, data);
            }

            // Run response interceptors
            const interceptedData = await this.runInterceptors(
                data,
                this.responseInterceptors
            );

            // Cache response
            if (interceptedConfig.useCache) {
                const cacheKey = this.getCacheKey(interceptedConfig);
                this.cache.set(
                    cacheKey,
                    interceptedData,
                    interceptedConfig.cacheTime ?? 5 * 60 * 1000
                );
            }

            return interceptedData;
        } catch (error) {
            // Run error interceptors
            const interceptedError = await this.runInterceptors(
                error,
                this.errorInterceptors
            );

            // Retry logic
            if (retryCount < (config.retry ?? 0)) {
                await new Promise((resolve) =>
                    setTimeout(resolve, config.retryDelay ?? 1000)
                );
                return this.handleRequest(config, retryCount + 1);
            }

            throw interceptedError;
        } finally {
            if (config.showProgress) {
                this.progress.hide();
            }
        }
    }

    // Public API methods
    async get<T = unknown>(
        url: string,
        options?: Omit<BaseRequestConfig, "body">
    ): Promise<T> {
        return this.handleRequest({
            method: "GET",
            url,
            ...options,
        }) as Promise<T>;
    }

    async post<T = unknown, D = unknown>(
        url: string,
        data?: D,
        options?: BaseRequestConfig
    ): Promise<T> {
        return this.handleRequest({
            method: "POST",
            url,
            body: data,
            ...options,
        }) as Promise<T>;
    }

    async put<T = unknown, D = unknown>(
        url: string,
        data?: D,
        options?: BaseRequestConfig
    ): Promise<T> {
        return this.handleRequest({
            method: "PUT",
            url,
            body: data,
            ...options,
        }) as Promise<T>;
    }

    async delete<T = unknown>(
        url: string,
        options?: BaseRequestConfig
    ): Promise<T> {
        return this.handleRequest({
            method: "DELETE",
            url,
            ...options,
        }) as Promise<T>;
    }

    async patch<T = unknown, D = unknown>(
        url: string,
        data?: D,
        options?: BaseRequestConfig
    ): Promise<T> {
        return this.handleRequest({
            method: "PATCH",
            url,
            body: data,
            ...options,
        }) as Promise<T>;
    }
}

// Default instance
const api = new HttpClient(process.env.NEXT_PUBLIC_API_URL);

export type { BaseRequestConfig, RequestConfig, HTTPMethod };
export { HttpClient, HttpError };
export default api;

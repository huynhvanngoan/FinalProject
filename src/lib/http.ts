/* eslint-disable @typescript-eslint/no-explicit-any */

// Loại bỏ 'cache' từ RequestInit để tránh xung đột
type RequestInitWithoutCache = Omit<RequestInit, "cache">;

// Custom options với cache boolean
interface CustomOptions extends RequestInitWithoutCache {
    baseUrl?: string;
    params?: Record<string, string>;
    useCache?: boolean; // Đổi tên từ cache thành useCache
    cacheTime?: number;
    retry?: number;
    retryDelay?: number;
    showProgress?: boolean;
}

interface RequestConfig extends CustomOptions {
    url: string;
    method: string;
}

type InterceptorFn = (
    config: RequestConfig
) => Promise<RequestConfig> | RequestConfig;
type ResponseInterceptorFn = (response: any) => Promise<any> | any;
type ErrorInterceptorFn = (error: any) => Promise<any> | any;

class HttpError extends Error {
    status: number;
    payload: any;

    constructor({ status, payload }: { status: number; payload: any }) {
        super(`HTTP Error: ${status}`);
        this.status = status;
        this.payload = payload;
    }
}

class RequestCache {
    private cache: Map<string, { data: any; timestamp: number }>;

    constructor() {
        this.cache = new Map();
    }

    set(key: string, data: any, cacheTime: number) {
        this.cache.set(key, {
            data,
            timestamp: Date.now() + cacheTime,
        });
    }

    get(key: string): any | null {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() > item.timestamp) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    clear() {
        this.cache.clear();
    }
}

let nprogress: any;
if (typeof window !== "undefined") {
    import("nprogress").then((module) => {
        nprogress = module.default;
        nprogress.configure({ showSpinner: false });
    });
}

class HttpClient {
    private baseUrl: string;
    private requestInterceptors: InterceptorFn[];
    private responseInterceptors: ResponseInterceptorFn[];
    private errorInterceptors: ErrorInterceptorFn[];
    private cache: RequestCache;
    private activeRequests: number;

    constructor(baseUrl: string = "") {
        this.baseUrl = baseUrl;
        this.requestInterceptors = [];
        this.responseInterceptors = [];
        this.errorInterceptors = [];
        this.cache = new RequestCache();
        this.activeRequests = 0;
    }

    addRequestInterceptor(interceptor: InterceptorFn) {
        this.requestInterceptors.push(interceptor);
        return () => {
            const index = this.requestInterceptors.indexOf(interceptor);
            if (index !== -1) this.requestInterceptors.splice(index, 1);
        };
    }

    addResponseInterceptor(interceptor: ResponseInterceptorFn) {
        this.responseInterceptors.push(interceptor);
        return () => {
            const index = this.responseInterceptors.indexOf(interceptor);
            if (index !== -1) this.responseInterceptors.splice(index, 1);
        };
    }

    addErrorInterceptor(interceptor: ErrorInterceptorFn) {
        this.errorInterceptors.push(interceptor);
        return () => {
            const index = this.errorInterceptors.indexOf(interceptor);
            if (index !== -1) this.errorInterceptors.splice(index, 1);
        };
    }

    private async runRequestInterceptors(
        config: RequestConfig
    ): Promise<RequestConfig> {
        let interceptedConfig = { ...config };
        for (const interceptor of this.requestInterceptors) {
            interceptedConfig = await interceptor(interceptedConfig);
        }
        return interceptedConfig;
    }

    private async runResponseInterceptors(response: any): Promise<any> {
        let interceptedResponse = response;
        for (const interceptor of this.responseInterceptors) {
            interceptedResponse = await interceptor(interceptedResponse);
        }
        return interceptedResponse;
    }

    private async runErrorInterceptors(error: any): Promise<any> {
        let interceptedError = error;
        for (const interceptor of this.errorInterceptors) {
            interceptedError = await interceptor(interceptedError);
        }
        return interceptedError;
    }

    private updateProgress(show: boolean) {
        if (typeof window === "undefined" || !nprogress) return;

        if (show) {
            this.activeRequests++;
            nprogress.start();
        } else {
            this.activeRequests--;
            if (this.activeRequests <= 0) {
                this.activeRequests = 0;
                nprogress.done();
            }
        }
    }

    private getCacheKey(config: RequestConfig): string {
        return `${config.method}-${config.url}-${JSON.stringify(
            config.params
        )}-${JSON.stringify(config.body)}`;
    }

    private async request(config: RequestConfig, retryCount = 0): Promise<any> {
        try {
            // Run request interceptors
            config = await this.runRequestInterceptors(config);

            // Check cache
            if (config.useCache) {
                const cacheKey = this.getCacheKey(config);
                const cachedData = this.cache.get(cacheKey);
                if (cachedData) return cachedData;
            }

            // Show progress if enabled
            if (config.showProgress) {
                this.updateProgress(true);
            }

            // Process query params
            const queryParams = config.params
                ? "?" + new URLSearchParams(config.params).toString()
                : "";

            // Build full URL
            const fullUrl = `${config.baseUrl || this.baseUrl}${
                config.url
            }${queryParams}`;

            // Prepare headers
            const baseHeaders = {
                "Content-Type": "application/json",
                Accept: "application/json",
            };
            const {
                method,
                body,
                useCache,
                cacheTime,
                headers,
                ...remainingOptions
            } = config;

            // Prepare request options
            const requestOptions: RequestInit = {
                method,
                ...remainingOptions,
                headers: {
                    ...baseHeaders,
                    ...headers,
                },
            };

            // Convert body to JSON if needed
            if (body && typeof body === "object") {
                requestOptions.body = JSON.stringify(body);
            }

            // Make the request
            const response = await fetch(fullUrl, requestOptions);

            // Parse response
            const contentType = response.headers.get("content-type");
            let data;

            if (contentType?.includes("application/json")) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (!response.ok) {
                throw new HttpError({
                    status: response.status,
                    payload: data,
                });
            }

            // Run response interceptors
            data = await this.runResponseInterceptors(data);

            // Cache the response if enabled
            if (useCache) {
                const cacheKey = this.getCacheKey(config);
                this.cache.set(cacheKey, data, cacheTime || 5 * 60 * 1000); // Default 5 minutes
            }

            return data;
        } catch (error) {
            // Run error interceptors
            error = await this.runErrorInterceptors(error);

            // Retry logic
            if (retryCount < (config.retry || 0)) {
                await new Promise((resolve) =>
                    setTimeout(resolve, config.retryDelay || 1000)
                );
                return this.request(config, retryCount + 1);
            }

            throw error;
        } finally {
            if (config.showProgress) {
                this.updateProgress(false);
            }
        }
    }

    // Helper methods với type mới
    async get<T>(
        url: string,
        options?: Omit<CustomOptions, "body">
    ): Promise<T> {
        return this.request({
            method: "GET",
            url,
            ...options,
        });
    }

    async post<T>(
        url: string,
        data?: any,
        options?: CustomOptions
    ): Promise<T> {
        return this.request({
            method: "POST",
            url,
            body: data,
            ...options,
        });
    }

    async put<T>(url: string, data?: any, options?: CustomOptions): Promise<T> {
        return this.request({
            method: "PUT",
            url,
            body: data,
            ...options,
        });
    }

    async delete<T>(url: string, options?: CustomOptions): Promise<T> {
        return this.request({
            method: "DELETE",
            url,
            ...options,
        });
    }

    async patch<T>(
        url: string,
        data?: any,
        options?: CustomOptions
    ): Promise<T> {
        return this.request({
            method: "PATCH",
            url,
            body: data,
            ...options,
        });
    }
}

// Tạo instance mặc định
const api = new HttpClient(process.env.NEXT_PUBLIC_API_URL);

export { HttpClient, HttpError, type CustomOptions, type RequestConfig };
export default api;

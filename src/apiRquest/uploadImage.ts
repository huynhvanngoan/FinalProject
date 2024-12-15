import http from "@/lib/http";

const uploadImageApiRequest = {
    uploadImage: (body: FormData) =>
        http.post<{
            url: string;
            payload: any;
        }>("/api/upload/image", body),
};

export default uploadImageApiRequest;

import http from "@/lib/http";

const userApiRequest = {
    create: (body: any) => http.post("/api/tours/create", body),
    user: () =>
        http.get<{ status: number; payload: any; data: any }>("/api/user/all"),
};

export default userApiRequest;

import http from "@/lib/http";

const tourApiRequest = {
    create: (body: any) =>
        http.post<{ status: number; payload: any; data: any }>(
            "/api/tours/create",
            body
        ),
    edit: (id: string, body: any) =>
        http.patch<{ status: number; payload: any; data: any }>(
            `/api/tours/update/${id}`,
            body
        ),
    delete: (id: string) => http.delete(`/api/tours/delete/${id}`),
    tour: () =>
        http.get<{ status: number; payload: any; data: any }>("/api/tours"),
  
    tourType: () =>
        http.get<{ status: number; payload: any; data: any }>(
            "/api/tours/tour-type"
        ),
};

export default tourApiRequest;

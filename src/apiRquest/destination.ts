import http from "@/lib/http";

const destinationApiRequest = {
    destination: () =>
        http.get<{ status: number; payload: any; data: any }>(
            "/api/tours/destinations"
        ),
};

export default destinationApiRequest;

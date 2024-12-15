import http from "@/lib/http";

const bookingApiRequest = {
    bookings: () =>
        http.get<{ status: number; payload: any; data: any }>(
            "/api/booking/all"),
    
};

export default bookingApiRequest;

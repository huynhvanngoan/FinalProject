import http from "@/lib/http";

const dashboardApiRequest = {
    overview: () =>
        http.get<{ status: number; payload: any; data: any }>(
            "/api/statistic/overview"
        ),
    tourTypeDistribution: () =>
        http.get<{ status: number; payload: any; data: any }>(
            "/api/statistic/tour-type-distribution"
        ),
    bookingRevenue: () =>
        http.get<{ status: number; payload: any; data: any }>(
            "/api/statistic/booking-revenue-chart"
        ),
};

export default dashboardApiRequest;

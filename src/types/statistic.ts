export type StatisticOverview = {
    reviews: number;
    bookings: number;
    users: number;
    revenue: number;
};

export type TourTypeDistribution = { name: string; count: number }[];

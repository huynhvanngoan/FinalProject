export interface Tour {
    id: string | number;
    title: string;
    location: string;
    thumbnail: string;
    photo: string;
    price: number;
    startDate: string | Date;
    rating: number;
    duration: string | number;
    description: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    typeId: string | number;
    packageId: string | number;
    destinationId: string | number;
}

import { StaticImageData } from "next/image";

export type Destination = {
    id: number;
    name: string;
    image: string | StaticImageData;
    description: string;
};



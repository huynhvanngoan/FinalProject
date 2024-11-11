import React from "react";
import { Icon } from "@iconify/react";

// Define the shape of the dynamic data
interface InfoData {
    packages: number;
    contact: string;
    email: string;
}

// Define the shape of the infoData items
interface InfoItem {
    id: number;
    icon: string;
    title: string;
    description: (data: InfoData) => string;
}

// Static infoData configuration
const infoItems: InfoItem[] = [
    {
        id: 1,
        icon: "mdi:flight",
        title: "Packages",
        description: (data) => `${data.packages} Available`,
    },
    {
        id: 2,
        icon: "mdi:phone",
        title: "Contact Us",
        description: (data) => data.contact,
    },
    {
        id: 3,
        icon: "mdi:email",
        title: "Email",
        description: (data) => data.email,
    },
];

interface InfoPackageProps {
    infoData: InfoData;
}

const InfoPackage: React.FC<InfoPackageProps> = ({ infoData }) => {
    return (
        <div className="w-full px-64 py-12 grid grid-cols-3 place-items-center gap-5">
            {infoItems.map((info) => (
                <div
                    key={info.id}
                    className="w-full border-r-2 border-secondary flex-center flex-row gap-[30px]"
                >
                    <div className="p-4 bg-primary/30 text-primary rounded-full">
                        <Icon icon={info.icon} width="48" height="48" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-lg text-secondary-foreground/60">
                            {info.title}
                        </p>
                        <p className="text-2xl font-medium">
                            {info.description(infoData)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InfoPackage;

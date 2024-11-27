import { tourColumns } from "@/components/shared/Columns";
import { DataTable } from "@/components/shared/TableData";
import { Tour } from "@/types/tours";
import React from "react";

async function getData(): Promise<Tour[]> {
    // Fetch data from your API here.
    return [
        {
            id: 1,
            title: "Khám Phá Vịnh Hạ Long",
            location: "Quảng Ninh, Việt Nam",
            thumbnails: [
                "/images/halong-bay-1.jpg",
                "/images/halong-bay-2.jpg",
                "/images/halong-bay-3.jpg",
            ],
            photo: "/images/halong-bay-full.jpg",
            price: 1500000,
            startDate: "2024-06-15",
            rating: 4.8,
            duration: "3 ngày 2 đêm",
            description:
                "Trải nghiệm du ngoạn tuyệt vời tại di sản thiên nhiên thế giới Vịnh Hạ Long với những đảo đá kỳ vĩ và làn nước xanh ngắt.",
            createdAt: "2024-02-10",
            updatedAt: "2024-03-15",
            typeId: 1,
            packageId: 101,
            destinationId: 201,
        },
        {
            id: 2,
            title: "Trekking Sapa",
            location: "Lào Cai, Việt Nam",
            thumbnails: [
                "/images/sapa-1.jpg",
                "/images/sapa-2.jpg",
                "/images/sapa-3.jpg",
            ],
            photo: "/images/sapa-full.jpg",
            price: 2200000,
            startDate: "2024-07-20",
            rating: 4.6,
            duration: "4 ngày 3 đêm",
            description:
                "Khám phá vùng núi đẹp nhất miền Bắc, trải nghiệm văn hóa các dân tộc thiểu số và thưởng ngoạn ruộng bậc thang.",
            createdAt: "2024-02-15",
            updatedAt: "2024-03-20",
            typeId: 2,
            packageId: 102,
            destinationId: 202,
        },
        {
            id: 3,
            title: "Du Lịch Đà Nẵng - Hội An",
            location: "Miền Trung, Việt Nam",
            thumbnails: [
                "/images/danang-1.jpg",
                "/images/hoian-1.jpg",
                "/images/danang-hoian-2.jpg",
            ],
            photo: "/images/danang-full.jpg",
            price: 3500000,
            startDate: "2024-08-10",
            rating: 4.9,
            duration: "5 ngày 4 đêm",
            description:
                "Khám phá thiên đường du lịch miền Trung với những bãi biển tuyệt đẹp, di sản văn hóa và ẩm thực độc đáo.",
            createdAt: "2024-02-20",
            updatedAt: "2024-03-25",
            typeId: 3,
            packageId: 103,
            destinationId: 203,
        },
        {
            id: 4,
            title: "Phú Quốc - Đảo Ngọc",
            location: "Kiên Giang, Việt Nam",
            thumbnails: [
                "/images/phuquoc-1.jpg",
                "/images/phuquoc-2.jpg",
                "/images/phuquoc-3.jpg",
            ],
            photo: "/images/phuquoc-full.jpg",
            price: 4500000,
            startDate: "2024-09-05",
            rating: 4.7,
            duration: "4 ngày 3 đêm",
            description:
                "Nghỉ dưỡng tại thiên đường nhiệt đới, tận hưởng những bãi biển hoang sơ và khám phá văn hóa đảo.",
            createdAt: "2024-02-25",
            updatedAt: "2024-03-30",
            typeId: 4,
            packageId: 104,
            destinationId: 204,
        },
        {
            id: 5,
            title: "Cao Nguyên Đà Lạt",
            location: "Lâm Đồng, Việt Nam",
            thumbnails: [
                "/images/dalat-1.jpg",
                "/images/dalat-2.jpg",
                "/images/dalat-3.jpg",
            ],
            photo: "/images/dalat-full.jpg",
            price: 2800000,
            startDate: "2024-06-30",
            rating: 4.5,
            duration: "3 ngày 2 đêm",
            description:
                "Khám phá thành phố ngàn hoa, thưởng thức không khí mát mẻ và những cảnh quan nên thơ.",
            createdAt: "2024-03-01",
            updatedAt: "2024-04-05",
            typeId: 2,
            packageId: 105,
            destinationId: 205,
        },
    ];
}
const Tours = async () => {
    const data = await getData();
    return (
        <div className="w-full mx-auto py-2 ">
            <DataTable columns={tourColumns} data={data} />
        </div>
    );
};

export default Tours;

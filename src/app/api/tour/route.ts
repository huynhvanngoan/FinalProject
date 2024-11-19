import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tourList = await prisma.tour.findMany();
    return NextResponse.json({ tours: tourList });
  } catch (error) {
    console.error("Error fetching tours:", error);
    return NextResponse.json(
      { error: "Failed to fetch tours" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

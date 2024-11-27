/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function POST(request: Request, context: any) {
  try {
    const { tourId } = context.params;
    const { name, description } = await request.json();
    return NextResponse.json({ tourId, name, description });
  } catch (error) {
    console.error("Error fetching tours:", error);
    return NextResponse.json(
      { error: "Failed to fetch tours" },
      { status: 500 }
    );
  }
}

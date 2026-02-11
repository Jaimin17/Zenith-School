import { NextRequest, NextResponse } from "next/server";
import { fetchExamsOfClassAction } from "@/actions/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  try {
    const { classId } = await params;

    if (!classId) {
      return NextResponse.json(
        { error: "Class ID is required", exams: [] },
        { status: 400 }
      );
    }

    const response = await fetchExamsOfClassAction(classId);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error, exams: [] },
        { status: 500 }
      );
    }

    return NextResponse.json({
      exams: response.data || [],
    });
  } catch (error) {
    console.error("Error fetching exams of class:", error);
    return NextResponse.json(
      { error: "Failed to fetch exams", exams: [] },
      { status: 500 }
    );
  }
}

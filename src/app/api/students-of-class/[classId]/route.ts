import { NextRequest, NextResponse } from "next/server";
import { fetchStudentsOfClassAction } from "@/actions/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  try {
    const { classId } = await params;

    if (!classId) {
      return NextResponse.json(
        { error: "Class ID is required", students: [] },
        { status: 400 }
      );
    }

    const response = await fetchStudentsOfClassAction(classId);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error, students: [] },
        { status: 500 }
      );
    }

    return NextResponse.json({
      students: response.data || [],
    });
  } catch (error) {
    console.error("Error fetching students of class:", error);
    return NextResponse.json(
      { error: "Failed to fetch students", students: [] },
      { status: 500 }
    );
  }
}

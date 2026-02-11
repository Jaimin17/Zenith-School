import { NextRequest, NextResponse } from "next/server";
import { fetchAssignmentsOfClassFullListAction } from "@/actions/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  try {
    const { classId } = await params;

    if (!classId) {
      return NextResponse.json(
        { error: "Class ID is required", assignments: [] },
        { status: 400 }
      );
    }

    const response = await fetchAssignmentsOfClassFullListAction(classId);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error, assignments: [] },
        { status: 500 }
      );
    }

    return NextResponse.json({
      assignments: response.data || [],
    });
  } catch (error) {
    console.error("Error fetching assignments of class:", error);
    return NextResponse.json(
      { error: "Failed to fetch assignments", assignments: [] },
      { status: 500 }
    );
  }
}

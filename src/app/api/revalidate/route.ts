import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Revalidate the root layout so generateMetadata() runs fresh
        revalidatePath("/", "layout");
        return NextResponse.json({ revalidated: true });
    } catch {
        return NextResponse.json(
            { revalidated: false, error: "Failed to revalidate" },
            { status: 500 }
        );
    }
}

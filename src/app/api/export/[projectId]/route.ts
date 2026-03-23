import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { RECEIPT_FIELDS } from "@/lib/constants";
import Papa from "papaparse";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: project } = await supabase
    .from("projects")
    .select("name")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .single();

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data: fieldSettings } = await supabase
    .from("project_field_settings")
    .select("field_name")
    .eq("project_id", projectId)
    .eq("is_enabled", true)
    .order("display_order");

  const enabledFields = (fieldSettings ?? []).map((f) => f.field_name);

  const { data: receipts } = await supabase
    .from("receipts")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (!receipts || receipts.length === 0) {
    return new NextResponse("אין קבלות לייצוא", { status: 200 });
  }

  const rows = receipts.map((r: Record<string, unknown>) => {
    const row: Record<string, string> = {};
    enabledFields.forEach((f) => {
      const label =
        RECEIPT_FIELDS[f as keyof typeof RECEIPT_FIELDS]?.label ?? f;
      const val = r[f];
      row[label] = val != null ? String(val) : "";
    });
    row["תאריך יצירה"] = new Date(r.created_at as string).toLocaleDateString("he-IL");
    return row;
  });

  const csv = "\uFEFF" + Papa.unparse(rows);
  const encodedName = encodeURIComponent(`${project.name}-receipts.csv`);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="receipts.csv"; filename*=UTF-8''${encodedName}`,
    },
  });
}

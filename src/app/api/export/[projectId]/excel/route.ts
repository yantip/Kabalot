import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { RECEIPT_FIELDS } from "@/lib/constants";
import ExcelJS from "exceljs";

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

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "קבלות";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("קבלות");
  sheet.views = [{ rightToLeft: true }];

  const columns = [
    ...enabledFields.map((f) => ({
      header: RECEIPT_FIELDS[f as keyof typeof RECEIPT_FIELDS]?.label ?? f,
      key: f,
      width: 18,
    })),
    { header: "תאריך יצירה", key: "created_at", width: 14 },
  ];
  sheet.columns = columns;

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, size: 11 };
  headerRow.fill = {
    type: "pattern" as const,
    pattern: "solid" as const,
    fgColor: { argb: "FFF3F0E8" },
  };
  headerRow.alignment = { horizontal: "right" };

  (receipts ?? []).forEach((r: Record<string, unknown>) => {
    const row: Record<string, unknown> = {};
    enabledFields.forEach((f) => {
      row[f] = r[f] != null ? r[f] : "";
    });
    row.created_at = new Date(r.created_at as string).toLocaleDateString("he-IL");
    sheet.addRow(row);
  });

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.alignment = { horizontal: "right" };
    }
    row.eachCell((cell) => {
      cell.border = {
        bottom: { style: "thin", color: { argb: "FFE5E0D5" } },
      };
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const encodedName = encodeURIComponent(`${project.name}-receipts.xlsx`);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="receipts.xlsx"; filename*=UTF-8''${encodedName}`,
    },
  });
}

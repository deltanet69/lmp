import { createClient } from "@/lib/supabase/client";

export type ActivityAction = "created" | "updated" | "deleted" | "status_changed";
export type ActivityEntity = "portfolio" | "enquiry";

export interface ActivityLog {
    id: string;
    action: ActivityAction;
    entity: ActivityEntity;
    entity_id: string;
    entity_title: string;
    detail: string | null;
    created_at: string;
}

/**
 * Log an admin activity to the `activity_log` table.
 * Silent — errors are swallowed so they don't block the main action.
 */
export async function logActivity({
    action,
    entity,
    entity_id,
    entity_title,
    detail = null,
}: {
    action: ActivityAction;
    entity: ActivityEntity;
    entity_id: string;
    entity_title: string;
    detail?: string | null;
}) {
    try {
        const supabase = createClient();
        await supabase.from("activity_log").insert({
            action,
            entity,
            entity_id,
            entity_title,
            detail,
        });
    } catch {
        // Non-blocking — silently fail
    }
}

/** Human-readable label for activity items */
export function activityLabel(log: ActivityLog): string {
    const entityName = log.entity === "portfolio" ? "Portfolio" : "Enquiry";
    switch (log.action) {
        case "created": return `${entityName} baru ditambahkan`;
        case "updated": return `${entityName} diperbarui`;
        case "deleted": return `${entityName} dihapus`;
        case "status_changed": return `Status enquiry diubah${log.detail ? ` → ${log.detail}` : ""}`;
        default: return log.action;
    }
}

export const ACTION_ICON: Record<ActivityAction, { bg: string; color: string }> = {
    created: { bg: "bg-emerald-100", color: "text-emerald-600" },
    updated: { bg: "bg-blue-100", color: "text-blue-600" },
    deleted: { bg: "bg-red-100", color: "text-red-500" },
    status_changed: { bg: "bg-amber-100", color: "text-amber-600" },
};

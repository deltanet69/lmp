/**
 * Converts a string to a URL-safe slug.
 * e.g. "Company Profile – PT. PASTI Group" → "company-profile-pt-pasti-group"
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")   // remove special chars (except - and space)
        .replace(/[\s_]+/g, "-")    // spaces/underscores → hyphen
        .replace(/-+/g, "-")         // collapse multiple hyphens
        .replace(/^-|-$/g, "")       // trim leading/trailing hyphens
        .slice(0, 100);              // max 100 chars
}

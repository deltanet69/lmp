import PageClient from "./PageClient";

export async function generateStaticParams() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/portfolio?select=id`,
            {
                headers: {
                    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
                },
                cache: "no-store",
            }
        );
        if (!res.ok) return [];
        const data: { id: string }[] = await res.json();
        return data.map((row) => ({ id: row.id }));
    } catch {
        return [];
    }
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    return <PageClient />;
}

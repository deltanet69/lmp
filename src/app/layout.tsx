import type { Metadata } from "next";
import { Open_Sans, Patua_One } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import Script from "next/script";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const patuaOne = Patua_One({
  variable: "--font-patua-one",
  subsets: ["latin"],
  weight: "400",
});

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data } = await supabase.from("web_setting").select("*").maybeSingle();

  return {
    title: data?.meta_title || "Langit Media Pro",
    description: data?.meta_description || "Your Trusted Production Partner",
    keywords: data?.meta_keywords || undefined,
    openGraph: data?.og_image
      ? {
        images: [{ url: data.og_image }],
      }
      : undefined,
    other: {
      ...(data?.google_search_console
        ? { "google-site-verification": data.google_search_console }
        : {}),
      ...(data?.bing_webmaster ? { "msvalidate.01": data.bing_webmaster } : {}),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.from("web_setting").select("google_analytics_id").maybeSingle();
  const gaId = data?.google_analytics_id;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${openSans.variable} ${patuaOne.variable} antialiased font-sans flex flex-col min-h-screen bg-[#19172A]`}
      >
        {children}
      </body>
    </html>
  );
}

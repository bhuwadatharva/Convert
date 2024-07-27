import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";



import { ThemeProvider } from "next-themes";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DocShift-File Converter",
    description: `Unlock the power of seamless file transformation with Transmuter – your ultimate digital alchemist! Say goodbye to format woes as you embark on a journey of effortless conversion. Whether it's images, documents, audio, or video, Transmuter transmutes your files with precision and speed, tailored to your needs. Experience the magic of compatibility as you effortlessly switch between formats, breathing new life into your digital creations. Join the ranks of satisfied users who've discovered the transformative prowess of Transmuter – where every file finds its perfect form`,
    creator: "ATHARVA BHUWAD",
    keywords: "image converter, video converter, audio converter, unlimited image converter, unlimited video converter",
    openGraph: {
        title: "DocShift-File Converter",
        description: "Unlock the power of seamless file transformation with Transmuter – your ultimate digital alchemist! Say goodbye to format woes as you embark on a journey of effortless conversion. Whether it's images, documents, audio, or video, Transmuter transmutes your files with precision and speed, tailored to your needs. Experience the magic of compatibility as you effortlessly switch between formats, breathing new life into your digital creations. Join the ranks of satisfied users who've discovered the transformative prowess of Transmuter – where every file finds its perfect form",
        type: "website",
        locale: "en_us",
        url: "",
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
            
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem themes={["light", "dark"]}>
                    <Navbar />
                    <Toaster />
                    <div className="pt-32 min-h-screen lg:pt-36 2xl:pt-44 container max-w-4xl lg:max-w-6xl 2xl:max-w-7xl bg-slate-100">
                        {children}
                    </div>
                </ThemeProvider>
                
            </body>
        </html>
    );
}

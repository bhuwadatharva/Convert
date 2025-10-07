import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";



import { ThemeProvider } from "next-themes";
const inter = Inter({ subsets: ["latin"] });



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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TRPCReactProvider } from "../trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Provider } from "jotai";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AutomataMesh",
    description: "Automate with lightning speed",
    icons: {
        icon: "/logos/logo.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <script
                async
                crossOrigin="anonymous"
                src="https://tweakcn.com/live-preview.min.js"
            />
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Analytics />
                <TRPCReactProvider>
                    <NuqsAdapter>
                        <Provider>{children}</Provider>
                    </NuqsAdapter>
                    <Toaster />
                </TRPCReactProvider>
            </body>
        </html>
    );
}

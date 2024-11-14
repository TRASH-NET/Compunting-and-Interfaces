import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Image from "next/image";

const clearSans = localFont({
    src: "../fonts/clear-sans.ttf",
    variable: "--font-geist-sans",
});

export const metadata: Metadata = {
    title: "2048 Game",
    description: "2048",
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="../icon.png" />
            </head>
            <body
                className={`${clearSans.variable} antialiased`}
            >
                <main className="flex justify-start h-full min-h-screen">
                    <section
                        className="flex items-center justify-center h-full w-1/2"
                    >
                        <Image
                            src="/2048.gif"
                            alt="2048"
                            width={600}
                            height={600}
                        />
                        <div className="absolute w-1/2 h-full top-0 right-100 bg-black bg-opacity-50">
                        </div>
                    </section>
                    <section className="flex flex-col items-center w-1/2">
                        <div className="w-[300px]">
                            <h1 className='text-7xl font-bold text-[#6B0096] my-10'>2048</h1>
                            {children}
                        </div>
                    </section>
                </main>
            </body>
        </html >
    );
}

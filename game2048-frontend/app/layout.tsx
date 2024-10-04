import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Ranking from "@/components/ux/Ranking";
import Instructions from "@/components/ux/Instructions";

const clearSans = localFont({
	src: "./fonts/clear-sans.ttf",
	variable: "--font-geist-sans",
});

export const metadata: Metadata = {
	title: "2048 Game",
	description: "2048",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="./icon.png" />
			</head>
			<body
				className={`${clearSans.variable} antialiased`}
			>
				<section className="flex flex-row justify-center h-full overflow-y-scroll bg-[#f8f8f8]">
					<Instructions />
					<main className="flex justifiy-center items-start px-8">
						{children}
					</main>
					<Ranking />
				</section>
			</body>
		</html >
	);
}

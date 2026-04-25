import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrackWise — AI-Powered JEE & NEET Preparation",
  description: "Study smarter with high-weightage chapters, AI study assistant, and adaptive mock tests. Free JEE and NEET prep.",
  keywords: ['JEE preparation', 'NEET preparation', 'JEE mock test free', 'NEET AI assistant', 'high weightage JEE chapters'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

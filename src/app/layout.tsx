import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlayIndex - Free Game Catalog",
  description:
    "A polished portfolio catalog for discovering free-to-play videogames.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

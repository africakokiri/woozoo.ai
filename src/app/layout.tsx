import { Sidebar } from "@/components/sidebar";
import "@/styles/globals.css";

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "WooZoo",
  description: "",
  icons: {
    icon: "/icons/woozoo.svg"
  }
};

const inter = Inter({
  subsets: ["latin"]
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${inter.className} font-sans font-light antialiased`}>
        <ThemeProvider
          enableColorScheme={false}
          attribute="class"
          disableTransitionOnChange
        >
          <Sidebar />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

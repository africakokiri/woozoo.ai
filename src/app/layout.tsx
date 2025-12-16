import Sidebar from "@/components/sidebar";
import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "WooZoo",
  description: "",
  icons: {
    icon: "/icons/main.svg"
  }
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: shadcn
      }}
    >
      <html
        lang="en"
        suppressHydrationWarning
      >
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider
            enableColorScheme={false}
            attribute="class"
            disableTransitionOnChange
            defaultTheme="system"
          >
            <Sidebar />

            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

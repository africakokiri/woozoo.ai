import { WooZooSidebar } from "@/components/woozoo-sidebar";
import "@/styles/globals.css";
import { SidebarProvider } from "@/ui/sidebar";

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
      <body className={`${inter.className} font-sans antialiased`}>
        <SidebarProvider>
          <ThemeProvider
            enableColorScheme={false}
            attribute="class"
            disableTransitionOnChange
          >
            <WooZooSidebar />

            {children}
          </ThemeProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}

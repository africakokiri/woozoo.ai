import ChatRuntimeProvider from "@/contexts/chat-runtime-context";
import ThreadClientSideRenderer from "@/contexts/thread-client-side-renderer";
import "@/styles/globals.css";

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
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          enableColorScheme={false}
          attribute="class"
          disableTransitionOnChange
        >
          <ChatRuntimeProvider>{children}</ChatRuntimeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

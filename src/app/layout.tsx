import Thread from "@/components/thread/thread";
import { inter } from "@/styles/fonts";
import "@/styles/globals.css";

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "WooZoo",
  description: "",
  icons: {
    icon: "/icons/main.svg"
  }
};

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
          defaultTheme="system"
        >
          <main className="flex justify-center">
            <div className="w-full max-w-3xl *:w-full">
              <Thread />
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

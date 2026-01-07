import { inter } from "@/shared/styles/fonts";
import "@/shared/styles/globals.css";
import Prompt from "@/widgets/prompt/ui/prompt";
import Sidebar from "@/widgets/sidebar/ui/sidebar";

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
      <body className={`${inter.className} flex antialiased`}>
        <ThemeProvider
          enableColorScheme={false}
          attribute="class"
          disableTransitionOnChange
          defaultTheme="system"
        >
          <Sidebar />

          <main className="mx-auto w-full max-w-3xl">
            <Prompt />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

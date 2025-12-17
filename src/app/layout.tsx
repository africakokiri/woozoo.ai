import Sidebar from "@/components/sidebar";
import ThreadClientSideRenderer from "@/components/thread-client-side-renderer";
import RuntimeProvider from "@/contexts/runtime-provider";
import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = await auth();

  return (
    <ClerkProvider
      appearance={{
        theme: shadcn
      }}
    >
      <RuntimeProvider>
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
              <Sidebar isAuthenticated={isAuthenticated} />

              <main className="w-dvw">
                <ThreadClientSideRenderer isAuthenticated={isAuthenticated} />
                {children}
              </main>
            </ThemeProvider>
          </body>
        </html>
      </RuntimeProvider>
    </ClerkProvider>
  );
}

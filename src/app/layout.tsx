import Sidebar from "@/components/sidebar";
import ChatRuntimeProvider from "@/contexts/chat-runtime-context";
import ThreadClientSideRenderer from "@/contexts/thread-client-side-renderer";
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
            <ChatRuntimeProvider>
              <Sidebar isAuthenticated={isAuthenticated} />

              <main className="h-dvh">
                <ThreadClientSideRenderer />
                {children}
              </main>
            </ChatRuntimeProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

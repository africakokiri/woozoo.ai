import Sidebar from "@/components/sidebar";
import ChatRuntimeProvider from "@/context/chat-runtime-provider";
import ThreadRenderer from "@/context/thread-renderer";
import { inter } from "@/styles/fonts";
import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { shadcn } from "@clerk/themes";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "WooZoo",
  description: "",
  icons: {
    icon: "/icons/main.svg"
  }
};

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
        <body className={`${inter.className} flex antialiased`}>
          <ThemeProvider
            enableColorScheme={false}
            attribute="class"
            disableTransitionOnChange
            defaultTheme="system"
          >
            <Sidebar isAuthenticated={isAuthenticated} />

            <ChatRuntimeProvider>
              <main className="h-dvh w-dvw">
                <ThreadRenderer />
                {children}
              </main>
            </ChatRuntimeProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

import ChatRuntimeProvider from "@/providers/chat-runtime-provider";
import { inter } from "@/styles/fonts";
import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
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
            <ChatRuntimeProvider>
              <main>{children}</main>
            </ChatRuntimeProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

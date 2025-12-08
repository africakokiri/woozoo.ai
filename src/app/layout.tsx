import AppSidebar from "@/components/app-sidebar/_app-sidebar";
import { prisma } from "@/libs/prisma/prisma";
import { inter } from "@/styles/fonts";
import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { shadcn } from "@clerk/themes";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "WooZoo",
  description: "",
  icons: {
    icon: "/icons/woozoo.svg"
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkUser = await currentUser();

  if (clerkUser) {
    await prisma.user.upsert({
      where: { id: clerkUser.id },
      update: {
        email: clerkUser.emailAddresses[0].emailAddress
      },
      create: {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress
      }
    });
  }

  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadcn
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
            <div className="flex">
              <AppSidebar />

              <div className="h-dvh w-dvw">{children}</div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

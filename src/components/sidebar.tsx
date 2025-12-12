"use client";

import { useGlobalConfigStore } from "@/context/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/ui/dropdown-menu";
import { cn } from "@/utils/tailwind/cn";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { BadgeCheck, ChevronsUpDown, CreditCard, LogOut, SunMoon } from "lucide-react";
import { ChevronsLeft, ChevronsRight, Search, SquarePen } from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useEffect } from "react";

export const Vars: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.1 } },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, delay: 0.1 }
  }
};

const Sidebar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { isSidebarOpen, isHydrated, setIsSidebarRendered, finishFirstRender } = useGlobalConfigStore();

  useEffect(() => {
    requestAnimationFrame(() => finishFirstRender());

    setIsSidebarRendered();
  }, []);

  if (!isHydrated || !isAuthenticated) return null;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 289 : 81 }}
      transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
      className="bg-sidebar sticky top-0 left-0 flex h-screen shrink-0 flex-col border-r"
    >
      <header className={cn("px-4 pt-4 pb-1", isSidebarOpen && "pb-4")}>
        <Sidebar.Header />
      </header>

      <nav className="px-4">
        <Sidebar.Nav />
      </nav>

      <footer className="mt-auto p-4">
        <Sidebar.User />
      </footer>
    </motion.aside>
  );
};

const Header = () => {
  const { isFirstRender, isSidebarOpen, setIsSidebarOpen } = useGlobalConfigStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="fvis flex items-center gap-2"
        >
          <motion.div
            initial={isFirstRender ? false : true}
            animate={{
              height: isSidebarOpen ? "auto" : "100px",
              marginTop: isSidebarOpen ? 0 : 64
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            data-open={isSidebarOpen}
            className={cn(
              "flex h-12 items-center gap-2",
              isSidebarOpen ? "mt-0" : "my-4 mt-16 h-full border-y!"
            )}
          >
            <Image
              src="/icons/main.svg"
              alt="WooZoo logo"
              width={48}
              height={48}
              className="min-w-12! shrink-0 dark:invert"
            />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.h1
                  key="sidebar-header"
                  variants={Vars}
                  initial={isFirstRender ? false : "hidden"}
                  animate="visible"
                  exit="hidden"
                  aria-hidden={!isSidebarOpen}
                  className="text-sidebar-foreground top-6 left-[72px] text-2xl font-light
tracking-tight"
                >
                  WooZoo
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>

        <motion.div
          initial={isFirstRender ? false : { x: 0 }}
          animate={{ x: isSidebarOpen ? 208 : 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
          className="absolute top-4 left-4"
        >
          <Button
            aria-label="Close sidebar"
            variant="ghost"
            className="flex h-12 w-12 items-center justify-center"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <ChevronsLeft /> : <ChevronsRight />}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

const Nav = () => {
  const { isFirstRender, isSidebarOpen } = useGlobalConfigStore();

  return (
    <ul className="flex w-full flex-col items-center space-y-2">
      {["New chats", "Search chats"].map((item, i) => (
        <li
          key={`${item}-${i}`}
          className="flex w-full items-center text-sm"
        >
          <Button
            variant="ghost"
            aria-label={!isSidebarOpen ? item : undefined}
            className={cn(
              "flex h-12 w-12 flex-1 items-center justify-start gap-2",
              isSidebarOpen && "h-8"
            )}
          >
            <div>{i === 0 ? <SquarePen aria-hidden={true} /> : <Search aria-hidden={true} />}</div>

            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  key="sidebar-nav"
                  variants={Vars}
                  initial={isFirstRender ? false : "hidden"}
                  animate="visible"
                  exit="hidden"
                  className="font-normal"
                >
                  {item}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </li>
      ))}
    </ul>
  );
};

export const User = () => {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const { isSidebarOpen } = useGlobalConfigStore();

  const { theme, setTheme } = useTheme();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="w-full"
          asChild
        >
          <Button
            variant="ghost"
            className="h-12 px-0! py-6!"
            aria-label="Open user account menu"
          >
            <UserProfile isSidebarOpen={isSidebarOpen} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) max-w-42 overflow-hidden rounded-lg"
          align="end"
          side="right"
          sideOffset={4}
        >
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <SunMoon />
                Appearance
              </DropdownMenuSubTrigger>

              <DropdownMenuSubContent
                sideOffset={4}
                className="w-40"
              >
                <DropdownMenuRadioGroup
                  value={theme}
                  onValueChange={setTheme}
                >
                  <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>

            <DropdownMenuItem>
              <CreditCard />
              Billing
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => setIsLogoutDialogOpen(true)}>
              <LogOut />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertComponent
        isLogoutDialogOpen={isLogoutDialogOpen}
        setIsLogoutDialogOpen={setIsLogoutDialogOpen}
      />
    </>
  );
};

const UserProfile = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const { user } = useUser();

  const { isFirstRender } = useGlobalConfigStore();

  return (
    <div className="flex w-full items-center gap-2 p-2.5">
      <Avatar className="h-7 w-7 rounded-full">
        <AvatarImage
          src={user?.imageUrl}
          alt="Profile image"
        />
        <AvatarFallback className="rounded-lg">
          {user?.firstName &&
            user.firstName
              .split(" ")
              .map((word) => word[0])
              .join("")}
        </AvatarFallback>
      </Avatar>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            key="sidebar-user"
            variants={Vars}
            initial={isFirstRender ? false : "hidden"}
            animate="visible"
            exit="hidden"
            className="flex flex-1 items-center"
          >
            <div className="flex flex-col items-start justify-between">
              <span className="text-sm font-medium">{user?.firstName}</span>
              <span className="text-xs">{user?.emailAddresses[0].emailAddress}</span>
            </div>

            <ChevronsUpDown
              aria-hidden="true"
              focusable="false"
              className="ml-auto"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AlertComponent = ({
  isLogoutDialogOpen,
  setIsLogoutDialogOpen
}: {
  isLogoutDialogOpen: boolean;
  setIsLogoutDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <AlertDialog
      open={isLogoutDialogOpen}
      onOpenChange={setIsLogoutDialogOpen}
    >
      <AlertDialogContent className="space-y-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign in again to continue using WooZoo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <SignOutButton>
            <AlertDialogAction className="bg-destructive hover:bg-destructive/50">
              Sign out
            </AlertDialogAction>
          </SignOutButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

Sidebar.Header = Header;
Sidebar.Nav = Nav;
Sidebar.User = User;

export default Sidebar as typeof Sidebar & {
  Header: typeof Header;
  Nav: typeof Nav;
  User: typeof User;
};

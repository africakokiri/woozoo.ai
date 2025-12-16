"use client";

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
import { useGlobalConfigStore } from "@/utils/zustand/use-global-config-store";
import { useSidebarStore } from "@/utils/zustand/use-sidebar-store";

import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  BadgeCheck,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Search,
  SquarePen,
  SunMoon
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

const motionVars: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.1 } },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, delay: 0.1 }
  }
};

const Sidebar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { isOpen } = useSidebarStore();
  const { isHydrated, finishFirstRender } = useGlobalConfigStore();

  useEffect(() => {
    if (!isHydrated) return;

    const raf = requestAnimationFrame(() => finishFirstRender());

    return () => cancelAnimationFrame(raf);
  }, [isHydrated, finishFirstRender]);

  if (!isHydrated || !isAuthenticated) return null;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 288 : 80 }}
      transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
      className="bg-sidebar border-r-sidebar-border sticky top-0 left-0 flex h-screen shrink-0 flex-col"
    >
      <header className="p-4">
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
  const { isOpen, toggle } = useSidebarStore();
  const { isFirstRender } = useGlobalConfigStore();

  return (
    <div className="flex justify-between">
      <motion.div
        initial={isFirstRender ? false : true}
        animate={{
          height: isOpen ? "auto" : 100,
          marginTop: isOpen ? 0 : 64
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn("flex h-12 items-center gap-2", !isOpen && "border-y")}
      >
        <Link
          href="/"
          className="focus-visible flex items-center gap-2"
        >
          <Image
            className="min-size-icon shrink-0 dark:invert"
            src="/icons/main.svg"
            alt="Main logo"
            width={48}
            height={48}
          />
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                key="sidebar-header-h1"
                variants={motionVars}
                initial={isFirstRender ? false : "hidden"}
                animate="visible"
                exit="hidden"
                className="text-sidebar-foreground text-2xl font-light tracking-tight"
                aria-hidden={!isOpen}
              >
                WooZoo
              </motion.h1>
            )}
          </AnimatePresence>
        </Link>
      </motion.div>

      <motion.div
        initial={isFirstRender ? false : { x: 0 }}
        animate={{ x: isOpen ? 208 : 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
        className="absolute top-4 left-4"
      >
        <Button
          variant="ghost"
          className="min-size-icon"
          onClick={() => toggle()}
        >
          {isOpen ? <ChevronsLeft /> : <ChevronsRight />}
        </Button>
      </motion.div>
    </div>
  );
};

const Nav = () => {
  const { isOpen } = useSidebarStore();
  const { isFirstRender } = useGlobalConfigStore();

  return (
    <ul className="flex w-full flex-col items-center space-y-2">
      {["New chats", "Search chats"].map((item, i) => (
        <li
          key={`${item}-${i}`}
          className="flex w-full items-center text-sm"
        >
          <Button
            variant="ghost"
            className={cn("flex h-12 w-12 flex-1 items-center justify-start gap-2", isOpen && "h-8")}
            aria-label={!isOpen ? item : undefined}
          >
            <div>{i === 0 ? <SquarePen aria-hidden={true} /> : <Search aria-hidden={true} />}</div>

            <AnimatePresence>
              {isOpen && (
                <motion.span
                  key="sidebar-nav"
                  variants={motionVars}
                  initial={isFirstRender ? false : "hidden"}
                  animate="visible"
                  transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
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
            <UserProfile />
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
                className="w-40"
                sideOffset={4}
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

const UserProfile = () => {
  const { isOpen } = useSidebarStore();
  const { isFirstRender } = useGlobalConfigStore();
  const { user } = useUser();

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
        {isOpen && (
          <motion.div
            key="sidebar-user"
            variants={motionVars}
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
              className="ml-auto"
              aria-hidden="true"
              focusable="false"
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

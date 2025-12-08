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
  DropdownMenuSubTrigger
} from "@/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { cn } from "@/utils/shadcn/cn";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { BadgeCheck, ChevronsUpDown, CreditCard, LogOut, SunMoon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { type Dispatch, type SetStateAction, useState } from "react";

export const NavUser = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
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
            className="p-0!"
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

              <DropdownMenuSubContent className="w-40">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, width: 200 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn("flex flex-1 items-center", !isSidebarOpen && "sr-only")}
          >
            <div className="flex flex-col items-start justify-between">
              <span className="truncate text-sm font-medium">{user?.firstName}</span>
              <span className="truncate text-xs">{user?.emailAddresses[0].emailAddress}</span>
            </div>

            <ChevronsUpDown
              className="ml-auto"
              aria-hidden={true}
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

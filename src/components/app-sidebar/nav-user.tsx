import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

export const NavUser = () => {
  return (
    <div>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          src=""
          alt=""
        />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

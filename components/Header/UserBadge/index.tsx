import { Bell, ChevronDown } from "lucide-react";
import Image, { StaticImageData } from "next/image";

type UserBadgeProps = {
  userName: string;
  companyName: string;
  userImage: StaticImageData;
};

export default function UserBadge({
  userImage,
  userName,
  companyName,
}: UserBadgeProps) {
  return (
    <div className="flex gap-8 items-center ">
      <Bell className="cursor-pointer  hidden sm:block  " />
      <div className="flex items-center gap-4 py-2 px-5 border-[1px] rounded-lg border-neutral cursor-pointer">
        <Image
          src={userImage}
          width={40}
          height={40}
          className="rounded-full"
          alt="Picture of the author"
        />
        <div className="flex flex-col   ">
          <span className="font-bold hidden sm:block"> {userName}</span>
          <span className="text-sm hidden sm:block"> {companyName}</span>
        </div>
        <ChevronDown />
      </div>
    </div>
  );
}

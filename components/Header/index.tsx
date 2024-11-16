import { LayoutGrid, Menu } from "lucide-react";
import UserBadge from "./UserBadge";
import userImage from "@/public/profilePic.jpg";
import logo from "@/public/logo.png";
import Image from "next/image";

type MenuProps = {
  toggleMenu: () => void;
};

export default function Header({ toggleMenu }: MenuProps) {
  return (
    <header className="flex w-full items-center justify-between px-10 py-3 border-neutral-200 border-b-[1px] ">
      <menu className="flex gap-8 items-center">
        <button onClick={toggleMenu}>
          <Menu />
        </button>

        <span className="  border-r-[1px] border-neutral-200 pr-8">
          <Image
            src={logo}
            width={120}
            height={120}
            className="rounded-full"
            alt="Picture of the author"
          />
        </span>

        <div className="flex items-center gap-3">
          <LayoutGrid /> <span>Soluções</span>
        </div>
      </menu>
      <UserBadge
        userName="Felipe Ramalho"
        companyName="Organização"
        userImage={userImage}
      />
    </header>
  );
}

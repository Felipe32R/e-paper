"use client";
import { LayoutGrid, Menu } from "lucide-react";
import UserBadge from "./UserBadge";
import userImage from "@/public/profilePic.jpg";
import logo from "@/public/logo.png";
import Image from "next/image";
import { useMenuContext } from "@/contexts/MenuContext";
import { cn } from "@/lib/utils";

export default function Header() {
  const { isMenuOpen, toggleMenu } = useMenuContext();

  return (
    <header className="flex w-full items-center justify-between px-5 py-2 border-neutral border-b-[1px] sticky top-0 bg-white ">
      <menu className="flex gap-8 items-center">
        <button
          className={cn(
            "border border-transparent p-2 rounded-lg",
            isMenuOpen && "border-neutral"
          )}
          onClick={toggleMenu}
        >
          <Menu />
        </button>

        <span className="  border-r-[1px] border-neutral pr-8">
          <Image src={logo} width={120} height={120} alt="Logo" />
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

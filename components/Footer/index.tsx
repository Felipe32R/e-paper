"use client";

import Image from "next/image";
import logoCinza from "@/public/logo-cinza.png";
import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" flex gap-2 w-full items-center justify-center text-text-primary py-1 text-sm bg-border-light z-[-10px]">
      <Image src={logoCinza} width={90} height={90} alt="Logo" />
      Copyright
      <Copyright size={12} />
      2024 e-paper
    </footer>
  );
}

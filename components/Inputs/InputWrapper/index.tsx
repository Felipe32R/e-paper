"use client";

import { CircleHelp } from "lucide-react";
import { ReactNode } from "react";

type InputWrapperProps = {
  title: string;
  children: ReactNode;
  icon?: boolean;
};

export default function InputWrapper({
  title,
  children,
  icon,
}: InputWrapperProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2 items-center">
        <label className="font-bold text-sm text-text-primary">{title}</label>
        {icon && <CircleHelp size={15} className="text-text-secondary" />}
      </div>
      {children}
    </div>
  );
}

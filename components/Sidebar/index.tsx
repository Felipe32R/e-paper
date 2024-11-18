"use client";

import { useMenuContext } from "@/contexts/MenuContext";
import { cn } from "@/lib/utils";
import { ScrollText, StickyNote } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const { isMenuOpen } = useMenuContext();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const sidebarItems = [
    { id: 1, name: "Notas", icon: StickyNote },
    { id: 2, name: "Documentos", icon: ScrollText },
    { id: 3, name: "Relatórios", icon: StickyNote },
    { id: 4, name: "Arquivos", icon: ScrollText },
  ];

  return (
    <aside
      className={cn(
        "w-20 h-full border-r border-neutral flex flex-col gap-4 items-center py-6  transition-all  duration-100 ",
        isMenuOpen && "w-64 shadow-md"
      )}
    >
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item.id)}
            className={cn(
              "  flex gap-4 items-center text-center px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ",
              selectedItem === item.id
                ? "bg-green-primary-light "
                : "hover:bg-neutral-100",
              isMenuOpen ? "w-[80%] " : ""
            )}
          >
            <Icon size={20} />
            {isMenuOpen && (
              <span className="font-medium text-sm">{item.name}</span>
            )}
          </div>
        );
      })}
    </aside>
  );
}

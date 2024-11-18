"use client";

import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialogTransparentBlur";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ViewDocumentDialogProps = {
  file: File;
};

export default function ViewDocumentDialog({ file }: ViewDocumentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
  };

  // Criar uma URL temporária para o arquivo
  const fileUrl = URL.createObjectURL(file);

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger className="w-full text-left text-green-primary-main text-sm mt-2">
        Pré-visualizar
      </DialogTrigger>
      <DialogContent className=" w-full h-full sm:w-[80%] max-w-full sm:h-[80%]">
        <DialogHeader className="h-16">
          <DialogTitle>Pré-visualização do arquivo</DialogTitle>
          <DialogDescription>{file.name}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center h-full sm:h-[480px] flex-1 overflow-auto ">
          {/* Exibe o PDF com um scroll */}
          <embed
            src={fileUrl}
            type="application/pdf"
            className="w-full h-full"
          />
        </div>

        <DialogFooter className="flex items-center justify-end gap-3 w-full h-10">
          <Button
            className="bg-green-primary-main flex gap-1 items-center"
            onClick={() => handleDialogChange(false)}
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

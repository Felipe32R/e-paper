"use client";

import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { ArrowRight, CircleCheck, Plus } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import FileInput from "@/components/Inputs/FileInput";
import { useState } from "react";
import ViewDocumentDialog from "../ViewDocumentDialog";
import { originList, typeList } from "@/constants/combobox";
import InputWrapper from "@/components/Inputs/InputWrapper";
import { useForm, Controller } from "react-hook-form"; // Importando React Hook Form
import { z } from "zod"; // Para validações com zod
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver do zod

import { toast } from "@/hooks/use-toast";

import { createDocument } from "@/app/api/actions";

const validationSchema = z.object({
  origem: z.string().min(1, "Selecione a origem do documento"),
  tipo: z.string().min(1, "Selecione o tipo de documento"),
});

type FormData = {
  origem: string;
  tipo: string;
};

export default function CreateDocumentDialog() {
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Configurando o React Hook Form com validação usando zodResolver

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setFile(null);
      reset(); // Resetando o formulário ao fechar o modal
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // await client.create({
      //   body: {
      //     emitente: "Felipe Ramalho",
      //     nome: file?.name ?? "",
      //     origem: data.origem,
      //     tipo: data.tipo,
      //     valorLiquido: 0,
      //     valorTotal: 0,
      //   },
      // });

      await createDocument({
        emitente: "Felipe Ramalho",
        nome: file?.name ?? "",
        origem: data.origem,
        tipo: data.tipo,
        valorLiquido: 0,
        valorTotal: 0,
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      reset();
      setIsLoading(false);
      setIsOpen(false);
      toast({
        className: "text-white bg-green-primary-main",
        action: (
          <div className="w-full flex items-center ">
            <CircleCheck className="mr-2" />
            <span>Documento adicionado com sucesso!</span>
          </div>
        ),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger className="inline-flex h-10 p-2 px-4 w-[200px] rounded-md  bg-green-primary-main hover:bg-green-primary-main hover:opacity-80  items-center gap-3 text-white font-medium">
        <Plus size={20} />
        Novo documento
      </DialogTrigger>

      <DialogContent className="w-[697px] max-w-full h-[640px]">
        <DialogHeader>
          <DialogTitle>Criar novo documento</DialogTitle>
          <DialogDescription>
            Insira os dados necessários para criar
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <span className=" w-[60px] text-center  border border-border-neutral bg-border-light text-text-secondary p-2  rounded-full text-sm font-bold">
            0000
          </span>

          <InputWrapper title="Origem do documento">
            <Controller
              name="origem"
              control={control}
              render={({ field }) => (
                <Combobox
                  defaultValue={
                    field.value || "Selecionar a origem do documento"
                  } // Passando valor e defaultValue
                  onChange={field.onChange}
                  list={originList}
                />
              )}
            />
          </InputWrapper>

          <InputWrapper title="Tipo de documento">
            <Controller
              name="tipo"
              control={control}
              render={({ field }) => (
                <Combobox
                  defaultValue={field.value || "Selecionar tipo do documento"} // Passando valor e defaultValue
                  onChange={field.onChange}
                  list={typeList}
                />
              )}
            />
          </InputWrapper>

          <div className="flex flex-col w-full items-start justify-start h-full">
            <FileInput onFileChange={handleFileChange} />
            {file && <ViewDocumentDialog file={file} />}
          </div>

          <hr />
          <DialogFooter className="flex items-center justify-end gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => handleDialogChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              className="bg-green-primary-main flex gap-1 items-center"
              type="submit"
              disabled={Object.keys(errors).length > 0 || !file || isLoading}
            >
              {isLoading ? (
                "Carregando..."
              ) : (
                <div className="flex gap-1 items-center">
                  Criar documento <ArrowRight size={15} />
                </div>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

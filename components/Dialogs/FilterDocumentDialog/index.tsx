import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWrapper from "@/components/Inputs/InputWrapper";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { typeList } from "@/constants/combobox";
import { Filter, Info } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { client } from "@/app/api/client";
import { Document } from "@/components/DocsTable/DataTable";
import { DatePicker } from "@/components/ui/date-picker";

const documentSchema = z.object({
  emitente: z.string().optional().nullable(),
  valorTotal: z.number().optional().nullable(),
  valorLiquido: z.number().optional().nullable(),
  tipo: z.string().optional().nullable(),
  createdAt: z.date().optional().optional(),
});

type DocumentFormValues = z.infer<typeof documentSchema>;

type FilterDocumentDialogProps = {
  setDocuments: Dispatch<SetStateAction<Document[]>>;
};

export default function FilterDocumentDialog({
  setDocuments,
}: FilterDocumentDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      emitente: null,
      valorTotal: null,
      valorLiquido: null,
      tipo: null,
      createdAt: undefined,
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSheetChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      reset();
    }
  };

  const onSubmit = async (data: DocumentFormValues) => {
    setIsLoading(true);

    try {
      const query: { [key: string]: string } = {};

      if (data.emitente) query.emitente = data.emitente;
      if (data.createdAt)
        query.createdAt = new Date(data.createdAt).toISOString();
      if (data.tipo) query.tipo = data.tipo;
      if (data.valorLiquido) query.valorLiquido = String(data.valorLiquido);
      if (data.valorTotal) query.valorTotal = String(data.valorTotal);

      const res = await client.getAll({ query });

      reset();
      /* @ts-ignore */
      setDocuments(res.body.documents);
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao buscar documentos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetChange}>
      <SheetTrigger className=" w-full sm:w-auto h-10 text-sm flex items-center justify-center gap-2 px-4 py-[10px] border border-border-neutral rounded-md font-medium">
        <Filter size={20} /> Filtrar
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Filtrar Documentos</SheetTitle>
          <SheetDescription className="text-sm flex">
            Indique os dados necessários para realizar a filtragem
          </SheetDescription>
        </SheetHeader>
        <hr className="my-5" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full h-full items-start"
        >
          <div className="border border-border-neutral p-4 flex items-start gap-3">
            <Info size={35} className="mt-[-5px]" />
            <p className="text-sm text-text-primary">
              Selecione o tipo de documento necessário para, a partir dele,
              selecionar os tipos de índice para a filtragem.
            </p>
          </div>
          {/* não implementado no filtro */}
          <DatePicker />

          <InputWrapper title="Tipo de documento">
            <Controller
              name="tipo"
              control={control}
              render={({ field }) => (
                <Combobox
                  {...field}
                  list={typeList}
                  defaultValue="Selecionar tipo do documento"
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </InputWrapper>

          <InputWrapper title="Emitente">
            <Input {...register("emitente")} />
          </InputWrapper>

          <InputWrapper title="Valor total dos tributos">
            <Input
              type="number"
              {...register("valorTotal", {
                valueAsNumber: true,
                required: false,
              })}
            />
          </InputWrapper>

          <InputWrapper title="Valor líquido">
            <Input
              type="number"
              {...register("valorLiquido", {
                valueAsNumber: true,
                required: false,
              })}
            />
          </InputWrapper>

          <footer className="flex items-center justify-end gap-3 w-full">
            <Button type="reset" variant="outline" onClick={() => reset()}>
              Limpar
            </Button>
            <Button
              type="submit"
              className="bg-green-primary-main"
              disabled={!isDirty || isLoading}
            >
              {isLoading ? "Carregando..." : "Aplicar filtro"}
            </Button>
          </footer>
        </form>
      </SheetContent>
    </Sheet>
  );
}

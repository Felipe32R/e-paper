"use client";

import { Combobox } from "../ui/combobox";

import { DataTableDemo, Document } from "./DataTable";
import CreateDocumentDialog from "../Dialogs/CreateDocumentDialog";
import { originList, typeList } from "@/constants/combobox";
import InputWrapper from "../Inputs/InputWrapper";
import { useEffect, useState } from "react";
import PageHeader from "../PageHeader";
import { client } from "@/app/api/client";
import { Eraser } from "lucide-react";

type DocsTableProps = {
  data: {
    body: {
      documents: Document[];
    };
  };
};

export default function DocsTable({ data }: DocsTableProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [origin, setOrigin] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [hasFilters, setHasFilters] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const query: { [key: string]: string } = {};

        if (origin) query.origem = origin;
        if (type) query.tipo = type;
        if (name) query.nome = name;

        const res = await client.getAll({ query });

        //@ts-ignore
        setDocuments(res.body.documents);
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
      }
    };
    if (origin || type) {
      setHasFilters(true);
    }
    setTimeout(() => {
      if (origin || type || name) {
        fetchDocuments();
      }
    }, 500);
  }, [origin, type, name]);

  function clearFilters() {
    setDocuments([]);
    setHasFilters(false);
    setOrigin("");
    setType("");
  }

  return (
    <div className="flex flex-col gap-10 h-full w-full">
      <PageHeader
        pageTitle="Documentos"
        description="Crie, gerencie e visualize documentos"
        setName={setName}
        name={name}
        setDocuments={setDocuments}
      />
      <hr className=" hidden sm:block" />
      <div className="w-full flex justify-between items-end">
        <div className="w-full  flex-col gap-3 sm:flex-row  lg:w-[672px] flex items-center sm:gap-10">
          <InputWrapper title="Origem do documento" icon={true}>
            <Combobox
              defaultValue="Selecionar origem do documento"
              list={originList}
              onChange={(value) => setOrigin(value)}
            />
          </InputWrapper>
          <InputWrapper title="Tipo do documento" icon={true}>
            <Combobox
              defaultValue="Selecionar tipo do documento"
              list={typeList}
              onChange={(value) => setType(value)}
            />
          </InputWrapper>
        </div>
        {hasFilters && (
          <div
            className="text-text-primary flex items-center gap-1 cursor-pointer w-[200px] left-0"
            onClick={clearFilters}
          >
            {" "}
            <Eraser size={15} /> <span>Limpar filtros</span>
          </div>
        )}
        <CreateDocumentDialog />
      </div>
      <DataTableDemo
        propsData={documents.length > 0 ? documents : data.body.documents}
      />
    </div>
  );
}

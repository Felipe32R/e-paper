"use client";

import { CircleX, Search } from "lucide-react";
import { Input } from "../ui/input";
import FilterDocumentDialog from "../Dialogs/FilterDocumentDialog";
import { Dispatch, SetStateAction } from "react";
import { Document } from "../DocsTable/DataTable";

type PageHeaderProps = {
  pageTitle: string;
  description: string;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  setDocuments: Dispatch<SetStateAction<Document[]>>;
};

export default function PageHeader({
  pageTitle,
  description,
  name,
  setName,
  setDocuments,
}: PageHeaderProps) {
  function clearName() {
    setDocuments([]);
    setName("");
  }

  return (
    <div className="flex items-start w-full md:items-end  justify-between flex-col gap-3 md:flex-row">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">{pageTitle}</h1>
        <span className="text-text-secondary">{description}</span>
      </div>

      <div className="flex flex-col gap-2  sm:flex-row  sm:gap-5 items-center  w-full md:w-auto">
        <div className="flex items-center  w-full md:w-[330px] h-10">
          <Input
            className="p-5 w-full h-10"
            placeholder="Buscar documentos"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="flex items-center justify-center ml-[-40px] ">
            {name && (
              <CircleX
                className=" cursor-pointer text-text-secondary"
                onClick={() => clearName()}
              />
            )}
            {!name && <Search className="text-text-secondary" />}
          </button>
        </div>
        <FilterDocumentDialog setDocuments={setDocuments} />
      </div>
    </div>
  );
}

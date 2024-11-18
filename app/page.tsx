import DocsTable from "@/components/DocsTable";

import { client } from "./api/client";

export default async function Home() {
  const data = await client.getAll();

  return (
    <main className="w-full h-full flex flex-col gap-6 px-12 py-6">
      {/* @ts-ignore */}
      <DocsTable data={data} />
    </main>
  );
}

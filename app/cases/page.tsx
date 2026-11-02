import { redirect } from "next/navigation";
import CasesExplorer from "@/components/production/CasesExplorer";
import { productions, legacyCategory, productionCategories } from "@/lib/productions";
import { clientCases } from "@/lib/clientCases";

export const metadata = { title: "Projekter og eksempler | Bagved", description: "Udforsk projekter, samarbejder og produktionsformater fra Bagved." };
export default async function CasesPage({ searchParams }: { searchParams: Promise<{ cat?: string; case?: string }> }) {
  const params = await searchParams;
  if ([...productions, ...clientCases].some(item => item.id === params.case)) redirect(`/cases/${params.case}`);
  const category = typeof params.cat === "string" ? legacyCategory[params.cat] || params.cat : "all";
  return <CasesExplorer initialCategory={productionCategories.some(item => item.id === category) ? category : "all"} />;
}

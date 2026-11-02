import { redirect } from "next/navigation";
import CasesExplorer from "@/components/production/CasesExplorer";
import { productions, legacyCategory, productionCategories } from "@/lib/productions";
import { clientCases } from "@/lib/clientCases";

export const metadata = { title: "Produktionseksempler | Bagved", description: "Udforsk produktionsformater fra Bagved og fold eksemplerne ud på siden." };
export default async function CasesPage({ searchParams }: { searchParams: Promise<{ cat?: string; case?: string }> }) {
  const params = await searchParams;
  if (clientCases.some(item => item.id === params.case)) redirect(`/cases/${params.case}`);
  const format = productions.find(item => item.id === params.case);
  const category = typeof params.cat === "string" ? legacyCategory[params.cat] || params.cat : "all";
  return <CasesExplorer initialCategory={format?.category || (productionCategories.some(item => item.id === category) ? category : "all")} initialFormat={format?.id || null} />;
}

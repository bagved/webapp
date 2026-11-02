import { notFound } from "next/navigation";
import { productions } from "@/lib/productions";
import { clientCases } from "@/lib/clientCases";
import CaseDetail from "@/components/production/CaseDetail";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return [...productions, ...clientCases].map(item => ({ slug: item.id })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = [...clientCases, ...productions].find(item => item.id === slug);
  return { title: item ? `${item.title} | Bagved` : "Eksempel ikke fundet | Bagved" };
}
export default async function CaseDetailPage({ params }: Props) {
 const { slug } = await params;
 if (![...productions, ...clientCases].some(item => item.id === slug)) notFound();
 return <CaseDetail slug={slug} />;
}

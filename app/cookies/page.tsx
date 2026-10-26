import ConsentBanner from "@/components/analytics/ConsentBanner";

export default function CookiesPage() {
  return (
    <div className="container" style={{ paddingBlock: "48px 64px", maxWidth: "70ch" }}>
      <ConsentBanner inline />
    </div>
  );
}

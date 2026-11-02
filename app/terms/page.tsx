import Link from "next/link";
import styles from "@/components/production/PolicyPage.module.css";

export const metadata = { title: "Terms and Conditions | Bagved", description: "Aftalevilkår for produktion, levering og udlejning hos Bagved." };

export default function TermsPage() {
  return <div className={`container ${styles.page}`}>
    <article className={styles.panel} aria-labelledby="terms-title">
      <h1 id="terms-title">Terms and Conditions</h1>
      <p>Disse vilkår er udgangspunktet for erhvervsaftaler med Bagved, CVR 42597376, Frederiksvej 34, st. tv., 2000 Frederiksberg. Kontakt: <a href="mailto:info@bagved.com">info@bagved.com</a> eller +45 61 74 64 16.</p>

      <h2>Aftalen og opgavens omfang</h2>
      <p>Vilkårene skal være gjort tilgængelige og indgå i aftalen inden bestilling. Besøg på hjemmesiden er ikke i sig selv accept. Tilbud, ordrebekræftelse og særskilte skriftlige aftaler går forud. De skal beskrive leverancer, tidsplan, prisgrundlag, brugsret og eventuelle særlige begrænsninger. Privatkøb kræver særskilte forbrugervilkår; ufravigelige rettigheder tilsidesættes ikke.</p>

      <h2>Pris og ekstraarbejde</h2>
      <p>En fast pris gælder kun det aftalte omfang. Uden fast pris afregnes efter det oplyste prisgrundlag, dokumenteret medgået tid og rimelige, nødvendige udgifter. Satser, forventet omfang og eventuelle tillæg afklares før opstart; hvis en pris ikke kan beregnes på forhånd, oplyses beregningsmåden. Hastearbejde, transport, overtid, ekstra versioner og tredjepartsudgifter medregnes kun på et aftalt eller på forhånd oplyst grundlag.</p>
      <p>Ændringer i opgaven og væsentlige forventede overskridelser af et overslag afklares med kunden, før merarbejdet udføres. Manglende anmodning om et tilbud er ikke accept af en vilkårlig pris. Kunden kan bede om dokumentation og gøre begrundede indsigelser mod afregningen. Erhvervspriser angives eksklusive moms, medmindre andet fremgår.</p>

      <h2>Betaling og leverandører</h2>
      <p>Kundens betalingsfrist er som udgangspunkt 14 kalenderdage fra fakturadato, medmindre andet er aftalt. Aconto, depositum eller milepælsbetaling skal fremgå af aftalen. Ved forsinkelse kan renter og lovlige rykker- og inddrivelsesomkostninger kræves efter rentelovens regler.</p>
      <p>Bagved foretrækker 30 kalenderdages betalingsfrist hos leverandører. Fristen kræver leverandørens accept; allerede aftalte vilkår eller accepterede kortere betalingsfrister respekteres. Disse hjemmesidevilkår ændrer ikke ensidigt en leverandøraftale. Betalinger skal ske senest på den aftalte forfaldsdag.</p>

      <h2>Medvirken, ændringer og aflysning</h2>
      <p>Kunden leverer rettidigt nødvendige oplysninger, godkendelser, adgang og materiale og oplyser særlige krav, rettigheder og fortrolighed. Ændringer kan påvirke pris og tidsplan og skal aftales. Ved aflysning eller udsættelse afregnes udført arbejde og dokumenterede, uundgåelige udgifter, herunder bindende reservationer. Bagved begrænser tabet og fratrækker sparede udgifter; særlige afbestillingsbeløb skal være aftalt på forhånd.</p>

      <h2>Brugsret og tredjepartsmateriale</h2>
      <p>Kunden får den aftalte brugsret til de færdige leverancer. Råoptagelser, projektfiler, musiklicenser og andre tredjepartsrettigheder følger kun med, hvis det er aftalt og rettighederne tillader det. Kunden og leverandører skal sikre, at materiale, de bidrager med, må bruges til det aftalte formål. Ansvar for medvirkende, lokationer, samtykker og rettighedsafklaring fordeles i ordren.</p>

      <h2>Cases, showreel og kundelogoer</h2>
      <p>Bagved ønsker som del af erhvervsaftalen en ikke-eksklusiv adgang til at vise relevante uddrag af godkendte, offentliggjorte leverancer i egne cases, showreels og portefølje samt omtale opgaven og vise kundens navn og logo i en retvisende kundereference. Referenceadgangen skal fremgå af den aftale, kunden accepterer, og omfatter kun rettigheder, kunden faktisk kan give. Begrænsninger og fravalg kan aftales inden produktionen. Materiale offentliggøres ikke før kundens egen offentliggørelse eller et aftalt tidspunkt.</p>
      <p>Kunder, bureauer og leverandører skal inden opgaven oplyse kendte begrænsninger, herunder når Bagved arbejder som underleverandør, eller slutkundens logo ikke må bruges. Omtalen skal afspejle Bagveds faktiske rolle og relevante samarbejdspartnere. Oplysningspligten fritager ikke Bagved for selv at sikre en gyldig rettighed og et lovligt behandlingsgrundlag.</p>
      <p>Fortrolige virksomhedsoplysninger og følsomme personoplysninger bruges ikke til referenceformål. Andre identificerbare personer og personoplysninger kræver også et selvstændigt, dokumenteret behandlingsgrundlag; nødvendige tilladelser eller samtykker indhentes. Fravær af følsomme oplysninger eller manglende indsigelse er ikke i sig selv en persondatatilladelse. Berettigede indsigelser og lovlige tilbagetrækninger håndteres efter aftalen og gældende ret.</p>

      <h2>Opbevaring og sletning</h2>
      <p>Råoptagelser, arbejdsfiler og færdige leverancer slettes som udgangspunkt senest seks måneder efter kundens godkendelse af slutleveringen. En kortere frist, dokumenterede nødvendige formål eller en særskilt, lovlig arkivaftale kan ændre fristen; det beskrives i ordren eller databehandleraftalen. Sletning sker tidligere, hvis formålet er ophørt eller en bindende instruks kræver det. Uden en særskilt arkivaftale er der ingen garanti for senere genlevering, og kunden skal sikre sin egen kopi.</p>
      <p>Udvalgte case- og showreeluddrag kan opbevares til den særskilt aftalte referencebrug, så længe formålet og rettighederne består. Undtagelsen gælder ikke automatisk hele kundens råmateriale. Regnskabsbilag og nødvendig dokumentation for retskrav håndteres særskilt. Bagved kan vælge eller skifte egnede lagrings- og delingstjenester, men skal fastholde passende sikkerhed, lovlige overførsler og nødvendige databehandleraftaler. Ved behandling på kundens vegne følges også aftalens regler om underdatabehandlere, underretning og indsigelser. Se også <Link href="/privacy">Privacy Policy</Link>.</p>

      <h2>Udlejning af udstyr</h2>
      <p>Lejeperiode, pris, udstyrsliste, udlevering, returnering og eventuel sikkerhed eller forsikring skal aftales. Udstyr bruges forsvarligt til det aftalte formål og må ikke videreudlejes uden accept. Fejl og skader meddeles hurtigst muligt. Ved returnering vurderes stand og eventuelle mangler; almindeligt slid er ikke en skade.</p>
      <p>Forsinket returnering og skader afregnes på et aftalt og dokumenteret grundlag. Erstatningskrav følger gældende ret, faktisk tab og eventuel forsikringsdækning; der kræves ikke automatisk nypris uden hensyn til udstyrets alder og værdi. Aftalen kan ikke tilsidesætte ufravigelige regler.</p>

      <h2>Fejl, ansvar og uenighed</h2>
      <p>Fejl eller mangler meddeles snarest muligt med en konkret beskrivelse, så Bagved kan undersøge og, hvor relevant, afhjælpe dem. Kundens lovlige indsigelser og misligholdelsesbeføjelser bortfalder ikke ved en generel ansvarsfraskrivelse. Parterne søger først en løsning gennem dialog. Ubestridte beløb betales som aftalt. Dansk ret gælder, og tvister afgøres ved de kompetente domstole, med respekt for ufravigelige regler.</p>
    </article>
  </div>;
}

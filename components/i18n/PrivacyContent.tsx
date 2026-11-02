"use client";
import { useI18n } from "@/components/i18n/LanguageProvider";
import Link from "@/components/i18n/LocalizedLink";
import styles from "@/components/production/PolicyPage.module.css";


export default function PrivacyContent() {
  const { t } = useI18n();
  return <div className={`container ${styles.page}`}>
    <article className={styles.panel} aria-labelledby="privacy-title">
      <h1 id="privacy-title">{t("Privacy Policy")}</h1>
      <p>{t("Bagved, CVR 42597376, Frederiksvej 34, st. tv., 2000 Frederiksberg, er dataansvarlig for behandlingen beskrevet her. Spørgsmål og anmodninger kan sendes til ")}<a href="mailto:info@bagved.com">{t("info@bagved.com")}</a> {t(" eller rettes på +45 61 74 64 16.")}</p>

      <h2>{t("Henvendelser, kunder og leverandører")}</h2>
      <p>{t("Vi behandler navn, virksomhedsnavn, kontaktoplysninger og det, du skriver til os, for at besvare henvendelser, udarbejde tilbud, planlægge opgaver og administrere samarbejdet. Grundlaget er nødvendige skridt til en aftale med dig eller opfyldelse af aftalen, jf. GDPR artikel 6, stk. 1, litra b. For kontaktpersoner hos virksomheder er grundlaget normalt vores legitime interesse i at håndtere erhvervssamarbejdet, litra f. Lovpligtig bogføring sker efter litra c. Nødvendig dokumentation, it-sikkerhed og håndtering af konkrete retskrav kan ske efter litra f.")}</p>
      <p>{t("Oplysninger kommer normalt fra dig, din arbejdsgiver eller vores samarbejdspartner. Kontaktoplysninger og relevante projektoplysninger er nødvendige for at behandle en forespørgsel; uden dem kan vi muligvis ikke svare eller levere. Undlad at sende følsomme oplysninger eller CPR-numre gennem formularen.")}</p>

      <h2>{t("Optagelser og referencebrug")}</h2>
      <p>{t("Produktioner kan indeholde billede, stemme og oplysninger om medvirkende. Rolle, formål og lovligt grundlag skal afklares for den konkrete opgave. Når vi alene behandler oplysninger efter kundens instruks, er kunden dataansvarlig, og behandlingen reguleres af en databehandleraftale, når reglerne kræver det.")}</p>
      <p>{t("Egen brug i cases og showreels kræver både de nødvendige brugsrettigheder og et selvstændigt behandlingsgrundlag. Det kan være et gyldigt samtykke eller, hvor det konkret er lovligt og afvejet, en legitim interesse i at vise vores arbejde. En kundeaftale, en offentlig video eller fravær af følsomme oplysninger er ikke automatisk tilladelse til at offentliggøre identificerbare personer. Fortrolige oplysninger og følsomme personoplysninger bruges ikke til referenceformål. Vi respekterer relevante indsigelser og tilbagetrækning af samtykke.")}</p>

      <h2>{t("Hjemmeside, cookies og lokal lagring")}</h2>
      <p>{t("Hjemmesidens drift kan medføre behandling af IP-adresse, tekniske browser- og enhedsoplysninger samt drifts- og sikkerhedslogs. Nødvendig drift og sikkerhed sker ud fra vores legitime interesse i en fungerende, sikker hjemmeside. Statistik via Google Analytics og annoncemåling via Google Ads og ChatGPT Ads/OpenAI aktiveres kun efter dit relevante valg og behandles på grundlag af samtykke, jf. artikel 6, stk. 1, litra a.")}</p>
      <p>{t("Målingen kan omfatte besøgte sider, sprog, godkendte kampagneparametre og handlinger som kontaktklik og en gennemført formularafsendelse. Vores målekode er indrettet til ikke at medtage formularens navn, kontaktoplysninger eller beskedtekst. Behovsvælgerens valgmuligheder kan følge med i et link til kontaktformularen; det sender ikke i sig selv en forespørgsel.")}</p>
      <p>{t("En kontaktkladde gemmes lokalt i din browser, indtil den sendes med succes, eller browserdata slettes. Dit cookievalg gemmes i op til 180 dage. Google Analytics-cookies er i hjemmesidens kode begrænset til ét år; event- og rapportdata hos udbydere har deres egne kontoindstillinger og formålsbestemte opbevaringsperioder. Kontakt os for nærmere oplysninger om den aktuelle opsætning.")}</p>
      <p>{t("Google Fonts og video fra TwentyThree kan også medføre eksterne forespørgsler med blandt andet IP-adresse. De indlæses i den eksisterende opsætning uafhængigt af statistik- og markedsføringsvalgene. Nye showreelafspillere indlæses først, når du vælger afspilning. Du kan ændre samtykke under ")}<Link href="/cookies">{t("Cookie Policy")}</Link>{t("; tilbagetrækning ændrer ikke lovligheden af tidligere behandling.")}</p>

      <p>{t("Dit valgte sprog gemmes lokalt i browseren, når du skifter sprog. Sprogvalget kan også følge med i sidens link og ændrer ikke dine cookievalg.")}</p>

      <h2>{t("Modtagere, delingstjenester og overførsler")}</h2>
      <p>{t("Relevante oplysninger kan behandles af leverandører af hosting, mail, regnskab, lagring, filoverførsel og produktion, i det omfang opgaven kræver det. Hjemmesidens nuværende integrationer omfatter Vercel til hosting, Google/Gmail til formularpost samt ovennævnte font-, video- og måleudbydere. Udbydere kan afhængigt af tjenesten være databehandlere eller selvstændige dataansvarlige. Oplysninger kan også videregives, når en retlig forpligtelse kræver det.")}</p>
      <p>{t("Vi kan vælge og skifte egnede delings- og lagringstjenester uden at ændre opgavens formål eller slettefrister. Valg af tjeneste skal bygge på passende sikkerhed, adgangsbegrænsning og de aftaler, reglerne kræver. Behandler vi oplysninger på kundens vegne, skal ændringer også følge databehandleraftalens krav til godkendelse, varsling og indsigelse ved underdatabehandlere. Du kan få oplyst de relevante modtagere for din opgave.")}</p>
      <p>{t("Behandling uden for EU/EØS må kun ske med et gyldigt overførselsgrundlag, eksempelvis en relevant tilstrækkelighedsafgørelse eller EU-standardkontrakter med nødvendige supplerende foranstaltninger. Et land, en leverandørs navn eller almindelige standardvilkår er ikke alene en garanti. Du kan kontakte os om den anvendte ordning og relevante garantier.")}</p>

      <h2>{t("Opbevaring og sletning")}</h2>
      <p>{t("Råoptagelser, arbejdsfiler og færdige leverancer slettes som udgangspunkt senest seks måneder efter godkendt slutlevering. En kortere instruks eller ophørt formål kan kræve tidligere sletning. Længere opbevaring kræver et konkret, lovligt formål, eksempelvis en aftalt arkivydelse eller nødvendig dokumentation for et retskrav. Aftalt referencebrug kan begrunde opbevaring af udvalgte case- og showreeluddrag, men ikke automatisk hele kundens råmateriale.")}</p>
      <p>{t("Henvendelser uden en aftale slettes, når sagen og nødvendig opfølgning er afsluttet. Aftale- og projektdokumentation opbevares, mens samarbejdet og et konkret dokumentationsbehov består. Regnskabsmateriale omfattet af bogføringspligten opbevares som udgangspunkt fem år fra udgangen af det relevante regnskabsår. Disse krav er ikke en generel adgang til at gemme alle produktionsfiler i fem år.")}</p>
      <p>{t("Sletning omfatter relevante arbejdskopier. Sikkerhedskopier udfases gennem de gældende rotationsforløb, holdes adgangsbegrænsede og bruges ikke som almindeligt arkiv. Ved gendannelse skal allerede gældende slettekrav håndteres igen. Konkrete frister og eventuelle undtagelser kan oplyses for den enkelte opgave.")}</p>

      <h2>{t("Sikkerhed og dine rettigheder")}</h2>
      <p>{t("Oplysninger skal beskyttes med passende adgangskontrol og tekniske og organisatoriske foranstaltninger afpasset efter risikoen. Adgang begrænses til personer og leverandører med et sagligt behov. Der træffes ikke gennem hjemmesidens behovsvælger automatiske afgørelser med retsvirkning eller tilsvarende væsentlig betydning for dig.")}</p>
      <p>{t("Du kan efter reglernes betingelser få indsigt, rettelse, sletning, begrænsning og dataportabilitet. Du kan gøre indsigelse mod behandling på baggrund af legitime interesser og mod direkte markedsføring samt trække samtykke tilbage. Vi kan have behov for at kontrollere din identitet uden at indsamle flere oplysninger end nødvendigt.")}</p>
      <p>{t("Vi besvarer rettighedsanmodninger uden unødig forsinkelse og som udgangspunkt senest inden én måned. Hvis reglerne tillader en forlængelse, får du besked og begrundelse inden for den første måned. Du kan klage til ")}<a href="https://www.datatilsynet.dk/" target="_blank" rel="noreferrer">{t("Datatilsynet")}</a>{t(". Kontakt os gerne først, hvis du ønsker en forklaring eller en løsning.")}</p>
    </article>
  </div>;
}

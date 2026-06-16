# Padel Academy van Duren — website (fase 1: geraamte)

Statische, multi-page website (HTML/CSS/JS, geen frameworks) die de huidige
WordPress-site op indoorpadelcentrum.nl vervangt. Deze fase levert de volledige
structuur, navigatie, kleuren en vervangbare beeldblokken. Definitieve teksten,
foto's en video's volgen in fase 2.

## Bestanden

| Bestand | Inhoud |
|---|---|
| `index.html` | Homepage (hero, aanbod in geldhiërarchie, clubsectie, social proof, events) |
| `baanhuur.html` | Baanhuur: losse boeking, VIP-daluren lidmaatschap, contractbanen |
| `lessen.html` | Proefles, privéles, groepsles + "wat neem je mee" |
| `clinics.html` | Clinics voor bedrijven, vriendengroepen en kinderfeestjes |
| `padelregels.html` | Uitleg van de spelregels (eigen SEO-pagina) |
| `faq.html` | Veelgestelde vragen |
| `contact.html` | Over ons + contact/NAP-gegevens |
| `styles.css` | Gedeelde stijl (kleuren, typografie, componenten) |
| `site.js` | Mobiele navigatie + herbruikbaar intakeformulier (modal) |
| `.htaccess` / `_redirects` | 301-redirects van oude WordPress-URL's |

## Kleur & typografie
- Donkerblauw `#0F2044` (anker), oranje `#E8953A` (accent). **Geen groen, nergens.**
- Lettertype: Plus Jakarta Sans (via Google Fonts).
- Oranje wordt nooit als enige drager van betekenis gebruikt; altijd met tekstlabel
  of vorm, met oog op WCAG AA-contrast.

## Nog in te vullen placeholders (door de klant)

1. **WhatsApp-nummer** — alle WhatsApp-knoppen (drijvende knop op elke pagina,
   proefles/privéles op `lessen.html`, contactpagina). Zoek op `wa.me` /
   `PLACEHOLDER: WhatsApp-nummer` en vul `https://wa.me/<nummer>` in.
2. **Playtomic-deeplinks** — de "Boek een baan"-knoppen wijzen nu naar de
   bestaande Playtomic-clubpagina. Vervang door specifieke deeplinks (baanhuur,
   VIP-daluren) waar gewenst. Zoek op `playtomic.io`.
3. **Formulier-endpoint** — het intakeformulier (`site.js`, constante
   `FORM_ENDPOINT`) heeft nog geen bestemming. Vul een endpoint in (mail/CRM)
   of vervang de flow later door de chatbot.
4. **Telefoonnummer (NAP)** — staat als placeholder in footer en op de
   contactpagina. Moet consistent zijn met Google Business.
5. **Beelden & video's** — alle blokken met de markering "Placeholder" /
   "wordt aangeleverd" (foto's, sfeerbeelden, techniekvideo's, kaart-embed,
   sponsorlogo's).
6. **Definitieve copy** — teksten met de markering `Placeholder` (o.a.
   reviews, openingstijden, parkeren, dalurenvoorwaarden, lestijden/startdata,
   clinictarieven).

## Intakeformulier
Eén herbruikbare component (`site.js`). Knoppen met `data-intake="<context>"`
openen het formulier; de velden passen zich aan per context:
- `contractbaan` — aantal spelers, tijdslot, frequentie + contactgegevens
- `groepsles` — niveau, voorkeur + contactgegevens
- `clinic-bedrijven` / `clinic-vrienden` / `clinic-kinderfeestje` — wanneer,
  aantal personen, type + contactgegevens

De afhandeling is bewust eenvoudig gehouden zodat ze later door een chatbot
vervangen kan worden.

## Redirects inzetten
- **Apache**: plaats `.htaccess` in de webroot (vereist `mod_rewrite`).
- **Netlify / Cloudflare Pages**: plaats `_redirects` in de publicatiemap.

Beide bestanden bevatten de bekende oud→nieuw-mapping en een gemarkeerde ruimte
om de lijst aan te vullen zodra meer oude URL's bekend zijn.

## Fase 2 (later)
- Engelse variant onder `/en/` (structuur is hierop voorbereid).
- Echte fotoset en video's in de beeldblokken.
- Chatbot ter vervanging van het intakeformulier.

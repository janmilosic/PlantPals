# 07 Pregled projekta
Jan Milošič
 
# Prevzeti projekt: PlantPals

PlantPals je spletna aplikacija za začasno nego sobnih rastlin. Povezuje lastnike rastlin, ki odhajajo na pot, z varuhi v istem kraju in obdobju.

Pregled projekta temelji na dokumentaciji v docs/, pregledu kode in lokalnem zagonu aplikacije (Docker Compose za MongoDB in API ter Vite za frontend).

## Arhitektura in uporabljene tehnologije

Projekt uporablja naslednje tehnologije:

- **Frontend:** React + Vite (SPA), React Router in Axios.
- **Backend:** NestJS (TypeScript), organiziran v module.
- **Podatkovna baza:** MongoDB z Mongoose.
- **Avtentikacija:** JWT (Passport.js), gesla so zaščitena z bcrypt, dostop glede na vloge.
- **Validacija:** class-validator, z DTO-ji in sporočili o napakah v slovenščini.
- **Lokalni razvoj:** Docker Compose za MongoDB in API, nastavitve pa so shranjene v datoteki .env.

## Implementirane funkcionalnosti (MVP)

V projektu so implementirane vse funkcionalnosti, ki so bile v nalogi 02 označene kot MVP.

- **F1 Profil rastline z navodili za oskrbo:** implementirano. Uporabnik lahko rastline dodaja, ureja in pregleduje.
- **F2 Registracija:** implementirano.
- **F3 Prijava:** implementirano.
- **F4 Odpiranje zahteve za varstvo:** implementirano.
- **F5 Ujemanje zahtev z varuhi:** implementirano.
- **F6 Javljanje in dodelitev varuha:** implementirano.
- **F7 Statusni potek varstva:** implementirano, čeprav ni bilo del MVP.
- **F9 Potrditev vrnitve:** implementirano.
- **F10 Dostop glede na vlogo uporabnika:** implementirano.
- **F8 Dnevnik oskrbe:** ni implementirano.
- **F13 Preklic zahteve:** ni implementirano.
- **F14 E-poštna obvestila:** ni implementirano.

Vse funkcionalnosti, ki spadajo v MVP so zaključene. Manjkajo le nekatere dodatne funkcionalnosti, ki niso bile zahtevane za MVP.

## Pregled uporabniških zgodb

### US-01: Vodenje profila rastline

Pregledal sem naslednje kriterije:

- Obrazec omogoča vnos imena, vrste rastline, pogostosti zalivanja, svetlobnih potreb in opomb. Pogostost zalivanja mora biti celo število med 1 in 365 dnevi.
- Rastline ni mogoče shraniti brez imena ali pogostosti zalivanja.
- Po shranjevanju se rastlina prikaže na seznamu skupaj z imenom in vrsto.
- Obstoječo rastlino je mogoče urejati, spremembe pa so takoj vidne.
- Lastnik lahko vidi in ureja samo svoje rastline. Backend pri poizvedbah vedno preveri lastništvo, zato dostop do tuje rastline vrne napako 404.

**Uporabniška zgodba je izpolnjena.**

### US-05: Odpiranje zahteve za varstvo

Pregled kriterijev:

- Obrazec zahteva datum začetka in konca, mesto oziroma regijo ter vsaj eno rastlino.
- Sistem zavrne zahtevo, če je datum konca pred datumom začetka ali če ni izbrana nobena rastlina.
- Nova zahteva samodejno dobi status zahtevano.
- Lastnik lahko svojo zahtevo vidi na seznamu skupaj z obdobjem, lokacijo in statusom.
- V eni zahtevi je mogoče izbrati več rastlin. Sistem hkrati preveri, ali so vse izbrane rastline v lasti uporabnika.

**Uporabniška zgodba je izpolnjena.**

### US-06: Ujemanje zahtev z varuhom

Pregled kriterijev:

- Varuhu se prikažejo samo zahteve s statusom zahtevano.
- Prikažejo se samo zahteve iz istega mesta oziroma regije. Pri primerjavi se ne upoštevajo velike in male črke.
- Obdobje zahteve se mora v celoti ujemati z vsaj enim obdobjem razpoložljivosti varuha.
- Neustrezne zahteve se ne prikažejo. Varuh ne vidi niti svojih zahtev.
- Pri vsaki zahtevi so prikazani obdobje, lokacija in število rastlin.

**Uporabniška zgodba je izpolnjena.**

### US-07: Javljanje varuha na zahtevo

Pregled kriterijev:

- Varuh se lahko prijavi na zahtevo in se tako doda na seznam kandidatov.
- Večkratna prijava na isto zahtevo ni mogoča. Gumb se po prvi prijavi onemogoči, API pa v primeru ponovitve vrne napako 409. Frontend pri tem uporablja podatek hasApplied.
- Varuh se ne more prijaviti na zahtevo, ki nima več statusa zahtevano.
- Varuh lahko vidi, ali je že med kandidati.
- Prijava varuha ne spremeni statusa zahteve.

**Uporabniška zgodba je izpolnjena.**

### US-08: Pregled kandidatov in dodelitev varuha

Pregled kriterijev:

- Lastnik lahko vidi seznam kandidatov, skupaj z njihovim prikaznim imenom in mestom.
- Ko lastnik izbere varuha, se ta dodeli zahtevi, njen status pa se spremeni v sprejeto.
- Dodelitev je izvedena varno in atomarno. Če bi poskusila zahtevo hkrati prevzeti dva uporabnika, uspe samo prvi poskus. To zagotavlja uporaba findOneAndUpdate s pogojem status: zahtevano, drugi poskus pa vrne napako 409.
- Ko je varuh dodeljen, zahteva drugim kandidatom ni več prikazana kot odprta.
- Lastnik ne more dodeliti varuha, ki se predhodno ni prijavil na zahtevo. V takem primeru sistem vrne napako 400 z ustreznim sporočilom.

**Uporabniška zgodba je izpolnjena.**

## Ugotovitve

- Vse funkcionalnosti, ki so bile v nalogi 02 označene kot MVP, so implementirane. Prav tako vseh pet pregledanih uporabniških zgodb izpolnjuje zahtevane kriterije.
- Koda je pregledno organizirana. Poslovna pravila so večinoma urejena na backendu, kjer se izvajajo validacija podatkov, preverjanje lastništva in varne posodobitve. Pravila za spreminjanje statusov so zbrana na enem mestu.
- Projekt trenutno nima linterja, avtomatiziranih testov in CI/CD cevovoda.

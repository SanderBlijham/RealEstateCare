Real Estate Care
Deze app is gemaakt als eindopdracht voor de module ‘Front-end Frameworks’ van LOI. Nadat ik de modules ‘HTML5 en CSS3’ en ‘Programmeren in Javascript’ had afgerond, ben ik begonnen met deze module. Het was erg leerzaam om de kracht van een framework te kunnen ervaren. In deze README file zal ik meer vertellen over het proces en een aantal keuzes die ik gemaakt heb. Tot slot zal ik ook een verantwoording geven over het toepassen van security, usability (a.d.h.v. de 10 heuristieken van Jacob Nielsen), accessibility en style guides/best practices.

Het Proces
Het proces zou ik kunnen verdelen in drie verschillende fases.

Ik ben begonnen met het doorwerken van het boek van Peter Kassenaar en heb alle opdrachten van de ‘Vacation Picker’ doorlopen. Simultaan heb ik de opdrachten uit de module stap voor stap gemaakt. Dit leidde al vrij snel tot een raamwerk van het prototype. De JSON file bouwen, het binnen halen via de API en vervolgens mappen naar het datamodel waren een behoorlijke uitdaging. Volgens mij is dit uiteindelijk wel goed gelukt.
Vervolgens heb ik, met name op Youtube, gekeken hoe UI frameworks gebruikt konden worden in Vue3. Uiteindelijk heb ik gekozen om met Vuetify3 te werken. Ik vond dit een fijn framework, omdat het vrij eenvoudig te leren is en het design er professioneel uit ziet. Het is jammer dat de datepicker nog niet goed werkt met Vuetify3. Ik ben vrij lang bezig geweest om de datefields in de formulieren te gebruiken in combinatie met de datepicker, maar uiteindelijk is het gewoon de datepicker (type=date) geworden vanuit v-text-field. Overigens was het nog best lastig om de JSON dateformat te converteren naar een leesbare datum voor de gebruiker.
Tot slot ben ik bij het afronden van de applicatie bezig geweest met het toevoegen van functionaliteiten. Een uitdaging was om bestanden (images en PDF’s) te kunnen uploaden en vervolgens ook op de goede plaats in het datamodel (vuex state) te krijgen. Ook was het opzetten van 2FA een uitdaging. Daarover hieronder meer.
Toelichting op enkele keuzes
Foto’s en bestanden
In eerste instantie had ik bij de uitgevoerde inspecties al een aantal foto’s en bestanden toegevoegd. Uiteindelijk heb ik ervoor gekozen om deze weer weg te halen, omdat ik de functionaliteit wilde bouwen waarbij de gebruiker zelf bestanden kan uploaden. Dit kon ik wat lastig combineren met het sourcen van bestanden uit de JSON file in default state.

CreatePersistedState

Ik heb ervoor gekozen om de data binnen te halen in de App.vue component. In eerste instantie deed ik dit in de componenten zelf, maar wanneer je dan navigeert tussen de pagina’s raak je je selecties kwijt. Dit omdat de API dan steeds opnieuw wordt aangeroepen. Ook heb ik gebruik gemaakt van CreatePersistedState in de store, om te voorkomen dat bij het refreshen van een pagina een foutmelding ontstond. 

Two-factor-authentication

Ik ben vrij lang bezig geweest om te kijken of ik een volledige 2FA login kon simuleren. Dit is helaas net niet helemaal gelukt, omdat ik het niet voor elkaar kreeg om de token te verifiëren. De authenticator.verify() functie van de otplib library maakt gebruik van de createHmac functie. Deze functie is bij default niet beschikbaar op de client-side. Ik heb nog geprobeerd een oplossing te vinden, maar dat is niet gelukt. Ik heb ervoor gekozen om bij het registreren wel de hele authenticatie procedure te doorlopen. Bij het inloggen is de 2FA token te allen tijde 123456. 

Profielpagina

Voor de profielpagina heb ik gebruik gemaakt van een template van CreativeTim. Ik heb hiervoor gekozen, omdat ik nieuwsgierig was naar het gebruik van templates. CreativeTim heeft een hoop (gratis) templates met een fraai design, dus ik was benieuwd hoe zij met gebruik van Vuetify tot dit design komen. Het was zeer leerzaam om dit component over te zetten naar mijn project, omdat ik eerst op zoek moest naar alle afhankelijkheden van dit component binnen het project van CreativeTim.

Verantwoordingen

Security 
De beveiliging van applicaties is belangrijk, aangezien er duizenden aanvallen kunnen plaatsvinden vanaf de frontend-kant. In deze app zijn met een aantal best-practices al rekening gehouden: 
NPM packages zijn up-to-date
Generieke foutmeldingen worden getoond bij het inloggen, om te voorkomen dat een aanvaller gebruikersnamen kan achterhalen. Ook wordt er gebruik gemaakt van 2FA bij het inloggen.
In de code is het niet mogelijk om de gebruiker inner.HTML secties te laten aanpassen. Dit om XSS aanvallen te voorkomen.

Enkele mooie toevoegingen voor de productiecode zouden nog zijn:
De bestandsgrootte bij het uploaden te limiteren. Dit om ‘unrestricted file upload’ te voorkomen.  
Door gebruik te maken van helmet library in main.js kan de mogelijkheid om de app in een iFrame te laden uitgeschakeld worden en XSS protection ingeschakeld worden.


Usability 
De 10 heuristieken van Jacob Nielsen zijn ontworpen om te helpen bij het evalueren van de gebruiksvriendelijkheid van interfaces. Hieronder volgt een lijst van de heuristieken en de verantwoording op deze heuristieken:
Zichtbaarheid van systeemstatus: Het systeem moet de gebruiker informeren over wat er gebeurt, bijvoorbeeld door middel van feedback over de voortgang van taken.
Dit is zoveel mogelijk het geval. Bijvoorbeeld bij het inloggen is duidelijk dat het systeem aan het inloggen is. Ook wordt er duidelijke feedback gegeven als dit niet goed gaat.
Match tussen systeem en echte wereld: Het ontwerp moet gebaseerd zijn op de terminologie, concepten en workflows van de gebruikers.
De app volgt de terminologie, concepten en workflows zoals beschreven in de case.
Gebruikerscontrole en -vrijheid: Gebruikers moeten in staat zijn om fouten te herstellen en de interface te verlaten als ze dat willen.
De gebruiker heeft altijd de mogelijkheid om ingevulde gegevens aan te passen. 
Wanneer een vinkje van de ingeplande inspecties niet is aangevinkt en het formulier toch wordt opgeslagen, kan dit via de ‘wijzigen’ knop worden aangepast.
Via de logo in de AppBar kan de gebruiker altijd terugkeren naar het hoofdscherm
Consistentie en standaarden: Het ontwerp moet consistent zijn en gebruikmaken van standaarden voor terminologie en interactiepatronen.
Er is zoveel mogelijk gebruik gemaakt van het herbruiken van componenten om consistentie door de app heen te garanderen.
Foutpreventie: Het systeem moet ontworpen zijn om fouten te voorkomen, bijvoorbeeld door middel van bevestigingsvensters.
Op dit punt zou de app nog iets verbeterd kunnen worden:
De tekstvelden zijn niet required, waardoor onvolledige formulieren kunnen worden opgeslagen. 
Ook zou het mooi zijn als het vinkje van ingeplande inspecties automatisch wordt aangevinkt, zodra het formulier is ingevuld. 
Erkenning in plaats van herinnering: Het systeem moet informatie presenteren op een manier die de gebruiker helpt zich te herinneren wat hij moet doen, in plaats van dat de gebruiker informatie moet onthouden.
Op dit punt zou de app ook nog iets verbeterd kunnen worden door middel van notificaties. Bijvoorbeeld door middel van een melding dat er nog twee ingeplande inspecties te wachten staan. 
Flexibiliteit en efficiëntie van gebruik: Het systeem moet verschillende manieren bieden om taken uit te voeren, zodat gebruikers de methode kunnen kiezen die het beste bij hen past.
De applicatie biedt niet heel veel ruimte voor flexibiliteit. Wel is er de kennisbank, waardoor bestanden makkelijk kunnen worden teruggevonden. Ook al zou dit ook via de formulieren zelf kunnen.
Esthetisch en minimalistisch ontwerp: Het ontwerp moet esthetisch zijn en onnodige elementen weglaten, om de bruikbaarheid te verbeteren.
Er zitten geen onnodige functionaliteiten in de app. 
Help gebruikers fouten te herkennen, te diagnosticeren en te herstellen: Het systeem moet gebruikers helpen bij het identificeren van fouten en het vinden van oplossingen.
Met name bij het inloggen wilde ik de gebruiker zo goed mogelijk meenemen in het proces. Bij een aantal stappen krijgt de gebruiker feedback als het niet goed gaat. 
Help en documentatie: Het systeem moet duidelijke en gemakkelijk toegankelijke help- en documentatiefuncties hebben om gebruikers te ondersteunen bij het gebruik van het systeem.
Dit zou uitgewerkt moeten worden voordat de app ‘live’ zou gaan. 
Accessibility 
WCAG 2.1 staat voor de Web Content Accessibility Guidelines 2.1, wat richtlijnen zijn voor het maken van toegankelijke websites en digitale content. Deze richtlijnen zijn bedoeld om ervoor te zorgen dat websites en digitale content voor iedereen toegankelijk zijn, inclusief mensen met een beperking.

De WCAG 2.1 richtlijnen bevatten 13 succescriteria die zijn onderverdeeld in vier principes: waarnembaarheid, bedienbaarheid, begrijpelijkheid en robuustheid. Deze principes zijn gericht op het verbeteren van de toegankelijkheid van digitale content voor mensen met verschillende soorten beperkingen, waaronder visuele, auditieve, cognitieve en motorische beperkingen.

Enkele voorbeelden van de succescriteria zijn het bieden van alternatieve tekst voor afbeeldingen, het zorgen voor voldoende contrast tussen tekst en achtergrondkleur, het bieden 
van ondertiteling voor video's en het gebruik van een semantisch correcte HTML-code.

De WCAG 2.1 richtlijnen zijn ingedeeld in drie verschillende niveaus: A, AA en AAA, waarbij niveau A de basisvereisten vertegenwoordigt en AAA de hoogste mate van toegankelijkheid
Met behulp van de wave evaluation tool heb ik gekeken in hoeverre de applicatie voldoet aan deze richtlijnen. De grootste aandachtspunten die hieruit kwamen zijn:
Het logo in de AppBar mist een alternatieve tekst
De buttons in de AppBar hebben geen functionaliteit (in dit prototype)
Het contrast van de buttons in de bottom navigation is te laag (groen op wit)
De tekst op de profielpagina onder de foto is te klein
Het formulier op de profielpagina heeft ‘multiple form labels’ 


Style guides
Bij het maken van de applicatie heb ik zoveel mogelijk gebruik gemaakt van de style guides van Vue3. Dit houdt in dat ik in de code gebruik heb gemaakt van onderstaande stijlen.

De v-for statements worden altijd gecombineerd met een :key.
Events maken altijd gebruik van kebab-case
Data retourneert (return) altijd een functie. 
V-if and v-for worden nooit gecombineerd in een element. 
Alle componenten maken gebruik van PascalCase
De directives zijn altijd op de korte manier geschreven (:, @, #) 
Methods roepen nooit een watch of created hook aan. 
Templates bevatten zo min mogelijk Javascript. Complexere Javascript gaat via computed.  

Onderstaande punten hadden beter gekund in de code van de applicatie:
De props valideren met definities. Op dit moment bevat de code alleen de naam van de props. 
Binnen templates wordt altijd gebruik gemaakt van kebab-case. Ik gebruik alleen ‘inspection’ als props. Dit was eigenlijk mooier geweest in camelCase. 
Basiscomponenten missen een prefix
De AppBar en BottomBar componenten hadden de prefix ‘The’ kunnen krijgen. 
 

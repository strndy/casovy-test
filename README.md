# Casovy test (CZ) / time test (EN)

## Description
This is a script which will parse export from stock exchange and tell you which stocks pass time test of 3 years and can be sold without any tax by czech law.

## How it works
1. Read CSV file from stock exchange
2. Create a queue of events
3. Calculates how many stocks are left unsold passing time test

## Zákon
časového testu, kdy jste prodané cenné papíry drželi minimálně po dobu tří let. Takové příjmy do daňového přiznání uvádět nemusíte. Jen pro úplnou jistotu ještě dodáme, že z akcií, které jste koupili a držíte, daň platit nemusíte, byť jejich kurz může stoupat.

https://www.zakonyprolidi.cz/cs/1992-586/zneni-20240801#f1457224

§ 4 zákona č. 586/1992 Sb., o daních z příjmů

u) příjem z úplatného převodu cenného papíru, přesáhne-li doba mezi nabytím a úplatným převodem tohoto cenného papíru při jeho úplatném převodu dobu 3 let, a dále příjem z podílu připadající na podílový list při zrušení podílového fondu, přesáhne-li doba mezi nabytím podílového listu a dnem vyplacení podílu dobu 3 let; doba 3 let se zkracuje o dobu, po kterou byl tento cenný papír nebo podíl připadající na podílový list při zrušení podílového fondu ve vlastnictví zůstavitele, v případě, že jde o úplatný převod cenného papíru nebo podílu připadajícího na podílový list při zrušení podílového fondu nabytého děděním od zůstavitele, který byl příbuzným v řadě přímé nebo manželem; doba 3 let mezi nabytím a úplatným převodem cenného papíru u téhož poplatníka se nepřerušuje při sloučení nebo splynutí podílových fondů nebo při přeměně uzavřeného podílového fondu na otevřený podílový fond; osvobození se nevztahuje na příjem z úplatného převodu cenného papíru, který je nebo byl zahrnut do obchodního majetku, a to do 3 let od ukončení činnosti, ze které plyne příjem ze samostatné činnosti, a na příjem z kapitálového majetku; osvobození se nevztahuje na příjem z podílu připadajícího na podílový list při zrušení podílového fondu, který byl nebo je zahrnut do obchodního majetku, a to do 3 let od ukončení činnosti, ze které plyne příjem ze samostatné činnosti; při výměně akcie emitentem za jinou akcii o celkové stejné jmenovité hodnotě se doba 3 let mezi nabytím a úplatným převodem cenného papíru u téhož poplatníka nepřerušuje; obdobně se postupuje i při výměně podílů, fúzi společností nebo rozdělení společnosti, jsou-li splněny podmínky uvedené v § 23b nebo § 23c; osvobození se nevztahuje na příjem, který plyne poplatníkovi z budoucího úplatného převodu cenného papíru, uskutečněného v době do 3 let od nabytí, a z budoucího úplatného převodu cenného papíru, který je nebo byl zahrnut do obchodního majetku, a to do 3 let od ukončení činnosti, ze které plyne příjem ze samostatné činnosti, i když kupní smlouva bude uzavřena až po 3 letech od nabytí nebo po 3 letech od ukončení činnosti, ze které plyne příjem ze samostatné činnosti; obdobně se postupuje u příjmu plynoucího jako protiplnění menšinovému akcionáři v důsledku nuceného přechodu účastnických cenných papírů; jedná-li se o kmenový list, činí doba místo 3 let 5 let,
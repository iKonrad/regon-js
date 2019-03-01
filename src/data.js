import TYPES from "./types";

const Data = {
  [TYPES.DANE_KOMUNIKAT]: "<tns:DaneKomunikat/>",
  [TYPES.DANE_POBIERZ_PELNY_RAPORT]:
    "<tns:DanePobierzPelnyRaport><tns:pRegon>{value}</tns:pRegon><tns:pNazwaRaportu>{raportName}</tns:pNazwaRaportu></tns:DanePobierzPelnyRaport>",
  [TYPES.DANE_POBIERZ_TYP_JEDNOSTKI]:
    "<tns:DanePobierzPelnyRaport><tns:pRegon>{value}</tns:pRegon><tns:pNazwaRaportu>PublDaneRaportTypJednostki</tns:pNazwaRaportu></tns:DanePobierzPelnyRaport>",
  [TYPES.GET_VALUE]:
    "<q5:GetValue><q5:pNazwaParametru>{value}</q5:pNazwaParametru></q5:GetValue>",
  [TYPES.WYLOGUJ]:
    "<tns:Wyloguj><tns:pIdentyfikatorSesji>{value}</tns:pIdentyfikatorSesji></tns:Wyloguj>",
  [TYPES.ZALOGUJ]:
    "<tns:Zaloguj><tns:pKluczUzytkownika>{key}</tns:pKluczUzytkownika></tns:Zaloguj>",
  [TYPES.DANE_SZUKAJ]:
    "<tns:DaneSzukaj><tns:pParametryWyszukiwania>{search}</tns:pParametryWyszukiwania></tns:DaneSzukaj>"
};

const Actions = {
  [TYPES.DANE_KOMUNIKAT]: "<tns:DaneKomunikat/>",
  [TYPES.DANE_POBIERZ_PELNY_RAPORT]:
    "<tns:DanePobierzPelnyRaport><tns:pRegon>{value}</tns:pRegon><tns:pNazwaRaportu>{raportName}</tns:pNazwaRaportu></tns:DanePobierzPelnyRaport>",
  [TYPES.DANE_POBIERZ_TYP_JEDNOSTKI]:
    "<tns:DanePobierzPelnyRaport><tns:pRegon>{value}</tns:pRegon><tns:pNazwaRaportu>PublDaneRaportTypJednostki</tns:pNazwaRaportu></tns:DanePobierzPelnyRaport>",
  [TYPES.GET_VALUE]:
    "<q5:GetValue><q5:pNazwaParametru>{value}</q5:pNazwaParametru></q5:GetValue>",
  [TYPES.WYLOGUJ]:
    "<tns:Wyloguj><tns:pIdentyfikatorSesji>{value}</tns:pIdentyfikatorSesji></tns:Wyloguj>",
  [TYPES.ZALOGUJ]: "http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj",
  [TYPES.DANE_SZUKAJ]:
    "http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukaj"
};

export default {
  Payloads: Data,
  Actions
};

import Payload from "./payload";
import TYPES from "./types";
import Http from "./http";

class Regon {
  key = null;

  constructor(config) {
    this.key = config.key;
    this.client = new Http();
  }

  async login() {
    const payload = new Payload(TYPES.ZALOGUJ, { key: this.key });
    const response = await this.client.request(payload);
    if (response.ZalogujResponse) {
      this.client.setSessionId(response.ZalogujResponse.ZalogujResult);
    }
  }

  async searchByNip(nip) {
    const payload = new Payload(TYPES.DANE_SZUKAJ, {
      search: {
        nip
      }
    });

    const response = await this.client.request(payload);
    if (response.DaneSzukajResponse.DaneSzukajResult) {
      return response.DaneSzukajResponse.DaneSzukajResult.root.dane;
    }

    return null;
  }
}

export default Regon;

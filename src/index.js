import Payload from "./payload";
import TYPES from "./types";
import Http from "./http";

const SANDBOX_API_KEY = "abcde12345abcde12345";

class Regon {
  key = null;

  sandbox = false;

  constructor(config) {
    this.sandbox = !!config.sandbox;
    this.key = this.sandbox ? SANDBOX_API_KEY : config.key;
    this.client = new Http(this.sandbox);
  }

  async login() {
    const payload = new Payload(TYPES.ZALOGUJ, { key: this.key });
    const response = await this.client.request(payload);
    if (response.ZalogujResponse) {
      this.client.setSessionId(response.ZalogujResponse.ZalogujResult);
    }
  }

  async logout() {
    const payload = new Payload(TYPES.WYLOGUJ, { key: this.key });
    await this.client.request(payload);
    this.key = null;
  }

  /**
   * Search by different keys
   * Search is a key-value pair object with one of the following options:
   * krs, krsy, nip, nipy, regon, regony14zn, regony9zn
   * @param search
   * @returns {Promise<*>}
   */
  async search(search) {
    if (!this.isLoggedIn()) {
      console.error(
        "You are not logged in. Make sure to run the login action first."
      );
      return;
    }
    const payload = new Payload(TYPES.DANE_SZUKAJ, {
      search
    });

    const response = await this.client.request(payload);
    if (response.DaneSzukajResponse.DaneSzukajResult) {
      return response.DaneSzukajResponse.DaneSzukajResult.root.dane;
    }

    return null;
  }

  async getFullReport(regon, reportName) {
    if (!this.isLoggedIn()) {
      console.error(
        "You are not logged in. Make sure to run the login action first."
      );
      return;
    }

    const payload = new Payload(TYPES.DANE_POBIERZ_PELNY_RAPORT, {
      regon,
      reportName
    });

    const response = await this.client.request(payload);

    console.log("response", response);
    if (response.DaneSzukajResponse.DaneSzukajResult) {
      return response.DaneSzukajResponse.DaneSzukajResult.root.dane;
    }

    return null;
  }

  isLoggedIn() {
    return this.client && this.client.hasSessionId();
  }
}

export default Regon;

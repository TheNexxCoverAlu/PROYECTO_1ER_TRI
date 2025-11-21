import { Http } from "./http.class.js";
import { URL } from "./constants.js";

export class ProvincesService {
  #http = new Http();

  async getProvinces() {
    const resp = await this.#http.get(URL + "/provinces");
    return resp.provinces;
  }

  async getTown(idProvince) {
    const resp = await this.#http.get(
      URL + "/provinces/" + idProvince + "/towns"
    );
    return resp.towns;
  }
}

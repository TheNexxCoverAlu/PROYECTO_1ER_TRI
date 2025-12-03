import { Http } from "../http.class.js";
import { SERVER } from "../constants.js";
import type { Province, Towns } from "../../interfaces/property-interface.js";

export class ProvincesService {
  #http: Http;

  constructor() {
    this.#http = new Http();
  }

  async getProvinces(): Promise<Province[]> {
    const resp = await this.#http.get<Province[]>(SERVER + "/provinces");
    return resp;
  }

  async getTowns(idProvince : number) : Promise<Towns[]> {
    const resp = await this.#http.get<Towns[]>(SERVER + "/provinces/" + idProvince  + "towns");
    return resp;
  }

}

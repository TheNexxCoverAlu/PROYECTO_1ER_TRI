import { Http } from "./http.class.js";
import { URL } from "./constants.js";

export class PropertiesService {
  #http = new Http();

  async getProperties() {
    const resp = await this.#http.get(URL + "/properties");
    return resp.properties;
  }

  async insertProperty(property) {
    const envio = await this.#http.post(URL + "/properties", property);
    return envio.property;
  }

  async deleteProperty(id) {
    await this.#http.delete(URL + "/properties/" + id);
  }
}

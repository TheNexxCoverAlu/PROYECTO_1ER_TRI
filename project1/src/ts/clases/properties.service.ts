import { Http } from "../http.class.js";
import { SERVER } from "../constants.js";
import type {
  PropertyInsert,
  PropertiesResponse,
  Property,
} from "../interfaces/property-interface.js";

export class PropertiesService {
  #http: Http;

  constructor() {
    this.#http = new Http();
  }

  async getProperties(params: URLSearchParams): Promise<PropertiesResponse> {
    const url = SERVER + "/properties?" + params.toString();
    const resp = await this.#http.get<PropertiesResponse>(url);
    return resp;
  }

  async getPropertyById(id: number): Promise<Property> {
    const resp = await this.#http.get<Property>(SERVER + "/properties/" + id);
    return resp;
  }

  async insertProperty(property: PropertyInsert): Promise<Property> {
    const resp = await this.#http.post<Property, PropertyInsert>(
      SERVER + "/properties",
      property
    );
    return resp;
  }

  async deleteProperty(id: number): Promise<void> {
    await this.#http.delete<void>(SERVER + "/properties/" + id);
  }
}

import {HttpClient} from "@angular/common/http";
import {Konstante} from "../helperi/konstante";
import {Poruka} from "../modeli/poruka";
import {Injectable} from "@angular/core";

@Injectable()
export class PorukeEndpoint {
  constructor(private httpClient: HttpClient) {
  }

  dodajPoruku(poruka: Poruka) {
    let url = Konstante.adresaServera + "/Poruke/DodajPoruku"
    this.httpClient.post(url, poruka).subscribe();
  }

  getPoruke() {
    let url = Konstante.adresaServera + "/Poruke/GetAll";
    return this.httpClient.get<Poruka[]>(url);
  }
}

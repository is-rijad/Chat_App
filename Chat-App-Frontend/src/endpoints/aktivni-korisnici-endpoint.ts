import {HttpClient} from "@angular/common/http";
import {Konstante} from "../helperi/konstante";
import {Injectable} from "@angular/core";
import {Korisnik} from "../modeli/korisnik";

@Injectable()
export class AktivniKorisniciEndpoint {
  constructor(private httpClient: HttpClient) {
  }

  get() {
    return this.httpClient.get<Korisnik[]>(Konstante.adresaServera + "/GetAktivneKorisnike");
  }
}

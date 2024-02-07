import {HttpClient} from "@angular/common/http";
import {Konstante} from "../helperi/konstante";
import {Injectable} from "@angular/core";

@Injectable()
export class GetAktivneKorisnike {
    constructor(private httpClient:HttpClient) {
    }
    get() {
        return this.httpClient.get<string[]>(Konstante.adresaServera + "/GetAktivneKorisnike");
    }
}

import * as signalR from "@microsoft/signalr"
import {Injectable} from "@angular/core";
import {Konstante} from "../helperi/konstante";
import {delay} from "rxjs";
@Injectable()
export class SignalR {
  konekcija
  constructor() {
    this.konekcija =  new signalR.HubConnectionBuilder().withUrl(`${Konstante.adresaServera}/chat`).build();
    this.konekcija.start().then(() => {
        (document.getElementById("posalji-poruku") as HTMLButtonElement).disabled = false;
    }).catch(async (err) => {
      alert("Greška na serveru!\n" + err.error + "\nPonovni pokušaj za 5 sekundi!");
      await new Promise(() => {
        setTimeout(delay(5000))
      });
      this.konekcija =  new signalR.HubConnectionBuilder().withUrl(`${Konstante.adresaServera}/chat`).build();
    }).finally(() => {
      this.konekcija.invoke(Konstante.korisnikSePridruzio);
    });
  }
}

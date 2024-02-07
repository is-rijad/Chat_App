import * as signalR from "@microsoft/signalr"
import {Injectable} from "@angular/core";
import {Konstante} from "../helperi/konstante";
import {Alert, TipAlerta} from "../modeli/alert";

@Injectable()
export class SignalR {
  konekcija
  constructor() {
    this.konekcija =  new signalR.HubConnectionBuilder().withUrl(`${Konstante.adresaServera}/chat`).build();
    this.konekcija.start().then(() => {
        (document.getElementById("posalji-poruku") as HTMLButtonElement).disabled = false;
    }).catch(async (err) => {
      Alert.alert = new Alert("Greška na serveru!\n" + err.error + "\nPonovni pokušaj za 3 sekunde!", TipAlerta.error, 3000);
      await new Promise(f => setTimeout(f, 3000));
      location.reload();
    }).finally(() => {
      this.konekcija.invoke(Konstante.korisnikSePridruzio);
    });
  }
}

import * as signalR from "@microsoft/signalr"
import { HubConnection } from "@microsoft/signalr"
import { Injectable } from "@angular/core";
import { Konstante } from "../helperi/konstante";
import { Alert, TipAlerta } from "../helperi/alert";
import { RandomGenerator } from "./random-generator";

@Injectable({ providedIn: "root" })
export class SignalR {
  konektovanjeAktivno;
  korisnickoIme;
  konekcija: HubConnection;

  constructor() {
    this.konektovanjeAktivno = true;
    this.korisnickoIme = RandomGenerator.GenerisiString(6);
    this.konekcija = new signalR.HubConnectionBuilder().withUrl(`${Konstante.adresaServera}/chat?korisnickoIme=${this.korisnickoIme}`).build();
  }
  public async konektujSe() {
    await this.konekcija!.start().then(() => {
      (document.getElementById("posalji-poruku") as HTMLButtonElement).disabled = false;
      this.konektovanjeAktivno = false;
    }).catch(async (err) => {
      Alert.alert = new Alert(TipAlerta.error, `Greška na serveru! Ponovni pokušaj za 3 sekunde!`, 3000);
      await new Promise(f => setTimeout(f, 3000));
      location.reload();
    })

  }
}

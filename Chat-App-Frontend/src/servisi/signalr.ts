import * as signalR from "@microsoft/signalr"
import {HubConnection, HubConnectionState} from "@microsoft/signalr"
import { Injectable } from "@angular/core";
import { Konstante } from "../helperi/konstante";
import { Alert, TipAlerta } from "../helperi/alert";
import { RandomGenerator } from "./random-generator";
import {Router} from "@angular/router";
import {Poruka} from "../modeli/privatna-poruka";


@Injectable({ providedIn: "root" })
export class SignalR {
  konektovanjeAktivno;
  korisnickoIme;
  konekcija: HubConnection;
  privatniChatOtvoren;
  imeGrupe;
  konekcijaIdPrivatnog;
  dialogTitle;
  privatnePoruke : Poruka[];
  poruke : Poruka[];

  constructor(private router:Router) {
    this.privatnePoruke = [];
    this.poruke = [];
    this.konekcijaIdPrivatnog = "";
    this.imeGrupe = "";
    this.dialogTitle = "";
    this.konektovanjeAktivno = true;
    this.privatniChatOtvoren = false;
    this.korisnickoIme = RandomGenerator.GenerisiString(6);
    this.konekcija = new signalR.HubConnectionBuilder().withUrl(`${Konstante.adresaServera}/chat?korisnickoIme=${this.korisnickoIme}`).build();

    this.konekcija.on(Konstante.primiPoruku, (poruka:Poruka, imeGrupe:string) => {
      if(imeGrupe != null) {
        if(this.imeGrupe == imeGrupe) {
          this.privatnePoruke.push(poruka);
        }
      }
      else
        this.poruke.push(poruka);
    })
    this.konekcija.on(Konstante.zapoceoPrivatniChat, (konekcijaId, zapoceoKorisnik, imeGrupe) =>  {
        Alert.alert = new Alert(TipAlerta.success, `Korisnik ${zapoceoKorisnik} je započeo privatni razgovor sa Vama.`);
        this.imeGrupe = imeGrupe;
        this.konekcijaIdPrivatnog = konekcijaId;
    })
    this.konekcija.on(Konstante.zavrsioPrivatniChat, async (imeKorisnika: string) => {
      this.dialogTitle = `${imeKorisnika} je završio privatni chat sa Vama.`;
        (document.getElementById("priv-posalji-poruku") as HTMLButtonElement).disabled = true;
    })
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

  public async zapocniPrivatniChat(korisnickoIme: string, konekcijaId : string) {
    if (this.konekcija.state == HubConnectionState.Connected) {
      let proslaKonekcija = this.konekcijaIdPrivatnog;
      await this.konekcija.invoke(Konstante.zapocniPrivatniChat, konekcijaId).then((imeGrupe : string) => {
        this.dialogTitle = Konstante.zapoceliSteRazgovorSa + korisnickoIme;
        setTimeout(() => {this.dialogTitle = korisnickoIme}, 3000);
        this.imeGrupe = imeGrupe;
        this.konekcijaIdPrivatnog = konekcijaId;
        if(proslaKonekcija != this.konekcijaIdPrivatnog)
          this.privatnePoruke = [];
        this.privatniChatOtvoren = true;
      }).catch((err) => {
        Alert.alert = new Alert(TipAlerta.error, err);
      });
    }
    else {
      Alert.alert = new Alert(TipAlerta.error, "Niste konektovani!");
    }
  }
  public async zavrsiPrivatniChat(konekcijaId: string) {
    if (this.konekcija.state == HubConnectionState.Connected) {
      await this.konekcija.invoke(Konstante.zavrsiPrivatniChat, konekcijaId, this.imeGrupe).then(() => this.privatniChatOtvoren = false);
    }
  }
}

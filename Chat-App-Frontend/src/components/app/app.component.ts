import {Component, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Konstante} from "../../helperi/konstante";
import {PorukeComponent} from "../poruke/poruke.component";
import {FormsModule} from "@angular/forms";
import {SignalR} from "../../servisi/signalr";
import {NgForOf, NgIf} from "@angular/common";
import {Alert, TipAlerta} from "../../helperi/alert";
import {GetAktivneKorisnike} from "../../endpoints/getAktivneKorisnike";
import {HttpClientModule} from "@angular/common/http";
import {Korisnik} from "../../modeli/korisnik";
import {HubConnectionState} from "@microsoft/signalr";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PorukeComponent, FormsModule, NgIf, NgForOf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    GetAktivneKorisnike
  ]
})
export class AppComponent implements OnInit{
  protected readonly Alert = Alert;


  aktivniKorisnici : Korisnik[] = [];
  hamburgerOtvoren = false;
  constructor(protected signalR:SignalR,
              private getAktivneKorisnike:GetAktivneKorisnike) {
    this.signalR.konekcija.on(Konstante.korisnikSePridruzio,  (korisnik: Korisnik, poruka: string) => {
      this.aktivniKorisnici.push(korisnik);
        Alert.alert = new Alert(TipAlerta.success, poruka);
    });
    this.signalR.konekcija.on(Konstante.korisnikSeOdjavio,  (korisnik: Korisnik, poruka: string) => {
      let index = this.aktivniKorisnici.findIndex(() => korisnik);
        this.aktivniKorisnici.splice(index, 1);
        Alert.alert = new Alert(TipAlerta.success, poruka);
    });
    this.signalR.konektujSe();

  }
  ngOnInit(): void {
    window.onbeforeunload = () => {
      if(this.signalR.konektovanjeAktivno) {
        Alert.alert = new Alert(TipAlerta.error, "Morate sačekati uspostavljanje konekcije kako biste izašli!");
        return false;
      }
      this.signalR.konekcija.stop().then(() => {
        return true;
      })
      return true;
    };
    this.getAktivneKorisnike.get().subscribe((res) => this.aktivniKorisnici = res);
  }

  hamburgerHandler() {
    let div = document.getElementById("sidebar");
    if(this.hamburgerOtvoren) {
      div!.style.maxHeight = "60px";
    }
    else {
      div!.style.maxHeight = "90vh";
    }
    this.hamburgerOtvoren = !this.hamburgerOtvoren;

  }
  async otvoriPrivatniChat(korisnickoIme: string, konekcijaId: string) {
    let proslaKonekcija = this.signalR.konekcijaIdPrivatnog;
    await this.signalR.zapocniPrivatniChat(korisnickoIme, konekcijaId).then(() => {
      if(proslaKonekcija == "")
        this.signalR.privatnePoruke = []
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {RandomGenerator} from "../../servisi/random-generator";
import {CookieService} from "ngx-cookie-service";
import {Konstante} from "../../helperi/konstante";
import {PorukeComponent} from "../poruke/poruke.component";
import {FormsModule} from "@angular/forms";
import {SignalR} from "../../servisi/signalr";
import {Poruka} from "../../modeli/privatna-poruka";
import {NgForOf, NgIf} from "@angular/common";
import {Alert, TipAlerta} from "../../modeli/alert";
import {GetAktivneKorisnike} from "../../endpoints/getAktivneKorisnike";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PorukeComponent, FormsModule, NgIf, NgForOf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    RandomGenerator,
    GetAktivneKorisnike
  ]
})
export class AppComponent implements OnInit{
  korisnickoIme = "";
  aktivniKorisnici : string[] = [];
  hamburgerOtvoren = false;
  constructor(private randomGenerator:RandomGenerator,
              private cookieService:CookieService,
              private signalR:SignalR,
              private getAktivneKorisnike:GetAktivneKorisnike) {
    this.signalR.konekcija.on(Konstante.korisnikSePridruzio, async (poruka: Poruka) => {
      this.aktivniKorisnici.push(poruka.odKorisnika!);
        Alert.alert = new Alert(TipAlerta.success, poruka.sadrzaj);
    });
    this.signalR.konekcija.on(Konstante.korisnikSeOdjavio, async (poruka: Poruka) => {
        let index = this.aktivniKorisnici.findIndex((k) => k == this.korisnickoIme);
        this.aktivniKorisnici.splice(index, 1);
        Alert.alert = new Alert(TipAlerta.success, poruka.sadrzaj);
    });
    this.signalR.konektujSe();

  }
  ngOnInit(): void {
    this.korisnickoIme = this.randomGenerator.GenerisiString(6);
    this.cookieService.set(Konstante.korisnickoIme, this.korisnickoIme);
    window.onbeforeunload = () => {this.signalR.konekcija.stop()};
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
  protected readonly Alert = Alert;
}

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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PorukeComponent, FormsModule, NgIf, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    RandomGenerator,
    SignalR
  ]
})
export class AppComponent implements OnInit{
  korisnickoIme = "";
  aktivniKorisnici : string[] = [];
  constructor(private randomGenerator:RandomGenerator,
              private cookieService:CookieService,
              private signalR:SignalR) {
    this.signalR.konekcija.on(Konstante.korisnikSePridruzio, async (poruka: Poruka) => {
      if (!this.aktivniKorisnici.find((k) => k == poruka.odKorisnika!) &&
          this.korisnickoIme != poruka.odKorisnika!) {
        this.aktivniKorisnici.push(poruka.odKorisnika!);
        Alert.alert = new Alert(TipAlerta.success, poruka.sadrzaj);
      }
    });
  }
  ngOnInit(): void {
    this.korisnickoIme = this.randomGenerator.GenerisiString(6);
    this.cookieService.set(Konstante.korisnickoIme, this.korisnickoIme);
  }

  protected readonly Alert = Alert;
}

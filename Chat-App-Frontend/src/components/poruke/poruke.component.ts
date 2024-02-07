import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Konstante} from "../../helperi/konstante";
import {SignalR} from "../../servisi/signalr";
import {Poruka} from "../../modeli/privatna-poruka";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-poruke',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './poruke.component.html',
  styleUrl: './poruke.component.css',
  providers: [
    SignalR
  ]
})
export class PorukeComponent implements OnInit{
  korisnickoIme = "";
  poruke : Poruka[] = [];
  constructor(private cookieService:CookieService,
              private signalR:SignalR) {
  }
  ngOnInit() {
    this.korisnickoIme = this.cookieService.get(Konstante.korisnickoIme);
    this.signalR.konekcija.on(Konstante.primiPoruku, (poruka) => this.poruke.push(poruka))
  }

  posaljiPoruku() {
    let poruka : Poruka = {
      odKorisnika: null,
      zaKorisnika: null,
      sadrzaj: (document.getElementById("poruka-input") as HTMLInputElement).value
    }
    this.signalR.konekcija.invoke(Konstante.posaljiPoruku, poruka)
  }
}

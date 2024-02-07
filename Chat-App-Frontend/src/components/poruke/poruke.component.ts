import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Konstante} from "../../helperi/konstante";
import {SignalR} from "../../servisi/signalr";
import {Poruka} from "../../modeli/privatna-poruka";

@Component({
  selector: 'app-poruke',
  standalone: true,
  imports: [],
  templateUrl: './poruke.component.html',
  styleUrl: './poruke.component.css',
  providers: [
    SignalR
  ]
})
export class PorukeComponent implements OnInit{
  korisnickoIme = "";
  constructor(private cookieService:CookieService,
              private signalR:SignalR) {
  }
  ngOnInit() {
    this.korisnickoIme = this.cookieService.get(Konstante.korisnickoIme);
    this.signalR.konekcija.on(Konstante.primiPoruku, (poruka) => this.primiPoruku(poruka))
  }

  posaljiPoruku() {
    let poruka : Poruka = {
      odKorisnika: null,
      zaKorisnika: null,
      sadrzaj: (document.getElementById("poruka-input") as HTMLInputElement).value
    }
    this.signalR.konekcija.invoke(Konstante.posaljiPoruku, poruka)
  }
  primiPoruku(poruka : Poruka) {
    let div = document.createElement("div");
    div.className = (poruka.odKorisnika == this.korisnickoIme) ? "korisnikova-poruka" : "poruka";
    let h2 = document.createElement("h2");
    h2.className = (poruka.odKorisnika == this.korisnickoIme) ? "korisnikova-poruka-korisnik" : "poruka-korisnik";
    h2.innerHTML = poruka.odKorisnika!;
    let textarea = document.createElement("textarea");
    textarea.readOnly = true;
    textarea.className = (poruka.odKorisnika == this.korisnickoIme) ? "korisnikova-poruka-text" : "poruka-text";
    textarea.value = poruka.sadrzaj;
    div.appendChild(h2);
    div.appendChild(textarea);
    document.getElementById("poruke")!.appendChild(div);

      // <div class="poruka">
      //   <h2 class="poruka-korisnik">sadsadsad</h2>
      //   <textarea readonly class="poruka-text">${poruka.sadrzaj}</textarea>
      // </div>

  }
}

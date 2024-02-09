import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Konstante } from "../../helperi/konstante";
import { SignalR } from "../../servisi/signalr";
import { NgForOf, NgIf } from "@angular/common";
import { HubConnectionState } from "@microsoft/signalr";
import {PorukeEndpoint} from "../../endpoints/poruke-endpoint";

@Component({
  selector: 'app-poruke',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './poruke.component.html',
  styleUrl: './poruke.component.css'
})
export class PorukeComponent implements AfterViewChecked {
  constructor(protected signalR: SignalR,
              private porukeEndpoint:PorukeEndpoint) {

  }

  posaljiPoruku() {
    let sadrzaj = "";
    if(this.signalR.privatniChatOtvoren) {
      sadrzaj = (document.getElementById("priv-poruka-input") as HTMLInputElement).value
      if(sadrzaj != "") {
        this.signalR.konekcija.invoke(Konstante.posaljiPoruku, sadrzaj, this.signalR.imeGrupe);
        (document.getElementById("priv-poruka-input") as HTMLInputElement).value = "";
      }
    }
    else {
      sadrzaj = (document.getElementById("poruka-input") as HTMLInputElement).value
      if (sadrzaj != "") {
          this.porukeEndpoint.dodajPoruku({
            odKorisnika: this.signalR.korisnickoIme,
            sadrzaj: sadrzaj
          });
        this.signalR.konekcija.invoke(Konstante.posaljiPoruku, sadrzaj, null);
        (document.getElementById("poruka-input") as HTMLInputElement).value = ""
      }
    }
  }

  ngAfterViewChecked(): void {
    document.getElementById("poruke-canvas")?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    document.getElementById("priv-poruke-canvas")?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  protected readonly HubConnectionState = HubConnectionState;
}

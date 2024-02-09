import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { Konstante } from "../../helperi/konstante";
import { SignalR } from "../../servisi/signalr";
import { Poruka } from "../../modeli/privatna-poruka";
import { NgFor, NgForOf, NgIf } from "@angular/common";
import { HubConnectionState } from "@microsoft/signalr";

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
  constructor(protected signalR: SignalR) {
  }

  posaljiPoruku() {
    if(this.signalR.privatniChatOtvoren) {
      let sadrzaj = (document.getElementById("priv-poruka-input") as HTMLInputElement).value
      this.signalR.konekcija.invoke(Konstante.posaljiPoruku, sadrzaj, this.signalR.imeGrupe);
    }
    else {
      let sadrzaj = (document.getElementById("poruka-input") as HTMLInputElement).value
      this.signalR.konekcija.invoke(Konstante.posaljiPoruku, sadrzaj, null)
    }
  }

  ngAfterViewChecked(): void {
    document.getElementById("poruke-canvas")?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    document.getElementById("priv-poruke-canvas")?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  protected readonly HubConnectionState = HubConnectionState;
}

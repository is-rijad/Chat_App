import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Konstante} from "../../helperi/konstante";
import {SignalR} from "../../servisi/signalr";
import {Poruka} from "../../modeli/privatna-poruka";
import {NgFor, NgForOf, NgIf} from "@angular/common";

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
export class PorukeComponent implements OnInit, AfterViewChecked{
  poruke : Poruka[] = [];
<<<<<<< Updated upstream
  constructor(private cookieService:CookieService,
              private signalR:SignalR) {
=======
  constructor(protected signalR:SignalR) {
>>>>>>> Stashed changes
  }
  ngOnInit() {
    this.signalR.konekcija.on(Konstante.primiPoruku, (poruka) => {
      this.poruke.push(poruka);
    })
  }

  posaljiPoruku() {
    let sadrzaj  = (document.getElementById("poruka-input") as HTMLInputElement).value
    this.signalR.konekcija.invoke(Konstante.posaljiPoruku, sadrzaj)
  }

  ngAfterViewChecked(): void {
    document.getElementById("poruke-canvas")!.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });

  }
}

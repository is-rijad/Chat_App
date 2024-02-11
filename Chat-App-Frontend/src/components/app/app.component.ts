import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PorukeComponent} from "../poruke/poruke.component";
import {FormsModule} from "@angular/forms";
import {SignalR} from "../../servisi/signalr";
import {NgForOf, NgIf} from "@angular/common";
import {Alert, TipAlerta} from "../../helperi/alert";
import {AktivniKorisniciEndpoint} from "../../endpoints/aktivni-korisnici-endpoint";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PorukeComponent, FormsModule, NgIf, NgForOf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    AktivniKorisniciEndpoint
  ]
})
export class AppComponent implements OnInit, AfterViewChecked {
  protected readonly Alert = Alert;
  hamburgerOtvoren = false;

  constructor(protected signalR: SignalR,
              private getAktivneKorisnike: AktivniKorisniciEndpoint) {
    this.signalR.konektujSe();
  }

  ngOnInit(): void {
    this.scrollToTop();
    window.onbeforeunload = () => {
      if (this.signalR.konektovanjeAktivno) {
        Alert.alert = new Alert(TipAlerta.error, "Morate sačekati uspostavljanje konekcije kako biste izašli!");
        return false;
      }
      this.signalR.konekcija.stop().then(() => {
        return true;
      })
      return true;
    };
    this.getAktivneKorisnike.get().subscribe((res) => this.signalR.aktivniKorisnici = res);
  }

  hamburgerHandler() {
    let div = document.getElementById("sidebar");
    if (this.hamburgerOtvoren) {
      div!.style.maxHeight = "60px";
      document.getElementById("hamburger")!.scrollIntoView({behavior: 'smooth', block: "center"})
      div!.style.overflowY = "hidden";
    } else {
      div!.style.maxHeight = "90vh";
      div!.style.overflowY = "scroll";
    }
    this.hamburgerOtvoren = !this.hamburgerOtvoren;

  }

  async otvoriPrivatniChat(korisnickoIme: string, konekcijaId: string) {
    let proslaKonekcija = this.signalR.konekcijaIdPrivatnog;
    await this.signalR.zapocniPrivatniChat(korisnickoIme, konekcijaId).then(() => {
      if (proslaKonekcija == "")
        this.signalR.privatnePoruke = [];
    });
  }

  ngAfterViewChecked(): void {
    if(!this.hamburgerOtvoren) {
      document.getElementById("poruke-canvas")?.lastElementChild?.scrollIntoView({behavior: 'smooth', block: 'end'});
      document.getElementById("priv-poruke-canvas")?.lastElementChild?.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }
  }

  scrollToTop() {
    document.getElementById("hamburger")!.scrollIntoView({behavior: 'smooth', block: "center"})
  }
}

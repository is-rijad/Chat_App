import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Konstante} from "../../helperi/konstante";
import {PorukeComponent} from "../poruke/poruke.component";
import {FormsModule} from "@angular/forms";
import {SignalR} from "../../servisi/signalr";
import {Poruka} from "../../modeli/privatna-poruka";
import {NgForOf, NgIf} from "@angular/common";
import {Alert, TipAlerta} from "../../helperi/alert";
import {GetAktivneKorisnike} from "../../endpoints/getAktivneKorisnike";
import {HttpClientModule} from "@angular/common/http";
import {Korisnik} from "../../modeli/korisnik";
import {HubConnectionState} from "@microsoft/signalr";

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
<<<<<<< Updated upstream
  korisnickoIme = "";
  aktivniKorisnici : Korisnik[] = [];
  hamburgerOtvoren = false;
  privatniChatOtvoren = false;
  dialogTitle = "";
  constructor(private randomGenerator:RandomGenerator,
              private cookieService:CookieService,
              private signalR:SignalR,
=======
  aktivniKorisnici : Korisnik[] = [];
  hamburgerOtvoren = false;
  privatniChatOtvoren = false;
  dialogTitle = "";
  constructor(protected signalR:SignalR,
>>>>>>> Stashed changes
              private getAktivneKorisnike:GetAktivneKorisnike) {
    this.signalR.konekcija.on(Konstante.korisnikSePridruzio,  (korisnik: Korisnik, poruka: Poruka) => {
      this.aktivniKorisnici.push(korisnik);
        Alert.alert = new Alert(TipAlerta.success, poruka.sadrzaj);
    });
    this.signalR.konekcija.on(Konstante.korisnikSeOdjavio,  (korisnik: Korisnik, poruka: Poruka) => {
      if (this.privatniChatOtvoren &&
        (this.dialogTitle == korisnik.korisnickoIme || this.dialogTitle == Konstante.zapoceliSteRazgovorSa + korisnik.korisnickoIme)) {
        this.privatniChatOtvoren = false;
      }
      let index = this.aktivniKorisnici.findIndex(() => korisnik);
        this.aktivniKorisnici.splice(index, 1);
        Alert.alert = new Alert(TipAlerta.success, poruka.sadrzaj);
    });
    this.signalR.konekcija.on(Konstante.zapoceoPrivatniChat, (zapoceoKorisnik) =>  {
      Alert.alert = new Alert(TipAlerta.success, `Korisnik ${zapoceoKorisnik} je započeo privatni chat sa Vama.`);
    })
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
      return false;
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

  zapocniPrivatniChat(konekcijaId : string) {
    if (this.signalR.konekcija.state == HubConnectionState.Connected) {
    this.signalR.konekcija.invoke(Konstante.zapocniPrivatniChat, konekcijaId).then((saKorisnikom : string) => {
      this.dialogTitle = Konstante.zapoceliSteRazgovorSa + saKorisnikom;
      this.privatniChatOtvoren = true;
      setTimeout(() => {this.dialogTitle = saKorisnikom}, 3000);
    }).catch((err) => {
      Alert.alert = new Alert(TipAlerta.error, err);
    });
    }
    else {
      Alert.alert = new Alert(TipAlerta.error, "Niste konektovani!");
    }
  }
  protected readonly Alert = Alert;
}

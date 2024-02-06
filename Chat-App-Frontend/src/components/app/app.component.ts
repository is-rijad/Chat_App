import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RandomGenerator} from "../../servisi/random-generator";
import {CookieService} from "ngx-cookie-service";
import {Konstante} from "../../helperi/konstante";
import {PorukeComponent} from "../poruke/poruke.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PorukeComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    RandomGenerator
  ]
})
export class AppComponent implements OnInit{
  korisnickoIme = "";
  aktivniKorisnici = [];
  constructor(private randomGenerator:RandomGenerator,
              private cookieService:CookieService) {
  }
  ngOnInit(): void {
    this.korisnickoIme = this.randomGenerator.GenerisiString(6);
    this.cookieService.set(Konstante.korisnickoIme, this.korisnickoIme);
  }
}

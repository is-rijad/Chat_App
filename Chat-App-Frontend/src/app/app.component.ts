import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RandomGenerator} from "../servisi/random-generator";
import {CookieService} from "ngx-cookie-service";
import {Konstante} from "../helperi/konstante";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    RandomGenerator
  ]
})
export class AppComponent implements OnInit{
  constructor(private randomGenerator:RandomGenerator,
              private cookieService:CookieService) {
  }
  ngOnInit(): void {
    this.cookieService.set(Konstante.korisnickoIme, this.randomGenerator.GenerisiString(6))
  }
}

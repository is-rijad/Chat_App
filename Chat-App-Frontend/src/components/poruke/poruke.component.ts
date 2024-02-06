import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Konstante} from "../../helperi/konstante";

@Component({
  selector: 'app-poruke',
  standalone: true,
  imports: [],
  templateUrl: './poruke.component.html',
  styleUrl: './poruke.component.css'
})
export class PorukeComponent implements OnInit{
  korisnickoIme = "";
  constructor(private cookieService:CookieService) {
  }
  ngOnInit() {
    this.korisnickoIme = this.cookieService.get(Konstante.korisnickoIme);
  }
}

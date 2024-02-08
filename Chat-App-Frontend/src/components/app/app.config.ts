import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {CookieService} from "ngx-cookie-service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SignalR} from "../../servisi/signalr";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    CookieService,
    SignalR
  ],
};

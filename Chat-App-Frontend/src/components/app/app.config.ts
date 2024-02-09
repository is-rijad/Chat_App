import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {SignalR} from "../../servisi/signalr";
import {provideHttpClient} from "@angular/common/http";
import {PorukeEndpoint} from "../../endpoints/poruke-endpoint";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    PorukeEndpoint,
    SignalR
  ],
};

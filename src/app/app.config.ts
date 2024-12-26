import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { apiHttpClientCreator, ApiService } from "./core/services/api.service";
import { initializeUser } from "./core/initializer/user.initializer";
import { AuthService } from "./core/services/auth.service";
import { UserStore } from "./core/stores/user.store";
import { jwtInterceptor } from "./core/helpers/jwt.interceptor";
import { errorInterceptor } from "./core/helpers/error.interceptor";
import { SocketIoModule } from "ngx-socket-io";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
import { provideEnvironmentNgxMask } from "ngx-mask";
import { provideServiceWorker } from '@angular/service-worker';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
    providers: [
        CurrencyPipe,
        provideHttpClient(withInterceptorsFromDi(), withInterceptors([jwtInterceptor, errorInterceptor,])),
        importProvidersFrom(TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        })),
        importProvidersFrom(SocketIoModule),
        { provide: ApiService, useFactory: apiHttpClientCreator, deps: [HttpClient] },
        { provide: APP_INITIALIZER, useFactory: initializeUser, deps: [AuthService, UserStore], multi: true },
        {
            provide: ApiService,
            useFactory: apiHttpClientCreator,
            deps: [HttpClient],
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initializeUser,
            deps: [AuthService, UserStore],
            multi: true,
        },
        MessageService, 
        provideRouter(routes),
        provideAnimations(),
        provideEnvironmentNgxMask(),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        })
    ],
};

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
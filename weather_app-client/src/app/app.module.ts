import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageModule } from './login-page/login-page.module';
import { SharedModule } from './shared/shared.module';
import { SignupPageModule } from './signup-page/signup-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userReducer } from './core/store/user/user.reducer';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './core/store/user/user.effects';
import { LocationPageModule } from './location-page/location-page.module';
import { HttpInterceptorService } from './core/interceptors/http-interceptor.service';
import { SettingsPageModule } from './settings-page/settings-page.module';
import { NgChartsModule } from 'ng2-charts';
import { WeatherMainPageModule } from './weather-main-page/weather-main-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ userReducer }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    WeatherMainPageModule,
    SharedModule,
    LoginPageModule,
    SignupPageModule,
    LocationPageModule,
    SettingsPageModule,
    NgChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

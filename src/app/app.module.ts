import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PhotoService } from './services/photo.service';
import { VoiceRecognitionService } from './services/voice-recognition.service';
import { HttpClientModule } from '@angular/common/http'


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, PokedexComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, PhotoService, VoiceRecognitionService],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorInterceptor } from './services/http-error-interceptor';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { VimeModule } from '@vime/angular';
import { LibraryModule } from './library/library.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    AudioPlayerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    VimeModule,
    LibraryModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }

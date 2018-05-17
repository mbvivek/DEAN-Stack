import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RoutesModule } from './routes/routes.module';

import { AppComponent } from './app.component';

// service
import { AppService } from './app.service';
import { UportService } from './services/uport/uport.service';
import { HttpService } from './services/http/http.service';

// components
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, RoutesModule],
  providers: [AppService, HttpService, UportService],
  bootstrap: [AppComponent],
})
export class AppModule {}
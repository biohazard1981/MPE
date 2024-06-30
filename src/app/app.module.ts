import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './estructura/nav/nav.component';
import { AsideComponent } from './estructura/aside/aside.component';
import { ContentComponent } from './estructura/content/content.component';
import { FooterComponent } from './estructura/footer/footer.component';
import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './estructura/dashboard/dashboard.component';
import { DemandaComponent } from './modulos/demanda/demanda.component';
import { DemandaListaComponent } from './modulos/demanda/demanda-lista.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './modulos/demanda/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AsideComponent,
    ContentComponent,
    FooterComponent,
    PrincipalComponent,
    DashboardComponent,
    DemandaComponent,
    DemandaListaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './estructura/dashboard/dashboard.component';
import { DemandaComponent } from './modulos/demanda/demanda.component';
import { DemandaListaComponent } from './modulos/demanda/demanda-lista.component';
import { AuthGuard } from './modulos/demanda/auth.guard';
import { LoginComponent } from './modulos/demanda/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: PrincipalComponent,
    canActivate:[AuthGuard],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: DashboardComponent },
      { path: 'inicio/demanda', component: DemandaComponent },
      { path: 'inicio/consulta', component: DemandaListaComponent },
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirigir al login por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

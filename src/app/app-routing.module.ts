import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      { path: '', component: MenuComponent },
      { path: 'payments-list', component: PaymentsListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

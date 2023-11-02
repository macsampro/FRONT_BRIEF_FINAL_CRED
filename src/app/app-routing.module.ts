import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { MonStockComponent } from './pages/mon-stock/mon-stock.component';
import { NewProduitComponent } from './component/new-produit/new-produit.component';
import { AddproductComponent } from './pages/addproduct/addproduct.component';

const routes: Routes = [
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'new-produit', component: NewProduitComponent },
  { path: 'mon-stock', component: MonStockComponent },
  { path: 'addProduct', component: AddproductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { MonStockComponent } from './pages/mon-stock/mon-stock.component';
import { HttpClientModule } from '@angular/common/http';
import { TableauProduitsComponent } from './component/tableau-produits/tableau-produits.component';
import { NewProduitComponent } from './component/new-produit/new-produit.component';

@NgModule({
  declarations: [AppComponent, ConnexionComponent, MonStockComponent, TableauProduitsComponent, NewProduitComponent,],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

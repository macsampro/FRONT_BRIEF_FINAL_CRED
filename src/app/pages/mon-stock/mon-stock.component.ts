import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Produits } from 'src/app/models/produits';
import { AuthService } from 'src/app/services/auth.service';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-mon-stock',
  templateUrl: './mon-stock.component.html',
  styleUrls: ['./mon-stock.component.css'],
})
export class MonStockComponent implements OnInit {
  formulaireModification!: FormGroup; 
  produits:Produits[] =[];
  editModeMap: { [key: number]: boolean } = {};


  constructor(
    private authService:AuthService,
    private router: Router,
    private fb: FormBuilder,
    private produitsService:ProduitsService
  ){}

  
  ngOnInit(): void {
    this.formulaireModification = this.fb.group({
      nom: [''],
      prix: [''],
      quantite: [''],
      categorie: [''],  
    });

    this.produitsService.getAllProduits().subscribe((produits) => {
      this.produits = produits;
    });


  }
  editerProduit(produit: Produits) {
    // Activez le mode édition pour ce produit
    this.editModeMap[produit.id_produit] = true;

    // Préremplissez le formulaire de modification avec les données actuelles du produit
    this.formulaireModification.patchValue({
      nom: produit.nom,
      prix: produit.prix,
      quantite: produit.quantite,
    });
  }

  enregistrerModification(produit: Produits) {
    // Désactivez le mode édition pour ce produit
    this.editModeMap[produit.id_produit] = false;

    // Récupérez les données du formulaire de modification
    const modifiedData = this.formulaireModification.value;

    // Appelez la méthode modifyProduit du service pour mettre à jour la base de données
    this.produitsService.modifyProduit(produit.id_produit, modifiedData).subscribe(() => {
      // Après la mise à jour réussie, mettez à jour la liste des produits
      this.produits = this.produits.map((p) => {
        if (p.id_produit === produit.id_produit) {
          return { ...p, ...modifiedData };
        }
        return p;
      });
    });
  }

  annulerModification(produit: Produits) {
    // Désactivez le mode édition pour ce produit
    this.editModeMap[produit.id_produit] = false;
  }


}

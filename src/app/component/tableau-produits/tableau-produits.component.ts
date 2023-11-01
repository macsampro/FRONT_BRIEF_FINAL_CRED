import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Categories } from 'src/app/models/categories';
import { Produits } from 'src/app/models/produits';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-tableau-produits',
  templateUrl: './tableau-produits.component.html',
  styleUrls: ['./tableau-produits.component.css'],
})
export class TableauProduitsComponent implements OnInit {
  produits: Produits[] = [];
  categories: Categories[] = [];
  editModeMap: { [key: number]: boolean } = {};
  formulaireModification!: FormGroup;

  constructor(
    private produitsService: ProduitsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.produitsService.getAllProduits().subscribe((produits) => {
      this.produits = produits;
    });

    this.categoriesService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  editerProduit(produit: Produits) {
    // Activez le mode édition pour ce produit
    this.editModeMap[produit.id_produit] = true;
  }

  enregistrerModification(produit: Produits) {
    this.editModeMap[produit.id_produit] = false;

    // Récupérez les données du formulaire de modification
    const modifiedData = this.formulaireModification.value;

    // Appel de la méthode modifyProduit du service pour mettre à jour la base de données
    this.produitsService
      .modifyProduit(produit.id_produit, modifiedData)
      .subscribe(() => {
        // metre à jour la liste des produits
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

  supprimerProduit(id_Produit: number) {
    this.produitsService.deleteProduits(id_Produit).subscribe(() => {
      // mettre à jour la liste des produits
      this.produits = this.produits.filter((p) => p.id_produit !== id_Produit);
    });
  }

  ajouterNouveauProduit() {
    // Créez un nouvel objet de type Produits avec des valeurs par défaut
    const nouveauProduit: Produits = {
      nom: '',
      prix: 0,
      quantite: 0,
      id_produit: 0,
      id_categorie: this.categories[0].id_categorie,
      categorie: this.categories[0], 
    };
  
    // Utilisez la méthode du service pour ajouter le nouveau produit
    this.produitsService.addProduits(nouveauProduit).subscribe((nouveauProduitAjoute) => {
      // Mettez à jour la liste des produits avec le nouveau produit
      this.produits.push(nouveauProduitAjoute);
  
      // Activez le mode édition pour le nouveau produit pour le modifier immédiatement
      this.editerProduit(nouveauProduitAjoute);
    });
  }
  }

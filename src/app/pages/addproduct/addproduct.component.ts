import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categories } from 'src/app/models/categories';
import { Produits } from 'src/app/models/produits';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent {
  produits: Produits[] = [];
  categories: Categories[] = [];
  addProduct!: FormGroup;

  constructor(
    private produitsService: ProduitsService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initiProductForm();
    this.loadCategories()
    console.log('coucou')
  }

  initiProductForm() {
    this.addProduct = new FormGroup({
      nom: new FormControl('', Validators.required),
      prix: new FormControl(null, Validators.required),
      quantite: new FormControl(null, Validators.required),
      id_categorie: new FormControl(null, Validators.required),
    });
  }

  loadCategories(){
    this.categoriesService.getAllCategories().subscribe(data=>{
      console.log('LES CATEGORIES', data )
      this.categories= data
    })
  }

  ajouterNouveauProduit() {
    console.log( 'FORMULAIRE ENVOYER AVEC LES VALEURS : ', this.addProduct.value)
    if (this.addProduct.valid) {
      const nouveauProduit: Produits = this.addProduct.value;
      this.produitsService.addProduits(nouveauProduit).subscribe((data) => {
        alert('Produit ajouté avec succès!');
        this.router.navigate(['/mon-stock'])
      });
    } else {
      alert('Erreur de saisie !');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  //
  addProduct!: FormGroup;
  //
  constructor(
    private produitsService: ProduitsService,
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
  ) {
    this.formulaireModification = this.fb.group({
      nom: [null, Validators.required],
      prix: [null,[ Validators.required, Validators.min(0)]],
      quantite: [null, Validators.required],
      categorie: [null, Validators.required] , 
    })
  }

  ngOnInit(): void {
    this.produitsService.getAllProduits().subscribe((produits) => {
      this.produits = produits;
    });

    this.categoriesService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });

    //
    this.initiProductForm()
    //
  }

  //
  initiProductForm(){
    this.addProduct = new FormGroup({
      nom: new FormControl('', Validators.required),
      prix: new FormControl(null, Validators.required),
      quantite: new FormControl(null, Validators.required),
      categorie:new FormControl(null, Validators.required) , 
    })
  }
  //
  editerProduit(produit: Produits) {
    this.editModeMap[produit.id_produit] = true;
  }
  

  enregistrerModification(produit: Produits) {
    this.editModeMap[produit.id_produit] = false;
    
    const modifiedData = {
      nom: this.formulaireModification.get('nom')?.value,
      prix: this.formulaireModification.get('prix')?.value,
      quantite: this.formulaireModification.get('quantite')?.value,
      categorie : this.formulaireModification.get('categorie')?.value,
    }

    console.log('le formulaire d\'édition', this.formulaireModification.value)

    this.produitsService
      .modifyProduit(produit.id_produit, modifiedData)
      .subscribe({
        next: response=>{
          console.log('Formulaire de pdt modifié :', response)
          alert('Produit bien modifié !')
          this.produitsService.getAllProduits().subscribe((produits) => {
            this.produits = produits;
          });
        }, error : error=>{
          console.error('Erreur lors de la modification du pdt : ', error)
          alert('Erreur lors de la modif !')
        }
      })
  }

  annulerModification(produit: Produits) {
    this.editModeMap[produit.id_produit] = false;
  }

  supprimerProduit(id_Produit: number) {
    this.produitsService.deleteProduits(id_Produit).subscribe(() => {
      this.produits = this.produits.filter((p) => p.id_produit !== id_Produit);
    });
  }
  //
  ajouterNouveauProduit() {
    if(this.addProduct.valid){
      this.produitsService.addProduits(this.addProduct.value).subscribe( data=>{
        alert('Produit ajouté avec succès!')
  
      })
    }else{
      alert('Tout les champs sont à remplir correctement !')
    }
  }
  //
  }

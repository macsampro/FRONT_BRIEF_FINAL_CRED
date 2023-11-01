import { Categories } from "./categories";

export interface Produits {
  id_produit: number;
  nom: string;
  prix: number;
  quantite: number;
  id_categorie: number;
  categorie: Categories; 
}

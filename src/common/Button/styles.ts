import styled from "styled-components";

export const StyledButton = styled("button")<{ color?: string }>`
  //on l'expore pour l'utiliser dans autres fichiers
  background: ${(p) => p.color || "#fdcddb"};
  color: ${(p) =>
    p.color ? "#fdcddb" : "#000"}; // texte noir + couleur rose clair
  font-size: 1.1rem;
  font-weight: 900;
  font-family: "pacifico", cursive; // la police d'écriture

  min-width: 190px; /* Largeur min : c'est le longueur actuel des boutons */
  max-width: 300px; /* Largeur max */
  border: 2px solid #000; // cadrage noir
  border-radius: 50px; // cerclage du bouton
  padding: 15px 20px; /* Ajuste le padding pour les textes longs */
  cursor: pointer;
  margin-top: 0.625rem; // espacement entre bouton et autre chose
  max-width: 220px; // langeur bouton
  transition: all 0.3s ease-in-out; // animation fluide de changement de couleur
  box-shadow: 0 16px 15px rgb(23 31 114 / 20%);
  position: relative; // on l'ajoute pour l'image
  overflow: hidden; // on l'ajoute pour l'image
  white-space: nowrap; /* Empêche le texte de passer à la ligne */

  &:hover,
  &:active,
  &:focus {
    color: #fff; // couleur du texte blanc
    border: 1px solid rgb(188, 142, 186);
    background-color: rgb(180, 124, 178);
    border: 2px solid #fff;
  }
`;

//pour le countour de l'image 
export const ButtonContainer = styled("div")`
  position: relative;
  display: inline-block; /* Permet au conteneur de s'adapter à la largeur du bouton */
`;

// Style de l'image
export const ButtonImage = styled("img")`
  position: absolute;
  right: -30px; /* Décale l'image légèrement hors du bouton */
  top: 50%;
  transform: translateY(-50%);
  max-height: 80px; /* Taille max */
  max-width: 70px; /* Taille max */
  width: auto; /* on garde les proportions */
  height: auto; /* on garde les proportions */

  && {
    height: 50px; /* on force la hauteur */
    width: auto; /* on garde les proportions */
  }
`;

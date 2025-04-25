import { createGlobalStyle } from "styled-components";

export const Styles = createGlobalStyle`    // charger deux polices personnalisé

    @font-face {
        font-family: "Motiva Sans Light";
        src: url("/fonts/Motiva-Sans-Light.ttf") format("truetype"); //sont stockées dans /fonts/
        font-style: normal;
    }

    @font-face {
        font-family: "Motiva Sans Bold";
        src: url("/fonts/Motiva-Sans-Bold.ttf") format("truetype");
        font-style: normal;
    }


    body,      // police princilpal
    html,
    a {
        font-family: "Pacifico", cursive;
    }


    body {             //Stylisation du body
        margin:0;
        padding:0;
        border: 0;
        outline: 0;
        background: #a3d6e0;
        overflow-x: hidden;
    }

    a:hover {                //Effet au survol des liens : Lorsque l'on passe la souris sur un lien, sa couleur devient bleu foncé
        color: #18216d;
    }

    input,
    textarea {
        border-radius: 4px;
        border: 0;
        background: rgb(241, 242, 243);
        transition: all 0.3s ease-in-out;  
        outline: none;
        width: 100%;  
        padding: 1rem 1.25rem;

        :focus-within {
            background: none;
            box-shadow: #2e186a 0px 0px 0px 1px;
        }
    }

    h1,      //Stylisation des titres de h1 à h6
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Motiva Sans Bold', serif;
        color: #18216d;
        font-size: 56px;
        line-height: 1.18;

        @media only screen and (max-width: 890px) {
          font-size: 47px;
        }
      
        @media only screen and (max-width: 414px) {
          font-size: 32px;
        }
    }

    p {                      //Stylisation des paragraphes p
        color: #18216d;
        font-size: 21px;        
        line-height: 1.41;
    }

    h1 {                     //Titre h1 avec poids spécifique
        font-weight: 600;
    }

    a {                        //Stylisation des liens "a"
        text-decoration: none;
        outline: none;
        color: #2E186A;

        :hover {
            color: #2e186a;
        }
    }
    
    *:focus {             //il supprime lecontour bleu par défaut au focus
        outline: none;
    }

    .about-block-image svg {    
        text-align: center;
    }

    .ant-drawer-body {    // teba3 ant
        display: flex;
        flex-direction: column;
        text-align: left;
        padding-top: 1.5rem;
    }

    .ant-drawer-content-wrapper {    // teba3 ant
        width: 300px !important;
    }
`;

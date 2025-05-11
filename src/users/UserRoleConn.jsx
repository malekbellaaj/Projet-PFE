import React from "react";
import "./UserRole.css";
import logo from "./assets/altus_logo_SB.png";
import { Button } from "../common/Button";
import { useHistory } from "react-router-dom";

const roles = [
  {
    title: "ENSEIGNANT",
    image: require("./assets/teacher.png"),
    alt: "Illustration enseignant",
    btnImage: require("./assets/btn1.png"),
  },
  {
    title: "ADMINISTRATEUR .",
    image: require("./assets/admin.png"),
    alt: "Illustration responsable administratif",
    btnImage: require("./assets/btn2.png"),
  },
  {
    title: "ÉLÈVE",
    image: require("./assets/parent.png"),
    alt: "Illustration ÉLÈVE",
    btnImage: require("./assets/btn3.png"),
  },
];

export default function UserRoleSelectionPage() {
  const history = useHistory();

  const handleClick = (roleTitle) => {
    if (roleTitle === "ENSEIGNANT") {
      history.push({ pathname: "/login", state: { role: "teacher" } });
    } else if (roleTitle === "ADMINISTRATEUR .") {
      history.push({ pathname: "/login", state: { role: "admin" } });
    } else if (roleTitle === "ÉLÈVE") {
      history.push({ pathname: "/mainform", state: { role: "student" } });
    }
  };

  return (
    <div className="user-role-page">
      <img src={logo} alt="Logo" className="logo" />
      <h2 className="title">Lire à son rythme : une clé pour la réussite</h2>
      <div className="role-cards-container">
        {roles.map((role, index) => (
          <div key={index} className="role-card">
            <div className="role-card-image">
              <img src={role.image} alt={role.alt} className="role-image" />
            </div>
            <div className="role-card-button">
              <Button
                onClick={() => handleClick(role.title)}
                imageSrc={role.btnImage}
              >
                {role.title}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}












// import React from "react";
// import "./UserRole.css";
// import logo from "./assets/altus_logo_SB.png";
// import { Button } from "../common/Button";
// import { useHistory } from "react-router-dom";

// const roles = [
//   {
//     title: "ENSEIGNANT",
//     image: require("./assets/teacher.png"),
//     alt: "Illustration enseignant",
//     btnImage: require("./assets/btn1.png"),
//   },
//   {
//     title: "ADMINISTRATEUR",
//     image: require("./assets/admin.png"),
//     alt: "Illustration responsable administratif",
//     btnImage: require("./assets/btn2.png"),
//   },
//   {
//     title: "ÉLÈVE",
//     image: require("./assets/parent.png"),
//     alt: "Illustration ÉLÈVE",
//     btnImage: require("./assets/btn3.png"),
//   },
// ];

// export default function UserRoleSelectionPage() {
//   const history = useHistory();

//   const handleClick = (roleTitle) => {
//     if (roleTitle === "ENSEIGNANT") {
//       history.push({ pathname: "/login", state: { role: "teacher" } });
//     } else if (roleTitle === "ADMINISTRATEUR") {
//       history.push({ pathname: "/login", state: { role: "admin" } });
//     } else if (roleTitle === "ÉLÈVE") {
//       history.push({ pathname: "/mainform", state: { role: "student" } });
//     }
//   };

//   return (
//     <div className="user-role-page">
//       <img src={logo} alt="Logo" className="logo" />
//       <h2 className="title">Lire à son rythme : une clé pour la réussite</h2>
//       <div className="role-cards-container">
//         {roles.map((role, index) => (
//           <div key={index} className="role-card">
//             <div className="role-card-image">
//               <img src={role.image} alt={role.alt} className="role-image" />
//             </div>
//             <div className="role-card-button">
//               <Button
//                 onClick={() => handleClick(role.title)}
//                 imageSrc={role.btnImage}
//               >
//                 {role.title}
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
















// import React from "react";
// import "./UserRole.css";
// import logo from "./assets/altus_logo_SB.png";
// import { Button } from "../common/Button";
// import { useHistory } from "react-router-dom"; // pour importez useHistory

// const roles = [
//   {
//     title: "ENSEIGNANT",
//     image: require("./assets/teacher.png"), //require : permet d'importer un fichier ou un module
//     alt: "Illustration enseignant",
//     btnImage: require("./assets/btn1.png"),
//   },
//   {
//     title: "ADMINISTRATEUR  .",
//     image: require("./assets/admin.png"),
//     alt: "Illustration responsable administratif",
//     btnImage: require("./assets/btn2.png"),
//   },
//   {
//     title: "ÉLÈVE",
//     image: require("./assets/parent.png"),
//     alt: "Illustration ÉLÈVE",
//     btnImage: require("./assets/btn3.png"),
//   },
// ];

// export default function UserRoleSelectionPage() {
//   const history = useHistory(); // Initialisez useHistory

//   // Fonction pour gérer le clic sur le bouton
//   const handleClick = (roleTitle) => {
//     if (roleTitle === "ENSEIGNANT") {
//       history.push("/login");
//     } else if (roleTitle === "ADMINISTRATEUR  .") {
//       history.push("/login");
//     } else if (roleTitle === "ÉLÈVE") {
//       history.push("/mainform");
//     }
//   };
//   return (
//     <div className="user-role-page">
//       <img src={logo} alt="Logo" className="logo" />
//       <h2 className="title">Lire à son rythme : une clé pour la réussite</h2>
//       <div className="role-cards-container">
//         {roles.map((role, index) => (
//           <div key={index} className="role-card">
//             <div className="role-card-image">
//               <img src={role.image} alt={role.alt} className="role-image" />
//             </div>
//             <div className="role-card-button">
//               <Button
//                 onClick={() => handleClick(role.title)}
//                 imageSrc={role.btnImage}
//               >
//                 {role.title}
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

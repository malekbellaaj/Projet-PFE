import React from "react";
import './UserRole.css';
import logo from './assets/altus_logo_SB.png';

const roles = [
  {
    title: "ENSEIGNANT",
    image: require("./assets/teacher.png"),
    alt: "Illustration enseignant",
  },
  {
    title: "RESPONSABLE ADMIN.",
    image: require("./assets/admin.png"), 
    alt: "Illustration responsable administratif",
  },
  {
    title: "PARENT",
    image: require("./assets/parent.png"),
    alt: "Illustration parent",
  },
];

export default function UserRoleSelectionPage() {
  return (
    <div className="user-role-page">
      <img src={logo} alt="Logo" className="logo" />
      <h2 className="title">Lire à son rythme : une clé pour la réussite</h2>
      <div className="role-cards-container">
        {roles.map((role, index) => (
          <div key={index} className="role-card">
            <img src={role.image} alt={role.alt} className="role-image" />
            <button className="role-button">{role.title}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

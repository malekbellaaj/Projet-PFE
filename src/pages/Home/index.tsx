// import React, { useEffect, useState } from "react";
// import axios from "axios";

// // Définir une interface pour l'objet User
// interface User {
//   _id: string;
//   name: string;
//   email: string;
// }

// function App() {
//   const [helloMessage, setHelloMessage] = useState<string>("");
//   const [testMessage, setTestMessage] = useState<string>("");
//   // Typer users comme un tableau d'objets User
//   const [users, setUsers] = useState<User[]>([]);
//   const [newUser, setNewUser] = useState<{ name: string; email: string }>({
//     name: "",
//     email: "",
//   });

//   // GET /api/hello
//   useEffect(() => {
//     axios
//       .get<{ message: string }>("/api/hello")
//       .then((res) => setHelloMessage(res.data.message))
//       .catch((err) => console.error("Erreur :", err));
//   }, []);

//   // GET /api/test
//   useEffect(() => {
//     axios
//       .get<{ message: string }>("/api/test")
//       .then((res) => setTestMessage(res.data.message))
//       .catch((err) => console.error("Erreur :", err));
//   }, []);

//   // GET /api/users
//   useEffect(() => {
//     axios
//       .get<User[]>("/api/users")
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.error("Erreur :", err));
//   }, []);

//   // POST /api/users
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post<{ message: string; user: User }>(
//         "/api/users",
//         newUser
//       );
//       console.log("Utilisateur créé :", res.data);
//       setUsers([...users, res.data.user]);
//       setNewUser({ name: "", email: "" });
//     } catch (err) {
//       console.error("Erreur lors de la création :", err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Test Backend</h1>
//       <h2>GET /api/hello</h2>
//       <p>{helloMessage}</p>

//       <h2>GET /api/test</h2>
//       <p>{testMessage}</p>

//       <h2>Liste des utilisateurs (GET /api/users)</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user._id}>
//             {user.name} - {user.email}
//           </li>
//         ))}
//       </ul>

//       <h2>Créer un utilisateur (POST /api/users)</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Nom"
//           value={newUser.name}
//           onChange={(e) =>
//             setNewUser({ ...newUser, name: e.target.value })
//           }
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={newUser.email}
//           onChange={(e) =>
//             setNewUser({ ...newUser, email: e.target.value })
//           }
//         />
//         <button type="submit">Ajouter</button>
//       </form>
//     </div>
//   );
// }

// export default App;






import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import AperçuContent from "../../content/AperçuContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        className="first-content-block" //classe pour spécifier quelques choses
        direction="right"
        title={
          <img
            src="/img/altus_mot_SB.png"
            alt="Title"
            style={{ width: "200px" }}
          />
        }
        content={IntroContent.text}
        // button={IntroContent.button}   (code sans photo)
        button={IntroContent.button.map((btn) => ({
          ...btn,
          imageSrc: btn.imageSrc || "",
        }))}
        icon="khalfiya_SB.png"
        id="intro"
      />
      <MiddleBlock
        id="apercu"
        title={AperçuContent.title}
        content={AperçuContent.text}
        button={AperçuContent.button}
      />
      <ContentBlock
        direction="left"
        title={AboutContent.title}
        content={AboutContent.text}
        section={AboutContent.section}
        icon="graphs.svg"
        id="about"
      />
      <ContentBlock
        direction="right"
        title={MissionContent.title}
        content={MissionContent.text}
        icon="product-launch.svg"
        id="mission"
      />
      <ContentBlock
        direction="left"
        title={ProductContent.title}
        content={ProductContent.text}
        icon="waving.svg"
        id="product"
      />
      <Contact
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
    </Container>
  );
};

export default Home;

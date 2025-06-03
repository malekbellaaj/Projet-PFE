// frontend/src/users/Connection/FaceConnection/login/FaceDetectionBox.jsx
import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function FaceDetectionBox({ setErrorMessage, setOpen }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [localError, setLocalError] = useState("");
  const navigate = useHistory();

  // Charger les modèles de face-api.js
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      try {
        console.log("Chargement des modèles depuis", MODEL_URL);
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        setModelsLoaded(true);
        console.log("Modèles chargés avec succès");
      } catch (error) {
        console.error("Erreur lors du chargement des modèles", error);
        const message = "Erreur lors du chargement des modèles de détection.";
        if (typeof setErrorMessage === "function" && typeof setOpen === "function") {
          setErrorMessage(message);
          setOpen(true);
        }
      }
    };

    loadModels();
  }, [setErrorMessage, setOpen]);

  // Démarrer la caméra
  useEffect(() => {
    const startCamera = async () => {
      try {
        console.log("Démarrage de la caméra...");
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        console.log("Caméra démarrée avec succès");
      } catch (error) {
        console.error("Erreur accès caméra", error);
        setCameraError(true);
        const message = "Erreur : Impossible d'accéder à la caméra. Vérifiez les permissions.";
        if (typeof setErrorMessage === "function" && typeof setOpen === "function") {
          setErrorMessage(message);
          setOpen(true);
        }
      }
    };

    if (modelsLoaded) {
      startCamera();
    }
  }, [modelsLoaded, setErrorMessage, setOpen]);

  // Détection faciale en temps réel
  useEffect(() => {
    let intervalId;

    const detectFace = async () => {
      if (!videoRef.current || !canvasRef.current || !isDetecting) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      try {
        const detections = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 }))
          .withFaceLandmarks()
          .withFaceDescriptor()
          .withFaceExpressions();

        if (detections) {
          const displaySize = { width: video.videoWidth, height: video.videoHeight };
          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
          faceapi.matchDimensions(canvas, displaySize);
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }
      } catch (error) {
        console.error("Erreur lors de la détection faciale :", error);
      }
    };

    if (isDetecting && modelsLoaded && videoRef.current) {
      intervalId = setInterval(detectFace, 100);
    }

    return () => clearInterval(intervalId);
  }, [isDetecting, modelsLoaded]);

  // Capturer le visage et envoyer au backend
  const handleCapture = async () => {
  console.log("handleCapture - Début");
  if (typeof setErrorMessage !== "function" || typeof setOpen !== "function") {
    console.error("setErrorMessage ou setOpen n'est pas une fonction");
    return;
  }
  if (!videoRef.current || !modelsLoaded) {
    console.log("handleCapture - Conditions non remplies", { videoRef: !!videoRef.current, modelsLoaded });
    const message = "Caméra ou modèles non initialisés.";
    setErrorMessage(message);
    setOpen(true);
    return;
  }

  try {
    console.log("Arrêt de la détection");
    setIsDetecting(false);

    console.log("Détection du visage...");
    const video = videoRef.current;
    const detections = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 }))
      .withFaceLandmarks()
      .withFaceDescriptor()
      .withFaceExpressions();

    if (!detections) {
      console.log("handleCapture - Aucun visage détecté");
      setErrorMessage("Aucun visage détecté. Veuillez réessayer.");
      setOpen(true);
      setIsDetecting(true);
      return;
    }

    console.log("Visage détecté, extraction du descripteur");
    const descriptor = Array.from(detections.descriptor);

    console.log("Envoi de la requête au backend...");
    const response = await axios.post(
      "http://localhost:5000/api/students/login-face",
      { descriptor },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Réponse du backend reçue", { 
      status: response.status, 
      token: response.data.token, 
      user: response.data.user 
    });

    if (response.status === 200) {
      if (!response.data.token) {
        console.error("Erreur: Aucun token reçu dans la réponse backend");
        throw new Error("Aucun token reçu");
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("role", "student");
      localStorage.setItem("studentSituation", response.data.user.studentSituation);
      console.log("localStorage mis à jour:", {
        token: response.data.token,
        role: "student",
        studentSituation: response.data.user.studentSituation,
      });

      let redirectPath;
      if (response.data.user.studentSituation === "normal") {
        redirectPath = "/dashboard-student";
      } else if (response.data.user.studentSituation === "hyperactif") {
        redirectPath = "/dashboard-student-hyperactif";
      } else {
        throw new Error(`Situation de l'élève non prise en charge: ${response.data.user.studentSituation}`);
      }

      console.log("Authentification réussie, redirection vers", redirectPath);
      navigate.push(redirectPath);
    }
  } catch (error) {
    console.error("Erreur dans handleCapture", error);
    const message = error.response?.data?.message || "Aucun visage correspondant trouvé.";
    setErrorMessage(message);
    setOpen(true);
    setIsDetecting(true);
  }
};

  const handleStart = () => {
    console.log("Démarrage de la détection");
    setIsDetecting(true);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {cameraError || localError ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 2,
            textAlign: "center",
          }}
        >
          <Typography color="error">
            {localError || "Impossible d'accéder à la caméra. Vérifiez les permissions de votre navigateur."}
          </Typography>
        </Box>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "16px 0 0 16px",
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleStart}
              disabled={isDetecting}
            >
              Démarrer la détection
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCapture}
              disabled={!isDetecting}
            >
              Capturer le visage
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}















// // frontend/src/users/Connection/FaceConnection/login/FaceDetectionBox.jsx
// import React, { useRef, useEffect, useState } from "react";
// import * as faceapi from "face-api.js";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// export default function FaceDetectionBox({ setErrorMessage, setOpen }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [cameraError, setCameraError] = useState(false);
//   const [isDetecting, setIsDetecting] = useState(false);
//   const [localError, setLocalError] = useState("");
//   const navigate = useHistory();

//   // Charger les modèles de face-api.js
//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = process.env.PUBLIC_URL + "/models";
//       try {
//         console.log("Chargement des modèles depuis", MODEL_URL);
//         await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
//         setModelsLoaded(true);
//         console.log("Modèles chargés avec succès");
//       } catch (error) {
//         console.error("Erreur lors du chargement des modèles", error);
//         const message = "Erreur lors du chargement des modèles de détection.";
//         if (typeof setErrorMessage === "function" && typeof setOpen === "function") {
//           setErrorMessage(message);
//           setOpen(true);
//         }
//       }
//     };

//     loadModels();
//   }, [setErrorMessage, setOpen]);

//   // Démarrer la caméra
//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         console.log("Démarrage de la caméra...");
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         videoRef.current.srcObject = stream;
//         console.log("Caméra démarrée avec succès");
//       } catch (error) {
//         console.error("Erreur accès caméra", error);
//         setCameraError(true);
//         const message = "Erreur : Impossible d'accéder à la caméra. Vérifiez les permissions.";
//         if (typeof setErrorMessage === "function" && typeof setOpen === "function") {
//           setErrorMessage(message);
//           setOpen(true);
//         }
//       }
//     };

//     if (modelsLoaded) {
//       startCamera();
//     }
//   }, [modelsLoaded, setErrorMessage, setOpen]);

//   // Détection faciale en temps réel
//   useEffect(() => {
//     let intervalId;

//     const detectFace = async () => {
//       if (!videoRef.current || !canvasRef.current || !isDetecting) return;

//       const video = videoRef.current;
//       const canvas = canvasRef.current;

//       try {
//         const detections = await faceapi
//           .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 }))
//           .withFaceLandmarks()
//           .withFaceDescriptor()
//           .withFaceExpressions();

//         if (detections) {
//           const displaySize = { width: video.videoWidth, height: video.videoHeight };
//           canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
//           faceapi.matchDimensions(canvas, displaySize);
//           const resizedDetections = faceapi.resizeResults(detections, displaySize);
//           faceapi.draw.drawDetections(canvas, resizedDetections);
//           faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//           faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//         }
//       } catch (error) {
//         console.error("Erreur lors de la détection faciale :", error);
//       }
//     };

//     if (isDetecting && modelsLoaded && videoRef.current) {
//       intervalId = setInterval(detectFace, 100);
//     }

//     return () => clearInterval(intervalId);
//   }, [isDetecting, modelsLoaded]);

//   // Capturer le visage et envoyer au backend
//   const handleCapture = async () => {
//     console.log("handleCapture - Début");
//     if (typeof setErrorMessage !== "function" || typeof setOpen !== "function") {
//       console.error("setErrorMessage ou setOpen n'est pas une fonction");
//       return;
//     }
//     if (!videoRef.current || !modelsLoaded) {
//       console.log("handleCapture - Conditions non remplies", { videoRef: !!videoRef.current, modelsLoaded });
//       const message = "Caméra ou modèles non initialisés.";
//       setErrorMessage(message);
//       setOpen(true);
//       return;
//     }

//     try {
//       console.log("Arrêt de la détection");
//       setIsDetecting(false);

//       console.log("Détection du visage...");
//       const video = videoRef.current;
//       const detections = await faceapi
//         .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 }))
//         .withFaceLandmarks()
//         .withFaceDescriptor()
//         .withFaceExpressions();

//       if (!detections) {
//         console.log("handleCapture - Aucun visage détecté");
//         setErrorMessage("Aucun visage détecté. Veuillez réessayer.");
//         setOpen(true);
//         setIsDetecting(true);
//         return;
//       }

//       console.log("Visage détecté, extraction du descripteur");
//       const descriptor = Array.from(detections.descriptor);

//       console.log("Envoi de la requête au backend...");
//       const response = await axios.post(
//         "http://localhost:5000/api/students/login-face",
//         { descriptor },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       console.log("Réponse du backend reçue", response.status, response.data);
//       if (response.status === 200) {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         localStorage.setItem("role", "student");
//         console.log("Authentification réussie, redirection vers /dashboard-student");
//         navigate.push("/dashboard-student");
//       }
//     } catch (error) {
//       console.error("Erreur dans handleCapture", error);
//       const message = error.response?.data?.message || "Aucun visage correspondant trouvé.";
//       setErrorMessage(message);
//       setOpen(true);
//       setIsDetecting(true);
//     }
//   };

//   const handleStart = () => {
//     console.log("Démarrage de la détection");
//     setIsDetecting(true);
//   };

//   return (
//     <div style={{ position: "relative", width: "100%", height: "100%" }}>
//       {cameraError || localError ? (
//         <Box
//           sx={{
//             height: "100%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             px: 2,
//             textAlign: "center",
//           }}
//         >
//           <Typography color="error">
//             {localError || "Impossible d'accéder à la caméra. Vérifiez les permissions de votre navigateur."}
//           </Typography>
//         </Box>
//       ) : (
//         <>
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               borderRadius: "16px 0 0 16px",
//             }}
//           />
//           <canvas
//             ref={canvasRef}
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//             }}
//           />
//           <Box
//             sx={{
//               position: "absolute",
//               bottom: 20,
//               left: "50%",
//               transform: "translateX(-50%)",
//               display: "flex",
//               gap: 2,
//             }}
//           >
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleStart}
//               disabled={isDetecting}
//             >
//               Démarrer la détection
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleCapture}
//               disabled={!isDetecting}
//             >
//               Capturer le visage
//             </Button>
//           </Box>
//         </>
//       )}
//     </div>
//   );
// }




















// // frontend/src/users/Connection/FaceConnection/login/FaceDetectionBox.jsx
// import React, { useRef, useEffect, useState } from "react";
// import * as faceapi from "face-api.js";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// export default function FaceDetectionBox({ setErrorMessage, setOpen }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [cameraError, setCameraError] = useState(false);
//   const [isDetecting, setIsDetecting] = useState(false);
//   const [localError, setLocalError] = useState("");
//   const history = useHistory();

//   // Charger les modèles de face-api.js
//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = process.env.PUBLIC_URL + "/models";
      
//       try {
        
//         console.log("Chargement des modèles depuis", MODEL_URL);
//         await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
//         setModelsLoaded(true);
//         console.log("Modèles chargés avec succès");
//       } catch (error) {
//         console.error("Erreur lors du chargement des modèles", error);
//         const message = "Erreur lors du chargement des modèles de détection.";
//         setErrorMessage(message);
//         setOpen(true);
//       }
//     };

//     loadModels();
//   }, [setErrorMessage, setOpen]);

//   // Démarrer la caméra
//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         console.log("Démarrage de la caméra...");
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         videoRef.current.srcObject = stream;
//         console.log("Caméra démarrée avec succès");
//       } catch (error) {
//         console.error("Erreur accès caméra", error);
//         setCameraError(true);
//         const message = "Erreur : Impossible d'accéder à la caméra. Vérifiez les permissions.";
//         setErrorMessage(message);
//         setOpen(true);
//       }
//     };

//     if (modelsLoaded) {
//       startCamera();
//     }
//   }, [modelsLoaded, setErrorMessage, setOpen]);

//   // Détection faciale en temps réel
//   useEffect(() => {
//     let intervalId;

//     const detectFace = async () => {
//       if (!videoRef.current || !canvasRef.current || !isDetecting) return;

//       const video = videoRef.current;
//       const canvas = canvasRef.current;

//       try {
//         const detections = await faceapi
//           .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 }))
//           .withFaceLandmarks()
//           .withFaceDescriptor()
//           .withFaceExpressions();

//         if (detections) {
//           const displaySize = { width: video.videoWidth, height: video.videoHeight };
//           canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
//           faceapi.matchDimensions(canvas, displaySize);
//           const resizedDetections = faceapi.resizeResults(detections, displaySize);
//           faceapi.draw.drawDetections(canvas, resizedDetections);
//           faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//           faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//         }
//       } catch (error) {
//         console.error("Erreur lors de la détection faciale :", error);
//       }
//     };

//     if (isDetecting && modelsLoaded && videoRef.current) {
//       intervalId = setInterval(detectFace, 100);
//     }

//     return () => clearInterval(intervalId);
//   }, [isDetecting, modelsLoaded]);

//   // Capturer le visage et envoyer au backend
//   const handleCapture = async () => {
//   console.log("handleCapture - Début");
//   if (typeof setErrorMessage !== "function" || typeof setOpen !== "function") {
//     console.error("setErrorMessage ou setOpen n'est pas une fonction");
//     return;
//   }
//   if (!videoRef.current || !modelsLoaded) {
//     console.log("handleCapture - Conditions non remplies", { videoRef: !!videoRef.current, modelsLoaded });
//     const message = "Caméra ou modèles non initialisés.";
//     setErrorMessage(message);
//     setOpen(true);
//     return;
//   }

//   try {
//     console.log("Arrêt de la détection");
//     setIsDetecting(false);

//     console.log("Détection du visage...");
//     const video = videoRef.current;
//     const detections = await faceapi
//       .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 }))
//       .withFaceLandmarks()
//       .withFaceDescriptor()
//       .withFaceExpressions();

//     if (!detections) {
//       console.log("handleCapture - Aucun visage détecté");
//       setErrorMessage("Aucun visage détecté. Veuillez réessayer.");
//       setOpen(true);
//       setIsDetecting(true);
//       return;
//     }

//     console.log("Visage détecté, extraction du descripteur");
//     const descriptor = Array.from(detections.descriptor);

//     console.log("Envoi de la requête au backend...");
//     const response = await axios.post(
//       "http://localhost:5000/api/students/login-face",
//       { descriptor },
//       { headers: { "Content-Type": "application/json" } }
//     );

//     console.log("Réponse du backend reçue", response.status, response.data);
//     if (response.status === 200) {
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       localStorage.setItem("role", "student");
//       console.log("Authentification réussie, redirection vers /dashboard-student/test");
//       history.push("/dashboard-admin");
//     }
//   } catch (error) {
//     console.error("Erreur dans handleCapture", error);
//     const message = error.response?.data?.message || "Erreur lors de l'authentification faciale.";
//     setErrorMessage(message);
//     setOpen(true);
//     setIsDetecting(true);
//   }
// };

//   const handleStart = () => {
//     console.log("Démarrage de la détection");
//     setIsDetecting(true);
//   };

//   return (
//     <div style={{ position: "relative", width: "100%", height: "100%" }}>
//       {cameraError || localError ? (
//         <Box
//           sx={{
//             height: "100%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             px: 2,
//             textAlign: "center",
//           }}
//         >
//           <Typography color="error">
//             {localError || "Impossible d'accéder à la caméra. Vérifiez les permissions de votre navigateur."}
//           </Typography>
//         </Box>
//       ) : (
//         <>
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               borderRadius: "16px 0 0 16px",
//             }}
//           />
//           <canvas
//             ref={canvasRef}
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//             }}
//           />
//           <Box
//             sx={{
//               position: "absolute",
//               bottom: 20,
//               left: "50%",
//               transform: "translateX(-50%)",
//               display: "flex",
//               gap: 2,
//             }}
//           >
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleStart}
//               disabled={isDetecting}
//             >
//               Démarrer la détection
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleCapture}
//               disabled={!isDetecting}
//             >
//               Capturer le visage
//             </Button>
//           </Box>
//         </>
//       )}
//     </div>
//   );
// }

















// import React, { useRef, useEffect, useState } from "react";
// import * as faceapi from "face-api.js";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// export default function FaceDetectionBox({ setErrorMessage, setOpen }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [cameraError, setCameraError] = useState(false);
//   const [isDetecting, setIsDetecting] = useState(false);
//   const [localError, setLocalError] = useState(""); // Gestion d'erreur locale
//   const history = useHistory();

//   // Charger les modèles de face-api.js
//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = process.env.PUBLIC_URL + "/models";
//       try {
//         console.log("Chargement des modèles depuis", MODEL_URL);
//         await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
//         setModelsLoaded(true);
//         console.log("Modèles chargés avec succès");
//       } catch (error) {
//         console.error("Erreur lors du chargement des modèles", error);
//         const message = "Erreur lors du chargement des modèles de détection.";
//         if (typeof setErrorMessage === "function") {
//           setErrorMessage(message);
//           setOpen(true);
//         } else {
//           setLocalError(message);
//         }
//       }
//     };

//     loadModels();
//   }, [setErrorMessage, setOpen]);

//   // Démarrer la caméra
//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         console.log("Démarrage de la caméra...");
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         videoRef.current.srcObject = stream;
//         console.log("Caméra démarrée avec succès");
//       } catch (error) {
//         console.error("Erreur accès caméra", error);
//         setCameraError(true);
//         const message = "Erreur : Impossible d'accéder à la caméra. Vérifiez les permissions.";
//         if (typeof setErrorMessage === "function") {
//           setErrorMessage(message);
//           setOpen(true);
//         } else {
//           setLocalError(message);
//         }
//       }
//     };

//     if (modelsLoaded) {
//       startCamera();
//     }
//   }, [modelsLoaded]);

//   // Détection faciale en temps réel
//   useEffect(() => {
//     let intervalId;

//     const detectFace = async () => {
//       if (!videoRef.current || !canvasRef.current || !isDetecting) return;

//       const video = videoRef.current;
//       const canvas = canvasRef.current;

//       try {
//         const detections = await faceapi
//           .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 }))
//           .withFaceLandmarks()
//           .withFaceDescriptor()
//           .withFaceExpressions();

//         if (detections) {
//           const displaySize = { width: video.videoWidth, height: video.videoHeight };
//           canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
//           faceapi.matchDimensions(canvas, displaySize);
//           const resizedDetections = faceapi.resizeResults(detections, displaySize);
//           faceapi.draw.drawDetections(canvas, resizedDetections);
//           faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//           faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//         }
//       } catch (error) {
//         console.error("Erreur lors de la détection faciale :", error);
//       }
//     };

//     if (isDetecting && modelsLoaded && videoRef.current) {
//       intervalId = setInterval(detectFace, 100);
//     }

//     return () => clearInterval(intervalId);
//   }, [isDetecting, modelsLoaded]);

//   // Capturer le visage et envoyer au backend
//   const handleCapture = async () => {
//     console.log("handleCapture - Début");
//     if (!videoRef.current || !modelsLoaded) {
//       console.log("handleCapture - Conditions non remplies", { videoRef: !!videoRef.current, modelsLoaded });
//       const message = "Caméra ou modèles non initialisés.";
//       if (typeof setErrorMessage === "function") {
//         setErrorMessage(message);
//         setOpen(true);
//       } else {
//         setLocalError(message);
//       }
//       return;
//     }

//     try {
//       console.log("Arrêt de la détection");
//       setIsDetecting(false);

//       console.log("Détection du visage...");
//       const video = videoRef.current;
//       const detections = await faceapi
//         .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 }))
//         .withFaceLandmarks()
//         .withFaceDescriptor()
//         .withFaceExpressions();

//       if (!detections) {
//         console.log("handleCapture - Aucun visage détecté");
//         const message = "Aucun visage détecté. Veuillez réessayer.";
//         if (typeof setErrorMessage === "function") {
//           setErrorMessage(message);
//           setOpen(true);
//         } else {
//           console.warn("setErrorMessage n'est pas une fonction");
//           setLocalError(message);
//         }
//         setIsDetecting(true);
//         return;
//       }

//       console.log("Visage détecté, extraction du descripteur");
//       const descriptor = Array.from(detections.descriptor);

//       console.log("Envoi de la requête au backend...");
//       const response = await axios.post(
//         "http://localhost:5000/students/login-face",
//         { descriptor },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       console.log("Réponse du backend reçue", response.status, response.data);
//       if (response.status === 200) {
//         localStorage.setItem("token", response.data.token);
//         console.log("Authentification réussie, redirection vers /dashboard-student/test");
//         history.push("/dashboard-student/test");
//       }
//     } catch (error) {
//       console.error("Erreur dans handleCapture", error);
//       const message =
//         error.response?.data?.message || "Erreur lors de l'authentification faciale.";
//       if (typeof setErrorMessage === "function") {
//         setErrorMessage(message);
//         setOpen(true);
//       } else {
//         console.warn("setErrorMessage ou setOpen n'est pas une fonction");
//         setLocalError(message);
//       }
//       setIsDetecting(true);
//     }
//   };

//   const handleStart = () => {
//     console.log("Démarrage de la détection");
//     setIsDetecting(true);
//   };

//   return (
//     <div style={{ position: "relative", width: "100%", height: "100%" }}>
//       {cameraError || localError ? (
//         <Box
//           sx={{
//             height: "100%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             px: 2,
//             textAlign: "center",
//           }}
//         >
//           <Typography color="error">
//             {localError || "Impossible d'accéder à la caméra. Vérifiez les permissions de votre navigateur."}
//           </Typography>
//         </Box>
//       ) : (
//         <>
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               borderRadius: "16px 0 0 16px",
//             }}
//           />
//           <canvas
//             ref={canvasRef}
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//             }}
//           />
//           <Box
//             sx={{
//               position: "absolute",
//               bottom: 20,
//               left: "50%",
//               transform: "translateX(-50%)",
//               display: "flex",
//               gap: 2,
//             }}
//           >
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleStart}
//               disabled={isDetecting}
//             >
//               Démarrer la détection
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleCapture}
//               disabled={!isDetecting}
//             >
//               Capturer le visage
//             </Button>
//           </Box>
//         </>
//       )}
//     </div>
//   );
// }





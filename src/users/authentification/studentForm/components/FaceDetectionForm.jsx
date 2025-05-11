// import * as React from 'react';
// import { useEffect, useRef, useState } from 'react';
// import { Box, Typography, Alert } from '@mui/material';
// import * as faceapi from 'face-api.js';
// import FaceRecognition from './FaceRecognition';

// export default function FaceDetectionForm() {
//   const videoRef = useRef(null);
//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [detections, setDetections] = useState([]);
//   const [hasCaptured, setHasCaptured] = useState(false);

//   useEffect(() => {
//     // Charger les modèles face-api.js
//     const loadModels = async () => {
//       const MODEL_URL = process.env.PUBLIC_URL + '/models';
//       try {
//         await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
//         setModelsLoaded(true);
//       } catch (error) {
//         console.error('Erreur lors du chargement des modèles :', error);
//       }
//     };

//     loadModels();
//   }, []);

//   const handleVideoOnPlay = () => {
//     const interval = setInterval(async () => {
//       if (videoRef.current) {
//         const detections = await faceapi
//           .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//           .withFaceLandmarks()
//           .withFaceExpressions();
//         setDetections(detections);
//       }
//     }, 100);
//     return () => clearInterval(interval);
//   };

//   const handleCapture = (imageData) => {
//     setHasCaptured(true);
//     console.log('Image capturée :', imageData);
//   };

//   return (
//     <Box sx={{ mt: 2, mb: 4, textAlign: 'center' }}>
//       <Typography variant="h6" gutterBottom sx={{ color: '#16206d' }}>
//         Détection de visage
//       </Typography>
//       <Typography variant="body1" sx={{ mb: 2, color: '#16206d' }}>
//         Veuillez positionner votre visage devant la webcam et cliquer sur "Capturer l’image" pour vérifier votre identité.
//       </Typography>
//       {modelsLoaded ? (
//         <>
//           <FaceRecognition
//             videoRef={videoRef}
//             handleVideoOnPlay={handleVideoOnPlay}
//             detections={detections}
//             onCapture={handleCapture}
//           />
//           {!hasCaptured && (
//             <Alert severity="warning" sx={{ mt: 2 }}>
//               Veuillez capturer une image pour continuer.
//             </Alert>
//           )}
//         </>
//       ) : (
//         <Alert severity="info" sx={{ mt: 2 }}>
//           Chargement des modèles de détection de visage...
//         </Alert>
//       )}
//     </Box>
//   );
// }












// import * as React from 'react';
// import { useEffect, useRef, useState } from 'react';
// import { Box, Typography, Alert } from '@mui/material';
// import * as faceapi from 'face-api.js';
// import FaceRecognition from './FaceRecognition';

// export default function FaceDetectionForm({ setFaceImage, setHasCapturedFace }) {
//   const videoRef = useRef(null);
//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [detections, setDetections] = useState([]);
//   const [hasCaptured, setHasCaptured] = useState(false);

//   useEffect(() => {
//     // Charger les modèles face-api.js
//     const loadModels = async () => {
//       const MODEL_URL = process.env.PUBLIC_URL + '/models';
//       try {
//         await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
//         setModelsLoaded(true);
//       } catch (error) {
//         console.error('Erreur lors du chargement des modèles :', error);
//       }
//     };

//     loadModels();
//   }, []);

//   const handleVideoOnPlay = () => {
//     const interval = setInterval(async () => {
//       if (videoRef.current) {
//         const detections = await faceapi
//           .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//           .withFaceLandmarks()
//           .withFaceExpressions();
//         setDetections(detections);
//       }
//     }, 100);
//     return () => clearInterval(interval);
//   };

//   const handleCapture = (imageBlob) => {
//     setHasCaptured(true);
//     setHasCapturedFace(true);
//     setFaceImage(imageBlob);
//     console.log('Image capturée (Blob) :', imageBlob);
//   };

//   return (
//     <Box sx={{ mt: 2, mb: 4, textAlign: 'center' }}>
//       <Typography variant="h6" gutterBottom sx={{ color: '#16206d' }}>
//         Détection de visage
//       </Typography>
//       <Typography variant="body1" sx={{ mb: 2, color: '#16206d' }}>
//         Veuillez positionner votre visage devant la webcam et cliquer sur "Capturer l’image" pour vérifier votre identité.
//       </Typography>
//       {modelsLoaded ? (
//         <>
//           <FaceRecognition
//             videoRef={videoRef}
//             handleVideoOnPlay={handleVideoOnPlay}
//             detections={detections}
//             onCapture={handleCapture}
//           />
//           {!hasCaptured && (
//             <Alert severity="warning" sx={{ mt: 2 }}>
//               Veuillez capturer une image pour continuer.
//             </Alert>
//           )}
//         </>
//       ) : (
//         <Alert severity="info" sx={{ mt: 2 }}>
//           Chargement des modèles de détection de visage...
//         </Alert>
//       )}
//     </Box>
//   );
// }
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import * as faceapi from 'face-api.js';
import FaceRecognition from './FaceRecognition';

export default function FaceDetectionForm({ onFaceCapture }) {
  const videoRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detections, setDetections] = useState([]);
  const [hasCaptured, setHasCaptured] = useState(false);

  useEffect(() => {
    // Charger les modèles face-api.js
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        setModelsLoaded(true);
      } catch (error) {
        console.error('Erreur lors du chargement des modèles :', error);
      }
    };

    loadModels();
  }, []);

  const handleVideoOnPlay = () => {
    const interval = setInterval(async () => {
      if (videoRef.current) {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();
        setDetections(detections);
      }
    }, 100);
    return () => clearInterval(interval);
  };

  const handleCapture = (imageData) => {
    setHasCaptured(!!imageData);
    onFaceCapture(imageData); // Transmettre l'image ou null à MainForm
    console.log('Image capturée :', imageData);
  };

  return (
    <Box sx={{ mt: 2, mb: 4, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#16206d' }}>
        Détection de visage
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: '#16206d' }}>
        Veuillez positionner votre visage devant la webcam et cliquer sur "Capturer l’image" pour vérifier votre identité.
      </Typography>
      {modelsLoaded ? (
        <>
          <FaceRecognition
            videoRef={videoRef}
            handleVideoOnPlay={handleVideoOnPlay}
            detections={detections}
            onCapture={handleCapture}
          />
          {!hasCaptured && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Veuillez capturer une image pour continuer.
            </Alert>
          )}
        </>
      ) : (
        <Alert severity="info" sx={{ mt: 2 }}>
          Chargement des modèles de détection de visage...
        </Alert>
      )}
    </Box>
  );
}
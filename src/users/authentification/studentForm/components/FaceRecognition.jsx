// import React, { useEffect, useRef, useState } from 'react';
// import * as faceapi from 'face-api.js';
// import './FaceRecognition.css';

// const FaceRecognition = ({ videoRef, handleVideoOnPlay, detections, onCapture }) => {
//   const [capturedImages, setCapturedImages] = useState([]);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const startVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: {} })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((err) => console.error('Erreur d’accès à la webcam :', err));
//     };

//     startVideo();
//   }, [videoRef]);

//   useEffect(() => {
//     if (videoRef.current && detections.length > 0) {
//       const canvas = canvasRef.current;
//       const displaySize = {
//         width: videoRef.current.width,
//         height: videoRef.current.height,
//       };
//       faceapi.matchDimensions(canvas, displaySize);

//       const context = canvas.getContext('2d');
//       context.clearRect(0, 0, canvas.width, canvas.height);
//       const resizedDetections = faceapi.resizeResults(detections, displaySize);
//       faceapi.draw.drawDetections(canvas, resizedDetections);
//       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//       faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//     }
//   }, [detections, videoRef]);

//   const captureImage = () => {
//     const video = videoRef.current;
//     if (video && detections.length > 0) {
//       const canvas = document.createElement('canvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       const resizedDetections = faceapi.resizeResults(detections, {
//         width: canvas.width,
//         height: canvas.height,
//       });
//       faceapi.draw.drawDetections(canvas, resizedDetections);
//       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//       faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

//       const dataUrl = canvas.toDataURL('image/jpeg');
//       setCapturedImages([...capturedImages, dataUrl]);
//       onCapture(dataUrl); // Notifier la capture

//       // Envoi de l'image au serveur (optionnel, conservé pour compatibilité)
//       const byteString = atob(dataUrl.split(',')[1]);
//       const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       const formData = new FormData();
//       formData.append('image', blob, 'capture.jpg');

//       fetch('http://localhost:5000/upload', {
//         method: 'POST',
//         body: formData,
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Échec de l’upload de l’image.');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log('Image enregistrée avec succès :', data);
//         })
//         .catch((error) => {
//           console.error('Erreur lors de l’enregistrement de l’image :', error);
//         });
//     }
//   };

//   return (
//     <div className="face-recognition-container">
//       <div style={{ position: 'relative', maxWidth: '720px', width: '100%' }}>
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           onPlay={handleVideoOnPlay}
//           width="720"
//           height="560"
//           className="video-element"
//         />
//         <canvas
//           ref={canvasRef}
//           className="canvas-element"
//           width="720"
//           height="560"
//         />
//       </div>
//       <button
//         onClick={captureImage}
//         className="capture-button"
//         disabled={detections.length === 0}
//       >
//         Capturer l’image
//       </button>
//       <div className="captured-images-container">
//         {capturedImages.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Capture ${index}`}
//             className="captured-image"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };








// import React, { useEffect, useRef, useState } from 'react';
// import * as faceapi from 'face-api.js';
// import './FaceRecognition.css';

// const FaceRecognition = ({ videoRef, handleVideoOnPlay, detections, onCapture }) => {
//   const [capturedImages, setCapturedImages] = useState([]);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const startVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: {} })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((err) => console.error('Erreur d’accès à la webcam :', err));
//     };

//     startVideo();
//   }, [videoRef]);

//   useEffect(() => {
//     if (videoRef.current && detections.length > 0) {
//       const canvas = canvasRef.current;
//       const displaySize = {
//         width: videoRef.current.width,
//         height: videoRef.current.height,
//       };
//       faceapi.matchDimensions(canvas, displaySize);

//       const context = canvas.getContext('2d');
//       context.clearRect(0, 0, canvas.width, canvas.height);
//       const resizedDetections = faceapi.resizeResults(detections, displaySize);
//       faceapi.draw.drawDetections(canvas, resizedDetections);
//       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//       faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//     }
//   }, [detections, videoRef]);

//   const captureImage = () => {
//     const video = videoRef.current;
//     if (video && detections.length > 0) {
//       const canvas = document.createElement('canvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       const resizedDetections = faceapi.resizeResults(detections, {
//         width: canvas.width,
//         height: canvas.height,
//       });
//       faceapi.draw.drawDetections(canvas, resizedDetections);
//       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//       faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

//       const dataUrl = canvas.toDataURL('image/jpeg');
//       setCapturedImages([...capturedImages, dataUrl]);

//       // Convertir dataUrl en Blob pour FormData
//       const byteString = atob(dataUrl.split(',')[1]);
//       const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       // Appeler onCapture avec le Blob
//       onCapture(blob);
//     }
//   };

//   return (
//     <div className="face-recognition-container">
//       <div style={{ position: 'relative', maxWidth: '720px', width: '100%' }}>
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           onPlay={handleVideoOnPlay}
//           width="720"
//           height="560"
//           className="video-element"
//         />
//         <canvas
//           ref={canvasRef}
//           className="canvas-element"
//           width="720"
//           height="560"
//         />
//       </div>
//       <button
//         onClick={captureImage}
//         className="capture-button"
//         disabled={detections.length === 0}
//       >
//         Capturer l’image
//       </button>
//       <div className="captured-images-container">
//         {capturedImages.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Capture ${index}`}
//             className="captured-image"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FaceRecognition;
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './FaceRecognition.css';

const FaceRecognition = ({ videoRef, handleVideoOnPlay, detections, onCapture }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error('Erreur d’accès à la webcam :', err));
    };

    startVideo();
  }, [videoRef]);

  useEffect(() => {
    if (videoRef.current && detections.length > 0) {
      const canvas = canvasRef.current;
      const displaySize = {
        width: videoRef.current.width,
        height: videoRef.current.height,
      };
      faceapi.matchDimensions(canvas, displaySize);

      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }
  }, [detections, videoRef]);

  const captureImage = () => {
    const video = videoRef.current;
    if (video && detections.length > 0) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const resizedDetections = faceapi.resizeResults(detections, {
        width: canvas.width,
        height: canvas.height,
      });
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      setIsEditing(false);
      onCapture(dataUrl); // Notifier la capture

      // Convertir dataUrl en Blob pour l'upload
      const byteString = atob(dataUrl.split(',')[1]);
      const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      const formData = new FormData();
      formData.append('image', blob, 'capture.jpg');

      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Échec de l’upload de l’image.');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Image enregistrée avec succès (serveur temporaire) :', data);
        })
        .catch((error) => {
          console.error('Erreur lors de l’enregistrement de l’image (serveur temporaire) :', error);
        });
    }
  };

  const handleEdit = () => {
    setCapturedImage(null);
    setIsEditing(true);
    onCapture(null); // Notifier la suppression
  };

  return (
    <div className="face-recognition-container">
      <div style={{ position: 'relative', maxWidth: '720px', width: '100%' }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          onPlay={handleVideoOnPlay}
          width="720"
          height="560"
          className="video-element"
        />
        <canvas
          ref={canvasRef}
          className="canvas-element"
          width="720"
          height="560"
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {!isEditing && capturedImage ? (
          <button onClick={handleEdit} className="edit-button">
            Modifier
          </button>
        ) : (
          <button
            onClick={captureImage}
            className="capture-button"
            disabled={detections.length === 0}
          >
            Capturer l’image
          </button>
        )}
      </div>
      {capturedImage && (
        <div className="captured-images-container">
          <img
            src={capturedImage}
            alt="Capture"
            className="captured-image"
          />
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;





// // frontend/src/users/authentification/studentForm/components/FaceRecognition.jsx
// import React, { useEffect, useRef, useState } from 'react';
// import * as faceapi from 'face-api.js';
// import './FaceRecognition.css';

// const FaceRecognition = ({ videoRef, handleVideoOnPlay, detections, onCapture }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const startVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: {} })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((err) => console.error('Erreur d’accès à la webcam :', err));
//     };

//     startVideo();
//   }, [videoRef]);

//   useEffect(() => {
//     if (videoRef.current && detections.length > 0) {
//       const canvas = canvasRef.current;
//       const displaySize = {
//         width: videoRef.current.width,
//         height: videoRef.current.height,
//       };
//       faceapi.matchDimensions(canvas, displaySize);

//       const context = canvas.getContext('2d');
//       context.clearRect(0, 0, canvas.width, canvas.height);
//       const resizedDetections = faceapi.resizeResults(detections, displaySize);
//       faceapi.draw.drawDetections(canvas, resizedDetections);
//       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//       faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//     }
//   }, [detections, videoRef]);

//   const captureImage = () => {
//     const video = videoRef.current;
//     if (video && detections.length > 0) {
//       const canvas = document.createElement('canvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       const resizedDetections = faceapi.resizeResults(detections, {
//         width: canvas.width,
//         height: canvas.height,
//       });
//       faceapi.draw.drawDetections(canvas, resizedDetections);
//       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//       faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

//       const dataUrl = canvas.toDataURL('image/jpeg');
//       setCapturedImage(dataUrl);
//       setIsEditing(false);
//       onCapture(dataUrl); // Notifier la capture
//     }
//   };

//   const handleEdit = () => {
//     setCapturedImage(null);
//     setIsEditing(true);
//     onCapture(null); // Notifier la suppression
//   };

//   return (
//     <div className="face-recognition-container">
//       <div style={{ position: 'relative', maxWidth: '720px', width: '100%' }}>
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           onPlay={handleVideoOnPlay}
//           width="720"
//           height="560"
//           className="video-element"
//         />
//         <canvas
//           ref={canvasRef}
//           className="canvas-element"
//           width="720"
//           height="560"
//         />
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
//         {!isEditing && capturedImage ? (
//           <button onClick={handleEdit} className="edit-button">
//             Modifier
//           </button>
//         ) : (
//           <button
//             onClick={captureImage}
//             className="capture-button"
//             disabled={detections.length === 0}
//           >
//             Capturer l’image
//           </button>
//         )}
//       </div>
//       {capturedImage && (
//         <div className="captured-images-container">
//           <img
//             src={capturedImage}
//             alt="Capture"
//             className="captured-image"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FaceRecognition;
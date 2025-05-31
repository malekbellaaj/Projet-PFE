// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { subjects } from '../../data/mockData';
// import { Book, AlertTriangle } from 'lucide-react';
// import { useTranslation } from 'react-i18next';

// const SubjectDetail: React.FC = () => {
//   const { subjectId } = useParams<{ subjectId: string }>();
//   const { t } = useTranslation();
  
//   const subject = subjects.find((s) => s.id === subjectId);
  
//   if (!subject) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64">
//         <AlertTriangle size={48} className="text-yellow-500 mb-4" />
//         <h2 className="text-xl text-gray-700">Matière non trouvée</h2>
//         <Link to="/" className="mt-4 text-blue-600 hover:underline">
//           Retour à l'accueil
//         </Link>
//       </div>
//     );
//   }
  
//   return (
//     <div>
//       <div className="mb-8">
//         <div className="flex items-center mb-4">
//           <span className="text-4xl mr-3">{subject.icon}</span>
//           <h1 className="text-2xl font-bold text-blue-800">{subject.name}</h1>
//         </div>
//         <p className="text-gray-700">{subject.description}</p>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {subject.courses.map((course) => (
//           <Link
//             key={course.id}
//             to={`/subjects/${subject.id}/courses/${course.id}`}
//             className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
//           >
//             <div className="p-6">
//               <h3 className="text-xl font-semibold text-blue-700 mb-2">
//                 <span className="mr-2">📚</span>{course.title}
//               </h3>
//               <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
              
//               <div className="flex items-center justify-between text-sm">
//                 <span className="flex items-center text-gray-500">
//                   <Book size={16} className="mr-1" />
//                   {course.resources.length} {t('resources')}
//                 </span>
                
//                 {course.hasQuiz && (
//                   <span className="text-red-500 flex items-center">
//                     <span className="mr-1">🎯</span>
//                     {t('quiz')}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubjectDetail;
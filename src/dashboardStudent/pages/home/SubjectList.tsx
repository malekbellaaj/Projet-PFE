// import React from 'react';
// import { Link } from 'react-router-dom';
// import { subjects } from '../../data/mockData';
// import { Book } from 'lucide-react';

// const SubjectList: React.FC = () => {
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-6">Mes matières</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {subjects.map((subject) => (
//           <Link
//             key={subject.id}
//             to={`/subjects/${subject.id}`}
//             className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg"
//           >
//             <div className="flex items-center mb-4">
//               <span className="text-3xl mr-3">{subject.icon}</span>
//               <h3 className="text-xl font-semibold text-blue-800">{subject.name}</h3>
//             </div>
//             <p className="text-gray-600 line-clamp-3">{subject.description}</p>
//             <div className="mt-4 flex items-center text-blue-600">
//               <Book size={16} className="mr-2" />
//               <span>{subject.courses.length} cours disponibles</span>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubjectList;
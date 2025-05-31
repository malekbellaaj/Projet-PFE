import { ReactElement } from "react";
import { Stack, Grid, GridProps } from "@mui/material";
import StudentsTable from "./StudentsTable";

const Students = (): ReactElement => {
  return (
    <Grid
      container
      component="main"
      spacing={0}
      sx={{
        width: "100%",
        pt: { xs: 2, md: 4.375 },
        pb: { xs: 1, md: 0 },
        pl: 0,
        pr: 0,
      }}
    >
      <Grid
        item
        xs={12}
        component="div"
        {...({} as GridProps)}
        sx={{ px: { xs: 2, sm: 3 }, width: "100%" }}
      >
        <Stack
          bgcolor="background.paper"
          borderRadius={5}
          boxShadow={(theme) => theme.shadows[4]}
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <StudentsTable />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Students;




























// // frontend/src/dashboardAdmin/pages/élèves/Students.tsx

// import { ReactElement, useState } from "react";
// import { Stack, Grid, GridProps } from "@mui/material"; // Importer GridProps pour assertion de type
// import StudentsTable from "./StudentsTable";

// // Définir l'interface pour un élève
// interface Student {
//   id: number;
//   parentFullName: string; // Nom du parent
//   parentPhone: string; // Téléphone du parent
//   parentEmail: string; // Email du parent
//   studentFullName: string;
//   birthDate: string;
//   situation: string;
//   level: string;
//   photoUrl: string;
// }

// // Données d'exemple pour les élèves
// const initialStudents: Student[] = [
//   {
//     id: 1,
//     parentFullName: "Marie Martin",
//     parentPhone: "2020 1010",
//     parentEmail: "marie.martin@example.com",
//     studentFullName: "Luc Martin",
//     birthDate: "15/03/2010",
//     situation: "Normaux",
//     level: "4e",
//     photoUrl: "https://example.com/photos/luc.jpg ",
//   },
//   {
//     id: 2,
//     parentFullName: "Jean Garnier",
//     parentPhone: "3030 2020",
//     parentEmail: "jean.garnier@example.com",
//     studentFullName: "Sophie Garnier",
//     birthDate: "22/07/2009",
//     situation: "Sourd-muet",
//     level: "5e",
//     photoUrl: "https://example.com/photos/sophie.jpg ",
//   },
//   {
//     id: 3,
//     parentFullName: "Fatima Khadir",
//     parentPhone: "4040 3030",
//     parentEmail: "fatima.khadir@example.com",
//     studentFullName: "Omar Khadir",
//     birthDate: "10/11/2011",
//     situation: "Aveugle",
//     level: "3e",
//     photoUrl: "https://example.com/photos/omar.jpg ",
//   },
//   {
//     id: 4,
//     parentFullName: "Claire Dubois",
//     parentPhone: "5050 4040",
//     parentEmail: "claire.dubois@example.com",
//     studentFullName: "Clara Dubois",
//     birthDate: "05/05/2010",
//     situation: "Hyperactif",
//     level: "4e",
//     photoUrl: "https://example.com/photos/clara.jpg ",
//   },
// ];

// // Valeur par défaut de drawerWidth (tu peux aussi l'importer depuis main-layout si elle est définie ailleurs)
// // const drawerWidth = 278;

// const Students = (): ReactElement => {
//   const [students, setStudents] = useState<Student[]>(initialStudents);

//   return (
//     <Grid
//       container
//       component="main"
//       spacing={0}
//       sx={{
//         width: "100%",
//         pt: { xs: 2, md: 4.375 },
//         pb: { xs: 1, md: 0 },
//         pl: 0,
//         pr: 0,
//       }}
//     >
//       <Grid
//         item
//         xs={12}
//         component="div"
//         {...({} as GridProps)}
//         sx={{ px: { xs: 2, sm: 3 }, width: "100%" }}
//       >
//         <Stack
//           bgcolor="background.paper"
//           borderRadius={5}
//           boxShadow={(theme) => theme.shadows[4]}
//           sx={{
//             width: "100%",
//             overflow: "hidden",
//           }}
//         >
//           <StudentsTable students={students} setStudents={setStudents} />
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default Students;

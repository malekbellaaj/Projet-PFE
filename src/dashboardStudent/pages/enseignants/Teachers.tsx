import { ReactElement } from "react";
import { Stack, GridProps } from "@mui/material";
import Grid from "@mui/material/Grid";
import TeachersTable from "./TeachersTable";

const Teachers = (): ReactElement => {
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
          <Stack height={1}>
            <TeachersTable />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Teachers;














// import { ReactElement, useState } from "react";
// import { Stack, GridProps } from "@mui/material";
// import Grid from "@mui/material/Grid";
// // import { drawerWidth } from './../../layouts/main-layout';
// import TeachersTable from "./TeachersTable";

// // Interface pour un enseignant
// interface Teacher {
//   id: number;
//   fullName: string;
//   registrationNumber: string;
//   phone: string;
//   email: string;
//   specialty: string;
//   cvUrl: string;
//   isAccepted: boolean;
// }

// // Données d'exemple pour les enseignants
// const initialTeachers: Teacher[] = [
//   {
//     id: 1,
//     fullName: "Jean Dupont",
//     registrationNumber: "T12345",
//     phone: "1234 5678",
//     email: "jean.dupont@example.com",
//     specialty: "Mathématiques",
//     cvUrl: "https://example.com/cvs/jean.pdf",
//     isAccepted: true,
//   },
//   {
//     id: 2,
//     fullName: "Marie Curie",
//     registrationNumber: "T67890",
//     phone: "2345 6789",
//     email: "marie.curie@example.com",
//     specialty: "Physique",
//     cvUrl: "https://example.com/cvs/marie.pdf",
//     isAccepted: false,
//   },
//   {
//     id: 3,
//     fullName: "Ahmed Benali",
//     registrationNumber: "T11223",
//     phone: "3456 7890",
//     email: "ahmed.benali@example.com",
//     specialty: "Français",
//     cvUrl: "https://example.com/cvs/ahmed.pdf",
//     isAccepted: true,
//   },
// ];

// const Teachers = (): ReactElement => {
//   const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);

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
//           <Stack height={1}>
//             <TeachersTable
//               teachers={teachers}
//               setTeachers={setTeachers}
//               {...({ sx: { height: 1, width: "100%" } } as any)} // Contournement de l'erreur TS2322
//             />
//           </Stack>
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default Teachers;

import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function StudentReview({ formData }) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6" gutterBottom>
        Validation des informations
      </Typography>

      <Divider />

      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Nom et prénom du parent" />
          <Typography variant="body2">
            {formData.nom} {formData.ParentName}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Nom et prénom de l'élève" />
          <Typography variant="body2">
            {formData.nom} {formData.StudentName}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Email du parent" />
          <Typography variant="body2">{formData.email}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Numéro de téléphone" />
          <Typography variant="body2">{formData.phone}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Situation de l'élève" />
          <Typography variant="body2">{formData.studentSituation}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Date de naissance de l'élève" />
          <Typography variant="body2">{formData.birthDate}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Niveau scolaire" />
          <Typography variant="body2">{formData.schoolLevel}ᵉ année</Typography>
        </ListItem>
      </List>

      <Divider />

      <Typography variant="subtitle2" sx={{ mt: 2 }}>
        Déclaration
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Je confirme que les informations ci-dessus sont exactes et je souhaite
        inscrire mon enfant sur la plateforme ALTUS pour l’accompagner dans son
        apprentissage.
      </Typography>
    </Stack>
  );
}

//  page origine
// import * as React from 'react';
// import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
// const payments = [
//   { name: 'Card type:', detail: 'Visa' },
//   { name: 'Card holder:', detail: 'Mr. John Smith' },
//   { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date:', detail: '04/2024' },
// ];

// export default function Review() {
//   return (
//     <Stack spacing={2}>
//       <List disablePadding>
//         <ListItem sx={{ py: 1, px: 0 }}>
//           <ListItemText primary="Products" secondary="4 selected" />
//           <Typography variant="body2">$134.98</Typography>
//         </ListItem>
//         <ListItem sx={{ py: 1, px: 0 }}>
//           <ListItemText primary="Shipping" secondary="Plus taxes" />
//           <Typography variant="body2">$9.99</Typography>
//         </ListItem>
//         <ListItem sx={{ py: 1, px: 0 }}>
//           <ListItemText primary="Total" />
//           <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
//             $144.97
//           </Typography>
//         </ListItem>
//       </List>
//       <Divider />
//       <Stack
//         direction="column"
//         divider={<Divider flexItem />}
//         spacing={2}
//         sx={{ my: 2 }}
//       >
//         <div>
//           <Typography variant="subtitle2" gutterBottom>
//             Shipment details
//           </Typography>
//           <Typography gutterBottom>John Smith</Typography>
//           <Typography gutterBottom sx={{ color: 'text.secondary' }}>
//             {addresses.join(', ')}
//           </Typography>
//         </div>
//         <div>
//           <Typography variant="subtitle2" gutterBottom>
//             Payment details
//           </Typography>
//           <Grid container>
//             {payments.map((payment) => (
//               <React.Fragment key={payment.name}>
//                 <Stack
//                   direction="row"
//                   spacing={1}
//                   useFlexGap
//                   sx={{ width: '100%', mb: 1 }}
//                 >
//                   <Typography variant="body1" sx={{ color: 'text.secondary' }}>
//                     {payment.name}
//                   </Typography>
//                   <Typography variant="body2">{payment.detail}</Typography>
//                 </Stack>
//               </React.Fragment>
//             ))}
//           </Grid>
//         </div>
//       </Stack>
//     </Stack>
//   );
// }

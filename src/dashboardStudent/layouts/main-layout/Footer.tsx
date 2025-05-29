// ce footer est maintenant à supprimer 
import { Stack } from '@mui/material';

const Footer = () => {
  return (
    <Stack
      direction="row"
      justifyContent={{ xs: 'center', md: 'flex-end' }}
      ml={{ xs: 3.75, lg: 34.75 }}
      mr={3.75}
      my={3.75}
    ></Stack>
  );
};

export default Footer;

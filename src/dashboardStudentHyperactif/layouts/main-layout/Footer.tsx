import { Stack } from '@mui/material';

const Footer = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        py: 2,
        backgroundColor: '#baf4ff',
      }}
    >
      <span style={{ color: '#888' }}>© 2025 Altus - Tous droits réservés</span>
    </Stack>
  );
};

export default Footer;

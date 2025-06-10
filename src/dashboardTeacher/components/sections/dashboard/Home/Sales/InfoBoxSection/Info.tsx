// Importation des dépendances
import { ReactElement } from 'react';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import IconifyIcon from './../../../../../../components/base/IconifyIcon';
import Image from '../../../../../../components/base/Image';

// Interface des props du composant
type InfoProps = {
  image?: string; // Image ou icône (optionnelle)
  title: string; // Titre de la métrique (ex. : "Enseignants")
  count: number; // Nombre (ex. : 20 pour Enseignants)
  increment: number; // Pourcentage d'incrémentation (ex. : 10)
  date?: string; // Date (ex. : "29 Avril 2025")
};

// Définition du composant Info
const Info = ({ image, title, count, increment, date }: InfoProps): ReactElement => {
  return (
    // Carte Material-UI avec ombre et largeur pleine
    <Card
      sx={(theme) => ({
        boxShadow: theme.shadows[4],
        width: 1,
        height: 'auto',
      })}
    >
      {/* Section pour l'image */}
      <CardMedia
        sx={{
          maxWidth: 70,
          maxHeight: 70,
        }}
      >
        <Image src={`${image}`} width={1} height={1} /> {/* Affiche l'image (ex. : teachers.png) */}
      </CardMedia>
      <CardContent
        sx={{
          flex: '1 1 auto',
          padding: 0,
          ':last-child': {
            paddingBottom: 0,
          },
        }}
      >
        {/* Ligne pour le titre et la date */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Typography variant="subtitle1" component="p" minWidth={100} color="text.primary">
            {title} {/* Ex. : "Enseignants" */}
          </Typography>
          <Typography variant="body2" component="p" color="text.secondary">
            {date} {/* Ex. : "29 Avril 2025" */}
          </Typography>
        </Stack>
        {/* Affichage du nombre */}
        <Typography variant="body1" component="p" color="text.secondary">
          {count} {/* Ex. : 20 pour Enseignants */}
        </Typography>
        {/* Affichage du pourcentage d'incrémentation */}
        <Typography
          variant="body2"
          color="primary.main"
          display="flex"
          alignItems="center"
          gap={1}
          whiteSpace={'nowrap'}
        >
          <IconifyIcon icon="ph:trend-up-fill" width={16} height={16} /> {/* Icône de tendance */}
          {`+${increment}%`} dernier mois {/* Traduit en français */}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Exportation par défaut
export default Info;

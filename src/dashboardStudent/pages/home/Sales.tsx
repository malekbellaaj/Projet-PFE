import { Grid, Stack } from '@mui/material';
import { ReactElement } from 'react';

// Importation des composants personnalisés du tableau de bord
import TopSellingProduct from './../../components/sections/dashboard/Home/Sales/TopSellingProduct/TopSellingProduct';
import StudentsDistribution from './../../components/sections/dashboard/Home/Sales/StudentsDistribution/StudentsDistribution';
import InfoBoxCards from './../../components/sections/dashboard/Home/Sales/InfoBoxSection/InfoBoxCards';
import BuyersProfile from './../../components/sections/dashboard/Home/Sales/BuyersProfile/BuyersProfile';
import NewCustomers from './../../components/sections/dashboard/Home/Sales/NewCustomers/NewCustomers';
import StatisticsChart from './../../components/sections/dashboard/Home/Sales/CourbeStatistique/Statistics';
import { drawerWidth } from './../../layouts/main-layout';

const Sales = (): ReactElement => {
  return (
    <main>
      <Grid
        container
        spacing={3}
        sx={{
          flexGrow: 1,
          pt: 4.375,
          pr: 1.875,
          pb: 0,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          pl: { xs: 3.75, lg: 0 },
        }}
      >
        <Grid
          sx={{
            width: { xs: '100%' },
          }}
        >
          <InfoBoxCards />
        </Grid>
        <Grid
          sx={{
            width: { xs: '100%', md: '66.666%' },
          }}
        >
          <StatisticsChart />
        </Grid>
        <Grid
          sx={{
            width: { xs: '100%', md: '33.333%' },
          }}
        >
          <StudentsDistribution />
        </Grid>
        <Grid
          sx={{
            width: { xs: '100%', lg: '66.666%' },
          }}
        >
          <TopSellingProduct />
        </Grid>
        <Grid
          sx={{
            width: { xs: '100%', lg: '33.333%' },
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row', lg: 'column' }}
            spacing={3}
            height="100%"
            width="100%"
          >
            <NewCustomers />
            <BuyersProfile />
          </Stack>
        </Grid>
      </Grid>
    </main>
  );
};

export default Sales;
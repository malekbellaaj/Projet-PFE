import { Grid, Stack } from "@mui/material";
import { ReactElement } from "react";

// Importation des types pour une meilleure compatibilité
import { GridProps } from "@mui/material/Grid";

// Importation des composants personnalisés du tableau de bord
import TopSellingProduct from "../../components/sections/dashboard/Home/Sales/TopSellingProduct/TopSellingProduct";
import StudentsDistribution from "../../components/sections/dashboard/Home/Sales/StudentsDistribution/StudentsDistribution";
import InfoBoxCards from "../../components/sections/dashboard/Home/Sales/InfoBoxSection/InfoBoxCards";
import BuyersProfile from "../../components/sections/dashboard/Home/Sales/BuyersProfile/BuyersProfile";
import NewCustomers from "../../components/sections/dashboard/Home/Sales/NewCustomers/NewCustomers";
import StatisticsChart from "../../components/sections/dashboard/Home/Sales/CourbeStatistique/Statistics";
// import matt from "../../components/sections/dashboard/Home/Matières/matièresImages";

// import { drawerWidth } from "./../../layouts/main-layout";













const Sales = (): ReactElement => {
  return (
    <main>
      <Grid
        container
        spacing={4} //espacement etre les infoBoxCards et (courbe et studentdistribution)
        sx={{
          flexGrow: 1,
          height: "100%",
          width: "100%",
          pt: { xs: 2, md: 4.375 },
          pb: { xs: 1, md: 0 },
          pl: 0,
          pr: 0,
        }}
      >
        <Grid
          item
          component="div"
          xs={12}
          {...({} as GridProps)}
          sx={{ width: "100%", padding: 0 }}
        >
          <InfoBoxCards />
        </Grid>
        <Grid
          container
          component="div"
          spacing={4}
          sx={{
            width: "100%",
            padding: 0,
            flexWrap: { xs: "wrap", md: "nowrap" }, // nowrap sur md pour rester sur la même ligne
            alignItems: "stretch", // Alignement vertical
          }}
        >
          <Grid
            item
            component="div"
            xs={12}
            md={8}
            {...({} as GridProps)}
            sx={{ width: { xs: "100%", md: "66.66%" }, padding: 0 }}
          >
            <StatisticsChart />
          </Grid>
          <Grid
            item
            component="div"
            xs={12}
            md={4}
            {...({} as GridProps)}
            sx={{ width: { xs: "100%", md: "33.33%" }, padding: 0 }}
          >
            <StudentsDistribution />
          </Grid>
        </Grid>
        <Grid item component="div" xs={12} md={8} {...({} as GridProps)}>
          <TopSellingProduct />
        </Grid>
        <Grid item component="div" xs={12} md={4} {...({} as GridProps)}>
          <Stack
            direction={{ xs: "column", sm: "row", md: "column" }}
            spacing={3}
            sx={{ height: "100%", width: "100%" }}
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

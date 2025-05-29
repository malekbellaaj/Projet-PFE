// import { PaginationItem, TablePaginationProps, Typography } from '@mui/material';
// import {
//   GridPagination,
//   gridExpandedRowCountSelector,
//   gridPageCountSelector,
//   gridPaginationRowRangeSelector,
//   useGridApiContext,
//   useGridSelector,
// } from '@mui/x-data-grid';
// import MuiPagination from '@mui/material/Pagination';
// import { useBreakpoints } from '../../../../../../providers/BreakpointsProvider';

// function Pagination({
//   page,
//   className,
// }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className' | 'ref'>) {
//   const apiRef = useGridApiContext();
//   const { down } = useBreakpoints();
//   const belowSmallScreen = down('sm');

//   const pageCount = useGridSelector(apiRef, gridPageCountSelector);
//   const available = useGridSelector(apiRef, gridExpandedRowCountSelector);
//   const paginationRowRange = useGridSelector(apiRef, gridPaginationRowRangeSelector);

//   return (
//     <>
//       {pageCount !== 0 ? (
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           mr="auto"
//           ml={belowSmallScreen ? 'auto' : ''}
//         >
//           Affichage de {(paginationRowRange?.firstRowIndex as number) + 1} à{' '}
//           {(paginationRowRange?.lastRowIndex as number) + 1} sur {available} réclamations
//         </Typography>
//       ) : (
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           mr="auto"
//           ml={belowSmallScreen ? 'auto' : ''}
//         >
//           <>Affichage de 0 à 0 sur {available} produits</>
//         </Typography>
//       )}
//       <MuiPagination
//         color="primary"
//         className={className}
//         count={pageCount}
//         page={page + 1}
//         onChange={(_event, newPage) => apiRef.current.setPage(newPage - 1)}
//         renderItem={(item) => (
//           <PaginationItem
//             {...item}
//             slots={{
//               previous: () => <>Précédent</>,
//               next: () => <>Suivant</>,
//             }}
//             sx={(theme) => ({
//               '&.Mui-selected': {
//                 color: theme.palette.common.white,
//               },
//               '&.Mui-disabled': {
//                 color: theme.palette.text.secondary,
//               },
//             })}
//           />
//         )}
//         sx={{
//           mx: { xs: 'auto', sm: 'initial' },
//         }}
//       />
//     </>
//   );
// }

// export default function CustomPagination(props: object) {
//   return <GridPagination ActionsComponent={Pagination} {...props} />;
// }
import { PaginationItem, TablePaginationProps, Typography } from '@mui/material';
import {
  GridPagination,
  gridExpandedRowCountSelector,
  gridPageCountSelector,
  gridPaginationRowRangeSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import { useBreakpoints } from '../../../../../../providers/BreakpointsProvider';

function Pagination({
  page,
  className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className' | 'ref'>) {
  const apiRef = useGridApiContext();
  const { useDown } = useBreakpoints();
  const belowSmallScreen = useDown('sm');

  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const available = useGridSelector(apiRef, gridExpandedRowCountSelector);
  const paginationRowRange = useGridSelector(apiRef, gridPaginationRowRangeSelector);

  return (
    <>
      {pageCount !== 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          mr="auto"
          ml={belowSmallScreen ? 'auto' : ''}
        >
          Affichage de {(paginationRowRange?.firstRowIndex as number) + 1} à{' '}
          {(paginationRowRange?.lastRowIndex as number) + 1} sur {available} réclamations
        </Typography>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          mr="auto"
          ml={belowSmallScreen ? 'auto' : ''}
        >
          <>Affichage de 0 à 0 sur {available} produits</>
        </Typography>
      )}
      <MuiPagination
        color="primary"
        className={className}
        count={pageCount}
        page={page + 1}
        onChange={(_event, newPage) => apiRef.current.setPage(newPage - 1)}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{
              previous: () => <>Précédent</>,
              next: () => <>Suivant</>,
            }}
            sx={(theme) => ({
              '&.Mui-selected': {
                color: theme.palette.common.white,
              },
              '&.Mui-disabled': {
                color: theme.palette.text.secondary,
              },
            })}
          />
        )}
        sx={{
          mx: { xs: 'auto', sm: 'initial' },
        }}
      />
    </>
  );
}

export default function CustomPagination(props: object) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
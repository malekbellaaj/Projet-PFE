import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

const Grid: Components<Omit<Theme, 'components'>>['MuiGrid'] = {
  defaultProps: {},
  styleOverrides: {
    root: () => ({
      marginRight: 0,
    }),
  },
};

export default Grid;
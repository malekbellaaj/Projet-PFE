import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Breakpoint, Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

interface BreakpointContextInterface {
  currentBreakpoint: Breakpoint;
  useUp: (key: Breakpoint | number) => boolean;
  useDown: (key: Breakpoint | number) => boolean;
  useOnly: (key: Breakpoint) => boolean;
  useBetween: (start: Breakpoint | number, end: Breakpoint | number) => boolean;
}

export const BreakpointContext = createContext({} as BreakpointContextInterface);

const BreakpointsProvider = ({ children }: PropsWithChildren) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xs');

  // Définir les queries pour chaque breakpoint
  const isXs = useMediaQuery<Theme>((theme) => theme.breakpoints.between('xs', 'sm'));
  const isSm = useMediaQuery<Theme>((theme) => theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery<Theme>((theme) => theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery<Theme>((theme) => theme.breakpoints.between('lg', 'xl'));
  const isXl = useMediaQuery<Theme>((theme) => theme.breakpoints.up('xl'));

  // Hooks personnalisés pour les queries de breakpoints
  const useUp = (key: Breakpoint | number) =>
    useMediaQuery<Theme>((theme) => theme.breakpoints.up(key));

  const useDown = (key: Breakpoint | number) =>
    useMediaQuery<Theme>((theme) => theme.breakpoints.down(key));

  const useOnly = (key: Breakpoint) =>
    useMediaQuery<Theme>((theme) => theme.breakpoints.only(key));

  const useBetween = (start: Breakpoint | number, end: Breakpoint | number) =>
    useMediaQuery<Theme>((theme) => theme.breakpoints.between(start, end));

  // Mettre à jour le breakpoint actuel
  useEffect(() => {
    if (isXs) {
      setCurrentBreakpoint('xs');
    } else if (isSm) {
      setCurrentBreakpoint('sm');
    } else if (isMd) {
      setCurrentBreakpoint('md');
    } else if (isLg) {
      setCurrentBreakpoint('lg');
    } else if (isXl) {
      setCurrentBreakpoint('xl');
    }
  }, [isXs, isSm, isMd, isLg, isXl]);

  return (
    <BreakpointContext.Provider
      value={{ currentBreakpoint, useUp, useDown, useOnly, useBetween }}
    >
      {children}
    </BreakpointContext.Provider>
  );
};

export const useBreakpoints = () => useContext(BreakpointContext);

export default BreakpointsProvider;












// import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
// import { Breakpoint, Theme } from '@mui/material';
// import { useMediaQuery } from '@mui/material';

// interface BreakpointContextInterface {
//   currentBreakpoint: Breakpoint;
//   up: (key: Breakpoint | number) => boolean;
//   down: (key: Breakpoint | number) => boolean;
//   only: (key: Breakpoint | number) => boolean;
//   between: (start: Breakpoint | number, end: Breakpoint | number) => boolean;
// }

// export const BreakpointContext = createContext({} as BreakpointContextInterface);

// const BreakpointsProvider = ({ children }: PropsWithChildren) => {
//   const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xs');
//   const up = (key: Breakpoint | number) =>
//     useMediaQuery<Theme>((theme) => theme.breakpoints.up(key));

//   const down = (key: Breakpoint | number) =>
//     useMediaQuery<Theme>((theme) => theme.breakpoints.down(key));

//   const only = (key: Breakpoint | number) =>
//     useMediaQuery<Theme>((theme) => theme.breakpoints.only(key as Breakpoint));

//   const between = (start: Breakpoint | number, end: Breakpoint | number) =>
//     useMediaQuery<Theme>((theme) => theme.breakpoints.between(start, end));

//   const isXs = between('xs', 'sm');
//   const isSm = between('sm', 'md');
//   const isMd = between('md', 'lg');
//   const isLg = between('lg', 'xl');
//   const isXl = up('xl');

//   useEffect(() => {
//     if (isXs) {
//       setCurrentBreakpoint('xs');
//     }
//     if (isSm) {
//       setCurrentBreakpoint('sm');
//     }
//     if (isMd) {
//       setCurrentBreakpoint('md');
//     }
//     if (isLg) {
//       setCurrentBreakpoint('lg');
//     }
//     if (isXl) {
//       setCurrentBreakpoint('xl');
//     }
//   }, [isXs, isSm, isMd, isLg, isXl]);

//   return (
//     <BreakpointContext.Provider value={{ currentBreakpoint, up, down, only, between }}>
//       {children}
//     </BreakpointContext.Provider>
//   );
// };

// export const useBreakpoints = () => useContext(BreakpointContext);

// export default BreakpointsProvider;

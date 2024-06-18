import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: "250px",
          // height:100,
          
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
       <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="100%" height="100%" viewBox="0 0 515.000000 173.000000"
 preserveAspectRatio="xMidYMid meet">
   <defs>
            <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
              <stop offset="0%" stopColor={PRIMARY_DARK} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>

            <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={PRIMARY_LIGHT} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>

            <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={PRIMARY_LIGHT} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>
          </defs>

<g transform="translate(0.000000,173.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path  fill="url(#BG1)" d="M987 1189 c-68 -10 -111 -33 -162 -90 -80 -89 -104 -212 -66 -337 38
-128 145 -202 290 -202 135 0 230 50 275 144 39 81 37 86 -34 86 -55 0 -60 -2
-66 -25 -3 -14 -21 -38 -39 -54 -134 -117 -325 -17 -325 170 0 71 12 104 53
148 39 41 84 61 134 61 82 0 147 -38 173 -101 12 -27 16 -29 72 -29 l61 0 -7
32 c-28 138 -181 222 -359 197z"/>
<path  fill="url(#BG2)" d="M335 1180 c-3 -6 -55 -145 -114 -310 l-108 -300 36 -1 c20 -1 43 -2
51 -3 29 -3 46 13 64 63 l18 52 136 -3 135 -3 16 -47 c9 -26 19 -49 22 -52 7
-7 127 -12 132 -6 4 5 -222 583 -236 608 -10 15 -143 17 -152 2z m129 -260
c26 -72 44 -135 41 -140 -10 -15 -185 -13 -185 3 0 20 84 267 91 267 4 0 28
-59 53 -130z"/>
<path  fill="url(#BG3)" d="M1596 1148 c-67 -179 -205 -573 -202 -575 3 -4 66 -6 103 -4 19 1 31
29 103 247 45 135 84 243 87 240 3 -2 44 -114 92 -248 l88 -243 64 3 c35 2 65
5 67 7 1 1 -51 139 -117 306 l-119 304 -75 3 -75 3 -16 -43z"/>
<path   fill="url(#BG1)"d="M2070 1132 l0 -60 148 -4 c163 -3 186 -10 222 -71 45 -74 35 -220
-19 -269 -42 -38 -89 -48 -228 -48 l-123 0 0 -57 0 -58 152 2 c188 3 227 12
289 72 57 55 81 126 81 236 0 99 -23 172 -72 227 -61 70 -97 80 -287 86 l-163
4 0 -60z"/>
<path  fill="url(#BG2)" d="M2690 1130 l0 -60 228 2 227 3 0 55 0 55 -227 3 -228 2 0 -60z"/>
<path fill="url(#BG3)"d="M3270 1179 c0 -15 270 -522 283 -530 5 -4 17 -5 26 -4 9 2 26 4 39 4
12 1 26 9 29 19 4 9 22 44 41 77 44 77 69 121 95 168 11 20 24 37 29 37 4 0 8
-85 8 -190 l0 -190 60 0 60 0 -2 308 -3 307 -60 0 -60 0 -103 -190 c-57 -104
-107 -194 -111 -198 -4 -4 -55 81 -113 190 l-106 198 -56 3 c-38 2 -56 -1 -56
-9z"/>
<path fill="url(#BG1)"d="M4060 1140 l0 -50 61 0 60 0 -3 48 -3 47 -57 3 -58 3 0 -51z"/>
<path  fill="url(#BG2)"d="M4263 1175 c3 -8 47 -75 97 -150 50 -75 89 -142 87 -148 -3 -7 -50
-77 -106 -157 -55 -79 -96 -147 -91 -150 7 -4 45 -5 107 -1 7 1 45 51 85 111
40 61 75 110 78 110 3 0 38 -51 79 -113 l73 -113 60 2 c33 1 61 4 62 6 2 2
-91 141 -207 311 l-209 307 -60 0 c-48 0 -59 -3 -55 -15z"/>
<path  fill="url(#BG3)"d="M4616 1116 c-25 -40 -46 -79 -46 -86 0 -13 49 -80 59 -80 3 0 19 21
35 48 17 26 49 77 73 113 24 36 43 69 43 73 0 3 -27 6 -59 6 l-59 0 -46 -74z"/>
<path  fill="url(#BG1)"d="M3263 796 l2 -229 55 0 55 0 2 119 3 119 -60 110 -60 110 3 -229z"/>
<path fill="url(#BG2)"d="M4060 790 l0 -220 60 0 60 0 -2 218 -3 217 -57 3 -58 3 0 -221z"/>
<path fill="url(#BG3)"d="M2690 875 l0 -55 228 2 227 3 0 50 0 50 -227 3 -228 2 0 -55z"/>
<path  fill="url(#BG1)" d="M2690 623 l0 -58 231 3 230 3 -3 52 -3 52 -227 3 -228 2 0 -57z"/>
</g>
</svg>

        {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
          <defs>
            <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
              <stop offset="0%" stopColor={PRIMARY_DARK} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>

            <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={PRIMARY_LIGHT} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>

            <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={PRIMARY_LIGHT} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>
          </defs>

          <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
            <path
              fill="url(#BG1)"
              d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
            />
            <path
              fill="url(#BG2)"
              d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
            />
            <path
              fill="url(#BG3)"
              d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
            />
          </g>
        </svg> */}
      </Box>
    );

    if (disabledLink) {
      return <>{logo}</>;
    }

    return (
      <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;

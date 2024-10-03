import { styled } from "@mui/material/styles";

export const drawerWidth = 240;

export const DrawerHeader = styled('div')(({ theme }) => ({
 display: 'flex',
 alignItems: 'center',
 padding: theme.spacing(0, 1),
 ...theme.mixins.toolbar,
 justifyContent: 'flex-end',
}));

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
 open?: boolean;
}>(({ theme, open }) => ({
 flexGrow: 1,
 padding: theme.spacing(3),
 transition: theme.transitions.create('margin', {
   easing: theme.transitions.easing.sharp,
   duration: theme.transitions.duration.leavingScreen,
 }),
 marginLeft: open ? 0 : `-${drawerWidth}px`,
}));
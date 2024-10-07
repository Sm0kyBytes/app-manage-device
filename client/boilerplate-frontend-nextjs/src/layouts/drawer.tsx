"use client";
import React from "react";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useRouter, usePathname } from "next/navigation";
import { Typography } from "@mui/material";
import * as context from "@/context";
import { DrawerHeader, drawerWidth } from "./styles";

interface DrawerProps {
    open?: boolean;
    handleDrawerClose?: () => void;
}

const CustomDrawer: React.FC<DrawerProps> = ({ open, handleDrawerClose }) => {
    const { setNavRoute } = context.useContexts();
    const theme = useTheme();
    const router = useRouter();
    const hamePage = usePathname();

    // Define menu items and their respective routes
    const menuItems = [
        { text: "Dashboard", icon: <InboxIcon />, route: "/dashboard" },
        { text: "Create", icon: <MailIcon />, route: "/create-device" },
    ];

    // Handle navigation without closing the drawer
    const handleMenuItemClick = (route: string) => {
        router.push(route);
        setNavRoute(true);
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Menu
                </Typography>
                <IconButton aria-label="close drawer" onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        key={item.text}
                        disablePadding
                        sx={{
                            backgroundColor: hamePage === item.route ? "#666666" : null, // Change background on hover
                        }}
                    >
                        <ListItemButton onClick={() => handleMenuItemClick(item.route)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Drawer>
    );
};

export default CustomDrawer;

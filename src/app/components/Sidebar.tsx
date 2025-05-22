"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme,
} from "@mui/material";
import {
  Menu,
  Home,
  Settings,
  Mail,
  People,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

const drawerWidth = 240;

const SidebarContainer = styled("div")({
  display: "flex",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Jika berada di halaman login, jangan tampilkan sidebar
  if (pathname === "/") {
    return null;
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Dashboard", icon: <Home />, path: "/home" },
    { text: "Users", icon: <People />, path: "/users" },
    { text: "Product", icon: <Mail />, path: "/Product" },
    { text: "Hasil Penjualan", icon: <Settings />, path: "/History" },
  ];

  return (
    <SidebarContainer>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : theme.spacing(7),
          flexShrink: 0,
          whiteSpace: "nowrap",
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : theme.spacing(7),
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <Tooltip title={!open ? item.text : ""} placement="right">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  href={item.path}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </SidebarContainer>
  );
}

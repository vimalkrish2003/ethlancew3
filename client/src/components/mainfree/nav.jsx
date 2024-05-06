/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import logo from "../../Assets/logo.png";

import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { HomeRounded } from "@mui/icons-material";
import { CgProfile } from "react-icons/cg";
import "./nav.css"
const FreeHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    
    {
      text: "Home",
      icon: <HomeRounded/>,
    },
    {
      text: "My Bids",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Profile",
      icon: <CgProfile/>,
    },
   
  ];
  return (
    <nav>
      <div className="nav-logo-container">
        ethLance
      </div>
      <div className="navbar-links-container">
       
        <a href="#home">Home</a>
        <a href="/mybids">My Bids</a>
        <a href="#profile"><CgProfile/></a>
       
        
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default FreeHeader;

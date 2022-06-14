import React from "react";

import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

import { loggedInUser } from "../services/services";

export default function SideMenuComponent() {
  const listItems = [
    {
      text: "Overview",
      icon: <i class="fas fa-project-diagram"></i>,
      redirectTo: "/",
    },

    {
      text: "Company Products",
      icon: <i class="fas fa-building    "></i>,
      redirectTo: "/companyProducts",
    },
  ];

  const listItems2 = [
    {
      text: "Create new product",
      icon: <i class="fas fa-shopping-basket    "></i>,
      redirectTo: "/createProduct",
    },
    {
      text: "Orders",
      icon: <ShoppingCart />,
      redirectTo: "/viewOrders",
    },
  ];
  return (
    <div className="text-white">
      <div className="p-3">
        <div className="mt-5 d-flex justify-content-center">
          <Avatar sx={{ width: 80, height: 80 }} />
        </div>
        <div className="mt-1 mb-3">
          <Typography
            textAlign={"center"}
            variant="body2"
            textTransform={"uppercase"}
          >
            {loggedInUser.storeName}
          </Typography>
        </div>
        <div>
          <List>
            {listItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemButton
                  onClick={() => window.location.assign(item.redirectTo)}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        <hr />
        <div>
          <List>
            {listItems2.map((item, index) => (
              <ListItem key={index}>
                <ListItemButton
                  onClick={() => window.location.assign(item.redirectTo)}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        <hr />
      </div>
    </div>
  );
}

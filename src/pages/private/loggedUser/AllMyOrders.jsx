import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import MyGutterBottom from "../../../components/MyGutterBottom";
import { httpService } from "../../../services/services";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { theme } from "../../../utils/labels";
import { Done, Pending } from "@mui/icons-material";

export default function AllMyOrders() {
  const authType = useSelector((state) => state.authType);
  const loggedUser = useSelector((state) => state.loggedUser);

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const path =
      authType === "fb"
        ? `getMyOrders?fbCustomer=${loggedUser._id}`
        : `getMyOrders?googleCustomer=${loggedUser._id}`;

    const res = await httpService.get(path);

    if (res) {
      setOrders(res.data.orders);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const formatStatus = (status) => {
    switch (status) {
      case "pending":
        return (
          <Typography className="text-danger" variant="h6">
            <Pending /> {status}
          </Typography>
        );
      case "shipped":
        return (
          <Typography className="text-warning" variant="h6">
            <i class="fas fa-truck-moving    "></i> {status}
          </Typography>
        );
      case "delivered":
        return (
          <Typography className="text-success" variant="h6">
            <Done /> {status}
          </Typography>
        );

      default:
        break;
    }
  };
  return (
    <div>
      <Container>
        <MyGutterBottom />

        <div className="mb-3">
          <div>
            <Typography color={theme.deep} variant="h3">
              All Orders <i className="fas fa-shopping-cart    "></i>
            </Typography>
          </div>

          {orders.map((order, i) => (
            <div key={i} className="p-3 shadow mb-2">
              <div className="d-flex justify-content-between">
                <div className="col-md-2">
                  <Typography variant="caption" gutterBottom color="GrayText">
                    Item:
                  </Typography>
                  <Typography variant="h6" color="GrayText">
                    {order.product.title}
                  </Typography>
                </div>
                <div className="col-md-2">
                  <Typography variant="caption" gutterBottom color="GrayText">
                    Quantity:
                  </Typography>
                  <Typography variant="h6" color="GrayText">
                    {order.product.quantity}
                  </Typography>
                </div>
                <div className="col-md-2">
                  <Typography variant="caption" gutterBottom color="GrayText">
                    Amount:
                  </Typography>
                  <Typography variant="h6" color="GrayText">
                    <i class="fas fa-dollar-sign    "></i>{" "}
                    {order.product.amount
                      ? order.product.amount.toLocaleString()
                      : 0}
                  </Typography>
                </div>
                <div className="col-md-2">
                  <Typography variant="caption" gutterBottom color="GrayText">
                    Status:
                  </Typography>
                  {formatStatus(order.productStatus)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

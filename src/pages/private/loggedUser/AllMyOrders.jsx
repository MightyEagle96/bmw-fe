import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import MyGutterBottom from "../../../components/MyGutterBottom";
import { httpService } from "../../../services/services";
import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
import { theme } from "../../../utils/labels";
import { Done, Email, Pending, Phone } from "@mui/icons-material";
import { ChangeNavbarTheme } from "../../../Contexts/ReloadContext";

export default function AllMyOrders() {
  const authType = useSelector((state) => state.authType);
  const loggedUser = useSelector((state) => state.loggedUser);

  const [orders, setOrders] = useState([]);
  const { setTheme } = useContext(ChangeNavbarTheme);
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

  const changeTheme = () => {
    if (window.scrollY > 80) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  window.addEventListener("scroll", changeTheme);
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
          <div className="mb-3">
            <Typography color={theme.deep} variant="h4">
              All Orders <i className="fas fa-shopping-cart    "></i>{" "}
              {orders.length}
            </Typography>
          </div>

          {orders.map((order, i) => (
            <div key={i} className="p-3 shadow mb-2 rounded">
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
                    Item Amount:
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
                    Amount Paid:
                  </Typography>
                  <Typography variant="h6" color="GrayText">
                    <i class="fas fa-dollar-sign    "></i>{" "}
                    {order.product.amount
                      ? (
                          order.product.quantity * order.product.amount
                        ).toLocaleString()
                      : 0}
                  </Typography>
                </div>
                <div className="col-md-2">
                  <Typography variant="caption" gutterBottom color="GrayText">
                    Status:
                  </Typography>
                  {formatStatus(order.productStatus)}
                  {order.dateShipped ? (
                    <Typography
                      variant="subtitle2"
                      fontStyle={"italic"}
                      color="CaptionText"
                    >
                      {new Date(order.dateShipped).toDateString()}
                    </Typography>
                  ) : null}
                </div>
              </div>
              <hr />
              <div style={{ color: "GrayText" }}>
                <Stack direction="row">
                  <div className="col-md-2 border-end">
                    <Typography variant="caption" gutterBottom>
                      Date Ordered:
                    </Typography>
                    <Typography variant="body2">
                      {order.tx_ref
                        ? new Date(order.tx_ref).toDateString()
                        : "-"}
                    </Typography>
                  </div>
                  <div className="col-md-3 ms-2 border-end">
                    <Typography variant="caption" gutterBottom>
                      Vendor's Contact:
                    </Typography>
                    <div className="mt-1">
                      <Typography variant="body2" gutterBottom>
                        <Email /> {order.account ? order.account.email : "-"}
                      </Typography>
                      <Typography variant="body2">
                        <Phone /> +
                        {order.account ? order.account.phoneNumber : "-"}
                      </Typography>
                    </div>
                  </div>
                  {order.account ? (
                    <div className="col-md-4 ms-2">
                      <Typography variant="caption" gutterBottom>
                        Store:
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <i class="fas fa-store    "></i>{" "}
                        {order.account.storeName}
                      </Typography>
                      <Typography variant="body2">
                        <i class="fas fa-location-arrow    "></i>{" "}
                        {order.account.address}
                      </Typography>
                    </div>
                  ) : null}
                </Stack>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

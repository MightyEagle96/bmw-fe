import { Pending } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { productStatus } from "../services/labels";
import { httpService, loggedInUser } from "../services/services";

function PendingStatus() {
  const [orders, setOrders] = useState(0);

  const GetOrders = async () => {
    const path = `viewOrders/${loggedInUser._id}?productStatus=${productStatus.pending}`;
    const res = await httpService.get(path);

    setOrders(res.data.orders.length);
  };

  useEffect(() => {
    GetOrders();
  }, []);

  return (
    <div className="shadow">
      <Alert variant="danger">
        <div className="d-flex justify-content-between">
          <div>
            <Typography variant="subtitle2">Pending Orders</Typography>
            <Pending />
          </div>
          <div className="d-flex align-items-center">
            <Typography fontWeight={500} fontSize={28}>
              {orders}
            </Typography>
          </div>
        </div>
      </Alert>
    </div>
  );
}

function ShippedStatus() {
  const [orders, setOrders] = useState(0);

  const GetOrders = async () => {
    const path = `viewOrders/${loggedInUser._id}?productStatus=${productStatus.shipped}`;
    const res = await httpService.get(path);

    setOrders(res.data.orders.length);
  };

  useEffect(() => {
    GetOrders();
  }, []);

  return (
    <div className="shadow">
      <Alert variant="warning">
        <div className="d-flex justify-content-between">
          <div>
            <Typography variant="subtitle2">Items in transit</Typography>
            <i class="fas fa-truck-moving    "></i>
          </div>
          <div className="d-flex align-items-center">
            <Typography fontWeight={500} fontSize={28}>
              {orders}
            </Typography>
          </div>
        </div>
      </Alert>
    </div>
  );
}

function DeliveredStatus() {
  const [orders, setOrders] = useState(0);

  const GetOrders = async () => {
    const path = `viewOrders/${loggedInUser._id}?productStatus=${productStatus.delivered}`;
    const res = await httpService.get(path);

    setOrders(res.data.orders.length);
  };

  useEffect(() => {
    GetOrders();
  }, []);

  return (
    <div className="shadow">
      <Alert variant="success">
        <div className="d-flex justify-content-between">
          <div>
            <Typography variant="subtitle2">Delivered Items</Typography>
            <i class="fas fa-check-circle    "></i>
          </div>
          <div className="d-flex align-items-center">
            <Typography fontWeight={500} fontSize={28}>
              {orders}
            </Typography>
          </div>
        </div>
      </Alert>
    </div>
  );
}
export { PendingStatus, ShippedStatus, DeliveredStatus };

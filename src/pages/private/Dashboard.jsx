import React from "react";
import { Row } from "react-bootstrap";
import OrdersComponent from "../../components/OrdersComponent";
import {
  DeliveredStatus,
  PendingStatus,
  ShippedStatus,
} from "../../components/ProductStatus";

export default function Dashboard() {
  return (
    <div>
      <Row>
        <div className="col-md-4">
          <PendingStatus />
        </div>
        <div className="col-md-4">
          <ShippedStatus />
        </div>
        <div className="col-md-4">
          <DeliveredStatus />
        </div>
      </Row>
      <hr />
      <OrdersComponent />
    </div>
  );
}

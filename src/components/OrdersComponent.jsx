import { Chip, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { httpService, loggedInUser } from "../services/services";

export default function OrdersComponent() {
  const [orders, setOrders] = useState([]);
  const GetOrders = async () => {
    const path = `viewOrders/${loggedInUser._id}`;

    const res = await httpService.get(path);
    setOrders(res.data.orders);
  };

  useEffect(() => {
    GetOrders();
  }, []);

  const ExpandableComponent = ({ data }) => {
    return (
      <div className="p-2">
        <Typography variant="body2" gutterBottom>
          Name: {data.customer.name}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Email: {data.customer.email}
        </Typography>
        <Typography variant="body2">
          Address: {data.customer.address}
        </Typography>
      </div>
    );
  };

  const productStatus = (status) => {
    switch (status) {
      case "pending":
        return "error";
      case "fulfilled":
        return "warning";
      default:
        return "success";
    }
  };

  const columns = [
    { name: "Product Ordered", selector: (row) => row.product.title },
    { name: "Customer Email", selector: (row) => row.customer.email },
    {
      name: "Amount Paid",
      selector: (row) => (row.amount ? row.amount.toLocaleString() : "-"),
    },
    { name: "Quantity Ordered", selector: (row) => row.quantity },
    {
      name: "Customer Phone number",
      selector: (row) => row.customer.phone_number,
    },

    {
      name: "Date Ordered",
      selector: (row) => new Date(row.tx_ref).toDateString(),
    },
    {
      name: "Status",
      selector: (row) => (
        <Chip
          label={row.productStatus}
          color={productStatus(row.productStatus)}
        />
      ),
    },
  ];
  return (
    <div>
      <div>
        <Typography variant="h6" color="GrayText">
          Orders for you
        </Typography>
      </div>
      <div>
        <DataTable
          data={orders}
          pagination
          columns={columns}
          expandableRows
          expandableRowsComponent={ExpandableComponent}
        />
      </div>
    </div>
  );
}

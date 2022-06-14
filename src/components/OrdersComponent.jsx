import { Button, Chip, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { httpService, loggedInUser } from "../services/services";
import Swal from "sweetalert2";

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
        <Stack direction={"row"} spacing={1}>
          <div className="border-end">
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
          </div>
          <div className="d-flex align-items-center">
            <Button onClick={shipProduct}>
              Ship this product for this customer
            </Button>
          </div>
        </Stack>
      </div>
    );
  };

  const productStatus = (status) => {
    switch (status) {
      case "pending":
        return "error";
      case "shipped":
        return "warning";
      default:
        return "delivered";
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

  const shipProduct = async () => {
    Swal.fire({ icon: "question", title: "Ship this product" });
  };
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

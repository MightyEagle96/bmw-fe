import React, { useState, useEffect } from "react";
import { Link, Stack, Typography } from "@mui/material";
import { httpService, loggedInUser } from "../../services/services";
import Loading from "../../assets/aesthetics/Loading";
import { theme } from "../../utils/labels";
import DataTable from "react-data-table-component";

export default function CompanyProducts() {
  const [loading, setLoading] = useState();
  const [products, setProducts] = useState([]);

  const GetProducts = async () => {
    try {
      setLoading(true);
      const path = `viewProducts?account=${loggedInUser._id}`;
      const res = await httpService.get(path);
      if (res) {
        setProducts(res.data.products);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const columns = [
    { name: "Title", selector: (row) => row.title },
    { name: "Amount", selector: (row) => row.amount },
    { name: "Quantity", selector: (row) => row.quantity },
    {
      name: "Action",
      selector: (row) => (
        <Link href={`/viewProduct/${row._id}`} underline="none">
          update
        </Link>
      ),
    },
  ];
  useEffect(() => {
    GetProducts();
  }, []);
  return (
    <div>
      <div>
        <Stack direction={"row"} spacing={1}>
          <div>
            <Typography variant="h6" color="GrayText">
              Company Products
            </Typography>
          </div>

          <div className="d-flex align-items-center">
            <Loading show={loading} />
          </div>
        </Stack>
        <div className="d-flex justify-content-end">
          <div
            className="col-md-3 p-3"
            style={{ backgroundColor: theme.light, color: "white" }}
          >
            <Typography variant="caption">
              Total Products: {products.length}
            </Typography>
          </div>
        </div>
        <div className="mt-3">
          <DataTable data={products} columns={columns} pagination />
        </div>
      </div>
    </div>
  );
}

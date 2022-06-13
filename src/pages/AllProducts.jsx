import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Loading from "../assets/aesthetics/Loading";
import { httpService } from "../services/services";
import ProductCard from "../components/ProductCard";
import { Stack, Typography } from "@mui/material";
import { theme } from "../utils/labels";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetProducts = async () => {
    try {
      setLoading(true);
      const path = "viewProducts";
      const res = await httpService.get(path);
      if (res) {
        setProducts(res.data.products);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <div>
      <Container>
        <div className="mt-3">
          <div className="mb-2">
            <Stack direction={"row"} spacing={1}>
              <div
                className="p-3 col-md-2"
                style={{ backgroundColor: theme.light, color: "white" }}
              >
                <Typography className="subtitle1">
                  All bmw-naija products
                </Typography>
              </div>
              <div className="d-flex align-items-center">
                <Loading show={loading} />
              </div>
            </Stack>
          </div>
          <div className="">
            <div className="d-flex flex-wrap justify-content-center">
              {products.map((product, i) => (
                <ProductCard
                  key={i}
                  title={product.title}
                  amount={product.amount}
                  id={product._id}
                  imageUrl={product.imageUrls[0]}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

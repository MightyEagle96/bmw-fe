import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import Loading from "../assets/aesthetics/Loading";
import { httpService } from "../services/services";
import ProductCard from "../components/ProductCard";
import { Stack, Typography, TextField, Pagination } from "@mui/material";
import { theme } from "../utils/labels";
import MyGutterBottom from "../components/MyGutterBottom";
import { ChangeNavbarTheme } from "../Contexts/ReloadContext";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setTheme } = useContext(ChangeNavbarTheme);

  const GetProducts = async () => {
    try {
      setLoading(true);
      const path = "viewProducts?limit=10";
      const res = await httpService.get(path);
      if (res) {
        setProducts(res.data.products);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    GetProducts();
    setTheme("light");
  }, []);

  return (
    <div>
      <MyGutterBottom />
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
            <div className="mb-2 d-flex justify-content-center">
              <TextField type={"search"} label="Search Products" />
            </div>
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
            <div className="d-flex justify-content-center mt-3 mb-3">
              <Pagination count={10} color="primary" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

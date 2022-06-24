import { MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { productCategories } from "../../services/labels";
import TextInputComponent from "../../components/TextInputComponent";
import { httpService } from "../../services/services";

import { SecondaryButton } from "../../components/MyButtons";
import Swal from "sweetalert2";
import { secondaryTheme, theme } from "../../utils/labels";

export default function CreateProduct() {
  const defaultData = {
    title: "",
    amount: 0,
    quantity: 0,
    description: "",
    category: "",
    subCategory: "",
  };
  const [product, setProduct] = useState(defaultData);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const CreateProduct = async (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "question",
      title: "Create product?",
      text: "Do you want to create this product?",
      showCancelButton: true,
      cancelButtonColor: secondaryTheme.normal,
      confirmButtonColor: theme.normal,
      confirmButtonText: "YES",
      cancelButtonText: "NO",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const path = "createProduct";

          const res = await httpService.post(path, product);
          if (res) {
            setProduct(defaultData);
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
    });
  };
  return (
    <div>
      <div>
        <Typography variant="h6" color="GrayText">
          Create a new product
        </Typography>
      </div>
      <div className="mt-3">
        <form onSubmit={CreateProduct}>
          <div className="d-flex flex-wrap">
            <div className="col-md-4 me-2">
              <TextInputComponent
                label={"Title"}
                name={"title"}
                handleChange={handleChange}
                value={product.title}
                required
              />
            </div>
            <div className="col-md-4  me-2">
              <TextInputComponent
                label={"Amount"}
                name={"amount"}
                type={"number"}
                handleChange={handleChange}
                value={product.amount}
                required
              />
            </div>
            <div className="col-md-4  me-2">
              <TextInputComponent
                label={"Quantity"}
                name={"quantity"}
                type={"number"}
                handleChange={handleChange}
                value={product.quantity}
                required
              />
            </div>
            <div className="col-md-4  me-2">
              <TextInputComponent
                label={"Description"}
                name={"description"}
                multiline={true}
                handleChange={handleChange}
                value={product.description}
                required
              />
            </div>
            <div className="col-md-4 me-2 mb-3">
              <TextField
                name="category"
                select
                label="Category"
                fullWidth
                helperText="Product category"
                onChange={handleChange}
                value={product.category}
                required
              >
                {productCategories.map((cat, i) => (
                  <MenuItem key={i} value={cat.category}>
                    {cat.category}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col-md-4 me-2 mb-3">
              <TextField
                name="subCategory"
                select
                label="Sub Category"
                fullWidth
                helperText="Product subcategory"
                onChange={handleChange}
                value={product.subCategory}
                disabled={product.category ? false : true}
                required
              >
                {productCategories
                  .filter((c) => c.category === product.category)
                  .map((cat) =>
                    cat.subCategories.map((c, i) => (
                      <MenuItem key={i} value={c}>
                        {c}
                      </MenuItem>
                    ))
                  )}
              </TextField>
            </div>
          </div>
          <SecondaryButton
            label="create product"
            loading={loading}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}

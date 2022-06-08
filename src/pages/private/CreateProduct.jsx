import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import TextInputComponent from "../../components/TextInputComponent";
import { httpService } from "../../services/services";

import { SecondaryButton } from "../../components/MyButtons";

export default function CreateProduct() {
  const defaultData = { title: "", amount: 0, quantity: 0, description: "" };
  const [product, setProduct] = useState(defaultData);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const CreateProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const path = "createProduct";
      const res = await httpService.post(path, product);
      if (res) {
        setLoading(false);
        setProduct(defaultData);
      }
    } catch (error) {
      setLoading(false);
    }
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
          {" "}
          <Stack direction={"row"} spacing={2}>
            <TextInputComponent
              label={"Title"}
              name={"title"}
              handleChange={handleChange}
              value={product.title}
            />
            <TextInputComponent
              label={"Amount"}
              name={"amount"}
              type={"number"}
              handleChange={handleChange}
              value={product.amount}
            />
            <TextInputComponent
              label={"Quantity"}
              name={"quantity"}
              type={"number"}
              handleChange={handleChange}
              value={product.quantity}
            />
            <TextInputComponent
              label={"Description"}
              name={"description"}
              multiline={true}
              handleChange={handleChange}
              value={product.description}
            />
          </Stack>
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

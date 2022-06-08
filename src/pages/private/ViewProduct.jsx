import { Stack, Typography, IconButton, Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LargeLoading } from "../../assets/aesthetics/Loading";
import { httpService } from "../../services/services";
import {
  PrimaryButton,
  PrimaryTextButton,
  SecondaryButton,
} from "../../components/MyButtons";
import { UploadFile, PhotoCamera } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

export default function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState([]);

  const changeHandler = (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].size > 1000000) {
      } else
        setSelectedFile((oldArray) => [...oldArray, event.target.files[i]]);
    }
  };
  const deletePhotos = () => {
    setSelectedFile([]);
  };
  const getProduct = async () => {
    try {
      setLoading(true);
      const path = `viewProduct/${id}`;
      const res = await httpService.get(path);
      if (res) {
        setProduct(res.data.product);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      <Container>
        <div className="d-none d-md-block">
          <LargeLoading show={loading} />
          <div>
            {product ? (
              <Row>
                <div className="col-md-6 border-end">
                  <Stack
                    sx={{ color: "GrayText" }}
                    direction={"row"}
                    spacing={4}
                  >
                    <div>
                      <Typography variant="caption">Product title</Typography>
                      <Typography variant="body1">{product.title}</Typography>
                    </div>
                    <div>
                      <Typography variant="caption">Product amount</Typography>
                      <Typography variant="body1">
                        {product.amount.toLocaleString()}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="caption">
                        Current Quantity
                      </Typography>
                      <Typography variant="body1">
                        {product.quantity}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="caption">
                        Product Description
                      </Typography>
                      <Typography variant="body1">
                        {product.description}
                      </Typography>
                    </div>
                  </Stack>

                  <div className="mt-3">
                    <SecondaryButton label={"update product"} />
                  </div>
                </div>
                <div className="col-md-6">
                  {product.imageUrls.length === 0 ? (
                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        multiple
                        onChange={changeHandler}
                      />
                      Upload product images
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  ) : null}
                  {
                    <div>
                      <div className="d-flex flex-wrap mb-2">
                        {selectedFile.length > 0 ? (
                          <>
                            {selectedFile.map((file, i) => (
                              <>
                                <Avatar
                                  sx={{ width: 100, height: 100 }}
                                  key={i}
                                  src={URL.createObjectURL(file)}
                                  variant="rounded"
                                  className="me-1"
                                />
                              </>
                            ))}
                          </>
                        ) : null}
                      </div>
                      {selectedFile.length > 0 ? (
                        <Stack direction={"row"} spacing={1}>
                          <PrimaryButton
                            label="upload"
                            fullWidth={false}
                            endIcon={<UploadFile />}
                          />
                          <PrimaryTextButton
                            label="Delete photos"
                            onClick={deletePhotos}
                          />
                        </Stack>
                      ) : null}
                    </div>
                  }
                </div>
              </Row>
            ) : null}
          </div>
          <hr />
        </div>
      </Container>
    </div>
  );
}

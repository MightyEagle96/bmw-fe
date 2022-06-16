import {
  Stack,
  Typography,
  IconButton,
  Avatar,
  LinearProgress,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LargeLoading } from "../../assets/aesthetics/Loading";
import { httpService } from "../../services/services";
import { PrimaryButton, PrimaryTextButton } from "../../components/MyButtons";
import { UploadFile, PhotoCamera } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

export default function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [progress] = React.useState(10);
  const changeHandler = (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].size < 1000000) {
        setImages((oldArray) => [...oldArray, event.target.files[i]]);
      } else {
      }
    }
  };
  const deletePhotos = () => {
    setImages([]);
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

  const uploadPhotos = async () => {
    setLoading(true);

    const formData = new FormData();
    images.forEach((img) => {
      if (img) {
        formData.append("images", img);
      }
    });
    const path = `uploadProductImages/${product._id}`;
    const res = await httpService.patch(path, formData);
    if (res) {
      window.location.reload();
    }
    setLoading(false);
  };
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  useEffect(() => {
    getProduct();
    // const timer = setInterval(() => {
    //   setProgress((prevProgress) =>
    //     prevProgress >= 100 ? 10 : prevProgress + 10
    //   );
    // }, 800);
    // return () => {
    //   clearInterval(timer);
    // };
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
                    <PrimaryTextButton label={"update product"} />
                  </div>
                </div>
                <div className="col-md-6">
                  {product.imageUrls.length === 0 ? (
                    <div>
                      {" "}
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
                      <div>
                        <Typography variant="caption">
                          maximum of 10 photos not more than 1mb
                        </Typography>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Typography variant="caption">Product Images</Typography>
                      <div className="d-flex flex-wrap mt-3">
                        {product.imageUrls.map((item, i) => (
                          <>
                            <Avatar
                              src={item}
                              variant="rounded"
                              sx={{ width: 170, height: 120 }}
                              className="me-2 mb-2"
                            />
                          </>
                        ))}{" "}
                        <div className="d-flex align-items-center">
                          <PrimaryTextButton label="delete photos" />
                        </div>
                      </div>
                    </div>
                  )}
                  {
                    <div>
                      <div className="d-flex flex-wrap mb-2">
                        {images.length > 0 ? (
                          <>
                            {images.map((file, i) => (
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
                      {images.length > 0 ? (
                        <Stack direction={"row"} spacing={1}>
                          <PrimaryButton
                            label="upload"
                            fullWidth={false}
                            endIcon={<UploadFile />}
                            onClick={uploadPhotos}
                            loading={loading}
                          />
                          <PrimaryTextButton
                            label="Delete photos"
                            onClick={deletePhotos}
                          />
                        </Stack>
                      ) : null}
                      <Box sx={{ width: "100%" }}>
                        <LinearProgressWithLabel value={progress} />
                      </Box>
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

import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { httpService } from "../../services/services";
import brand from "../../assets/images/brand.png";
import { Stack, Typography } from "@mui/material";
import { PrimaryButton, SecondaryIconButton } from "../../components/MyButtons";
import {
  ArrowDownward,
  ArrowForwardIos,
  ArrowUpward,
} from "@mui/icons-material";
import TextInputComponent from "../../components/TextInputComponent";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { LargeLoading } from "../../assets/aesthetics/Loading";

export default function CheckoutProduct() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  let [quantity, setQuantity] = useState(1);
  const [userForm, setUserForm] = useState({});

  const config = {
    public_key: process.env.REACT_APP_FLUKEY,
    tx_ref: Date.now(),
    amount: product ? product.amount * quantity : 0,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userForm.email,
      phonenumber: userForm.phoneNumber,
      name: userForm.name,
    },
    customizations: {
      title: product ? product.title : "",
      description: product ? product.description : "",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const ViewProduct = async () => {
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

  const handleChange = (e) =>
    setUserForm({ ...userForm, [e.target.name]: e.target.value });

  const handleFlutterPayment = useFlutterwave(config);
  useEffect(() => {
    ViewProduct();
  }, []);

  return (
    <div>
      <Container>
        <div className="d-none d-md-block mb-3">
          <div className="border p-3">
            <Row>
              <div className="col-md-6 border-end d-flex align-items-center">
                <img
                  src={product && product.imageUrl ? product.imageUrl : brand}
                  className="img-fluid"
                  alt="logo"
                />
              </div>
              <div className="col-md-6 d-flex align-items-end">
                <div className="p-3">
                  <LargeLoading show={loading} />
                  {product ? (
                    <>
                      <Typography
                        color="GrayText"
                        fontWeight={700}
                        fontSize={27}
                        gutterBottom
                      >
                        {product.title}
                      </Typography>

                      <Typography variant="body1" color="GrayText">
                        {product.description}
                      </Typography>
                      <Stack direction={"row"} spacing={2}>
                        <Typography
                          variant="body1"
                          color="GrayText"
                          fontWeight={700}
                          fontSize={25}
                          gutterBottom
                        >
                          ₦{(product.amount * quantity).toLocaleString()}
                        </Typography>
                        <div className="d-flex align-items-center">
                          <Typography variant="subtitle2" color={"GrayText"}>
                            -payable amount
                          </Typography>
                        </div>
                      </Stack>
                      <div className="mb-2">
                        <Typography variant="caption">
                          Update quantity
                        </Typography>
                      </div>
                      <Stack direction={"row"} spacing={1}>
                        <SecondaryIconButton
                          icon={<ArrowDownward />}
                          onClick={() => {
                            if (quantity > 1) {
                              setQuantity((quantity -= 1));
                            }
                          }}
                        />
                        <div className="d-flex align-items-center">
                          <Typography color="GrayText" fontWeight={700}>
                            {quantity}
                          </Typography>
                        </div>
                        <SecondaryIconButton
                          onClick={() => setQuantity((quantity += 1))}
                          icon={<ArrowUpward />}
                        />
                      </Stack>
                      <div className="mt-2">
                        <Typography variant="caption" gutterBottom>
                          Please complete the form below
                        </Typography>

                        <div className="mt-2">
                          <Stack
                            direction={{
                              xs: "column",
                              md: "column",
                              sm: "column",
                              lg: "row",
                            }}
                            spacing={{ lg: 1 }}
                          >
                            <TextInputComponent
                              label="Name"
                              name="name"
                              handleChange={handleChange}
                            />
                            <TextInputComponent
                              label="Email"
                              name="email"
                              handleChange={handleChange}
                            />
                          </Stack>
                          <Stack
                            direction={{
                              xs: "column",
                              md: "column",
                              sm: "column",
                              lg: "row",
                            }}
                            spacing={{ lg: 1 }}
                          >
                            <TextInputComponent
                              label="Phone Number"
                              name="phoneNumber"
                              handleChange={handleChange}
                            />
                            <TextInputComponent
                              label="Address"
                              name="address"
                              handleChange={handleChange}
                              multiline={true}
                            />
                          </Stack>
                          <div className="">
                            <PrimaryButton
                              endIcon={<ArrowForwardIos />}
                              label="checkout"
                              onClick={() => {
                                handleFlutterPayment({
                                  callback: (response) => {
                                    console.log(response);
                                    closePaymentModal(); // this will close the modal programmatically
                                  },
                                  onClose: () => {},
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}

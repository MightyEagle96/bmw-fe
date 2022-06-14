import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { httpService } from "../../services/services";
import brand from "../../assets/images/brand.png";
import { Avatar, Stack, Typography } from "@mui/material";
import { PrimaryButton, SecondaryIconButton } from "../../components/MyButtons";
import {
  ArrowDownward,
  ArrowForwardIos,
  ArrowUpward,
} from "@mui/icons-material";
import TextInputComponent from "../../components/TextInputComponent";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { LargeLoading } from "../../assets/aesthetics/Loading";
import { Carousel } from "react-bootstrap";
import ReactJsAlert from "reactjs-alert";

export default function CheckoutProduct() {
  const [loading, setLoading] = useState(false);

  const [recording, setRecording] = useState(false);

  const [alertObject, setAlertObject] = useState({});

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  let [quantity, setQuantity] = useState(1);
  const defaultData = { name: "", address: "", phone_number: "", email: "" };
  const [userForm, setUserForm] = useState(defaultData);

  const config = {
    public_key: process.env.REACT_APP_FLUKEY,
    tx_ref: Date.now(),
    amount: product ? product.amount * quantity : 0,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userForm.email,
      phone_number: userForm.phoneNumber,
      name: userForm.name,
      address: userForm.address,
    },
    customizations: {
      title: product ? product.title : "",
      description: product ? product.description : "",
      logo: product ? product.imageUrls[0] : "",
    },
  };
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
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

  const recordTransaction = async (response) => {
    const path = "recordPayment";

    const res = await httpService.post(path, {
      ...response,
      product: product._id,
      quantity,
      account: product.account,
    });

    if (res) {
      setAlertObject(res.data);
    }

    // console.log(res);
  };

  return (
    <div>
      <Container>
        <ReactJsAlert
          status={alertObject.status} // true or false
          type={alertObject.type} // success, warning, error, info
          title={alertObject.title}
          quotes={true}
          quote={alertObject.quote}
          autoCloseIn={3000}
          Close={() => setAlertObject({ ...alertObject, status: false })}
          // Close={() => setStatus(false)}
        />

        <div className="d-none d-md-block mb-3">
          <div className="border p-3">
            <Row>
              <div className="col-md-6 border-end d-flex align-items-center">
                <Carousel activeIndex={index} onSelect={handleSelect}>
                  {product && product.imageUrls
                    ? product.imageUrls.map((img, i) => (
                        <Carousel.Item>
                          <img src={img} key={i} alt={i} />
                        </Carousel.Item>
                      ))
                    : null}
                </Carousel>
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
                              name="phone_number"
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
                              loading={recording}
                              label="checkout"
                              onClick={() => {
                                handleFlutterPayment({
                                  callback: (response) => {
                                    //console.log(response);
                                    response.customer.address =
                                      userForm.address;
                                    response.customer.phone_number =
                                      userForm.phone_number;

                                    recordTransaction(response);
                                    setUserForm(defaultData);
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

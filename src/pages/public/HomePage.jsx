import React from "react";
import { Container } from "react-bootstrap";
import BMWCards from "../../components/BMWCards";
import "./HomePage.css";
import BMWBike from "../../assets/images/bmwBike.jpg";
import bmwCar1 from "../../assets/images/bmwCar1.jpg";
import bmwCar2 from "../../assets/images/bmwCar2.jpg";
import { Button, Typography } from "@mui/material";

import { redirectTo } from "../../utils/specialFunctions";
import { SecondaryButton } from "../../components/MyButtons";

export default function HomePage() {
  return (
    <div>
      <div className="headerBg text-white">
        <div className="d-none d-md-block">
          <div className="row">
            <div className="col-md-6 header"></div>
            <div className="col-md-6 d-flex align-items-center">
              <div>
                <Typography fontWeight={900} fontFamily={"lato"} fontSize={35}>
                  BMW-NAIJA
                </Typography>
                <SecondaryButton
                  label="shop now"
                  onClick={() => {
                    window.location.assign("ourProducts");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-sm-block d-md-none">
          <div className="header d-flex align-items-end justify-content-end">
            <div className="p-5">
              <Typography fontWeight={900} fontFamily={"lato"} fontSize={30}>
                BMW-NAIJA
              </Typography>
              <SecondaryButton
                label="shop now"
                onClick={() => {
                  window.location.assign("ourProducts");
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div
          className="h3 text-center"
          style={{ fontWeight: 300, textTransform: "uppercase" }}
        >
          Your one stop shop for anything BMW
        </div>
      </div>

      <Container>
        <div className="row justify-content-md-center ">
          <div className="col-md-3 mb-3 d-flex justify-content-center">
            <BMWCards
              image={BMWBike}
              title={"2022 K 1600 Midnight"}
              description="The X7 is built on the same BMW CLAR platform as the G05 X5, however the X7 is taller and wider plus it has been stretched for increased cargo space and third row seating which is standard and more spacious for adults (the X5's third row seating, which is optional, is mainly for children).[6] In contrast to the X5, it is not available with rear-wheel drive, instead using an all-wheel drive (xDrive) drivetrain for all models. In Europe, diesel and petrol engines are available, while the choice is limited to inline-6 and V8 petrol engines in the United States"
            />
          </div>
          <div className="col-md-3 mb-3  d-flex justify-content-center">
            <BMWCards
              image={bmwCar1}
              title={"Compact Executive Car"}
              description={
                "The BMW M2 is the high-performance version of the 2 Series 2-door coupé. The first generation of the M2 is the F87 coupé and is powered by turbocharged straight-six engines."
              }
            />
          </div>
          <div className="col-md-3 mb-3  d-flex justify-content-center">
            <BMWCards
              image={bmwCar2}
              title={"Subcompact MPV"}
              description={
                "BMW Active Tourer is a plug in hybrid concept vehicle with 1.5 litre turbo three cylinder petrol engine derived from BMW six cylinder engines and a synchronous electric motor, lithium-ion battery, High Reflection Silver body colour, front tilted BMW radiator grille, twin headlines with LED positioning lights (eyebrows) stretching far back into the side panels, multi faceted front apron, integrated door openers, contrasted side sills with rising shadow line, twenty inch wheels."
              }
            />
          </div>
        </div>
      </Container>

      <div className="mt-3 section2 p-5  d-flex align-items-center justify-content-center">
        <div className=" text-white">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              redirectTo("create_vendor");
            }}
          >
            become a vendor
          </Button>
        </div>
      </div>
    </div>
  );
}

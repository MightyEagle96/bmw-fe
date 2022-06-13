import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import brand from "../assets/images/brand.png";

export default function ProductCard({ imageUrl, title, amount, id }) {
  return (
    <div className="col-md-3 me-3 mb-3">
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            image={imageUrl ? imageUrl : brand}
            alt={title}
            height="300"
          />

          <CardContent>
            <Typography variant="h6" color="GrayText">
              {title}
            </Typography>
            <div className="mt-3">
              <div className="d-flex justify-content-between">
                <div>
                  <Typography variant="subtitle2" color="GrayText">
                    ₦{amount.toLocaleString()}
                  </Typography>
                </div>
                <div>
                  <Button
                    onClick={() => window.location.assign(`/product/${id}`)}
                  >
                    Purchase Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

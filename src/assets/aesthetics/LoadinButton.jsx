import React from "react";
import { Spinner } from "react-bootstrap";
export default function LoadingButton() {
  return <Spinner size="sm" style={{ color: "white" }} animation="border" />;
}

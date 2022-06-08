import React from "react";
import { Spinner } from "react-bootstrap";
import { theme } from "../../utils/labels";

export default function Loading({ size, show }) {
  return show ? (
    <Spinner
      size={size || "sm"}
      style={{ color: theme.normal }}
      animation="border"
    />
  ) : null;
}

function LargeLoading({ size, show }) {
  return show ? (
    <Spinner style={{ color: theme.normal }} animation="border" />
  ) : null;
}

export { LargeLoading };

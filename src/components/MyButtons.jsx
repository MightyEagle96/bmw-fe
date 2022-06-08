import { Button, IconButton } from "@mui/material";
import React from "react";
import LoadingButton from "../assets/aesthetics/LoadinButton";
import { secondaryTheme, theme } from "../utils/labels";

function PrimaryButton({ label, type, fullWidth, loading, onClick, endIcon }) {
  return (
    <Button
      endIcon={endIcon}
      variant="contained"
      fullWidth={fullWidth}
      type={type}
      sx={{
        backgroundColor: theme.light,
        ":hover": { backgroundColor: theme.normal },
      }}
      onClick={onClick}
    >
      {loading ? <LoadingButton /> : label}
    </Button>
  );
}
function PrimaryTextButton({
  label,
  type,
  fullWidth,
  loading,
  onClick,
  endIcon,
}) {
  return (
    <Button
      endIcon={endIcon}
      variant="text"
      fullWidth={fullWidth}
      type={type}
      sx={{
        color: theme.normal,
        ":hover": { backgroundColor: theme.veryLight },
      }}
      onClick={onClick}
    >
      {loading ? <LoadingButton /> : label}
    </Button>
  );
}
function PrimaryIconButton({ icon, type, fullWidth, loading, onClick }) {
  return (
    <IconButton
      onClick={onClick}
      variant="contained"
      fullWidth={fullWidth}
      type={type}
      sx={{
        backgroundColor: theme.light,
        color: "white",
        ":hover": { backgroundColor: theme.normal },
      }}
    >
      {loading ? <LoadingButton /> : icon}
    </IconButton>
  );
}

function SecondaryButton({
  label,
  type,
  fullWidth,
  loading,
  onClick,
  endIcon,
}) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      fullWidth={fullWidth}
      type={type}
      sx={{
        backgroundColor: secondaryTheme.light,
        ":hover": { backgroundColor: secondaryTheme.normal },
      }}
      endIcon={endIcon}
    >
      {loading ? <LoadingButton /> : label}
    </Button>
  );
}
function SecondaryIconButton({ icon, type, fullWidth, loading, onClick }) {
  return (
    <IconButton
      onClick={onClick}
      variant="contained"
      fullWidth={fullWidth}
      type={type}
      sx={{
        backgroundColor: secondaryTheme.light,
        color: "white",
        ":hover": { backgroundColor: secondaryTheme.normal },
      }}
    >
      {loading ? <LoadingButton /> : icon}
    </IconButton>
  );
}

export {
  PrimaryButton,
  SecondaryButton,
  PrimaryIconButton,
  SecondaryIconButton,
  PrimaryTextButton,
};

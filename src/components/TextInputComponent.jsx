import { TextField } from "@mui/material";
import React from "react";

export default function TextInputComponent({
  name,
  label,
  type,
  helperText,
  multiline,
  handleChange,
  value,
  required,
  fullWidth,
}) {
  return (
    <div className="mb-3">
      <TextField
        value={value}
        onChange={handleChange}
        name={name}
        label={label}
        type={type}
        helperText={label || helperText}
        fullWidth={fullWidth || true}
        multiline={multiline}
        required={required}
      />
    </div>
  );
}

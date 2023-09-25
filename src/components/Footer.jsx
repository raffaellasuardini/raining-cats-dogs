import React from "react";
import Typography from "@mui/material/Typography";

function Footer(props) {
  return (
    <Typography mt={4} align="center">
      &copy; {props.year} Weather App
    </Typography>
  );
}

export default Footer;

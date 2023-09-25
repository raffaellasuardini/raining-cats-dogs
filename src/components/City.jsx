import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

function City(props) {
  const [anyError, setAnyError] = useState(false);
  const [inputCity, setInputCity] = useState("");

  function handleChange(event) {
    event.preventDefault();
    const { value } = event.target;
    setInputCity(value);
    setAnyError(false);
  }

  const handleGoogleFetch = async () => {
    if (!inputCity) return false;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${inputCity}&key=${props.googleKey}`;
    console.log(apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          console.log("Google Maps API Response:", data);
          let { lat, lng } = data.results[0].geometry.location;
          console.log(lat, lng);
          props.updateCity(inputCity);
          props.coords({ lat, lon: lng });
        } else if (data.status === "ZERO_RESULTS") {
          setAnyError(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from Google Maps API:", error);
      });
  };

  function keyPressed(event) {
    if (event.key === "Enter") {
      props.updateCity("");
      setInputCity("");
      handleGoogleFetch();
    }
  }

  return (
    <Grid container item alignItems="center" justifyContent="center" mb={4}>
      <Grid item xs={6} md={6} lg={8}>
        <TextField
          fullWidth
          margin="normal"
          variant="standard"
          id="standard-basic"
          label="City"
          value={inputCity}
          onChange={handleChange}
          onKeyDown={keyPressed}
          helperText={anyError && "Incorrect city"}
          error={anyError}
        />
      </Grid>
    </Grid>
  );
}

export default City;

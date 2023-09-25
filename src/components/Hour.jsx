import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function Hour(props) {
  return (
    <Grid
      container
      item
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      lg={12}
    >
      <Card>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={4} sm={6} md={4} lg={3}>
            <CardMedia
              component="img"
              alt={props.data.description}
              image={props.data.srcImg}
              style={{
                width: "auto",
                height: "100%",
              }}
            ></CardMedia>
          </Grid>
          <Grid item xs={4} sm={6} md={4} lg={5}>
            <CardContent>
              <Typography variant="body1" mb={1}>
                {props.data.hour}
              </Typography>
              <Typography variant="body2">temp: {props.data.temp} </Typography>
              <Typography variant="body2">
                feels: {props.data.feelsLike}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default Hour;

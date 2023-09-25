import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function Day(props) {
  return (
    <Grid
      container
      item
      alignItems="center"
      justifyContent="space-around"
      lg={3}
      xs={12}
    >
      <Card>
        <Grid
          container
          item
          direction="row"
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item xs={8} lg={8}>
            <CardMedia
              component="img"
              alt={props.data.description}
              image={props.data.srcImg}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            ></CardMedia>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <CardContent>
            <Typography variant="button">{props.data.date}</Typography>
            <Typography>
              min:{props.data.min} max:{props.data.max}{" "}
            </Typography>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
}

export default Day;

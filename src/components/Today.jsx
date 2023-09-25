import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function Today(props) {
  return (
    <Grid item>
      <Card
        sx={{
          borderRadius: "16px",
          backgroundSize: "cover",
          backgroundImage: `url(${props.bgimage})`,
          backgroundPosition: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardHeader
              title={props.todayWeather.date}
              subheader={props.currentCity}
              titleTypographyProps={{
                align: "center",
                color: "white",
                variant: "h4",
                paddingTop: "10px",
              }}
              subheaderTypographyProps={{
                align: "center",
                color: "white",
              }}
            />
          </Grid>
          <Grid
            container
            item
            justifyContent="space-around"
            alignItems="center"
            xs={12}
          >
            <Grid item xs={5} lg={3}>
              <Typography paragraph variant="h1" component="h1" color="white">
                {props.todayWeather.temp}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={6}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <CardContent>
                <Grid item xs={12} spacing={3}>
                  <Typography
                    paragraph
                    gutterBottom
                    variant="h5"
                    component="h5"
                    color="white"
                  >
                    {props.todayWeather.description}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    paragraph
                    component="h6"
                    variant="h6"
                    color="white"
                  >
                    Min:{" "}
                    <Typography display="inline" variant="h6" color="white">
                      {props.todayWeather.min}
                    </Typography>
                  </Typography>
                </Grid>

                <Typography paragraph component="h6" variant="h6" color="white">
                  Max:{" "}
                  <Typography display="inline" variant="h6" color="white">
                    {props.todayWeather.max}
                  </Typography>
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default Today;

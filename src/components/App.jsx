import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import City from "./City";
import Day from "./Day";
import Today from "./Today";
import Footer from "./Footer";
import Hour from "./Hour";

function App() {
  const googleKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const endpointWeather = process.env.REACT_APP_OPENWEATHER_ENDPOINT;
  const weatherKey = process.env.REACT_APP_OPENWEATHER_APIKEY;
  const [city, setCity] = useState("Udine");
  const [coords, setCoords] = useState({ lat: "46.0711", lon: "13.2346" });
  const [backGroungImg, setBackGroungImg] = useState("");
  const [todayWeather, setTodayWeather] = useState({
    date: "",
    min: "",
    max: "",
    srcImg: "",
    description: "",
  });

  const [daysWeather, setDaysWeather] = useState([
    {
      id: "",
      key: "",
      date: "",
      description: "",
      max: "",
      min: "",
      srcImg: "",
    },
  ]);

  const [hoursWeather, setHoursWeather] = useState([
    {
      id: "",
      key: "",
      hour: "",
      temp: "",
      srcImg: "",
      feelsLike: "",
      description: "",
    },
  ]);

  /* helper function */

  function formatDate(milliseconds, options) {
    return new Date(milliseconds * 1000).toLocaleString("en", options);
  }

  function formatIcon(code) {
    return `https://openweathermap.org/img/wn/${code}@2x.png`;
  }

  function formatTemp(temp) {
    const roundedTemp = temp.toFixed(1);
    if (roundedTemp.endsWith(".0")) {
      return parseInt(roundedTemp).toString() + "°";
    }
    return roundedTemp + "°";
  }

  function formatTodayWeatherData(data) {
    return {
      min: formatTemp(data.daily[0].temp.min),
      max: formatTemp(data.daily[0].temp.max),
      temp: formatTemp(data.current.temp),
      description: data.current.weather[0].description,
      date: formatDate(data.current.dt, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    };
  }

  function formatDayWeather(data) {
    return data.daily.map((day, index) => {
      const { dt } = day;
      const { min, max } = day.temp;
      const { icon, description } = day.weather[0];

      return {
        key: index,
        date: formatDate(dt, { weekday: "short" }),
        max: formatTemp(max),
        min: formatTemp(min),
        srcImg: formatIcon(icon),
        description: description,
      };
    });
  }

  function formatHourWeather(data) {
    return data.hourly.map((hour, index) => {
      let { dt, temp, feels_like } = hour;
      let { icon, description } = hour.weather[0];

      return {
        key: index,
        hour: formatDate(dt, { hour: "numeric", hour12: true }),
        temp: formatTemp(temp),
        feelsLike: formatTemp(feels_like),
        srcImg: formatIcon(icon),
        description: description,
      };
    });
  }

  /* fetching data from weather api */
  const fetchWeather = async () => {
    const apiUrl =
      endpointWeather +
      `?lat=${coords.lat}&lon=${coords.lon}&exclude=alerts,minutely&units=metric&appid=${weatherKey}`;
    await fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data.hasOwnProperty("cod")) {
          console.log("Error" + data.message);
          console.log("non hai detto la parola magica");
        } else {
          setBackGroungImg(() => {
            let { main } = data.current.weather[0];
            main = main.toLowerCase();
            return `https://mdbgo.io/ascensus/mdb-advanced/img/${main}.gif`;
          });
          const newTodayWeather = formatTodayWeatherData(data);
          setTodayWeather(newTodayWeather);

          const newDaysWeather = formatDayWeather(data);
          setDaysWeather(newDaysWeather);

          const newHourWeather = formatHourWeather(data);
          setHoursWeather(newHourWeather);

          console.log(hoursWeather);
        }
      });
  };

  function updateCity(newCity) {
    if (newCity) {
      setCity((prev) => {
        if (newCity !== prev) {
          console.log("city changed");
          return newCity.charAt(0).toUpperCase() + newCity.slice(1);
        }
      });
      console.log("this is my app city");
      console.log(city);
    }
  }

  function updateCoords(coord) {
    setCoords({ lat: coord.lat, lon: coord.lon });
  }

  useEffect(() => {
    if (city) fetchWeather();
  }, [city]);

  return (
    <Container disableGutters maxWidth="sm" component="main" sx={{ pb: 8 }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        xs={12}
        md={6}
        lg={12}
      >
        <City
          googleKey={googleKey}
          updateCity={updateCity}
          coords={updateCoords}
        />
      </Grid>

      <Grid container>
        <Today
          todayWeather={todayWeather}
          currentCity={city}
          bgimage={backGroungImg}
        ></Today>
      </Grid>

      <Grid
        container
        spacing={0.5}
        item
        mt={4}
        xs={12}
        lg={12}
        justifyContent="center"
      >
        <Grid container item lg={12} justifyContent="space-around">
          <Typography gutterBottom>Next 4 days</Typography>
        </Grid>

        {daysWeather.slice(1, 5).map((day) => {
          return <Day data={day} />;
        })}
      </Grid>

      <Grid container spacing={0.5} direction="column" lg={12} mt={4}>
        <Grid container item xs={10} justifyContent="center">
          <Typography gutterBottom>Next hours</Typography>
        </Grid>
        {hoursWeather.slice(0, 5).map((hour) => {
          return <Hour data={hour} />;
        })}
      </Grid>

      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        mt={4}
      >
        <Footer year={new Date().getFullYear()} />
      </Grid>
    </Container>
  );
}

export default App;

export function formatDate(milliseconds, options) {
  return new Date(milliseconds * 1000).toLocaleString("en", options);
}

export function formatIcon(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

export function formatTemp(temp) {
  const roundedTemp = temp.toFixed(1);
  if (roundedTemp.endsWith(".0")) {
    return parseInt(roundedTemp).toString() + "°";
  }
  return roundedTemp + "°";
}

export function formatTodayWeatherData(data) {
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

export function formatDayWeather(data) {
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

export function formatHourWeather(data) {
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

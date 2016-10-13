$(document).ready(function() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather, function(failure) {
            showWeather({
                coords: {
                    latitude: 54,
                    longitude: 12
                }
            });
        });
    } else {
        showWeather({
            coords: {
                latitude: 54,
                longitude: 12
            }
        });
    }
});


function showWeather(position) {
    let lat = Math.round(position.coords.latitude);
    let lon = Math.round(position.coords.longitude);

    var weatherDataUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=ed4014003656768fefbef9f32fc090cf&units=metric&lang=de";

    $.ajax({
        url: weatherDataUrl,
        success: function(result) {
            let speed_kmh = result.wind.speed * 3.6;
            let pressure = Math.round(result.main.pressure);
            let temperature = result.main.temp.toFixed(1);

            let pressure_color;
            if (pressure > 1013) {
                pressure_color = "red";
            } else if (pressure < 1013) {
                pressure_color = "blue";
            } else {
                pressure_color = "green";
            }

            let temperature_color;
            switch(true) {
              case (temperature >= 30):
                temperature_color = "red";
                break;
              case (temperature >= 20):
                temperature_color = "orange";
                break;
              case (temperature >= 10):
                temperature_color = "yellow";
                break;
              case (temperature >0):
                temperature_color = "green";
                break;
              default:
                temperature_color = "blue";
                break;
            }

            $('#temperature span').text(temperature + '°C');
            $('#temperature span').attr("style", "color: " + temperature_color + ";");
            $('#weather-icon img').attr("src", "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png");
            $('#weather-icon span').text(result.weather[0].description);
            $('#pressure').text(pressure + " hPa");
            $('#pressure').attr("style", "color: " + pressure_color + ";");
            $('#humidity').text(result.main.humidity + "%");
            $('.wind-arrow').attr("style", "transform: rotate(" + Math.round(result.wind.deg) + "deg);");
            $('#wind-degree').text(Math.round(result.wind.deg) + "°");
            $('#wind-speed').text(Math.round(speed_kmh) + " km/h");
        }
    });
}

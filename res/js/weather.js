$(window).on('load', function() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showData, function(failure) {
            showData({
                coords: {
                    latitude: 54.1532,
                    longitude: 12.1046
                }
            });
        });
    } else {
        showData({
            coords: {
                latitude: 54.1532,
                longitude: 12.1046
            }
        });
    }


});

function showData(position) {
  showWeather(position);
  showSnow();
}

function showSnow() {
  var date = new Date();
  var mm = date.getMonth() +1;

  if(mm == 12 || mm == 1 || mm == 2) {
    $(document).snowfall({flakeCount : 200, maxSpeed : 5, maxSize : 3, collection : '.second-container'});
    if(mm == 12) {
      $('body').addClass("christmas");
    }
  }
}



function showWeather(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let weatherDataUrl = "https://api.apixu.com/v1/current.json?key=595c32ad4dce4ec58c4101822160311&q=" + lat + "," + lon + "";

    getData(weatherDataUrl, function(result) {
      let speed_kmh = result.current.wind_kph;
      let pressure = result.current.pressure_mb;
      let temperature = result.current.temp_c;
      let wind_deg = result.current.wind_degree;
      let wind_deg_fluctuation = Math.round(0.25 * speed_kmh);
      let wind_fluct_duration = Math.round(2 / speed_kmh * 10000) + "ms";

      let pressure_color;
      if (pressure > 1013) {
          pressure_color = "red";
      } else if (pressure < 1013) {
          pressure_color = "blue";
      } else {
          pressure_color = "green";
      }

      let temperature_color;
      switch (true) {
          case (temperature >= 30):
              temperature_color = "red";
              break;
          case (temperature >= 20):
              temperature_color = "orange";
              break;
          case (temperature >= 10):
              temperature_color = "yellow";
              break;
          case (temperature > 0):
              temperature_color = "green";
              break;
          default:
              temperature_color = "blue";
              break;
      }


      $('#city').text(result.location.name);
      $('#temperature span').text(temperature + '°C');
      $('#temperature span').attr("style", "color: " + temperature_color + ";");
      $('#weather-icon img').attr("src", "https:" + result.current.condition.icon);
      $('#weather-icon span').text(result.current.condition.text);
      $('#pressure').text(pressure + " hPa");
      $('#pressure').attr("style", "color: " + pressure_color + ";");
      $('#humidity').text(result.current.humidity + "%");
      $('#wind-degree').text(Math.round(wind_deg) + "°");
      $('#wind-speed').text(Math.round(speed_kmh) + " km/h");


      $.keyframe.debug = true;
      $.keyframe.define([{
          name: 'compass-ani',
          '0%': {
              'transform': 'rotate(' + (wind_deg + wind_deg_fluctuation) + 'deg)'
          },
          '50%': {
              'transform': 'rotate(' + (wind_deg - wind_deg_fluctuation) + 'deg)'
          },
          '100%': {
              'transform': 'rotate(' + (wind_deg+ wind_deg_fluctuation) + 'deg)'
          }
      }, {
          name: 'compass-start',
          '0%': {
              'transform': 'rotate(0deg)'
          },
          '100%': {
              'transform': 'rotate(' + (wind_deg + wind_deg_fluctuation) +'deg)'
          }
      }]);

      $('#wind-arrow').playKeyframe({
          name: 'compass-start',
          duration: wind_fluct_duration,
          timingFunction: 'ease-in-out',
          delay: '0s',
          iterationCount: '1',
          direction: 'normal',
          fillMode: 'forwards',
          complete: function() {
              $('#wind-arrow').playKeyframe({
                  name: 'compass-ani',
                  duration: wind_fluct_duration, // [optional, default: 0, in ms] how long you want it to last in milliseconds
                  timingFunction: 'ease-in-out', // [optional, default: ease] specifies the speed curve of the animation
                  delay: '0s', //[optional, default: 0s]  how long you want to wait before the animation starts
                  iterationCount: 'infinite', //[optional, default:1]  how many times you want the animation to repeat
                  direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
                  fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
                  complete: function() {} //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
              });
          }
      });

    });

}

function getData(someurl, callback) {
  $.ajax ({
    url: someurl,
    success: callback
  });
}

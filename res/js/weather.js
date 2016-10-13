$(document).ready(function() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
});


function showWeather(position) {
    var weatherDataUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=ed4014003656768fefbef9f32fc090cf&units=metric&lang=de";

    $.ajax({
        url: weatherDataUrl,
        success: function(result) {
            $('#temperature span').text(result.main.temp + '°C');
            $('#weather-icon img').attr("src", "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png");
            $('#weather-icon span').text(result.weather[0].description);
            $('#pressure').text(Math.round(result.main.pressure) + "hPa");
            $('#humidity').text(result.main.humidity + "%");
        }
    });
}

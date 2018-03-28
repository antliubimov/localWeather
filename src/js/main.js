'use strict';

var api = 'https://api.openweathermap.org/data/2.5/weather?';
var lat, lon;
var tempUnit = 'C';

window.onload = function() {
    console.log("Document is ready");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currPosition);
    } else {
        console.log("Geolocation is not supported by this browser");
    }


    function currPosition(position) {
        lat = 'lat=' + Math.round(position.coords.latitude * 10) / 10;
        lon = 'lon=' + Math.round(position.coords.longitude * 10) / 10;
        getWeather(lat, lon);
    };

    function getWeather(lat, lon) {
        var urlStr = api + lat + '&' + lon;
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', urlStr, true);
        xhttp.send();
        console.log(xhttp.responseText);
    };
};
'use strict';

var api = 'api.openweathermap.org/data/2.5.weather?';
var lat, lon;
var tempUnit = 'C';

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currPosition);
    } else {
        alert("Geolocation is not supported by this browser");
    }
}

function currPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
}

function gerWeather(lat, lon) {

}
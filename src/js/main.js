'use strict';

var api = 'https://fcc-weather-api.glitch.me/api/current?';
var lat, lon;
var tUnit = document.getElementsByClassName('wi-celsius');
var city = document.getElementById('city'),
    country = document.getElementById('country'),
    temperature = document.getElementById('temperature'),
    desc = document.getElementById('desc'),
    wIcon = document.getElementById('weather-icon'),
    tUnit = document.getElementById('tUnit');

window.onload = function() {
    console.log("Document is ready");
    getLocation();
};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currPosition);
    } else {
        city.innerText = "Geolocation is not supported by this browser";
    }
}

function currPosition(position) {
    lat = 'lat=' + Math.round(position.coords.latitude * 10) / 10;
    lon = 'lon=' + Math.round(position.coords.longitude * 10) / 10;
    getWeather(lat, lon);
};

function getWeather(lat, lon) {
    var urlStr = api + lat + '&' + lon;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            console.log("Answer is ready");
            if (xhr.status == 200) {
                console.log(xhr.responseText);
                var resp = xhr.responseText;
                var data = JSON.parse(resp);
                city.innerText = data.name + ', ';
                country.innerText = data.sys.country;
                temperature.innerText = Math.round(data.main.temp) + " ";
                desc.innerText = data.weather[0].main;
                wIcon.innerHTML = '<img src="' + data.weather[0].icon + '"/>';
            } else {
                console.log("The response = " + xhr.status);
            }
        } else {
            console.log("The Answer is not ready");
        }
    }

    xhr.open('GET', urlStr, true);
    xhr.send();
    tUnit.addEventListener("click", toggleScale);
};

function cToF(celcius) {
    return celcius * 9 / 5 + 32;
}

function fToC(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toggleScale() {
    if (document.getElementsByClassName('wi wi-celsius')) {
        temperature = cToF(temperature.innerText).toFixed(2);
        document.getElementById('tUnit').classList.remove('wi-celsius');
        document.getElementById('tUnit').classList.add('wi-fahrenheit');
    } else if (document.getElementsByClassName('wi wi-fahrenheit')) {
        temperature = fToC(temperature.innerText).toFixed(2);
        document.getElementById('tUnit').classList.remove('wi-fahrenheit');
        document.getElementById('tUnit').classList.add('wi-celsius');
    }
}
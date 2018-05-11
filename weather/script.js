var cityName = ["Kiev", "Lviv", "Odessa"];
getAllCitiesWeather();
setInterval(getAllCitiesWeather, 1000 * 60 * 5);


function getWeather(city) {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        data: {
            units: "metric",
            q: city,
            APPID: "ceb255b2c9c60e3833e7a5dfea0cef31"
        },
        success: function (response) {
            showWeather(response);
        }
    });
}

function showWeather(weather) {
    var hElements = document.getElementsByTagName("h1");
    for (var i = 0; i < hElements.length; i++) {
        if (hElements[i].innerHTML.trim() == weather.name) {
            hElements[i].parentElement.nextElementSibling.innerHTML = weather.main.temp;
            hElements[i].parentElement.parentElement.lastElementChild.previousElementSibling.innerHTML = weather.weather[0].main + ", " + weather.weather[0].description;
        }
    }
}

function getAllCitiesWeather() {
    for (var i = 0; i < cityName.length; i++) {
        getWeather(cityName[i]);
    }
}

function updateWeather(event) {
    getWeather(event.target.parentElement.getElementsByTagName('h1')[0].innerHTML);
}

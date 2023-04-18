var search = document.getElementById("getweather");
var apiKey = "350b763106d9eec4d6de49b9cfcf9a17";
var cityName;
var apiUrl;

search.addEventListener("click", function (event) {
    event.preventDefault()
    cityName = document.getElementById("examplecityname").value
    console.log(cityName)
    console.log(apiUrl)
    getweatherforecast(cityName);
    fiveDayforecast(cityName);
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [] //|| or operator
    searchHistory.push(cityName)
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    displayweather();
})


function getweatherforecast(cityName) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var htmlCard = `
            <div class="container" >
            <div class="d-block ">
            <h3 class="card-title">${data.name}</h3>
              <h5 class="card-title">Temp: ${data.main.temp}</h5>
              <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="card-img-icon" alt="weather icon">
              <p class="card-text">Humidity:${data.main.humidity}</p>
              <p class="card-text">Windspeed:${data.wind.speed}</p>
              <p class="card-text">Description:${data.weather[0].description}</p>
            </div>
          </div>   
            `
         document.getElementById ("Current-Forecast").innerHTML=htmlCard   
        })
}

function fiveDayforecast(cityName) {
    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
    
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data)
            var htmlCode = ""
            for (var i=0;i<data.list.length;i=i+8){ //24/3 = 8 //i++ i = i+1
                htmlCode += `
               
                <div class="card" style="width: 8rem;">
            <h3 class="card-title">${data.list[i].dt_txt}</h3>
              <h5 class="card-title">Temp: ${data.list[i].main.temp}</h5>
              <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" class="card-img-top" alt="weather icon">
              <p class="card-text">Humidity:${data.list[i].main.humidity}</p>
              <p class="card-text">Windspeed:${data.list[i].wind.speed}</p>
              <p class="card-text">Description:${data.list[i].description}</p>
            </div>
          </div>   
                `
            }
            document.getElementById ("5-day-forecast").innerHTML=htmlCode
        })
}

function displayweather () {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
    var weatherbutton =""
    for (var i=0; i<searchHistory.length;i++) {
        weatherbutton += `<button class="btn btn-secondary searchWeather">${searchHistory[i]}</button>`
    }
    document.getElementById("weatherbutton").innerHTML=weatherbutton
    var buttonList = document.querySelectorAll(".searchWeather")
    buttonList.forEach(element => {
        element.addEventListener("click",getStoredCityForecast)
    })
    
}
function getStoredCityForecast(event){
    var city = event.target.textContent
    console.log(city)
    getweatherforecast(city)
    fiveDayforecast(city)
}
displayweather()
var search = document.getElementById ("getweather");
var apiKey = "350b763106d9eec4d6de49b9cfcf9a17";
var cityName;
var apiUrl;

search.addEventListener("click",function(event){
    event.preventDefault()
    cityName = document.getElementById ("examplecityname").value
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    console.log(cityName)
    console.log(apiUrl)
    getweatherforecast();
})


function getweatherforecast () {

fetch (apiUrl)
    .then(function(response){
    return response.json();
})
    .then(function(data){
        console.log (data)
    localStorage.setItem("cityName", JSON.stringify(data));
    })
}    

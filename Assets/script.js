var search = document.getElementById ("getweather");

search.addEventListener("click",function(event){
    event.preventDefault()
    var city = document.getElementById ("examplecityname").value
    console.log(city)
})
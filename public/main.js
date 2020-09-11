// register service workers -- in service.js

if('serviceWorker' in navigator) {

    window.addEventListener('load', () =>{

        navigator.serviceWorker
        .register('service.js')

        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error  ${err}`));
    });
}



//  =========== End =======================

let btnGetWeather= document.querySelector("#btnGetWaether");


btnGetWeather.addEventListener('click', function(e){

    const city= document.querySelector('#cityname').value;

    

    const key='e2c72d2b9ea328dfb6cfb04388d5703c';

    const url="https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + key;

    fetch(url)
            .then(function(response){

                return response.json()

            })
            .then(function(data){
                // let temperature= data.main.temp ;
                // let tempC= temperature - 273.15;
                // let tempF= temperature * 9/5 - 459.67; 

                // store search in localstorage
            let weatherData = JSON.stringify(data);
            if (localStorage.getItem('myData') === null) {
                localStorage.setItem('myData', weatherData);
            } else if (localStorage.getItem('myData') != null) {
                weatherData = JSON.stringify(data);
                localStorage.setItem('myData', weatherData);
            }
            
            
            // get data in localstorage and use it
            const newData = JSON.parse(localStorage.getItem('myData'));
            const datetime = newData.dt;
            const tday = new Date().toString();
            const sunRise = new Date(newData.sys.sunrise * 1000).getHours();
            const sunSet = new Date(newData.sys.sunset * 1000).getHours();
            let tempC= newData.main.temp- 273.15;
            let output = '<h2>Overview</h2>';
            output += `<img src="https://openweathermap.org/img/w/${newData.weather[0].icon}.png" alt="${newData.weather[0].description}" loading="lazy" id="weather-img"/>
            <p>Day: ${tday}</p>
            <p>Temperature: ${tempC.toFixed(0)} celcius</p>
            <p>Wind Speed: ${newData.wind.speed} m/s</p>
            
            <p>Weather Description: ${newData.weather[0].description}</p> 
             <p>State, Country: ${newData.name}, ${newData.sys.country}</span>`

            let p= document.querySelector('#show');
            p.innerHTML = output;
            p.className='resy';





                
                // p.innerHTML=`${tempC.toFixed(0)}C / ${tempF.toFixed(0)}F`;
                console.log(weatherData.weather);
                p.innerHTML=json.parse(weatherData.weather);
                
            })
            .catch(function(){

                
            })
})
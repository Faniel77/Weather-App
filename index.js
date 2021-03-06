
'use strict';

window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let iconFinder = document.querySelector('.icons-finder'); 
  let temperatureSection = document.querySelector('.degree-section');
  let temperatureSpan = document.querySelector('.degree-section span');

  
  if(navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(position => {
       long = position.coords.longitude;
       lat = position.coords.latitude;

      let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=8bc11677d842070a4cc2b26bd660d10a`;
      

       
      //fetch API 
      fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data); 
        const{temp} = data.current; 
        temperatureDegree.textContent = temp;
        const {description} = data.current.weather[0];
        temperatureDescription.textContent = description;
        locationTimezone.textContent = data.timezone;

        //Formula For Celsius 

        let celsius = (temp - 32) * (5/9);
        const {icon} = data.current.weather[0];
        iconFinder.src = ` http://openweathermap.org/img/wn/${icon}.png`;

        //change temperature to Celsius/Fahrenheit 
        temperatureSection.addEventListener('click', ()=> {
          if(temperatureSpan.textContent === '°F') {
            temperatureSpan.textContent = '°C'; 
            temperatureDegree.textContent = Math.floor(celsius);
          } else {
            temperatureSpan.textContent = '°F';
            temperatureDegree.textContent = temp;
          }
        })
        
      })
     })

   }
 })

      
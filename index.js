const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


function doSearch() {

  weatherBox.classList.remove('fadeIn');
  weatherDetails.classList.remove('fadeIn');

  const APIKey = 'e385167daf2ffb5362a1e3235ce37fc2';
  const city = document.querySelector('.search-box input').value;

  if (city === '') {
    container.style.height = '105px';
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`).then((response) => response.json()).then(json => {
    console.log(json);
    if (json.cod === '404') {
      container.style.height = '400px';
      weatherBox.style.display = 'none';
      weatherDetails.style.display = 'none';
      error404.style.display = 'block';
      error404.classList.add('fadeIn');
      return;
    }

    error404.style.display = 'none';
    error404.classList.remove('fadeIn');


    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    switch (json.weather[0].main) {
      case 'Clear':
        image.src = './images/clear.png';
        break;
      case 'Rain':
        image.src = './images/rain.png';
        break;
      case 'Snow':
        image.src = './images/snow.png';
        break;
      case 'Clouds':
        image.src = './images/cloud.png';
        break;
      case 'Haze':
        image.src = './images/haze.png';
        break;

      default:
        image.src = '';

    }

    // json data is all strings
    // parseInt converts the input string to an integer by truncating any decimal places.
    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;

    // to 1 decimal place
    // temperature.innerHTML = `${parseFloat(json.main.temp).toFixed(1)}<span>°F</span>`;

    description.innerHTML = `${json.weather[0].description}<span>`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}mph`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
  });


};



const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');


searchButton.addEventListener('click', function() {
  doSearch();
});

searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    doSearch();
  }
});

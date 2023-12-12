const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const searchInput = document.querySelector('.search-box input');

const locationIqApiKey = 'pk.4b30ac60d3c82c4855c67f0c1bda72fd';
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        searchInput.value =
            'Chia sẻ vị trí địa lý không được trình duyệt hỗ trợ. --- dammio.com';
    }
}
function showPosition(position) {
    const locationIqUrl = `https://us1.locationiq.com/v1/reverse.php?key=${locationIqApiKey}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&lang=en`;

    fetch(locationIqUrl)
        .then((response) => response.json())
        .then((data) => {
            const countryName = data.address.country;
            if (countryName == 'Việt Nam') {
                searchInput.value = 'Công Hòa Xã Hội Chủ Nghĩa ' + countryName;
            } else {
                searchInput.value = countryName;
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

function weatherhandle() {
    const APIKey = 'c93616e8862ca848ac500e28f134900b';
    const city = searchInput.value;

    if (city === '') return;

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=vi`,
    )
        .then((response) => response.json())
        .then((json) => {
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
            const temperature = document.querySelector(
                '.weather-box .temperature',
            );
            const description = document.querySelector(
                '.weather-box .description',
            );
            const humidity = document.querySelector(
                '.weather-details .humidity span',
            );
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = '/img/clear.png';
                    break;

                case 'Rain':
                    image.src = '/img/rain.png';
                    break;

                case 'Snow':
                    image.src = '/img/snow.png';
                    break;

                case 'Clouds':
                    image.src = '/img/cloud.png';
                    break;

                case 'Haze':
                    image.src = '/img/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(
                json.main.temp,
            )}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
}
search.addEventListener('click', () => {
    weatherhandle();
});
searchInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        weatherhandle();
    } else {
        return;
    }
});

getLocation();
search.click();

//function to load the CSS icons
function loadSrc(src) {
    $('.weather-icon').load(src);
}
//options for the API call, it will get populated with units and city
var options = {
    "appid": "7f6435e69b025332b6bbf79e3a160058"
}



function toCelsius(temp) {
    return Math.round((5/9) * (temp-32));
}
function toFahrenheit(temp) {
    return Math.round(temp * 9 / 5 + 32);
}

function tempSymbol(units) {
    if (units === 'imperial') {
        $('.symbol').html(' &#8457')
    } else {
        $('.symbol').html(' &#8451')
    }
}

$('#metric').click(function() {
    var temp = Number($('.temp').text());
    if ($(this).hasClass('active')) {
        return
    }
    $('#imperial').removeClass('active');
    $(this).addClass('active');
    options.units = 'metric';
    $('.temp').text(toCelsius(temp));
    tempSymbol('metric');
})

$('#imperial').click(function() {
    var temp = Number($('.temp').text());
    if ($(this).hasClass('active')) {
        return
    }
    $('#metric').removeClass('active');
    $(this).addClass('active');
    options.units = 'imperial';
    $('.temp').text(toFahrenheit(temp));
    tempSymbol('imperial');
})


function getWeather() {
    options.q = $('#input').val();
    options.units = options.units || 'metric';
    $.getJSON('http://api.openweathermap.org/data/2.5/weather', options, function(data) {
        $('.no-geo').addClass('hidden')
        $('.city').html(data.name);
        $('.temp').html(Math.round(data.main.temp));
        tempSymbol(options.units)
        if(data.weather[0].id === 800) {
            loadSrc('sun.html')
        } else {
            loadSrc('thunder-storm.html')
        }
    })
}


$('#search').click(getWeather);
$('#input').keypress(function(e) {
    if (e.which === 13) {
        getWeather();
    }
})


$(document).ready(function() {
    if(navigator.geolocation) {
		getWeatherByPos =  function(position) {
			options.lat = position.coords.latitude;
			options.lon = position.coords.longitude;
			getWeather();
		}
		positionError = function(error) {
			$('.no-geo').removeClass('hidden');
		}
        navigator.geolocation.getCurrentPosition(getWeatherByPos, positionError)
    }
});

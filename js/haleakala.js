document.addEventListener('DOMContentLoaded', function() {

    // Weather
    fetch('https://api.weather.gov/gridpoints/HFO/219,118/forecast')
        .then(response => response.json())
        .then(data => {
            // console.log(data);

            var current = data.properties.periods[0];
            var forecast = data.properties.periods[1];

            console.log(current.name + ' ' + current.shortForecast);
            console.log(forecast.name + ' ' + forecast.shortForecast);

            $('#current-weather').html(current.shortForecast.toLowerCase());
            $('#forecast-name').html(forecast.name);
            $('#forecast-weather').html(forecast.shortForecast.toLowerCase());

            // console.log(data.properties.periods[0]);
        })
    .catch(error => console.error(error))

    // Data
    fetch('./js/data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        var first = data[0].name;

        data.map((item) => {

            // function cities(){
            //     item.cities.map((city) => {
            //     console.log(city);
            //     return `<span class="city ${city}"></span>`;
            //     });
            //     console.log('hi');
            // };


            $('#list-items').append(`
                <li class="${item.category}">${item.url ? `<a href="${item.url}" target="_blank">` : ``}${item.name}${item.url ? `</a>` : ``} ${item.cities.map(city => `<span class="city ${city.toLowerCase()}"></span>`).join('')} ${item.description ? `<br /><i>${item.description}</i>` : `` }</li>
            `);

        });

    })
    .catch(error => console.error(error))

    // Get current date
    var today = new Date();
    var dd = String(today.getDate());
    var yyyy = today.getFullYear();
    var months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var thisMonth = months[today.getMonth()]; // getMonth method returns the month of the date (0-January :: 11-December)
    console.log(thisMonth);
  
    today = thisMonth + ' ' + dd + ', ' + yyyy;
  
    $('#today').html(today);

    // Filtering

    $('nav a').click(function(){
        console.log(this.id);
        $('#list ul li').hide();
        $('.' + this.id).show();
        $('#key, #resources, #camera').show();

        $('nav a').removeClass('selected');
        $('nav a#' + this.id).addClass('selected');
        checkFooter();

        $('body').removeClass('crater-body');
        $('#crater').hide();
        $('#flower').addClass('flower-black');

        $('body').css('text-shadow', 'none');
    });

    // Put footer at the bottom if it's a short page
    function checkFooter(){
        var window_height = $(window).height();
        var document_height = $(document).height();

        if(document_height > window_height){
            $('#footer').removeClass('bottom');
        }
        else {
            $('#footer').addClass('bottom');
        }
        // console.log('window:' + window_height);
        // console.log('doc:' + document_height);
    }

    checkFooter();

    $(window).resize(function() {
        checkFooter();
    });


}, false);


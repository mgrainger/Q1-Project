$(document).ready(function() {
    $('select').material_select();
    $('#modal1').modal('open');

    $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: 0.5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        starting_top: '4%', // Starting top style attribute
        ending_top: '10%', // Ending top style attribute
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            console.log(modal, trigger);
        },
        complete: function() {

            } // Callback for Modal close
    });


    // $('form').submit(function(event) {
    //     event.preventDefault();
    //     var $zipInput = $('#zip');
    //     var zip = $zipInput.val();
    //     $zipInput.val('');
    //     var herokuPrefix = 'https://galvanize-cors-proxy.herokuapp.com/';
    //     var geoAPI = 'https://maps.googleapis.com/maps/api/geocode/json?';
    //     var geoComp = 'components=postal_code:' + zip;
    //     var geoKey = '&key=AIzaSyDrwG2vaCL_doUJ1Io8bTNrGzxT30N6SqE';
    //     var ajaxGeoURL = herokuPrefix + geoAPI + geoComp + geoKey;
    //     $.ajax({
    //         url: ajaxGeoURL,
    //         type: "GET",
    //         dataType: 'json',
    //         success: getCoordinates,
    //     });
    // });

    //Input by Address
    $('form').submit(function(event) {
        event.preventDefault();
        var $cityInput = $('#city');
        var city = $cityInput.val();
        $cityInput.val('');
        var $zipInput = $('#zip');
        var zip = $zipInput.val();
        $zipInput.val('');
        var herokuPrefix = 'https://galvanize-cors-proxy.herokuapp.com/';
        var geoAPI = 'https://maps.googleapis.com/maps/api/geocode/json?';
        var geoZip = 'components=postal_code:' + zip;
        var geoComp = 'address=' + city;
        var geoKey = '&key=AIzaSyDrwG2vaCL_doUJ1Io8bTNrGzxT30N6SqE';
        var ajaxGeoURL = herokuPrefix + geoAPI + geoZip + geoKey;

        $.ajax({
            url: ajaxGeoURL,
            type: "GET",
            dataType: 'json',
            success: getCoordinates,
        });
    });

});

function getCoordinates(data) {
    function getLatitude() {
        return data.results[0].geometry.location.lat;
    }

    function getLongitude() {
        return data.results[0].geometry.location.lng;
    }
    var swingAPI = 'https://api.swingbyswing.com/v2/courses/search_by_location?';
    var swingCoordinates = 'lat=' + getLatitude() + '&lng=' + getLongitude();
    var swingParams = '&radius=100&active_only=yes&hole_count=18&order_by=global_rank&from=1';
    var swingRadius = '&radius=15&active_only=yes';
    var holeCount = '&hole_count=' + 18;
    var orderBy = '&order_by=global_rank&from=1';
    var swingToken = '&access_token=9a7a612e-4ccf-4deb-a2da-cde8bc46db01';
    var ajaxSwingURL = swingAPI + swingCoordinates + swingRadius + holeCount + orderBy + swingToken;

    $.ajax({
        url: ajaxSwingURL,
        type: "GET",
        dataType: 'json',
        success: getCourses,
    });
}

function getCourses(data) {
    var courses = data.courses;
    var moreCoursesURL = data.meta.courses.next;
    var $cards = $('.cards .cardCol');

    for (var i = 0; i < courses.length; i++) {
        if ($("#private").prop('checked') === false) {
            if (courses[i].membership_type === 'public') {
                var $card = '<div class="col s12 m6 l6"> <div class="card blue-grey darken-1"> <div class="card-content white-text"><span class="card-title truncate">' +
                    courses[i].name + '</span><p class= "truncate">' +
                    '<br>' + courses[i].addr_1 + '</br>' + courses[i].city + ' ' + courses[i].state_or_province + ' ' + courses[i].zip_code +
                    '<br>' + courses[i].phone +
                    '</br></p></div><div class="card-action"><a href="' +
                    courses[i].website + '">Course Website</a></div></div></div></div>';
                $cards.append($card);
            }
        } else {
            var $allCards = '<div class="col s12 m6 l4"> <div class="card blue-grey darken-1"> <div class="card-content white-text"><span class="card-title truncate">' +
                courses[i].name + '</span><p class= "truncate">' +
                '<br>' + courses[i].addr_1 + '</br>' + courses[i].city + ' ' + courses[i].state_or_province + ' ' + courses[i].zip_code +
                '<br>' + courses[i].phone +
                '</br></p></div><div class="card-action"><a href="' +
                courses[i].website + '">Course Website</a></div></div></div></div>';
            $cards.append($allCards);
        }
    }
    if (moreCoursesURL) {
        $.ajax({
            url: moreCoursesURL,
            type: "GET",
            dataType: 'json',
            success: getCourses,
        });
    }

    $(".card").click(function() {

        $(this).fadeOut(100);
    });
}

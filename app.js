$(document).ready(function() {
    loadModalAnimation();
    loadMaterialStyles();
    attachFormSubmissionHandler();
});

function loadModalAnimation() {
    $('.modal').modal('');
}

function loadMaterialStyles() {
    $('select').material_select();
}

function buildGeoCodeURL() {
    var city = $('#city').val();
    var distance = $('#distanceInput').val();
    var $addDistance = '<h6>' + distance + '</h6>';
    var $currentAdd = '<h3>' + city + ' Golf Courses</h3>';
    var $currentCity = $('.currentCity');
    $currentCity.append($currentAdd);
    $currentCity.append($addDistance);
    var herokuPrefix = 'https://galvanize-cors-proxy.herokuapp.com/';
    var geoAPI = 'https://maps.googleapis.com/maps/api/geocode/json?';
    var mapsAPI = 'https://maps.googleapis.com/maps/api/js?';
    var geoComp = 'address=' + city;
    var geoKey = '&key=AIzaSyDrwG2vaCL_doUJ1Io8bTNrGzxT30N6SqE';
    return herokuPrefix + geoAPI + geoComp + geoKey;
}




function attachFormSubmissionHandler() {
    $('.form').submit(function(event) {
        event.preventDefault();
        geoAJAXRequest(buildGeoCodeURL());
    });
}

function geoAJAXRequest(url) {
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: swingAJAXRequest,
    });
}



function getLatitude(data) {
    return data.results[0].geometry.location.lat;
}

function getLongitude(data) {
    return data.results[0].geometry.location.lng;
}

function getRadius(data) {
    return $('.currentCity h6').text();
}

function swingURL(data) {
    var swingAPI = 'https://api.swingbyswing.com/v2/courses/search_by_location?';
    var swingCoordinates = 'lat=' + getLatitude(data) + '&lng=' + getLongitude(data);
    var swingRadius = '&radius=' + getRadius(data);
    var holeCount = '&active_only=yes&hole_count=' + 18;
    var orderBy = '&order_by=local_rank&from=1';
    var swingToken = '&access_token=9a7a612e-4ccf-4deb-a2da-cde8bc46db01';
    return swingAPI + swingCoordinates + swingRadius + holeCount + orderBy + swingToken;
}

function swingAJAXRequest(data) {
    initMap(data);
    $.ajax({
        url: swingURL(data),
        type: "GET",
        dataType: 'json',
        success: getCourses,
    });
}

function getCourses(data) {
    var courses = data.courses;
    var moreCoursesURL = data.meta.courses.next;
    var $cards = $('.cardCol');

    for (var i = 0; i < courses.length; i++) {

        // Public v Private
        if ($("#private").prop('checked') === false) {
            if (courses[i].membership_type === 'public') {
                var $card = '<div class="col s12 m6 l6"> <div class="card teal darken-3"> <div class="card-content white-text"><span class="card-title truncate">' +
                    courses[i].name + '</span><p class= "truncate">' +
                    '<address><br>' + courses[i].addr_1 + '</br>' + courses[i].city + ' ' + courses[i].state_or_province + ' ' + courses[i].zip_code + '</address>' +
                    '<br> <i class="material-icons">phone</i>' + courses[i].phone +
                    '</br></p></div><div class="card-action"><a href="' +
                    courses[i].website + '">Course Website</a></div></div></div></div>';
                $cards.append($card);
            }
        } else {
            var $allCards = '<div class="col s12 m6 l6"> <div class="card teal darken-3"> <div class="card-content white-text"><span class="card-title truncate">' +
                courses[i].name + '</span><p class= "truncate">' +
                '<address><br>' + courses[i].addr_1 + '</br>' + courses[i].city + ' ' + courses[i].state_or_province + ' ' + courses[i].zip_code + '</address>' +
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
}

function initMap(data) {
    var searchCenter = {
        lat: getLatitude(data),
        lng: getLongitude(data)
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: searchCenter
    });
    // var marker = new google.maps.Marker({
    //     position: uluru,
    //     map: map
    // });
}

// $(".card").click(function() {
//     $(this).fadeOut(100);
// });

// $('address').each(function() {
//     var link = "<a href='http://maps.google.com/maps?q=" + encodeURIComponent($(this).text()) + "' target='_blank'>" + $(this).text() + "</a>";
//     $(this).html(link);
// });

//

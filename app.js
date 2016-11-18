$(document).ready(function() {
    loadModalAnimation();
    loadMaterialStyles();
    attachFormSubmissionHandler();
    loadModalAnimation();
});

var map = null;

function loadModalAnimation() {
    $('.load').trigger('click');
    $('.modal').modal();
}

function loadMaterialStyles() {
    $('select').material_select();
}

function buildGeoCodeURL() {

    var city = $('#city').val();
    var distance = $('#distanceInput').val();
    var $addDistance = '<h6> Max Driving Distance: <span class = "drivingDistance">' + distance + '</span> miles</h6>';
    var $currentAdd = '<h5>Showing Results for: <span class= "cityDistance">' + city + ' </span> Golf Courses</h5>';
    var $currentCity = $('.currentCity');
    var $userInfo = $('.userDirections');
    var $addCardDirections = '<div class="clickCardDirections">' +
        '<p>To see the course on the map click:&nbsp;&nbsp;&nbsp;' +
        '<a class="btn teal darken-3"></a>' +
        '</p></div>';
    var $addDirections = '<div class="row directions">' +
        '<p>If you already played the course click:&nbsp;&nbsp;&nbsp;' +
        '<a class="btn-floating btn-large waves-effect waves-light  red lighten-2"><i class="material-icons">not_interested</i></a>' +
        '</p></div>';
    $currentCity.append($currentAdd);
    $currentCity.append($addDistance);
    $userInfo.append($addCardDirections);
    $userInfo.append($addDirections);
    var herokuPrefix = 'https://galvanize-cors-proxy.herokuapp.com/';
    var geoAPI = 'https://maps.googleapis.com/maps/api/geocode/json?';
    var mapsAPI = 'https://maps.googleapis.com/maps/api/js?';
    var geoComp = 'address=' + city;
    var geoKey = '&key=AIzaSyDrwG2vaCL_doUJ1Io8bTNrGzxT30N6SqE&libraries=places';
    return herokuPrefix + geoAPI + geoComp + geoKey;
}

function attachFormSubmissionHandler() {
    $('.form').submit(function(event) {
        event.preventDefault();
        geoAJAXRequest(buildGeoCodeURL());
    });
}

// function clearSearch() {
// $('.load').
//
//   $('.main').empty();
// }

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
    return $('.drivingDistance').text();
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
                var $card = '<div class="col s12 m12 l6 cardClick" data-lat="' + courses[i].location.lat + '" data-lng="' + courses[i].location.lng + '"><div class="card teal darken-3 outer"> <div class="card-content white-text"><span class="card-title truncate">' +
                    courses[i].name + '</span><p class= "truncate">' +
                    '<address class = "address"><br>' + courses[i].addr_1 + ' </br><br>' + courses[i].city + ' ' + courses[i].state_or_province + ' ' + courses[i].zip_code + '</br></address>' +
                    '<div class = "row phoneButton"> <div class = "col s8 phone"> <i class="material-icons">phone</i>' + courses[i].phone +
                    '</div><div class = "col s4 buttonPlay"> <a class="btn-floating btn-large waves-effect waves-light red lighten-2 nix"><i class="material-icons">not_interested</i></a></div></div><div class="card-action"><a target="_blank" href="' +
                    courses[i].website + '">Course Website</a></div></div></div></div>';
                $cards.append($card);
            }
        } else if ($("#public").prop('checked') === false) {
            if (courses[i].membership_type === 'private') {
                var $card2 = '<div class="col s12 m12 l6 cardClick" data-lat="' + courses[i].location.lat + '" data-lng="' + courses[i].location.lng + '"><div class="card teal darken-3 outer"> <div class="card-content white-text"><span class="card-title truncate">' +
                    courses[i].name + '</span><p class= "truncate">' +
                    '<address class = "address"><br>' + courses[i].addr_1 + ' </br><br>' + courses[i].city + ' ' + courses[i].state_or_province + ' ' + courses[i].zip_code + '</br></address>' +
                    '<div class = "row phoneButton"> <div class = "col s8 phone"> <i class="material-icons">phone</i>' + courses[i].phone +
                    '</div><div class = "col s4 buttonPlay"> <a class="btn-floating btn-large waves-effect waves-light red lighten-2 nix"><i class="material-icons">not_interested</i></a></div></div><div class="card-action"><a target="_blank" href="' +
                    courses[i].website + '">Course Website</a></div></div></div></div>';
                $cards.append($card2);
            }
        } else {
            var $allCards = '<div class="col s12 m12 l6 cardClick" data-lat="' + courses[i].location.lat + '" data-lng="' + courses[i].location.lng + '"><div class="card teal darken-3 outer"> <div class="card-content white-text"><span class="card-title truncate">' +
                courses[i].name + '</span><p class= "truncate">' +
                '<address class = "address"><br class = "membership">' + courses[i].membership_type + '</br><br>' + courses[i].addr_1 + ' </br><br>' + courses[i].city + ' ' + courses[i].state_or_province + ' ' + courses[i].zip_code + '</br></address>' +
                '<div class = "row phoneButton"> <div class = "col s8 phone"> <i class="material-icons">phone</i>' + courses[i].phone +
                '</div><div class = "col s4 buttonPlay"> <a class="btn-floating btn-large waves-effect waves-light red lighten-2 nix"><i class="material-icons">not_interested</i></a></div></div><div class="card-action"><a target="_blank" href="' +
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
        // coursesPlayed();

        // activeAddress();

    } else {
        addressToMap();
        clearCourse();
    }
}

// function activeAddress() {
//     $('address').each(function() {
//         var link = "<a href='http://maps.google.com/maps?q=" + encodeURIComponent($(this).text()) + "' target='_blank'>" + $(this).text() + "</a>";
//         $(this).html(link);
//     });
// }

function clearCourse() {
    $('.nix').click(function() {
        // $(this).parents('.cardClick').fadeTo('slow', 0).remove();
        console.log('hello');
        $(this).parents('.cardClick').fadeOut("normal", function() {
            $(this).parents('.cardClick');
        });
    });
}

function initMap(data) {
    var searchCenter = {
        lat: getLatitude(data),
        lng: getLongitude(data)
    };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: searchCenter
    });

}

// Click on address, take words and convert to geocode, then add marker on google maps.
function addressToMap() {
    $('.cardClick').click(function() {
        var marker = new google.maps.Marker({
            position: {
                lat: Number(this.dataset.lat),
                lng: Number(this.dataset.lng)
            },
            map: map,
            title: 'Hello World!',
            snippet: 'blah blah blah'
        });
        map.panTo(marker.getPosition());
    });
}

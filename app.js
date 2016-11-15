$(document).ready(function() {
    console.log('JS is running');
    $(document).ready(function() {
        $('select').material_select();
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
        var $stateSelected = $('.state option:selected');
        var address = city + '+' + $stateSelected.val();
        var herokuPrefix = 'https://galvanize-cors-proxy.herokuapp.com/';
        var geoAPI = 'https://maps.googleapis.com/maps/api/geocode/json?';
        var geoComp = 'address=' + address;
        var geoKey = '&key=AIzaSyDrwG2vaCL_doUJ1Io8bTNrGzxT30N6SqE';
        var ajaxGeoURL = herokuPrefix + geoAPI + geoComp + geoKey;

        $.ajax({
            url: ajaxGeoURL,
            type: "GET",
            dataType: 'json',
            success: getCoordinates,
        });
    });
});

function getCoordinates(data) {
    latitude = data.results[0].geometry.location.lat;
    longitude = data.results[0].geometry.location.lng;
    var swingAPI = 'https://api.swingbyswing.com/v2/courses/search_by_location?';
    var swingCoordinates = 'lat=' + latitude + '&lng=' + longitude;
    var swingParams = '&radius=100&active_only=yes&hole_count=18&order_by=global_rank&from=1';
    var swingToken = '&access_token=9a7a612e-4ccf-4deb-a2da-cde8bc46db01';
    var ajaxSwingURL = swingAPI + swingCoordinates + swingParams + swingToken;

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
    var $list = $('.list');
    var $cards = $('.cards .row')

    for (var i = 0; i < courses.length; i++) {
        if ($("#private").prop('checked') === false) {
            if (courses[i].membership_type === 'public') {
                var $card = '<div class="col s12 m6"> <div class="card blue-grey darken-1"> <div class="card-content white-text"><span class="card-title">' +
                    courses[i].name + '</span><p>Insert Text Here</p></div><div class="card-action"><a href="#">Course Website</a></div></div></div></div>';
                // var $courseToList = $('<li>' + courses[i].name + '</li>');
                // $list.append($courseToList);
                $cards.append($card);
            }
        } else {
            var $allToList = $('<li>' + courses[i].name + '</li>');
            $list.append($allToList);
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

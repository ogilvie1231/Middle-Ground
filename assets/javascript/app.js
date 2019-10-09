// creating global variables
var buyerStreet;
var buyerCity;
var buyerState;
var buyerZip;
var sellerStreet;
var sellerCity;
var sellerState;
var sellerZip;
var buyerLat;
var buyerLng;
var sellerLat;
var sellerLng;

// setting mapquest key
L.mapquest.key = 'bR4IBmd5H6D8jaSYF4gzO12qVloc0MFi';

// creating a click even to submit values
$(document).on('click', 'button', function() {
    event.preventDefault();

    $('#begin').hide();
    // hide function to hide form after submission. Removed so addresses can be continued to put in.
    // $('.forms').hide();

    // retreiving and setting input values
    buyerStreet = $('#buyerAddress').val().trim();
    buyerCity = $('#buyerCity').val().trim();
    buyerState = $('#buyerState').val().trim();
    buyerZip = $('#buyerZip').val().trim();
    sellerStreet = $('#sellerAddress').val().trim();
    sellerCity = $('#sellerCity').val().trim();
    sellerState = $('#sellerState').val().trim();
    sellerZip = $('#sellerZip').val().trim();

    // clearing values after submission
    $('#buyerAddress').val('');
    $('#buyerCity').val('');
    $('#buyerState').val('');
    $('#buyerZip').val('');
    $('#sellerAddress').val('');
    $('#sellerCity').val('');
    $('#sellerState').val('');
    $('#sellerZip').val('');

    // creating search URL
    var geocodeURL = "https://www.mapquestapi.com/geocoding/v1/batch?key=" + L.mapquest.key + "&location=" + buyerStreet + "+" + buyerCity + "+" +

        buyerState + "+" + buyerZip + "&location=" + sellerStreet + "+" + sellerCity + "+" + sellerState + "+" + sellerZip;

    // initializing geocoding AJAX call
    $.ajax({
            url: geocodeURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(response)

            var buyerLat = response.results[0].locations[0].latLng.lat;
            var buyerLng = response.results[0].locations[0].latLng.lng;
            console.log(buyerLat);
            console.log(buyerLng);
            var sellerLat = response.results[1].locations[0].latLng.lat;
            var sellerLng = response.results[1].locations[0].latLng.lng;
            console.log(sellerLat);
            console.log(sellerLng);
            var midLat = (buyerLat + sellerLat) / 2;
            var midLng = (buyerLng + sellerLng) / 2;
            console.log(midLat);
            console.log(midLng);

            var reverseURL = "https://www.mapquestapi.com/geocoding/v1/reverse?key=" + L.mapquest.key + "&location=" + midLat + "," + midLng;

            // initinalizing reverse geocode AJAX call
            $.ajax({
                    url: reverseURL,
                    method: "GET"
                })
                .then(function(response) {
                    console.log(response)
                    console.log(response.results[0].locations[0].street)
                    var midPoint = response.results[0].locations[0].street

                    var searchURL = "https://www.mapquestapi.com/search/v2/radius?key=" + L.mapquest.key + "&origin=" + midPoint + "&radius=2&maxMatches=5&hostedData=mqap.ntpois|group_sic_code=?|541103"

                    // initializing AJAX call to display addresses in the middle of the two locations
                    $.ajax({
                            url: searchURL,
                            method: "GET"
                        })
                        .then(function(response) {
                            console.log('midpoint: ', response)
                            results = response.searchResults;
                            for (var i = 0; i < results.length; i++) {
                                var plotPoints = response.searchResults[i].fields.address;
                                L.mapquest.geocoding().geocode(plotPoints);
                                // Working on a click event that will give driving directions
                                // $(plotPoints).on('click', function() {

                                // }
                            };
                            console.log('plot point: ', plotPoints);

                            // calling mapPlot function and using map quests's js library to initilize the map
                            mapPlot();
                            L.mapquest.geocoding().geocode(midPoint);
                            $('#locationIs').append('Here are some safe and convenient places to meet!');
                        });
                });
        });
});

function mapPlot() {
    //Appending the map to the DOM.
    L.mapquest.map('map', {
        center: [0, 0],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12

    });
};
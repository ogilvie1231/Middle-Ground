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

L.mapquest.key = 'bR4IBmd5H6D8jaSYF4gzO12qVloc0MFi';
$(".button").on('click', function() {
    event.preventDefault();


    buyerStreet = $('#buyerAddress').val().trim();
    buyerCity = $('#buyerCity').val().trim();
    buyerState = $('#buyerState').val().trim();
    buyerZip = $('#buyerZip').val().trim();
    sellerStreet = $('#sellerAddress').val().trim();
    sellerCity = $('#sellerCity').val().trim();
    sellerState = $('#sellerState').val().trim();
    sellerZip = $('#sellerZip').val().trim();

    console.log('button has been pressed - buyer state: ', buyerState)

    var geocodeURL = "http://www.mapquestapi.com/geocoding/v1/address?key=" + L.mapquest.key + "&location=" + buyerStreet + "+" + buyerCity + "+" +
        buyerState + "+" + buyerZip;

    $.ajax({
            url: geocodeURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(response)
            console.log(response.results[0].locations[0].latLng.lat)
            console.log(response.results[0].locations[0].latLng.lng)
            buyerLat = response.results[0].locations[0].latLng.lat;
            buyerLng = response.results[0].locations[0].latLng.lng;
            mapPlot()

        });




    // http://www.mapquestapi.com/geocoding/v1/address?key=KEY&location=1600+Pennsylvania+Ave+NW,Washington,DC,20500

});

function mapPlot() {
    //'map' refers to a <div> element with the ID map
    L.mapquest.map('map', {
        center: [buyerLat, buyerLng],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12

    });
}
// });
// retrieve the LAT AND LONG from buyer and seller
// Function to average our the LAT and LONG from both
// Reverse Geocode to retrieve an address from the averaged LAT and LONG
// Have that address display on map

// L.mapquest.geocoding().geocode("166 N 520 E Orem UT 84097")
//  L.mapquest.geocoding().geocode("938 Brandermill Cove Murray UT 84123")


// var midLat = (buyerLat + SellerLat / 2);
// var midLng = (buyerLng + SellerLng / 2);
// console.log(midLat);
// console.log(midLng);
// var reverseURL = "http://www.mapquestapi.com/geocoding/v1/reverse?key=" + l.mapquest.key + "&location=" + midLat + "," + midLng;
// $.ajax({
//         url: reverseURL,
//         method: "GET"
//     })
//     .then(function(response) {
//         console.log(response)
//     })
$(document).on('click', '.button', function() {
    event.preventDefault();


    var buyerStreet = $('#buyerAddress').val().trim();
    var buyerCity = $('#buyerCity').val().trim();
    var buyerState = $('#buyerState').val().trim();
    var buyerZip = $('#buyerZip').val().trim();

    var sellerStreet = $('#sellerAddress').val().trim();
    var sellerCity = $('#sellerCity').val().trim();
    var sellerState = $('#sellerState').val().trim();
    var sellerZip = $('#sellerZip').val().trim();

});


L.mapquest.key = 'bR4IBmd5H6D8jaSYF4gzO12qVloc0MFi';
var queryURL = "http://www.mapquestapi.com/geocoding/v1/address?key=" + L.mapquest.key + "&location=utah"
    // http://www.mapquestapi.com/geocoding/v1/address?key=KEY&location=1600+Pennsylvania+Ave+NW,Washington,DC,20500
console.log('query URL: ', queryURL)
console.log('buyer state: ', buyerState)

$.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response)
        console.log(response.results[0].locations[0].latLng.lat)
        console.log(response.results[0].locations[0].latLng.lng)
            //'map' refers to a <div> element with the ID map
        var lat = response.results[0].locations[0].latLng.lat;
        var lng = response.results[0].locations[0].latLng.lng
        L.mapquest.map('map', {
            center: [lat, lng],
            layers: L.mapquest.tileLayer('map'),
            zoom: 12
        });

        // retrieve the LAT AND LONG from buyer and seller
        // Function to average our the LAT and LONG from both
        // Reverse Geocode to retrieve an address from the averaged LAT and LONG
        // Have that address display on map

        // L.mapquest.geocoding().geocode("166 N 520 E Orem UT 84097")
        //  L.mapquest.geocoding().geocode("938 Brandermill Cove Murray UT 84123")

    });
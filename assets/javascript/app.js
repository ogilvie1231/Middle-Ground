$(document).on('click', '.button', function() {
    event.preventDefault();

    var buyer = {

        street: $('#buyerAddress').val().trim(),
        city: $('#buyerCity').val().trim(),
        zip: $('#buyerZip').val().trim(),
        state: $('#buyerState').val().trim(),
    };

    var seller = {

        street: $('#sellerAddress').val().trim(),
        city: $('#sellerCity').val().trim(),
        zip: $('#sellerZip').val().trim(),
        state: $('#sellerState').val().trim(),
    };

    console.log('buyer info: ', buyer);
    console.log('seller info: ', seller);
});
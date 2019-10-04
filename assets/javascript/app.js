var firebaseConfig = {
    apiKey: "AIzaSyA5dFq5gi2VyDNjmIf3KeyI3wlBShsf9og",
    authDomain: "middle-ground-e79b1.firebaseapp.com",
    databaseURL: "https://middle-ground-e79b1.firebaseio.com",
    projectId: "middle-ground-e79b1",
    storageBucket: "",
    messagingSenderId: "567702054744",
    appId: "1:567702054744:web:6ae32e19d18f467c05272d",
    measurementId: "G-W1WTFZN1BT"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

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

    database.ref().push(buyer, seller);

    console.log('buyer info: ', buyer);
    console.log('seller info: ', seller);


});


database.ref().on('child_added', function(childSnapshot) {
    console.log('firebase callback full: ', childSnapshot.val());
    console.log('firebase callback buyer: ', childSnapshot.val().seller);
    console.log('firebase callback seller: ', childSnapshot.seller);

});
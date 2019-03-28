var config = {
    apiKey: "AIzaSyA93OMqN1-0pRKWVbkXvNV7PQm_nauGHIw",
    authDomain: "classrich-75e87.firebaseapp.com",
    databaseURL: "https://classrich-75e87.firebaseio.com",
    projectId: "classrich-75e87",
    storageBucket: "classrich-75e87.appspot.com",
    messagingSenderId: "926576915567"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var frequency = $("#howOften-input").val().trim();

    var newTrain = {
        name: trainName,
        place: destination,
        time: trainTime,
        rate: frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.place);
    console.log(newTrain.time);
    console.log(newTrain.rate);
});
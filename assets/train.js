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

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(),"HH:mm").format("X");
  var frequency = $("#howOften-input").val().trim();

  var newTrain = {
    name: trainName,
    place: destination,
    time: trainTime,
    rate: frequency
  };

  database.ref().push(newTrain);

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#howOften-input").val("");
});

database.ref().on(
  "child_added",
  function(snap) {
    var trainName = snap.val().name;
    var destination = snap.val().place;
    var trainTime = snap.val().time;
    var frequency = snap.val().rate;

    var currentTime = moment();

    if(trainTime > currentTime){
      nextTrainTime = currentTime;
    }
    else {

    var trainTimeChange = moment(trainTime, "hh:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(trainTimeChange), "minutes");

    var remainder = diffTime % frequency;

    var minutesAway = frequency - remainder;

    var nextTime = moment().add(minutesAway, "minutes");

    var nextTrainTime = moment(nextTime).format("hh:mm a");

    };

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency + " minutes"),
      $("<td>").text(nextTrainTime),
      $("<td>").text(minutesAway)
    );

    $("#train-table > tbody").append(newRow);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);

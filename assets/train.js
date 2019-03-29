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

  var trainName = $("#train-name-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var trainTime = moment(
    $("#time-input")
      .val()
      .trim(),
    "HH:mm"
  ).format("X");
  var frequency = $("#howOften-input")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    place: destination,
    time: trainTime,
    rate: frequency
  };

  database.ref().push(newTrain);

  // console.log(newTrain.name);
  // console.log(newTrain.place);
  // console.log(newTrain.time);
  // console.log(newTrain.rate);

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#howOften-input").val("");
});

database.ref().on("child_added", function(snap) {
  console.log(snap.val());

  var trainName = snap.val().name;
  var destination = snap.val().place;
  var trainTime = snap.val().time;
  var frequency = snap.val().rate;

  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);

  var currentTime = moment();
  console.log(currentTime);

  var trainTimeChange = moment(trainTime,"hh:mm").subtract(1, "years");
  console.log(trainTimeChange);

  var diffTime = moment().diff(moment(trainTimeChange), "minutes");
  console.log("difference in time " + diffTime);

  var remainder = diffTime % frequency;
       console.log(remainder);

  var minutesAway = frequency - remainder;
  console.log("minutes until train: " + minutesAway);

  var nextTime = moment().add(minutesAway, "minutes");
  console.log("arrival time: " + moment(nextTime).format("hh:mm"));
  
  var nextTrainTime = moment(nextTime).format("hh:mm a");
  console.log(nextTrainTime);
  //var timeConvert = moment(timeChange, "HHmm")

  // function trainNew() {
  //   var rate = parseInt(frequency);
  //   console.log(rate);

  //   // First train of the day is at 3:30 AM
  //   var firstTime = timeChange;
  //   console.log(firstTime);

  //   // Get the current time
  //   var currentTime = moment().format("hh:mm");
  //   console.log(currentTime);

  //   var nextTrain;

  //   // If the first time is in the future, set next train to then
  //   if (firstTime > currentTime) {
  //     nextTrain = currentTime;
  //   } else {
  //     // Otherwise, get minutes past first time
  //     var minutesPast = currentTime.diff(firstTime, "minutes");
  //     console.log(minutesPast);
  //     // Find the result of minutesPast % frequency
  //     var remainder = minutesPast % frequency;
  //     console.log(remainder);
  //     // Subtract the frequency from the remainder
  //     var minutesTilNextTrain = remainder - frequency;
  //     console.log(minutesTilNextTrain);
  //     // Set nextTrain to the currentTime + `minutesTilNextTrain` minutes
  //     nextTrain = currentTime.add(minutesTilNextTrain, "minutes");
  //     console.log(nextTrain);
  //   }
  

  // Print and format the new train time
  // console.log("Next Train Arrival Time:", moment(nextTrain).format("hh:mm"));
 // }

 // trainNew();
});

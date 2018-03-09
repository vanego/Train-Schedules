

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAfVFyNgysIz1snsJ0v-_9H1_Hrm5vPYrg",
    authDomain: "train-schedules-da078.firebaseapp.com",
    databaseURL: "https://train-schedules-da078.firebaseio.com",
    projectId: "train-schedules-da078",
    storageBucket: "train-schedules-da078.appspot.com",
    messagingSenderId: "314574091525"
};

firebase.initializeApp(config);

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;
var nextArrival = "";
var minAway = "";

// adding onclick function to my button 
$("#addTrain").on("click", function() {
    event.preventDefault();

    // adding values to my user inputs
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();

    // console logging the user input
    console.log(trainName);
    console.log(destination);
    console.log(frequency);
    console.log(firstTrainTime);
    console.log(frequency);

    // pushing user input to firebase and setting variables equal to firebase variables
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });

    });
    database.ref().on("child_added", function(snapshot) {
        // console.log(snapshot.val().trainName);
        // console.log(snapshot.val().destination);
        // console.log(snapshot.val().firstTrainTime);
        // console.log(snapshot.val().frequency);


        // moment js math

    // first time pushed back 1 year to make sure it comes before current time
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // difference between times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // time apart (remainder)
    var tRemainder = diffTime %
    frequency;
    console.log(tRemainder);

    // minute until train
    var tMinutesTilTrain = tRemainder;
    console.log("MINUTES TIL TRAIN: " + tMinutesTilTrain);

    // next Train
    var nextArrival = moment().add(tMinutesTilTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:mm"));

    var a = $("<tr>");
        a.append("<td>" + snapshot.val().trainName + "</td>");
        a.append("<td>" + snapshot.val().destination + "</td>");
        a.append("<td>" + snapshot.val().firstTrainTime + "</td>");
        a.append("<td>" + moment(nextArrival).format("HH:mm")+ "</td>");
        a.append("<td>" + tMinutesTilTrain+ "</td>");
       

        $("tbody").append(a);
    });

    




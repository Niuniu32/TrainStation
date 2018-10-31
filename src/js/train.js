var config = {
    apiKey: "AIzaSyBt40KKQOzS1sMrI_I0WU93D-A36hTugHc",
    authDomain: "trainapp-e2911.firebaseapp.com",
    databaseURL: "https://trainapp-e2911.firebaseio.com",
    projectId: "trainapp-e2911",
    storageBucket: "trainapp-e2911.appspot.com",
    messagingSenderId: "302793909176"
};

firebase.initializeApp(config);

var trainDatabase = firebase.database();

document.getElementById("add").addEventListener("click", function (e) {
    event.preventDefault();
    var trainName = $("#name_input").val().trim();
    var desName = $("#des_input").val().trim();
    var first_train = $("#first_input").val().trim();
    var frequency = $("#fre_input").val().trim()
    console.log("#Before Database")
    trainDatabase.ref().push({
        name: trainName,
        destination: desName,
        first_train: first_train,
        frequency: frequency
    });

    trainName = $("#name_input").val(" ");
    desName = $("#des_input").val(" ");
    first_train = $("#first_input").val(" ");
    frequency = $("#fre_input").val(" ");
});
var train_time;
var arrive;
function trainMath(trainTime,Frequnecy,name,destination){
    var trainT=trainTime.split(":");
    var trainT2=moment().hour(trainT[0]).minutes(trainT[1]);
    console.log(trainT[0]+"    "+trainT[1])
    var min=moment().min(moment(), trainT2);
    console.log(min)
    var name1=name;
    var destination1=destination;
    var frequency1=Frequnecy;
    if(min===trainT2){
        arrive=trainT2.format("hh:mm A");
        train_time=trainT2.diff(moment(),"minutes");
    }
    else{
        var diff=moment().diff(trainT2,"minutes");
        var gap=diff%frequency1;
        console.log(gap)
        train_time=frequency1-gap;
        console.log(train_time)
        arrive=moment().add(train_time, "m").format("hh:mm A");
    }
    render(name1,destination1,frequency1,arrive,train_time)
}
function render(name,destination,frequency,arrival,minutes){
    $("#train_table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
}
//trainMath(trainTime,Frequnecy,name,destination)
trainDatabase.ref().on("child_added",function(snapshot){
    var name=snapshot.val().name;
    var destination=snapshot.val().destination;
    var firstTrain=snapshot.val().first_train;
    var Frequencydata =snapshot.val().frequency;
    trainMath(firstTrain,Frequencydata,name,destination)
})

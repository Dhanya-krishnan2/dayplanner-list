// Initialised an array of item which required to set the planner and the first id is in the 0 the position
var myPlannedDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    
]

// gets data for the header date
// using moment.js to retrieve the current date and gives the format in the required format
function getHeaderDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

// saves data to localStorage
// and adding that data to the plannedday and making that format in json format by using the method called jason stringify
function saveReminders() {
    localStorage.setItem("myPlannedDay", JSON.stringify(myPlannedDay));
}

// sets any data in localStorage to the view
// the display remainer function sets for to give us the remainder and using the method for each to iterate
function displayReminders() {
    myPlannedDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// sets any existing localStorage data to the view if it exists
function init() {
    var storedDay = JSON.parse(localStorage.getItem("myPlannedDay"));

    if (storedDay) {
        myPlannedDay = storedDay;
    }

    saveReminders();
    displayReminders();
}

// loads header date
getHeaderDate();

// creates the visuals for the scheduler body, which creates the row.
myPlannedDay.forEach(function(thisHour) {
    // creates timeblocks row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // creates time field
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // creates schdeduler data
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    //  here we are creating button by using the html statement in jquery
    var saveButton = $("<i class='far fa-save fa-lg'>save</i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

// loads any existing localstorage data after components created
init();


// this button here helps to save data to local storage so that it wont lost and adding prevent default to prevent the unwanted storage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();

    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    myPlannedDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})

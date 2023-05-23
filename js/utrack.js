'use strict';

/*
Put any interaction code here
 */

window.addEventListener('load', function() {
    var Activities = new ActivityStoreModel();
    Activities.addListener(View.updateTable);

    // Initial graph rendering 
    View.initialGraphRender();
    // You should wire up all of your event handling code here, as well as any
    // code that initiates calls to manipulate the DOM (as opposed to responding
    // to events)

    var energyLevel = 0;
    var happinessLevel = 0; 
    var stressLevel = 0;
    // Feed back messages
    var energy = ["This is very energetic !", "This is energetic !", "This is a bit exhuasted.", "This is exhausted !", "This is very exhausted !"]
    var stress = ["This is very relaxed !", "This is relaxed !", "This is a bit stressed.", "This is stressed !", "This is very stressed !",]
    var happy  = ["This is very happy !",  "This is happy !", "This is a bit depressed.", "This is depressed !", "This is very depressed !"]
    var label  = ["label label-success", "label label-info", "label label-primary", "label label-warning", "label label-danger"];
    
    // User input info
    var activityInput = document.querySelector("#activity .input");
    var timeInput = document.querySelector("#time .input");
    var energyLabel = document.querySelector("#energy .label");
    var stressLabel = document.querySelector("#stress .label");
    var happyLabel  = document.querySelector("#happiness .label");

    // User clickable buttons
    var energyBtn = document.querySelectorAll("#energy .btn");
    var stressBtn = document.querySelectorAll("#stress .btn");
    var happyBtn  = document.querySelectorAll("#happiness .btn");

    var activityNav = document.querySelector("#navigator .activities");
    var dataNav = document.querySelector("#navigator .datas");

    var tableBtn = document.querySelector("#datas .tableBtn");
    var scatterBtn = document.querySelector("#datas .scatterBtn");

    var table = document.getElementById("table");
    var scatter = document.getElementById("graph_contain");
    
    var timeFeedback = document.querySelector("#time .mins")
    var feedback = '<span class="label label-danger"><span class="glyphicon glyphicon-remove"></span> input not valid</span>';

    var submitBtn = document.getElementById("submit");

    var timeReg = /^(\s+)?\d+(?:\.\d+)?(\s+)?$/;
    var spaceReg = /^\s*$/;

    var warning = document.getElementById("warning");
    var validToSubmit = [0,0,0,0];

    // Click events
    for(var i = 0; i < energyBtn.length; i++) {
         (function(i) {
            energyBtn[i].addEventListener("click", function() {
              energyLabel.innerHTML = energy[i];
              energyLabel.setAttribute("class", label[i]);
              energyLevel = 5 - i;
              validToSubmit[0] = 1;
            });
            stressBtn[i].addEventListener("click", function() {
              stressLabel.innerHTML = stress[i];
              stressLabel.setAttribute("class", label[i]);
              stressLevel = 5 - i;
              validToSubmit[1] = 1;
            });
            happyBtn[i].addEventListener("click", function() {
               happyLabel.innerHTML = happy[i];
               happyLabel.setAttribute("class", label[i]);
               happinessLevel = 5 - i;
               validToSubmit[2] = 1;
            });
         })(i);
    }

    // Input events
    timeInput.addEventListener("keyup", function() {
        var input = timeInput.value;
        // If the user input is not a valid number
        if(!timeReg.test(input) && !spaceReg.test(input)) {
             timeFeedback.innerHTML = feedback;
             validToSubmit[3] = 0;
        }
        else {
             timeFeedback.innerHTML = "minutes";
             validToSubmit[3] = 1;
        }
    });

    dataNav.addEventListener("click", function() {
        View.switchToAnalysis(dataNav, activityNav, submitBtn);
    });

    activityNav.addEventListener("click", function() {
        View.switchToActivity(dataNav, activityNav, submitBtn);
    });

    tableBtn.addEventListener("click", function() {
        View.switchToTableView(tableBtn, scatterBtn, table, scatter);
    });

    scatterBtn.addEventListener("click", function() {
        View.switchToScatterView(tableBtn, scatterBtn, table, scatter);
    });

    // User submission
    submitBtn.addEventListener("click", function() {
        // Collect data
        var activityType = activityInput.value;
        var activityDataDict = [energyLevel, happinessLevel, stressLevel];
        var activityDurationInMinutes = parseFloat(timeInput.value);
        // Check if validTosubmit
        if(!(validToSubmit[0] && validToSubmit[1] && validToSubmit[2] && validToSubmit[3] && activityType)) {
            // Warn the user
            warning.className = "";
            return;
        }
        validToSubmit = [0,0,0,0];
        // New data point
        var newDataPoint = new ActivityData(activityType, activityDataDict, activityDurationInMinutes);

        // Reset page
        View.resetActivities(activityInput, timeInput, energyLabel, stressLabel, happyLabel);
        // Submit
        Activities.addActivityDataPoint(newDataPoint);
        View.updateGraph(Activities.getActivityDataPoints());
        energyLevel = happinessLevel = stressLevel = 0;
        warning.className = "hide";
    }); 

});
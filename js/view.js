'use strict';

// Put your view code here (e.g., the graph renderering code)

;var View = (function(window,document,undefined) {
	// User input info
    var lastModified = document.querySelector("#last .time");

    var canvas = document.getElementById("graph");
    var context = canvas.getContext("2d");

    var activities = document.getElementById("activities");
    var data = document.getElementById("datas");

    var tableBody = document.querySelector("#table tbody");
    var tableEntryCt = 0;
    // Basic rendering 
    function initialGraphRender() {
    	 // X axis, Y axis, strokes and numbers
    	 var x_start = [13 ,  13,  13, 13,  13,  13,   13,  700];
    	 var y_start = [450,  6,   6,  96,  186, 276,  366, 450];
    	 var x_end   = [700,  13,  20, 20,  20,  20,   20,  700];
    	 var y_end   = [450,  450, 6,  96,  186, 276,  366, 442];
    	 for(var i = 0; i < x_start.length; i++) {
    	 	context.beginPath();
            context.moveTo(x_start[i], y_start[i]);
            context.lineTo(x_end[i], y_end[i]);
            context.closePath();
            context.stroke();
    	 }
    	 context.font = "20px serif";
    	 context.fillText("5",0,16);
    	 context.fillText("4",0,101);
    	 context.fillText("3",0,191);
    	 context.fillText("2",0,281);
    	 context.fillText("1",0,371);
    }

    function resetActivities(activityInput, timeInput, energyLabel, stressLabel, happyLabel) {
         activityInput.value = "";
         timeInput.value = "";
         energyLabel.className = "hide";
         stressLabel.className = "hide";
         happyLabel.className = "hide";
         // Set last modified
         var date = new Date();
         lastModified.innerHTML = "Last Modified: " + 
                                  [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/") + " " +
                                  [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");
    }
    
    function updateTable(event_type, time, data) {
         var row = tableBody.insertRow(-1);
         var number = row.insertCell(-1);
         var type = row.insertCell(-1);
         var energy = row.insertCell(-1);
         var happy = row.insertCell(-1);
         var stress = row.insertCell(-1);
         var duration = row.insertCell(-1);
         number.innerHTML = ++tableEntryCt;
         type.innerHTML = data.activityType;
         energy.innerHTML = data.activityDataDict[0];
         happy.innerHTML = data.activityDataDict[1];
         stress.innerHTML = data.activityDataDict[2];
         duration.innerHTML = data.activityDurationInMinutes;
    }

    function drawCircle(centerX, centerY, radius, color) {
         context.beginPath();
         context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
         context.fillStyle = color;
         context.fill();
         context.strokeStyle = "#000000";
         context.stroke();
         context.fillStyle = "#000000";
    }

    function updateGraph(activityDataPoints) {
         // Redraw the whole graph
         context.clearRect(0, 0, canvas.width, canvas.height);
         initialGraphRender();
         var len = activityDataPoints.length;
         var dist = 700 / (len+1);
         var data;
         context.font = "20px serif";
         for(var i = 0; i < len; i++) {
             data = activityDataPoints[i];
         	 context.fillText(data.activityType, 13 + dist * (i+1), 470);
         	if(data.activityDataDict[0] === data.activityDataDict[1] &&
         	   data.activityDataDict[1] === data.activityDataDict[2]) {
         		drawCircle(13 + dist * (i+1), 450 - 90 * data.activityDataDict[0] + 7, 6,"#5cb85c");
	            drawCircle(13 + dist * (i+1), 450 - 90 * data.activityDataDict[1] + 12, 6,"#5bc0de");
	            drawCircle(13 + dist * (i+1), 450 - 90 * data.activityDataDict[2] + 17, 6,"#d9534f");
         	}
         	else {
	         	// Draw the dots
	            drawCircle(13 + dist * (i+1), 450 - 90 * data.activityDataDict[0] + 7, 6,"#5cb85c");
	            drawCircle(13 + dist * (i+1), 450 - 90 * data.activityDataDict[1] + 7, 6,"#5bc0de");
	            drawCircle(13 + dist * (i+1), 450 - 90 * data.activityDataDict[2] + 7, 6,"#d9534f");
            }
         }
    }

    function switchToAnalysis(dataNav, activityNav, submitBtn) {
        dataNav.className = "btn btn-primary btn-lg activities";
        activityNav.className = "btn btn-default btn-lg datas"; 
        activities.className = "hide";
        data.className = "";
        submitBtn.style.display = "none";
    }

    function switchToActivity(dataNav, activityNav, submitBtn) {
        dataNav.className = "btn btn-default btn-lg activities";
        activityNav.className = "btn btn-primary btn-lg datas";
        activities.className = "";
        data.className = "hide";
        submitBtn.style.display = "inline";
    }

    function switchToTableView(tableBtn, scatterBtn, table, scatter) {
        tableBtn.className = "btn btn-primary btn-lg tableBtn";
        scatterBtn.className = "btn btn-default btn-lg scatterBtn";
        table.style.display = "block";
        scatter.className = "hide";
    }

    function switchToScatterView(tableBtn, scatterBtn, table, scatter) {
        tableBtn.className = "btn btn-default btn-lg tableBtn";
        scatterBtn.className = "btn btn-primary btn-lg scatterBtn";
        table.style.display = "none";
        scatter.className = "";
    }

    return {
    	initialGraphRender: initialGraphRender,
    	resetActivities: resetActivities,
    	updateTable: updateTable,
    	updateGraph: updateGraph,
    	switchToActivity: switchToActivity,
        switchToAnalysis: switchToAnalysis,
        switchToScatterView: switchToScatterView,
        switchToTableView: switchToTableView
    };
})(window,document);
var timerData = new Array();
var nextTaskId = 0;

function addTask__MODULE_ID__()
{
    var taskList = document.getElementById("tasks");
    var row = document.createElement("li")
    var handleDiv = document.createElement("div");
    var nameDiv = document.createElement("div");
    var taskDiv = document.createElement("div");
    var currentTimeDiv = document.createElement("div");
    var totalTimeDiv = document.createElement("div");
    var statusDiv = document.createElement("div");

    var newTaskId = ++nextTaskId;

    row.id = "row_" + newTaskId;
    handleDiv.id = "handle_div_" + newTaskId;
    handleDiv.className = "handle";
    nameDiv.id = "name_div_" + newTaskId;
    taskDiv.id = "task_div_" + newTaskId;
    taskDiv.className = 'task_name';
    currentTimeDiv.id = "current_time_div_" + newTaskId;
    currentTimeDiv.className = 'current_time';
    totalTimeDiv.id = "total_time_div_" + newTaskId;
    totalTimeDiv.className = 'total_time';
    statusDiv.id = "status_div_" + newTaskId;
    statusDiv.className = 'status';
    nameDiv.setAttribute("onclick", "replaceWithTextBox(this);");

    handleDiv.innerHTML = "&nbsp;";
    nameDiv.innerHTML = "Task " + newTaskId;
    currentTimeDiv.innerHTML = "&nbsp;";
    totalTimeDiv.innerHTML = "00h 00m 00s";
    statusDiv.innerHTML = '<input type="button" id="button_' + newTaskId + '" title="Start" value="Start" onclick="startStopTimer(this);"/>';

    taskDiv.appendChild(handleDiv);
    taskDiv.appendChild(nameDiv);
    row.appendChild(taskDiv);
    row.appendChild(currentTimeDiv);
    row.appendChild(totalTimeDiv);
    row.appendChild(statusDiv);
    row.style.display = "none";
    taskList.appendChild(row);

    Effect.BlindDown(row.id);
    Sortable.create('tasks', {handle:'handle',ghosting:true,constraint:false})
}

function replaceWithTextBox(source)
{
    source.setAttribute("onclick", "");
    var currentContent = source.innerHTML;
    var textElementId = "text_" + source.id;
    var divContent = "<input type=\'text\' id=\'" + textElementId + "\' onBlur=\'replaceWithContent(this);\'/>";
    source.innerHTML = divContent;

    var textElement = document.getElementById(textElementId);
    // simonk-fix-todo Trim string.
    if (currentContent != '&nbsp;')
    {
        textElement.value = currentContent;
    }
    textElement.select();
}

function replaceWithContent(source)
{
    var nameSplit = source.id.split("_");
    var taskId = eval(nameSplit[nameSplit.length - 1]);

    var containingDiv = document.getElementById("name_div_" + taskId);
    var textValue = source.value;

    // simonk-fix-todo Trim string.
    if (!textValue || textValue.length == 0)
    {
        alert("Your task must have a name");
    }
    else
    {
        containingDiv.innerHTML = textValue;
        containingDiv.setAttribute("onclick", "replaceWithTextBox(this);");
        var taskData = tasks[taskId];
        taskData.setName(textValue);
        displayEventData__MODULE_ID__();
    }
}

function displayEventData__MODULE_ID__()
{
    var allEventData = '&nbsp;<br/>';

    for (var i = 0; i < tasks.length; i++)
    {
        var taskData = tasks[i];

        if (taskData)
        {
            allEventData += taskData.getName();
            allEventData += " = ";
            allEventData += taskData.getEventData();
            allEventData += "<br/>";
        }
    }

    var eventDiv = document.getElementById("eventDiv");
    eventDiv.innerHTML = allEventData;
}

var currentTimerEvent;

function startStopTimer(source)
{
    var nameSplit = source.getAttribute("id").split("_");
    var taskId = eval(nameSplit[nameSplit.length - 1]);
    var currentTime = new Date();

    if (currentTimerEvent)
    {
        clearTimeout(timer);
        if (!currentTimerEvent.getEndTime())
        {
            currentTimerEvent.setEndTime(currentTime);
            refreshTimes();
        }
        var timersButton = currentTimerEvent.getButton();
        var oldTaskId = currentTimerEvent.getTaskId();

        timersButton.value = "Start";
        timerData.push(currentTimerEvent);
        var displayDiv = document.getElementById("current_time_div_" + oldTaskId)
        displayDiv.className = "oldTimer";

        var taskData = tasks[oldTaskId];

        if (!taskData)
        {
            var nameDiv = document.getElementById("name_div_" + oldTaskId);
            taskData = new TaskData(nameDiv.innerHTML);
            tasks[oldTaskId] = taskData;
        }

        taskData.addEvent(currentTimerEvent);

        displayEventData__MODULE_ID__();
    }

    if (!currentTimerEvent || currentTimerEvent.getTaskId() != taskId)
    {
        currentTimerEvent = new TimerEvent(taskId, currentTime, source);
        source.value = "Stop";
        timer = setTimeout("refreshTimes()", 1000);
    }
    else
    {
        currentTimerEvent = null;
    }
}

var timer;

function refreshTimes()
{
    var timerTotals = new Array();

    for (var i = 0; i < timerData.length; i++)
    {
        var timer = timerData[i];
        updateTimerTotals(timer, timerTotals)
    }

    if (currentTimerEvent)
    {
        currentTimerEvent.setEndTime(new Date());
        updateCurrentTimer(currentTimerEvent);
        updateTimerTotals(currentTimerEvent, timerTotals)
    }

    for (i = 0; i < timerTotals.length; i++)
    {
        var total = timerTotals[i];

        if (total)
        {
            var displayDiv = document.getElementById("total_time_div_" + i);
            //noinspection InnerHTMLJS
            var hoursValue = getFormattedValue(total.getHours());
            var minutesValue = getFormattedValue(total.getMinutes());
            var secondsValues = getFormattedValue(total.getSeconds());
            displayDiv.innerHTML = hoursValue + "h " + minutesValue + "m " + secondsValues + "s";
        }
    }

    if (currentTimerEvent)
    {
        timer = setTimeout("refreshTimes()", 1000);
    }
}

function updateTimerTotals(currentTimer, timerTotals)
{
    var durationMillis = currentTimer.getEndTime() - currentTimer.getStartTime();

    var totalSeconds = Math.round(durationMillis / 1000);
    var totalMinutes = Math.floor(totalSeconds / 60);

    var seconds = totalSeconds % 60;
    var minutes = totalMinutes % 60;
    var hours = Math.floor(totalMinutes / 60);

    var taskId = currentTimer.getTaskId();
    var currentTotal = timerTotals[taskId];
    if (!currentTotal)
    {
        currentTotal = new Duration(0, 0, 0);
    }
    currentTotal.addHours(hours);
    currentTotal.addMinutes(minutes);
    currentTotal.addSeconds(seconds);
    timerTotals[taskId] = currentTotal;
}

function updateCurrentTimer(currentTimerEvent)
{
    var durationMillis = currentTimerEvent.getEndTime() - currentTimerEvent.getStartTime();
    var totalSeconds = Math.round(durationMillis / 1000);
    var totalMinutes = Math.floor(totalSeconds / 60);

    var seconds = totalSeconds % 60;
    var minutes = totalMinutes % 60;
    var hours = Math.floor(totalMinutes / 60);

    var displayDiv = document.getElementById("current_time_div_" + currentTimerEvent.getTaskId());
    //noinspection InnerHTMLJS
    var hoursValue = getFormattedValue(hours);
    var minutesValue = getFormattedValue(minutes);
    var secondsValues = getFormattedValue(seconds);
    displayDiv.innerHTML = hoursValue + "h " + minutesValue + "m " + secondsValues + "s";
    displayDiv.className = "activeTimer";
}

function Duration(hours, minutes, seconds)
{
    this._hours = hours;
    this._minutes = minutes;
    this._seconds = seconds;
}

Duration.prototype._hours = null;
Duration.prototype._minutes = null;
Duration.prototype._seconds = null;

Duration.prototype.addHours = function(hours)
{
    this._hours += hours;
}
Duration.prototype.addMinutes = function(minutes)
{
    var tempMinutes = this._minutes + minutes;
    var potentialHoursAddition = Math.floor(tempMinutes / 60);
    this.addHours(potentialHoursAddition);
    this._minutes = tempMinutes % 60;
}
Duration.prototype.addSeconds = function(seconds)
{
    var tempSeconds = this._seconds + seconds;
    var potentialMinutesAddition = Math.floor(tempSeconds / 60);
    this.addMinutes(potentialMinutesAddition);
    this._seconds = tempSeconds % 60;
}

Duration.prototype.getHours = function()
{
    return this._hours;
}
Duration.prototype.getMinutes = function()
{
    return this._minutes;
}
Duration.prototype.getSeconds = function()
{
    return this._seconds;
}

function TimerEvent(taskId, startTime, button)
{
    this._taskId = taskId;
    this._startTime = startTime;
    this._button = button;
}

TimerEvent.prototype._taskId = null;
TimerEvent.prototype._startTime = null;
TimerEvent.prototype._endTime = null;
TimerEvent.prototype._button = null;

TimerEvent.prototype.getStartTime = function()
{
    return this._startTime;
}
TimerEvent.prototype.getEndTime = function()
{
    return this._endTime;
}
TimerEvent.prototype.getTaskId = function()
{
    return this._taskId;
}
TimerEvent.prototype.getButton = function()
{
    return this._button;
}
TimerEvent.prototype.setEndTime = function(endTime)
{
    this._endTime = endTime;
}

var tasks = new Array();

function TaskData(name)
{
    this._name = name;
    this._active = true;
    this._dataMap = new Array();
}

function getFormattedValue(value)
{
    var stringValue = value.toString();
    if (stringValue.length == 1)
    {
        stringValue = "0" + stringValue;
    }
    else if (stringValue.length == 3)
    {
        stringValue = stringValue.slice(1);
    }
    return stringValue;
}

TaskData.prototype.addEvent = function(timerEvent)
{
    var startTime = timerEvent.getStartTime();
    var endTime = timerEvent.getEndTime();

    var eventStart = getFormattedValue(startTime.getHours());
    eventStart += getFormattedValue(startTime.getMinutes());

    var eventFinish = getFormattedValue(endTime.getHours());
    eventFinish += getFormattedValue(endTime.getMinutes());

    var dateString = getFormattedValue(startTime.getDate());
    dateString += getFormattedValue(startTime.getMonth() + 1);
    dateString += getFormattedValue(startTime.getYear());

    var eventData = new EventData(dateString, eventStart, eventFinish);
    this.addEventData(eventData);
}

TaskData.prototype.addEventData = function(eventData)
{
    var dataMap = this._dataMap;

    if (dataMap.length)
    {
        var previousEventData = dataMap[dataMap.length - 1];

        if (eventData.getDateString() == previousEventData.getDateString() && eventData.getStartTimeString() == previousEventData.getStartTimeString())
        {
            previousEventData.setEndTimeString(eventData.getEndTimeString());
        }
        else
        {
            dataMap[dataMap.length] = eventData;
        }
    }
    else
    {
        dataMap[dataMap.length] = eventData;
    }
}

TaskData.prototype._name = null;
TaskData.prototype._dataMap = null;
TaskData.prototype._version = 1;
TaskData.prototype._active = null;

TaskData.prototype.getName = function()
{
    return this._name;
}
TaskData.prototype.setName = function(name)
{
    this._name = name;
}

TaskData.prototype.getVersion = function()
{
    return this._version;
}

TaskData.prototype.getActive = function()
{
    return this._active;
}

TaskData.prototype.parseData = function(dataString)
{
    var splitData = dataString.split("|");

    this._version = splitData[0];

    if (this._version == 1)
    {
        this._active = splitData[1] == 1;

        for (var i = 2; i < splitData.length; i++)
        {
            var currentDateData = splitData[i];
            currentDateData = currentDateData.split(":");

            var dateString = currentDateData[0];

            for (var j = 1; j < currentDateData.length; j++)
            {
                var timeData = currentDateData[j].split(",");
                var eventData = new EventData(dateString, timeData[0], timeData[1]);
                this.addEventData(eventData);
            }
        }
    }
}

TaskData.prototype.getEventData = function()
{
    var eventString = this.getVersion();
    eventString += '|';
    eventString += this.getActive() ? "1" : "0";
    var currentDate = '';
    var dateCounter = 0;

    for (var i = 0; i < this._dataMap.length; i++)
    {
        var currentEvent = this._dataMap[i];

        if (currentEvent)
        {
            var currentEventDate = currentEvent.getDateString();

            if (currentEventDate != currentDate)
            {
                currentDate = currentEventDate;
                eventString += '|';
                eventString += currentDate;
                eventString += ':';
                dateCounter = 0;
            }
            else if (dateCounter != 0)
            {
                eventString += ',';
            }

            eventString += currentEvent.getStartTimeString();
            eventString += currentEvent.getEndTimeString();

            dateCounter++;
        }
    }

    return eventString;
}

EventData.prototype._dateString = null;
EventData.prototype._startTimeString = null;
EventData.prototype._endTimeString = null;
EventData.prototype._synced = null;

function EventData(dateString, startTimeString, endTimeString)
{
    this._dateString = dateString;
    this._startTimeString = startTimeString;
    this._endTimeString = endTimeString;
    this._synced = false;
}

EventData.prototype.getDateString = function()
{
    return this._dateString;
}
EventData.prototype.getStartTimeString = function()
{
    return this._startTimeString;
}
EventData.prototype.getEndTimeString = function()
{
    return this._endTimeString;
}
EventData.prototype.setEndTimeString = function(endTimeString)
{
    this._endTimeString = endTimeString;
}
EventData.prototype.isSynced = function()
{
    return this._synced;
}
EventData.prototype.setSynced = function(synced)
{
    this._synced = synced;
}
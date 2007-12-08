var syncing__MODULE_ID__ = false;
var obtainingUserCals__MODULE_ID__ = false;
var calMessage__MODULE_ID__ = new _IG_MiniMessage(__MODULE_ID__, _gel("messages"));
var currentMessage__MODULE_ID__ = null;

Calendar__MODULE_ID__.prototype._name = null;
Calendar__MODULE_ID__.prototype._url = null;

Calendar__MODULE_ID__.prototype.getName = function()
{
    return this._name;
}
Calendar__MODULE_ID__.prototype.getUrl = function()
{
    return this._url;
}

function Calendar__MODULE_ID__(name, url)
{
    this._name = name;
    this._url = url;
}

function backgroundSynchroniseWithGcal__MODULE_ID__()
{
    if (!syncing__MODULE_ID__)
    {
        syncing__MODULE_ID__ = true;
        currentMessage__MODULE_ID__ =
        calMessage__MODULE_ID__.createStaticMessage("Synchronising timesheet data with Google Calendar");
        this.getDisplay().showMessages();
        setTimeout("synchroniseWithGcal__MODULE_ID__()", 10);
    }
}

function backgroundObtainUserCalendars__MODULE_ID__()
{
    if (!obtainingUserCals__MODULE_ID__)
    {
        var currentTime = new Date();

        if (!lastCalendarUpdate__MODULE_ID__ || currentTime.getTime() - lastCalendarUpdate__MODULE_ID__.getTime()
                > 600000)

        {
            obtainingUserCals__MODULE_ID__ = true;
            lastCalendarUpdate__MODULE_ID__ = currentTime;

            currentMessage__MODULE_ID__ =
            calMessage__MODULE_ID__.createStaticMessage("Obtaining your Google calendars");
            this.getDisplay().showMessages();
            setTimeout("obtainUserCalendars__MODULE_ID__()", 10);
        }
        else
        {
            var syncCalDiv = _gel("sync_div_choice");
            var syncCalControlDiv = _gel("synchronise_calendar_div");
            syncCalDiv.style.visibility = 'visible';
            syncCalControlDiv.style.display = 'none';
            syncCalDiv.style.display = 'block';
//            obtainingUserCals = false;
        }
    }
}

function obtainUserCalendars__MODULE_ID__()
{
    // http://www.google.com/calendar/feeds/default/owncalendars/full
    var prefs = new _IG_Prefs(__MODULE_ID__);

    var httpReq = getBrowserRequestObject__MODULE_ID__("text/xml");
    var calUrl = httpType__MODULE_ID__ + "://" + domain__MODULE_ID__ + "/calendar/feeds/default/owncalendars/full";
    httpReq.open('get', calUrl, false);
    httpReq.setRequestHeader('Authorization', 'GoogleLogin auth=' + prefs.getString("calauth"));
    httpReq.setRequestHeader('Content-type', 'application/atom+xml');
    httpReq.onreadystatechange = function()
    {
        parseUserCalendars__MODULE_ID__(httpReq, true);
    }
    httpReq.send(null);
}

var calendars__MODULE_ID__ = null;
var lastCalendarUpdate__MODULE_ID__ = null;

function getNodeValue__MODULE_ID__(obj, elementName)
{
    return obj.getElementsByTagName(elementName)[0].firstChild.nodeValue;
}
function getNodeAttribute__MODULE_ID__(obj, elementName, attributeName)
{
    return obj.getElementsByTagName(elementName)[0].getAttribute(attributeName);
}
function createXMLFromString__MODULE_ID__(xmlText)
{
    try
    {
        var xmlDocument = new ActiveXObject("MSXML.DomDocument");
        xmlDocument.loadXML(xmlText);
        return xmlDocument;
    }
    catch (e)
    {
        return null;
    }
}

function parseUserCalendars__MODULE_ID__(httpReq, retry)
{
    if (httpReq.readyState == 4)
    {
        var status = httpReq.status;

        if (status != 200)
        {
            if (retry)
            {
                obtainAuthId__MODULE_ID__(httpReq);
                httpReq = getBrowserRequestObject__MODULE_ID__();
                var calUrl = httpType__MODULE_ID__ + "://" + domain__MODULE_ID__
                        + "/calendar/feeds/default/owncalendars/full";
                httpReq.open('get', calUrl, false);
                httpReq.setRequestHeader('Authorization', 'GoogleLogin auth=' + prefs.getString("calauth"));
                httpReq.setRequestHeader('Content-type', 'application/atom+xml');
                httpReq.onreadystatechange = function()
                {
                    parseUserCalendars__MODULE_ID__(httpReq, false);
                }
                httpReq.send(null);
            }
            else
            {
                var link = httpType__MODULE_ID__ + "://" + domain__MODULE_ID__ + "/calendar";
                var googleCalendarLink = "<a href='" + link + "' target='blank'>" + link + "</a>";
                calMessage__MODULE_ID__.createDismissibleMessage("Error obtaining calendars - please ensure you have logged into Google calendar at "
                        + googleCalendarLink, this.getDisplay().hideMessages);
            }
        }
        else
        {
            var responseXml = httpReq.responseXML;
            if (!responseXml || responseXml.getElementsByTagName("entry").length == 0)
            {
                responseXml = createXMLFromString__MODULE_ID__(httpReq.responseText);
            }
            var entries = responseXml.getElementsByTagName("entry");
            calendars__MODULE_ID__ = new Array();
            for (var i = 0; i < entries.length; i++)
            {
                var name = getNodeValue__MODULE_ID__(entries[i], "title");
                var url = null;

                var feeds = entries[i].getElementsByTagName("link");

                for (var j = 0; j < feeds.length; j++)
                {
                    var feedName = feeds[j].getAttribute("rel");

                    if (feedName == "alternate")
                    {
                        var localUrl = feeds[j].getAttribute("href");
                        var calIndex = localUrl.indexOf("/calendar");
                        url =
                        httpType__MODULE_ID__ + "://" + domain__MODULE_ID__ + localUrl.slice(calIndex, localUrl.length);
                    }
                }

                if (url)
                {
                    var currentCal = new Calendar__MODULE_ID__(name, url);
                    calendars__MODULE_ID__.push(currentCal);
                }
            }
            var localCalendars = calendars__MODULE_ID__;
            localCalendars.sort(sortCalendars__MODULE_ID__);
            var chooseCalendar = _gel("calendar_choice");
            var options = chooseCalendar.childNodes;
            var optionsLength = options.length;
            for (var i = 0; i < optionsLength; i++)
            {
                chooseCalendar.removeChild(options[0]);
            }
            var prefs = new _IG_Prefs(__MODULE_ID__);
            var lastCalendar = prefs.getString("last_calendar");
            for (var i = 0; i < localCalendars.length; i++)
            {
                var newOption = new Option(localCalendars[i].getName(), i);
                chooseCalendar.options[i] = newOption;

                if (localCalendars[i].getName() == lastCalendar)
                {
                    chooseCalendar.selectedIndex = i;
                }
            }
            var syncCalDiv = _gel("sync_div_choice");
            var syncCalControlDiv = _gel("synchronise_calendar_div");
            syncCalDiv.style.visibility = 'visible';
            syncCalControlDiv.style.display = 'none';
            syncCalDiv.style.display = 'block';
            obtainingUserCals__MODULE_ID__ = false;
            calMessage__MODULE_ID__.dismissMessage(currentMessage__MODULE_ID__);
            this.getDisplay().hideMessages();
        }
    }

}

function sortCalendars__MODULE_ID__(optionOne, optionTwo)
{
    var a = optionOne.getName();
    var b = optionTwo.getName();
    return a > b ? 1 : a < b ? -1 : 0;
}

function closeSyncCal__MODULE_ID__()
{
    var syncCalDiv = _gel("sync_div_choice");
    var syncCalControlDiv = _gel("synchronise_calendar_div");
    syncCalDiv.style.visibility = 'hidden';
    syncCalControlDiv.style.display = 'block';
    syncCalDiv.style.display = 'none';
}

var eventsToSync__MODULE_ID__ = null;

function synchroniseWithGcal__MODULE_ID__()
{
    closeSyncCal__MODULE_ID__();
    var calDropdown = _gel("calendar_choice");
    var selectedOption = calDropdown.options[calDropdown.selectedIndex];
    var selectedOptionValue = selectedOption.value;
    timesheetCalFeed__MODULE_ID__ = calendars__MODULE_ID__[selectedOptionValue].getUrl();

    var prefs = new _IG_Prefs(__MODULE_ID__);
    var calendarName = selectedOption.text;
    prefs.set("last_calendar", calendarName);

    var today = new Date();
    var startDay = new Date();
    var startTime = null

    do
    {
        startTime = startDay.getTime();
        startTime -= 1000 * 60 * 60 * 24;
        startDay.setTime(startTime);
    }
    while (startDay.getDate() != today.getDate());

    eventsToSync__MODULE_ID__ = new Array();
    var finished = false;

    while (!finished)
    {
        startTime = startDay.getTime();
        startTime += 1000 * 60 * 60 * 24;
        startDay.setTime(startTime);
        var dateRecord = this.getMonthsEvents()[startDay.getDate()];

        if (dateRecord)
        {
            var events = dateRecord.getEvents();
            for (var k = 0; k < events.length; k++)
            {
                var event = events[k];
                if (!event.isSynced())
                {
                    eventsToSync__MODULE_ID__.push(event);
                }
            }
        }

        finished = startDay.getDate() == today.getDate();
    }

    dateRecordsToUpdate__MODULE_ID__ = new Array();
    synchroniseNextEvent(0);
}

function finishCalendarSync__MODULE_ID__(error)
{
    for (var l = 0; l < dateRecordsToUpdate__MODULE_ID__.length; l++)
    {
        var dateRecordToUpdate = dateRecordsToUpdate__MODULE_ID__[l];

        if (dateRecordToUpdate)
        {
            this.updateDateRecord(dateRecordToUpdate);
        }
    }

    syncing__MODULE_ID__ = false;
    calMessage__MODULE_ID__.dismissMessage(currentMessage__MODULE_ID__);
    if (error)
    {
        var link = httpType__MODULE_ID__ + "://" + domain__MODULE_ID__ + "/calendar";
        var googleCalendarLink = "<a href='" + link + "' target='blank'>" + link + "</a>";
        calMessage__MODULE_ID__.createDismissibleMessage("Error synchronising timesheet data - please ensure you have logged into Google calendar at "
                + googleCalendarLink, this.getDisplay().hideMessages);
    }
    else
    {
        _IG_Analytics("UA-2305736-1", "/timesheetmod/gcal_synchronisation");
        calMessage__MODULE_ID__.createTimerMessage("Timesheet data synchronised", 5, this.getDisplay().hideMessages);
    }

}

var dateRecordsToUpdate__MODULE_ID__ = null;

function synchroniseNextEvent(i)
{
    var firstEvent = eventsToSync__MODULE_ID__[i];
    if (firstEvent)
    {
        var events = new Array();
        events.push(firstEvent);

        //        var j = 0;
        //        var findMore = false;
        //        do
        //        {
        //            var nextEvent = eventsToSync[i + ++j];
        //            if (nextEvent && firstEvent.getEventId() == nextEvent.getEventId())
        //            {
        //                newEvent.push(nextEvent);
        //                findMore = true;
        //            }
        //            else
        //            {
        //                findMore = false;
        //            }
        //        }
        //        while (findMore)
        //
        //        if (newEvent.length > 1)
        //        {
        //            i += (j - 1);
        //        }

        var taskName = getTaskName__MODULE_ID__(firstEvent.getTask().getId());
        var startTime = firstEvent.getStart().toDate();
        var end = events[events.length - 1].getEnd();
        var endTime;
        if (end)
        {
            endTime = end.toDate();
        }

        var createEvent = end && (endTime.getTime() - startTime.getTime()) > 60000;

        if (createEvent)
        {
            var eventXml = getEventXml__MODULE_ID__(taskName, firstEvent.getEventId(), startTime, endTime);

            sendEventXml__MODULE_ID__(i, events, eventXml, true);
        }
        else
        {
            updateDateRecordsAfterSync__MODULE_ID__(events, i);
        }
    }
    else
    {
        finishCalendarSync__MODULE_ID__(false);
    }
}

function sendEventXml__MODULE_ID__(i, events, eventXml, retry)
{
    var prefs = new _IG_Prefs(__MODULE_ID__);
    var httpReq = getBrowserRequestObject__MODULE_ID__();

    var calUrl;
    if (timesheetCalFeed__MODULE_ID__)
    {
        calUrl = timesheetCalFeed__MODULE_ID__;
    }
    else
    {
        calUrl = httpType__MODULE_ID__ + "://" + domain__MODULE_ID__ + "/calendar/feeds/default/private/full";
    }
    httpReq.open('POST', calUrl, false);
    httpReq.setRequestHeader('Authorization', 'GoogleLogin auth=' + prefs.getString("calauth"));
    httpReq.setRequestHeader('Content-type', 'application/atom+xml');
    httpReq.onreadystatechange = function()
    {
        if (httpReq.readyState == 4)
        {
            if (httpReq.status != 201)
            {
                if (retry)
                {
                    obtainAuthId__MODULE_ID__(httpReq);
                    sendEventXml__MODULE_ID__(i, events, eventXml, false);
                }
                else
                {
                    finishCalendarSync__MODULE_ID__(true);
                }
            }
            else
            {
                updateDateRecordsAfterSync__MODULE_ID__(events, i);
            }
        }
    }
    httpReq.send(eventXml);
}

function updateDateRecordsAfterSync__MODULE_ID__(events, i)
{
    for (var k = 0; k < events.length; k++)
    {
        var event = events[k];
        event.setSynced(true);
        var dateRecordId = parseInt(event.getDateRecord().getDate().getDate(), 10);
        dateRecordsToUpdate__MODULE_ID__[dateRecordId] = event.getDateRecord();
    }
    synchroniseNextEvent(++i);
}

var currentTimeTimer__MODULE_ID__ = null;

function monitorCurrentTime__MODULE_ID__()
{
    var currentData = this.getTodaysEventData();
    var date = new Date();

    if (date.getDate() != currentData.getDate().getDate())
    {
        var activeTaskIds = this.getPrefArray("active_task_ids");

        if (activeTaskIds)
        {
            for (var i = 0; i < activeTaskIds.length; i++)
            {
                var taskId = activeTaskIds[i];
                var timeSpan = _gel("total_time_span_" + taskId);
                var total = this.getTodaysEventData().getTotalForTask(taskId);
                var totalDuration = null;

                if (total)
                {
                    totalDuration = total.getDuration();
                }

                timeSpan.innerHTML = getDurationDisplayString__MODULE_ID__(totalDuration);
            }
        }
    }

    currentTimeTimer__MODULE_ID__ = setTimeout("monitorCurrentTime__MODULE_ID__()", 1000);
}

var todaysEventData__MODULE_ID__ = null;
var nextEventId__MODULE_ID__ = null;

function
this.getTodaysEventData()
{
    return todaysEventData__MODULE_ID__;
}

function getTaskName__MODULE_ID__(taskId)
{
    var allTaskNames = this.getPrefArray("task_names");

    var name = null;

    if (allTaskNames)
    {
        name = allTaskNames[taskId];
    }

    return name;
}

var currentEvent__MODULE_ID__;
var timer__MODULE_ID__;
var taskOrderTimer__MODULE_ID__ = null;

function monitorTaskOrder__MODULE_ID__()
{
    var taskList = _gel("tasks");

    var tasks = taskList.childNodes;
    var activeTaskIds = this.getPrefArray("active_task_ids");

    if (activeTaskIds && activeTaskIds.length > 0 && tasks.length == activeTaskIds.length)
    {
        var newOrder = new Array();
        for (var i = 0; i < tasks.length; i++)
        {
            var idSplit = tasks[i].id.split("_");
            newOrder[i] = idSplit[idSplit.length - 1];
        }

        var currentData = activeTaskIds.join("|");
        var newData = newOrder.join("|");

        if (newData != currentData)
        {
            this.setPrefArray("active_task_ids", newOrder);
        }
    }

    taskOrderTimer__MODULE_ID__ = setTimeout("monitorTaskOrder__MODULE_ID__()", 5000);
}

function displayTaskTimers__MODULE_ID__()
{
    _IG_Analytics("UA-2305736-1", "/timesheetmod/display_task_timers");
}

function startStopTimerAtTime__MODULE_ID__(source)
{
    var nameSplit = source.id.split("_");
    var taskId = parseInt(nameSplit[nameSplit.length - 1], 10);

    var taskTable = _gel("table_" + taskId);

    var lastRow = taskTable.rows.length;

    if (lastRow == 1)
    {
        var taskRow = taskTable.insertRow(lastRow);

        var handleTd = document.createElement("td");
        var handleImage = document.createElement("img");
        var nameTd = document.createElement("td");
        var nameDiv = document.createElement("div");
        var timeEditorTd = document.createElement("td");
        var timeEditorSpan = document.createElement("span");
        var disableTd = document.createElement("td");

        handleTd.id = "timed_handle_td_" + taskId;
        handleTd.className = "modtitle tabtitle handle emptyTaskTd";
        nameTd.id = "timed_name_td_" + taskId;
        nameTd.className = 'task_data task_name';
        nameDiv.id = "timed_name_div_" + taskId;
        nameDiv.style.width = "100%";
        timeEditorTd.id = "timed_total_time_td_" + taskId;
        timeEditorTd.className = 'task_data time_editor';
        timeEditorTd.colSpan = 2;
        timeEditorSpan.innerHTML = getTimeEditorControls__MODULE_ID__();
        disableTd.id = "timed_disable_td_" + taskId;
        disableTd.className = 'task_data emptyTaskTd';
        handleTd.innerHTML = "&nbsp;";
        taskRow.appendChild(handleTd);
        nameTd.appendChild(nameDiv);
        taskRow.appendChild(nameTd);
        timeEditorTd.appendChild(timeEditorSpan);
        taskRow.appendChild(timeEditorTd);
        taskRow.appendChild(disableTd);
    }
}

function getTimeEditorControls__MODULE_ID__()
{
    return "Time Controls<br/>Date Controls If Necessary";
}

function startStopTimer__MODULE_ID__(source)
{
    var nameSplit = source.id.split("_");
    var taskId = parseInt(nameSplit[nameSplit.length - 1], 10);
    var currentTime = new Date();
    var prefs = new _IG_Prefs(__MODULE_ID__);

    if (currentEvent__MODULE_ID__)
    {
        clearTimeout(timer__MODULE_ID__);
        if (!currentEvent__MODULE_ID__.getEnd())
        {
            var endTime = new BasicTime();
            endTime.setDataFromDate(currentTime);
            currentEvent__MODULE_ID__.setEnd(endTime);
        }

        var oldTaskId = currentEvent__MODULE_ID__.getTask().getId();
        var immediateTimersButton = _gel("status_immediate_img_" + oldTaskId);
        immediateTimersButton.src = "http://timesheetmod.googlecode.com/svn/trunk/images/start_immediate.png";
        immediateTimersButton.alt = "Start";

        var timersButton = _gel("status_timed_img_" + oldTaskId);
        timersButton.src = "http://timesheetmod.googlecode.com/svn/trunk/images/start.png";
        timersButton.alt = "Start at Time";

        prefs.set("current_event", "");
        addNewEvent__MODULE_ID__(currentEvent__MODULE_ID__);
        var timeSpan = _gel("total_time_span_" + oldTaskId);
        var currentTotalTimeSpan = _gel("current_task_total_time_span");
        var total = this.getTodaysEventData().getTotalForTask(oldTaskId);
        var totalDuration = total.getDuration();

        timeSpan.innerHTML = getDurationDisplayString__MODULE_ID__(totalDuration);
        timeSpan.className = "";
        currentTotalTimeSpan.className = "";
        currentTotalTimeSpan.innerHTML = "None";

        _IG_Analytics("UA-2305736-1", "/timesheetmod/new_event");
    }

    if (!currentEvent__MODULE_ID__ || currentEvent__MODULE_ID__.getTask().getId() != taskId)
    {
        currentEvent__MODULE_ID__ = new TimerEvent();
        var task = new Task();
        task.setId(taskId);

        var startTime = new BasicTime();
        startTime.setDataFromDate(currentTime);
        currentEvent__MODULE_ID__.setTask(task);
        currentEvent__MODULE_ID__.setStart(startTime);

        var immediateTimersButton = _gel("status_immediate_img_" + taskId);
        immediateTimersButton.src = "http://timesheetmod.googlecode.com/svn/trunk/images/stop_immediate.png";
        immediateTimersButton.alt = "Stop";

        var timersButton = _gel("status_timed_img_" + taskId);
        timersButton.src = "http://timesheetmod.googlecode.com/svn/trunk/images/stop.png";
        timersButton.alt = "Stop at Time";

        prefs.set("current_event", currentEvent__MODULE_ID__.toString());
        refreshCurrentTimer__MODULE_ID__();
    }
    else
    {
        currentEvent__MODULE_ID__ = null;
    }
}

function addNewEvent__MODULE_ID__(event)
{
    var eventsToAdd = event.splitDates();

    for (var i = 0; i < eventsToAdd.length; i++)
    {
        var newEvent = eventsToAdd[i];
        var startDate = newEvent.getStart().toDate();

        var dateRecord = getDateRecord__MODULE_ID__(startDate, true);
        dateRecord.addNewEvent(newEvent);
        this.updateDateRecord(dateRecord);
    }
}

/**
 * Creates a new event in Google calendar.
 * @param eventTask The event task to sync.
 */
function getEventXml__MODULE_ID__(taskName, eventId, start, end)
{
    var eventXML = "";

    eventXML += "<?xml version='1.0' encoding='UTF-8'?>\n";
    eventXML +=
    "<entry xmlns='http://www.w3.org/2005/Atom' xmlns:gCal='http://schemas.google.com/gCal/2005' xmlns:gd='http://schemas.google.com/g/2005'>\n";
    eventXML +=
    "<category scheme='http://schemas.google.com/g/2005' term='http://schemas.google.com/g/2005#event'></category>\n";
    eventXML +=
    "<category scheme='http://schemas.google.com/g/2005#kind' term='http://schemas.google.com/g/2005#event'></category>\n";
    eventXML += "<title type='text'>" + taskName + "</title>\n";
    eventXML += "<content type='text'>Timesheet Event + " + eventId + "</content>\n";
    eventXML += "<gd:eventStatus value='http://schemas.google.com/g/2005#event.confirmed'></gd:eventStatus>\n";
    eventXML += "<gd:visibility value='http://schemas.google.com/g/2005#event.default'></gd:visibility>\n";
    eventXML += "<gd:transparency value='http://schemas.google.com/g/2005#event.opaque'></gd:transparency>\n";
    eventXML += "<gCal:sendEventNotifications value='false'></gCal:sendEventNotifications>\n";

    var startTime = start.getFullYear() + "-" + getFormattedNumber(start.getMonth() + 1) + "-"
            + getFormattedNumber(start.getDate());
    startTime += "T" + getFormattedNumber(start.getHours()) + ":" + getFormattedNumber(start.getMinutes());
    startTime += ":00.000+01:00";
    var endTime = end.getFullYear() + "-" + getFormattedNumber(end.getMonth() + 1) + "-"
            + getFormattedNumber(end.getDate());
    endTime += "T" + getFormattedNumber(end.getHours()) + ":" + getFormattedNumber(end.getMinutes())
    endTime += ":00.000+01:00";

    eventXML += "<gd:when startTime='" + startTime + "' endTime='" + endTime + "'></gd:when>\n";
    eventXML += "<gd:where></gd:where>\n";
    eventXML += "</entry>\n";

    return eventXML;
}

/**
 * Obtains the authentication ID for Google calendar out of the current request object.
 *
 * A big thank you to Chris McKeever (http://www.r2unit.com), from whose code I originally worked out how to obtain this
 * data.
 *
 * @param httpReq The current request object.
 */
function obtainAuthId__MODULE_ID__(httpReq)
{
    var auth = new Array;
    var cookieHeader = httpReq.getResponseHeader('Set-Cookie');
    if (cookieHeader)
    {
        auth = cookieHeader.split(";");
    }

    var prefs = new _IG_Prefs(__MODULE_ID__);

    if (auth && auth.length)
    {
        var regularExpression = /[^=]*$/;
        prefs.set("calauth", regularExpression.exec(auth[0]));
    }
}

/**
 * Obtains a browser-specific XML HTTP request object.
 *
 * @return browserObject The XML HTTP request object.
 */
function getBrowserRequestObject__MODULE_ID__(mimetype)
{
    var requestObject;
    if (window.XMLHttpRequest)
    {
        requestObject = new XMLHttpRequest();
        if (mimetype && requestObject.overrideMimeType)
        {
            requestObject.overrideMimeType(mimetype);
        }
    }
    else
    {
        requestObject = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return requestObject;
}

function refreshCurrentTimer__MODULE_ID__()
{
    var taskId = currentEvent__MODULE_ID__.getTask().getId();
    var currentTime = new Date();

    var timeSpan = _gel("total_time_span_" + taskId);
    var currentTotalTimeSpan = _gel("current_task_total_time_span");
    timeSpan.className = "currentTimer";
    currentTotalTimeSpan.className = "currentTimer";

    var endTime = new BasicTime();
    endTime.setDataFromDate(currentTime);
    currentEvent__MODULE_ID__.setEnd(endTime);

    var eventDuration = currentEvent__MODULE_ID__.getDuration();

    var tempDuration = new BasicTime();

    var total = this.getTodaysEventData().getTotalForTask(taskId);
    if (total)
    {
        var totalDuration = total.getDuration();
        tempDuration.addSeconds(totalDuration.getSeconds());
        tempDuration.addMinutes(totalDuration.getMinutes());
        tempDuration.addHours(totalDuration.getHours());
    }

    tempDuration.addSeconds(eventDuration.getSeconds());
    tempDuration.addMinutes(eventDuration.getMinutes());
    tempDuration.addHours(eventDuration.getHours());

    currentTotalTimeSpan.innerHTML = getDurationDisplayString__MODULE_ID__(eventDuration);

    if (currentEvent__MODULE_ID__.getStart().getDate() != currentEvent__MODULE_ID__.getEnd().getDate())
    {
        tempDuration.setHours(currentEvent__MODULE_ID__.getEnd().getHours());
        tempDuration.setMinutes(currentEvent__MODULE_ID__.getEnd().getMinutes());
        tempDuration.setSeconds(currentEvent__MODULE_ID__.getEnd().getSeconds());
    }

    timeSpan.innerHTML = getDurationDisplayString__MODULE_ID__(tempDuration);

    timer__MODULE_ID__ = setTimeout("refreshCurrentTimer__MODULE_ID__()", 1000);
}

function getDurationDisplayString__MODULE_ID__(duration)
{
    var durationString;
    if (duration)
    {
        durationString = duration.getHours() + "h " + duration.getMinutes() + "m " + duration.getSeconds() + "s";
    }
    else
    {
        durationString = "00h 00m 00s";
    }
    return durationString;
}

var currentVersion__MODULE_ID__ = 2;

var localSessionId__MODULE_ID__ = (new Date()).getTime();

function checkSessionStatus__MODULE_ID__()
{
    var cookiePrefs = document.cookie.split(";");
    var sessionId = null;
    var cookieName = "session_id=";

    for (var i = 0; i < cookiePrefs.length; i++)
    {
        var current = _trim(cookiePrefs[i]);
        if (current.indexOf(cookieName) == 0)
        {
            sessionId = current.substring(cookieName.length, current.length);
        }
    }

    if (sessionId != localSessionId__MODULE_ID__)
    {
        disableGadget__MODULE_ID__();
    }
    else
    {
        setTimeout("checkSessionStatus__MODULE_ID__()", 5000);
    }
}

function disableGadget__MODULE_ID__()
{
    tabs.displayTabs(false);

    var mainDiv = _gel("m_" + __MODULE_ID__ + "_b");

    var disabledGadgetDiv = document.createElement("div");
    disabledGadgetDiv.id = "disabled_gadget_div";
    disabledGadgetDiv.style.display = "block";
    disabledGadgetDiv.style.visibility = "visible";
    //noinspection StringLiteralBreaksHTMLJS
    disabledGadgetDiv.innerHTML =
    "The timesheet gadget has been disabled to protect your timesheet data, as another instance is currently running in another tab/window.<br/><br/>To enable the gadget again, please refresh the page by clicking <a class='modboxin' style='border:0px none;margin:0px;padding:0px;' href='javaScript:location.reload(true);'>here</a>.";
    mainDiv.appendChild(disabledGadgetDiv);

    var activeTasks = this.getPrefArray("active_task_ids");
    var taskList = _gel("tasks");

    for (var i = 0; i < activeTasks.length; i++)
    {
        var taskId = activeTasks[i];
        var rowToRemove = _gel("li_row_" + taskId);
        taskList.removeChild(rowToRemove);
    }

    if (currentTimeTimer__MODULE_ID__)
    {
        clearTimeout(currentTimeTimer__MODULE_ID__);
        currentTimeTimer__MODULE_ID__ = null;
    }
    if (taskOrderTimer__MODULE_ID__)
    {
        clearTimeout(taskOrderTimer__MODULE_ID__);
        taskOrderTimer__MODULE_ID__ = null;
    }
}

function setSessionId__MODULE_ID__()
{
    document.cookie = "session_id=" + localSessionId__MODULE_ID__;
}

var tabs = null;

function createTabs__MODULE_ID__()
{
    if (!tabs)
    {
        tabs = new _IG_Tabs(__MODULE_ID__, "Today");
        tabs.addTab("Today", "taskContent", displayTaskTimers__MODULE_ID__);
        tabs.addTab("Summary", "summaryContent", initialiseSummary__MODULE_ID__);
        tabs.alignTabs("left", 3);
    }
    else
    {
        tabs.displayTabs(true);
    }
}

var domain__MODULE_ID__ = null;
var httpType__MODULE_ID__ = null;
var timesheetCalFeed__MODULE_ID__ = null;

function initialise__MODULE_ID__()
{
    document.onkeypress = captureKeys__MODULE_ID__;
    _IG_Analytics("UA-2305736-1", "/timesheetmod");
    domain__MODULE_ID__ = document.domain;
    httpType__MODULE_ID__ = document.location.toString().match(/[^:]*/);

    var disabledGadgetDiv = _gel("disabled_gadget_div");
    if (disabledGadgetDiv)
    {
        var mainDiv = _gel("m_" + __MODULE_ID__ + "_b");
        mainDiv.removeChild(disabledGadgetDiv);
    }
    //    disabledGadgetDiv.style.display = "none";
    setSessionId__MODULE_ID__();
    initialiseTaskList__MODULE_ID__();
    createTabs__MODULE_ID__();
    setTimeout("checkSessionStatus__MODULE_ID__()", 10000);
}

function initialiseTaskList__MODULE_ID__()
{
    var prefs = new _IG_Prefs(__MODULE_ID__);
    var currentVersion = prefs.getInt("current_version");
    nextEventId__MODULE_ID__ = prefs.getInt("next_event_id");

    if (!nextEventId__MODULE_ID__)
    {
        nextEventId__MODULE_ID__ = 1;
        prefs.set("next_event_id", nextEventId__MODULE_ID__);
    }

    for (var i = 1; i < 32; i++)
    {
        var eventDataString = prefs.getString("event_data_" + i);
        var eventData = new DateRecord();
        if (eventDataString)
        {
            var errorDetectedAndFixed = eventData.setDataFromString(eventDataString, currentVersion);
            this.getMonthsEvents()[i] = eventData;

            if (!currentVersion || currentVersion__MODULE_ID__ != currentVersion || errorDetectedAndFixed)
            {
                if (!errorDetectedAndFixed)
                {
                    this.updateDateRecord(eventData);
                }
                else
                {
                    alert("Error with input string [" + eventDataString + "]");
                }
            }
        }
    }

    if (!currentVersion || currentVersion__MODULE_ID__ != currentVersion)
    {
        prefs.set("current_version", currentVersion__MODULE_ID__);
    }

    var today = new Date();
    getDateRecord__MODULE_ID__(today, true);

    var activeTaskIds = this.getPrefArray("active_task_ids");

    if (activeTaskIds && activeTaskIds.length > 0)
    {
        for (i = 0; i < activeTaskIds.length; i++)
        {
            this.createNewTask(activeTaskIds[i], false);
        }

        var currentEventData = prefs.getString("current_event");

        if (currentEventData && _trim(currentEventData).length > 0)
        {
            currentEvent__MODULE_ID__ = new TimerEvent();
            currentEvent__MODULE_ID__.setDataFromString(currentEventData);

            var taskId = currentEvent__MODULE_ID__.getTask().getId();

            if (taskId && taskId != "undefined")
            {
                var immediateStatusControl = _gel("status_immediate_img_" + taskId);
                immediateStatusControl.src = "http://timesheetmod.googlecode.com/svn/trunk/images/stop_immediate.png";
                immediateStatusControl.alt = "Stop";
                var timedStatusControl = _gel("status_timed_img_" + taskId);
                timedStatusControl.src = "http://timesheetmod.googlecode.com/svn/trunk/images/stop.png";
                timedStatusControl.alt = "Stop at Time";
                refreshCurrentTimer__MODULE_ID__();
            }
            else
            {
                currentEvent__MODULE_ID__ = null;
                prefs.set("current_event", "");
            }
        }
    }
    else
    {
        this.getDisplay().displayNoTaskMessage(true);
    }

    monitorTaskOrder__MODULE_ID__();
    monitorCurrentTime__MODULE_ID__();
}

function addTask__MODULE_ID__()
{
    var addTaskDiv = _gel("add_task_entry");
    var addTaskControlDiv = _gel("add_task_control");
    addTaskDiv.style.visibility = 'visible';
    addTaskControlDiv.style.display = 'none';
    addTaskDiv.style.display = 'block';
    var newTaskName = _gel("new_task_name");
    newTaskName.focus();
}

function disableTask__MODULE_ID__(taskId, prompt)
{
    var choice = false;

    if (prompt)
    {
        choice = confirm("Are you sure you wish to disable this task?")
    }

    if (choice || !prompt)
    {
        if (currentEvent__MODULE_ID__)
        {
            var timerTaskId = currentEvent__MODULE_ID__.getTask().getId();
            if (timerTaskId == taskId)
            {
                var timersButton = _gel("status_immediate_img_" + timerTaskId);
                startStopTimer__MODULE_ID__(timersButton);
            }
        }

        var taskList = _gel("tasks");
        var rowToRemove = _gel("li_row_" + taskId);
        taskList.removeChild(rowToRemove);

        removeTaskFromActiveList__MODULE_ID__(taskId);
    }
}

function removeTaskFromActiveList__MODULE_ID__(taskId)
{
    var activeTaskIds = this.getPrefArray("active_task_ids");

    var newActiveTaskIds = new Array();

    for (var i = 0, j = 0; i < activeTaskIds.length; i++)
    {
        var activeTaskId = activeTaskIds[i];
        if (taskId != activeTaskId)
        {
            newActiveTaskIds[j++] = activeTaskId;
        }
    }

    if (newActiveTaskIds.length == 0)
    {
        this.getDisplay().displayNoTaskMessage(true);
    }

    this.setPrefArray("active_task_ids", newActiveTaskIds);
}

function initialiseSummary__MODULE_ID__()
{
    _IG_Analytics("UA-2305736-1", "/timesheetmod/display_summary");
    drawPeriod__MODULE_ID__(0);
}

function getFormattedDateString__MODULE_ID__(date)
{
    var prefs = new _IG_Prefs(__MODULE_ID__);
    var dateFormat = prefs.getInt("summary_date_format");

    var dateString;
    if (dateFormat == 1)
    {
        dateString = getFormattedNumber(date.getDate()) + "/" + getFormattedNumber(date.getMonth() + 1) + "/"
                + getFormattedNumber(date.getYear());
    }
    else
    {
        dateString = getFormattedNumber(date.getMonth() + 1) + "/" + getFormattedNumber(date.getDate()) + "/"
                + getFormattedNumber(date.getYear());
    }

    return dateString;
}

function drawPeriod__MODULE_ID__(week)
{
    var dateShift = 7 * week;
    var startDate = new Date();

    // <a href="javascript:drawPeriod(1);">PREVIOUS WEEK</a>

    var previousControl = _gel("previous_control");
    var nextControl = _gel("next_control");

    switch (week)
            {
        case 0:
        {
            nextControl.style.visibility = "hidden";
            previousControl.style.visibility = "visible";
            break;
        }
        case 1:
        {
            nextControl.style.visibility = "visible";
            previousControl.style.visibility = "visible";
            break;
        }
        case 2:
        {
            nextControl.style.visibility = "visible";
            previousControl.style.visibility = "visible";
            break;
        }
        case 3:
        {
            nextControl.style.visibility = "visible";
            previousControl.style.visibility = "hidden";
            break;
        }
    }

    previousControl.innerHTML = '<a href="javascript:drawPeriod__MODULE_ID__(' + (week + 1) + ');">PREVIOUS</a>'
    nextControl.innerHTML = '<a href="javascript:drawPeriod__MODULE_ID__(' + (week - 1) + ');">NEXT</a>'

    var startDateValue = startDate.getTime();

    var dayOfWeekShift;

    var dayOfWeekString = startDate.toString().slice(0, 3);

    switch (dayOfWeekString)
            {
        case "Mon" : {
            dayOfWeekShift = 0;
            break;
        }
        case "Tue" : {
            dayOfWeekShift = 1;
            break;
        }
        case "Wed" : {
            dayOfWeekShift = 2;
            break;
        }
        case "Thu" : {
            dayOfWeekShift = 3;
            break;
        }
        case "Fri" : {
            dayOfWeekShift = 4;
            break;
        }
        case "Sat" : {
            dayOfWeekShift = 5;
            break;
        }
        case "Sun" : {
            dayOfWeekShift = 6;
            break;
        }
    }

    var prefs = new _IG_Prefs(__MODULE_ID__);
    var startDayOfWeek = prefs.getString("start_day_of_week");
    var hideWeekend = prefs.getInt("hide_weekend");

    if (startDayOfWeek == 'S' && hideWeekend == 0)
    {
        dayOfWeekShift++;
    }

    startDateValue -= (1000 * 60 * 60 * 24) * (dateShift + dayOfWeekShift);
    startDate.setTime(startDateValue);

    var firstDay = getFormattedDateString__MODULE_ID__(startDate);

    var eventDataArray = new Array();
    var taskIds = new Array();
    var numberOfDatesToRetrieve = hideWeekend == 0 ? 7 : 5;

    for (var i = 0; i < numberOfDatesToRetrieve; i++)
    {
        var eventData = getDateRecord__MODULE_ID__(startDate, false);
        eventDataArray[i] = eventData;

        var totals = eventData.getTotals();

        for (var j = 0; j < totals.length; j++)
        {
            taskIds[totals[j].getTask().getId()] = true;
        }
        startDateValue += 1000 * 60 * 60 * 24;
        startDate.setTime(startDateValue);
    }

    startDateValue -= 1000 * 60 * 60 * 24;
    startDate.setTime(startDateValue);

    var lastDay = getFormattedDateString__MODULE_ID__(startDate);

    var dateRangeDisplay = _gel("summary_date_range");
    dateRangeDisplay.innerHTML = firstDay + " - " + lastDay;

    var summaryTable = _gel("summary_table");
    var tableRowsToRemove = summaryTable.rows;

    var tableRowsToRemoveLength = tableRowsToRemove.length;

    if (tableRowsToRemoveLength == 0)
    {
        var lastRow = summaryTable.rows.length;
        var newRow = summaryTable.insertRow(lastRow);
        var taskNameTd = document.createElement("td");
        taskNameTd.className = "modtitle title_heading task_title";
        taskNameTd.innerHTML = "Task";
        newRow.appendChild(taskNameTd);

        var columnWidth = numberOfDatesToRetrieve == 5 ? "15%" : "11%";
        for (j = 0; j < numberOfDatesToRetrieve; j++)
        {
            var column = document.createElement("td");
            var eventData = eventDataArray[j];
            var date = eventData.getDate().toDate();
            column.className = "modtitle title_heading day_title";
            column.style.width = columnWidth;
            column.innerHTML = date.toString().slice(0, 1);
            newRow.appendChild(column);
        }
    }

    if (tableRowsToRemoveLength > 1)
    {
        for (i = 1; i < tableRowsToRemoveLength; i++)
        {
            var currentRow = tableRowsToRemove[1];
            summaryTable.deleteRow(currentRow.rowIndex);
        }
    }

    if (taskIds.length > 0)
    {
        for (i = 0; i < taskIds.length; i++)
        {
            var taskIdPointer = taskIds[i];
            if (taskIdPointer)
            {
                var taskId = i;
                var dayCounter = 0;
                var dayTotal;

                var lastRow = summaryTable.rows.length;
                var newRow = summaryTable.insertRow(lastRow);
                newRow.id = "summary_row_" + taskId;

                var taskNameTd = document.createElement("td");
                taskNameTd.innerHTML = getTaskName__MODULE_ID__(taskId);
                taskNameTd.className = "summary_task_data task_title_data";
                newRow.appendChild(taskNameTd);

                for (j = 0; j < numberOfDatesToRetrieve; j++)
                {
                    var currentTd = document.createElement("td");
                    currentTd.innerHTML =
                    getTotalString__MODULE_ID__(eventDataArray[dayCounter++].getTotalForTask(taskId))
                    if (numberOfDatesToRetrieve == 7)
                    {
                        currentTd.className = "summary_task_data summary_total";
                    }
                    else
                    {
                        currentTd.className = "summary_task_data summary_total_larger";
                    }
                    newRow.appendChild(currentTd);
                }
            }
        }
    }
    else
    {
        var lastRow = summaryTable.rows.length;
        var newRow = summaryTable.insertRow(lastRow);
        var noTaskTd = document.createElement("td");
        noTaskTd.colSpan = numberOfDatesToRetrieve + 1;
        noTaskTd.innerHTML = "No timesheet data recorded";
        noTaskTd.className = "selectedtab tabtitle summary_task_data task_title_data";
        newRow.appendChild(noTaskTd);
    }

}

function getTotalString__MODULE_ID__(total)
{
    var duration;

    if (total)
    {
        duration = total.getDuration();
    }
    else
    {
        duration = new BasicTime();
    }
    var hours = parseInt(duration.getHours(), 10);
    var minutes = parseInt(duration.getMinutes(), 10);
    var seconds = parseInt(duration.getSeconds(), 10);

    minutes += seconds / 60;

    var prefs = new _IG_Prefs(__MODULE_ID__);
    var round = prefs.getInt("summary_round");
    var format = prefs.getInt("summary_format");
    var zeroDurationFormat = prefs.getInt("summary_zero_duration_format");

    if (round > 0)
    {
        minutes = Math.round(minutes / round) * round;
        if (minutes == 60)
        {
            hours += 1;
        }
    }

    var totalString = '';
    if (hours != 0 || minutes != 0 || zeroDurationFormat == 0)
    {
        totalString += hours;

        if (format == 0)
        {
            totalString += '.';
            totalString += getFormattedNumber(Math.round((minutes / 60) * 100), false);
        }
        else
        {
            totalString += 'h ';
            totalString += getFormattedNumber(minutes);
            totalString += 'm';
        }
    }
    else
    {
        switch (zeroDurationFormat)
                {
            case 1:
            {
                totalString += "-";
                break;
            }
            case 2:
            {
                totalString += "&nbsp;";
                break;
            }
        }
    }

    return totalString;
}

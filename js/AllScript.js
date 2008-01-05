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

var timesheetCalFeed__MODULE_ID__ = null;

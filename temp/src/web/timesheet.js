/**
 * Start of comms code
 */

/**
 * Obtains a browser-specific XML HTTP request object.
 *
 * @return The XML HTTP request object.
 */
function getBrowserRequestObject__MODULE_ID__()
{
    return (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
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
 * Creates a new event in Google calendar.
 * @param eventTask The event task to sync.
 */
function createEvent__MODULE_ID__(eventTask)
{
    var eventXML = "";

    eventXML += "<?xml version='1.0' encoding='UTF-8'?>\n";
    eventXML +=
    "<entry xmlns='http://www.w3.org/2005/Atom' xmlns:gCal='http://schemas.google.com/gCal/2005' xmlns:gd='http://schemas.google.com/g/2005'>\n";
    eventXML +=
    "<category scheme='http://schemas.google.com/g/2005' term='http://schemas.google.com/g/2005#event'></category>\n";
    eventXML +=
    "<category scheme='http://schemas.google.com/g/2005#kind' term='http://schemas.google.com/g/2005#event'></category>\n";
    eventXML += "<title type='text'>Testing testing 1 2 3</title>\n";
    eventXML += "<content type='text'>Some content here</content>\n";
    eventXML += "<gd:eventStatus value='http://schemas.google.com/g/2005#event.confirmed'></gd:eventStatus>\n";
    eventXML += "<gd:visibility value='http://schemas.google.com/g/2005#event.default'></gd:visibility>\n";
    eventXML += "<gd:transparency value='http://schemas.google.com/g/2005#event.opaque'></gd:transparency>\n";
    eventXML += "<gCal:sendEventNotifications value='false'></gCal:sendEventNotifications>\n";
    eventXML +=
    "<gd:when startTime='2007-06-21T11:00:00.000+01:00' endTime='2007-06-21T11:30:00.000+01:00'></gd:when>\n";
    eventXML += "<gd:where></gd:where>\n";
    eventXML += "</entry>\n";

    var prefs = new _IG_Prefs(__MODULE_ID__);

    var httpReq = getBrowserRequestObject__MODULE_ID__();
    httpReq.open('POST', "http://www.google.com/calendar/feeds/default/private/full", false);
    httpReq.setRequestHeader('Authorization', 'GoogleLogin auth=' + prefs.getString("calauth"));
    httpReq.setRequestHeader('Content-type', 'application/atom+xml');
    httpReq.send(eventXML);

    if (httpReq.status == 403)
    {
        obtainAuthId__MODULE_ID__(httpReq);

        httpReq = getBrowserRequestObject__MODULE_ID__();
        httpReq.open('POST', "http://www.google.com/calendar/feeds/default/private/full", false);
        httpReq.setRequestHeader('Authorization', 'GoogleLogin auth=' + prefs.getString("calauth"));
        httpReq.setRequestHeader('Content-type', 'application/atom+xml');
        httpReq.send(eventXML);
    }

    return false;
}

/**
 * End of comms code
 */

/**
 * Start of task code
 */

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
    handleDiv.className = "modtitle handle";
    nameDiv.id = "name_div_" + newTaskId;
    taskDiv.id = "task_div_" + newTaskId;
    taskDiv.className = 'unselectedtab task_data task_name';
    currentTimeDiv.id = "current_time_div_" + newTaskId;
    currentTimeDiv.className = 'unselectedtab task_data current_time';
    totalTimeDiv.id = "total_time_div_" + newTaskId;
    totalTimeDiv.className = 'unselectedtab task_data total_time';
    statusDiv.id = "status_div_" + newTaskId;
    statusDiv.className = 'unselectedtab task_data status';
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

/**
 * End of task code
 */



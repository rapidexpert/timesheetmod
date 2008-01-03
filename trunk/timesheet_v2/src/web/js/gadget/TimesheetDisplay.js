// todo Change all HTML ids to have moduleId appended!

function TimesheetDisplay(moduleId)
{
    this.setModuleId(moduleId);
}

TimesheetDisplay.prototype._moduleId = null;

TimesheetDisplay.prototype.getModuleId = function()
{
    return this._moduleId;
}
TimesheetDisplay.prototype.setModuleId = function(moduleId)
{
    this._moduleId = moduleId;
}

TimesheetDisplay.prototype.closeAddTask = function()
{
    var addTaskDiv = _gel("add_task_entry");
    var newTaskName = _gel("new_task_name");
    newTaskName.value = '';
    addTaskDiv.style.display = 'none';
    var addTaskControlDiv = _gel("add_task_control");
    addTaskControlDiv.style.display = 'block';
}

TimesheetDisplay.prototype.displayNoTaskMessage = function(display)
{
    var timerHeaderTable = _gel("timer_header_table");
    var messageRow = _gel("no_task_message");

    if (!messageRow && display)
    {
        var lastRow = timerHeaderTable.rows.length;
        var newMessageRow = timerHeaderTable.insertRow(lastRow);
        newMessageRow.id = "no_task_message";

        var noHandleTd = document.createElement("td");
        var messageTd = document.createElement("td");
        noHandleTd.className = "modtitle tabtitle task_data invisihandle";
        messageTd.className = "selectedtab tabtitle task_data";
        messageTd.colSpan = "4";

        noHandleTd.innerHTML = "&nbsp;";
        messageTd.innerHTML = "There are currently no enabled tasks.";

        newMessageRow.appendChild(noHandleTd);
        newMessageRow.appendChild(messageTd);

        newMessageRow.style.visibility = "visible";
    }
    else if (messageRow && !display)
    {
        var rowIndex = messageRow.sectionRowIndex;
        timerHeaderTable.deleteRow(rowIndex);
    }
}

TimesheetDisplay.prototype.displayTimerMessage = function(message, displayDuration)
{
    var miniMessage = new _IG_MiniMessage(this.getModuleId(), _gel("messages"));
    this.showMessages();
    miniMessage.createTimerMessage(message, displayDuration, this.hideMessages);
}

TimesheetDisplay.prototype.hideMessages = function()
{
    var messages = _gel("messages");
    messages.style.display = 'none';
}

TimesheetDisplay.prototype.showMessages = function()
{
    var messages = _gel("messages");
    messages.style.display = 'block';
}

TimesheetDisplay.prototype.getTimesheetData = function()
{
    return _getTimesheetForModuleId(this.getModuleId());
}

TimesheetDisplay.prototype.replaceWithContent = function(source)
{
    var nameSplit = source.id.split("_");
    var taskId = _pInt(nameSplit[nameSplit.length - 1]);

    var containingDiv = _gel("name_div_" + taskId);
    var taskName = _trim(source.value);
    var textEntry = _gel("rename_text_" + taskId);

    if (taskName.length == 0)
    {
        this.displayTimerMessage("Please enter a task name", 2);
        textEntry.focus();
    }
    else
    {
        var timesheetData = this.getTimesheetData();
        var existingTaskId = timesheetData.getTaskId(taskName);
        var existingTaskName = timesheetData.getTaskName(existingTaskId);

        if (existingTaskId == taskId || !existingTaskName)
        {
            timesheetData.setTaskName(taskId, taskName);
            containingDiv.innerHTML = taskName;
            containingDiv.onclick = function()
            {
                _getTimesheetForElement(this).getDisplay().replaceWithTextBox(this);
            };
        }
        else if (timesheetData.isActiveTask(existingTaskId))
        {
            this.displayTimerMessage("There is already an active task with that name, please enter another.", 5);
            textEntry.focus();
        }
        else
        {
            var choice = confirm("There is already an existing task with this name, would you like to switch to it?")

            if (choice)
            {
                _IG_Analytics("UA-2305736-1", "/timesheetmod/task_replaced_with_existing");

                var currentEvent = timesheetData.getCurrentEvent();
                if (currentEvent)
                {
                    timesheetData.startStopTimer(_gel("status_immediate_img_" + currentEvent.getTask().getId()));
                }

                containingDiv.innerHTML = taskName;
                containingDiv.onclick = function()
                {
                    _getTimesheetForElement(this).getDisplay().replaceWithTextBox(this);
                };

                var taskRow = _gel("li_row_" + taskId);
                taskRow.id = "li_row_" + existingTaskId;
                var html = taskRow.innerHTML;
                var regex = new RegExp("_" + taskId, "g");
                var regex2 = new RegExp("disableTask\\(" + taskId, "g");
                html = html.replace(regex, "_" + existingTaskId);
                html = html.replace(regex2, "disableTask(" + existingTaskId);
                taskRow.innerHTML = html;

                var nameDiv = _gel("name_div_" + existingTaskId);
                var statusImg = _gel("status_immediate_img_" + existingTaskId);
                nameDiv.onclick = function()
                {
                    _getTimesheetForElement(this).getDisplay().replaceWithTextBox(this);
                };
                statusImg.onclick = function()
                {
                    _getTimesheetForElement(this).startStopTimer(this);
                };

                var totalSpan = _gel("total_time_span_" + existingTaskId);
                var total = timesheetData.getTodaysEventData().getTotalForTask(existingTaskId);

                var durationString;
                if (total)
                {
                    durationString = this.getDurationDisplayString(total.getDuration());
                }
                else
                {
                    durationString = this.getDurationDisplayString();
                }

                totalSpan.innerHTML = durationString;

                var activeTaskIds = timesheetData.getPrefArray("active_task_ids");

                for (var i = 0; i < activeTaskIds.length; i++)
                {
                    var activeTaskId = activeTaskIds[i];
                    if (taskId == activeTaskId)
                    {
                        activeTaskIds[i] = "" + existingTaskId;
                    }
                }

                timesheetData.setPrefArray("active_task_ids", activeTaskIds);

                Sortable.create('tasks', {handle:'handle_image',constraint:'vertical'});
            }
        }
    }
}

TimesheetDisplay.prototype.getDurationDisplayString = function(duration)
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

TimesheetDisplay.prototype.replaceWithTextBox = function(source)
{
    source.onclick = null;
    var currentContent = source.innerHTML;

    var nameSplit = source.id.split("_");
    var taskId = _pInt(nameSplit[nameSplit.length - 1]);

    var textElementId = "rename_text_" + taskId;
    source.innerHTML = "<input class='editTaskName' type=\'text\' id=\'" + textElementId + "\' onBlur=\'_getTimesheet("
            + this.getModuleId() + ").getDisplay().replaceWithContent(this);\'/>";

    var textElement = _gel(textElementId);
    if (window.XMLHttpRequest && !document.all)
    {
        textElement.className = "editTaskNameSmaller";
    }

    if (currentContent != '&nbsp;')
    {
        textElement.value = currentContent;
    }
    textElement.select();
}

TimesheetDisplay.prototype.displayNewTask = function(taskId)
{
    var taskList = _gel("tasks");
    var listRow = document.createElement("li")
    var taskTable = document.createElement("table");
    var lastRow = taskTable.rows.length;
    var taskRow = taskTable.insertRow(lastRow);

    var handleTd = document.createElement("td");
    var handleDiv = document.createElement("div");
    //var handleImage = document.createElement("img");
    var nameTd = document.createElement("td");
    var nameDiv = document.createElement("div");
    var totalTimeTd = document.createElement("td");
    var totalTimeSpan = document.createElement("span");
    var statusTd = document.createElement("td");
    var statusImmediateImg = document.createElement("img");
    var statusTimedImg = document.createElement("img");
    var disableTd = document.createElement("td");

    listRow.id = "li_row_" + taskId;
    listRow.style.position = 'relative';
    taskTable.id = "table_" + taskId;
    taskRow.id = "row_" + taskId;
    handleTd.id = "handle_td_" + taskId;
    handleTd.className = "modtitle tabtitle handle";
    handleDiv.id = "handle_div_" + taskId;
    handleDiv.className = "handle_image";
    nameTd.id = "name_td_" + taskId;
    nameTd.className = 'task_data task_name';
    nameDiv.id = "name_div_" + taskId;
    nameDiv.style.width = "100%";
    nameDiv.onclick = function()
    {
        _getTimesheetForElement(this).getDisplay().replaceWithTextBox(this);
    };
    totalTimeTd.id = "total_time_td_" + taskId;
    totalTimeTd.className = 'task_data total_time';
    totalTimeSpan.id = "total_time_span_" + taskId;
    totalTimeSpan.style.width = "100%"
    statusTd.id = "status_td_" + taskId;
    statusTd.className = 'task_data status';
    statusImmediateImg.id = "status_immediate_img_" + taskId;
    statusImmediateImg.className = "control";
    statusImmediateImg.src = "http://timesheetmod.googlecode.com/svn/trunk/images/start_immediate.png"
    statusImmediateImg.alt = "Start";

    statusImmediateImg.onclick = function()
    {
        _getTimesheetForElement(this).startStopTimer(this);
    };

    statusTimedImg.id = "status_timed_img_" + taskId;
    statusTimedImg.className = "control";
    statusTimedImg.style.paddingLeft = "5px";
    statusTimedImg.src = "http://timesheetmod.googlecode.com/svn/trunk/images/start.png"
    statusTimedImg.alt = "Start At Time";
    statusTimedImg.onclick = function()
    {
        _getTimesheetForElement(this).startStopTimerAtTime(this);
    };

    disableTd.id = "disable_td_" + taskId;
    disableTd.className = 'task_data change';

    var timesheetData = this.getTimesheetData();
    var taskName = timesheetData.getTaskName(taskId);

    handleDiv.innerHTML = "&nbsp;";
    nameDiv.innerHTML = taskName;
    var total = timesheetData.getTodaysEventData().getTotalForTask(taskId);
    if (total)
    {
        totalTimeSpan.innerHTML = this.getDurationDisplayString(total.getDuration());
    }
    else
    {
        totalTimeSpan.innerHTML = this.getDurationDisplayString();
    }
    disableTd.innerHTML = '<a href="javascript:_getTimesheetForElement(this).disableTask(' + taskId
            + ', true);" class="delbox stealImage"></a>';

    handleTd.appendChild(handleDiv);
    taskRow.appendChild(handleTd);
    nameTd.appendChild(nameDiv);
    taskRow.appendChild(nameTd);
    totalTimeTd.appendChild(totalTimeSpan);
    taskRow.appendChild(totalTimeTd);
    statusTd.appendChild(statusImmediateImg);
    statusTd.appendChild(statusTimedImg);
    taskRow.appendChild(statusTd);
    taskRow.appendChild(disableTd);

    listRow.appendChild(taskTable);
    listRow.style.display = "none";

    taskList.appendChild(listRow);

    Effect.BlindDown(listRow.id);
    Sortable.create('tasks', {handle:'handle_image',constraint:'vertical'})
}

TimesheetDisplay.prototype.drawPeriod = function(week)
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

    var timesheetData = this.getTimesheetData();

    var startDayOfWeek = timesheetData.getPrefString("start_day_of_week");
    var hideWeekend = timesheetData.getPrefInt("hide_weekend");

    if (startDayOfWeek == 'S' && hideWeekend == 0)
    {
        dayOfWeekShift++;
    }

    startDateValue -= (1000 * 60 * 60 * 24) * (dateShift + dayOfWeekShift);
    startDate.setTime(startDateValue);

    var firstDay = this.getFormattedDateString(startDate);

    var eventDataArray = new Array();
    var taskIds = new Array();
    var numberOfDatesToRetrieve = hideWeekend == 0 ? 7 : 5;

    for (var i = 0; i < numberOfDatesToRetrieve; i++)
    {
        var eventData = timesheetData.getDateRecord(startDate, false);
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

    var lastDay = this.getFormattedDateString(startDate);

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

                var lastRow = summaryTable.rows.length;
                var newRow = summaryTable.insertRow(lastRow);
                newRow.id = "summary_row_" + taskId;

                var taskNameTd = document.createElement("td");
                taskNameTd.innerHTML = timesheetData.getTaskName(taskId);
                taskNameTd.className = "summary_task_data task_title_data";
                newRow.appendChild(taskNameTd);

                for (j = 0; j < numberOfDatesToRetrieve; j++)
                {
                    var currentTd = document.createElement("td");
                    currentTd.innerHTML = this.getTotalString(eventDataArray[dayCounter++].getTotalForTask(taskId))
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

TimesheetDisplay.prototype.getTotalString = function(total)
{
    var duration;
    var timesheetData = this.getTimesheetData();

    if (total)
    {
        duration = total.getDuration();
    }
    else
    {
        duration = new BasicTime();
    }
    var hours = _pInt(duration.getHours());
    var minutes = _pInt(duration.getMinutes());
    var seconds = _pInt(duration.getSeconds());

    minutes += seconds / 60;

    var round = timesheetData.getPrefInt("summary_round");
    var format = timesheetData.getPrefInt("summary_format");
    var zeroDurationFormat = timesheetData.getPrefInt("summary_zero_duration_format");

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
            totalString += _getFormattedNumber(Math.round((minutes / 60) * 100), false);
        }
        else
        {
            totalString += 'h ';
            totalString += _getFormattedNumber(minutes);
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

TimesheetDisplay.prototype.getFormattedDateString = function(date)
{
    var dateFormat = this.getTimesheetData().getPrefInt("summary_date_format");

    var dateString;
    if (dateFormat == 1)
    {
        dateString = _getFormattedNumber(date.getDate()) + "/" + _getFormattedNumber(date.getMonth() + 1) + "/"
                + _getFormattedNumber(date.getYear());
    }
    else
    {
        dateString = _getFormattedNumber(date.getMonth() + 1) + "/" + _getFormattedNumber(date.getDate()) + "/"
                + _getFormattedNumber(date.getYear());
    }

    return dateString;
}

TimesheetDisplay.prototype.captureKeys = function(ev)
{
    var kCode;

    if (!ev)
    {
        ev = window.event;
    }
    kCode = ev.keyCode || ev.which;

    if (kCode == 13)
    {
        var target = ev.target || ev.srcElement;
        if (target.id == 'new_task_name')
        {
            this.getTimesheetData().submitNewTaskName();
        }
        else if (target.id.indexOf("rename_text_") != -1)
        {
            target.blur();
        }
        return true;
    }
}

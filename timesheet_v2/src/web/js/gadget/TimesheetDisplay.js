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
    var addTaskDiv = this.gel("add_task_entry");
    var newTaskName = this.gel("new_task_name");
    newTaskName.value = '';
    addTaskDiv.style.display = 'none';
    var addTaskControlDiv = this.gel("add_task_control");
    addTaskControlDiv.style.display = 'block';
}

TimesheetDisplay.prototype.displayNoTaskMessage = function(display)
{
    var timerHeaderTable = this.gel("timer_header_table");
    var messageRow = this.gel("no_task_message");

    if (!messageRow && display)
    {
        var lastRow = timerHeaderTable.rows.length;
        var newMessageRow = timerHeaderTable.insertRow(lastRow);
        newMessageRow.id = this.getModuleElementId("no_task_message");

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
    var miniMessage = new _IG_MiniMessage(this.getModuleId(), this.gel("messages"));
    this.showMessages();
    miniMessage.createTimerMessage(message, displayDuration, this.hideMessages);
}

TimesheetDisplay.prototype.hideMessages = function()
{
    var messages = this.gel("messages");
    messages.style.display = 'none';
}

TimesheetDisplay.prototype.showMessages = function()
{
    var messages = this.gel("messages");
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

    var containingDiv = this.gel("name_div_" + taskId);
    var taskName = _trim(source.value);
    var textEntry = this.gel("rename_text_" + taskId);

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
                    timesheetData.startStopTimer(this.gel("status_immediate_img_" + currentEvent.getTask().getId()));
                }

                containingDiv.innerHTML = taskName;
                containingDiv.onclick = function()
                {
                    _getTimesheetForElement(this).getDisplay().replaceWithTextBox(this);
                };

                var taskRow = this.gel("li_row_" + taskId);
                taskRow.id = this.getModuleElementId("li_row_" + existingTaskId);
                var html = taskRow.innerHTML;
                var regex = new RegExp("_" + taskId, "g");
                var regex2 = new RegExp("disableTask\\(" + taskId, "g");
                html = html.replace(regex, "_" + existingTaskId);
                html = html.replace(regex2, "disableTask(" + existingTaskId);
                taskRow.innerHTML = html;

                var nameDiv = this.gel("name_div_" + existingTaskId);
                var statusImg = this.gel("status_immediate_img_" + existingTaskId);
                nameDiv.onclick = function()
                {
                    _getTimesheetForElement(this).getDisplay().replaceWithTextBox(this);
                };
                statusImg.onclick = function()
                {
                    _getTimesheetForElement(this).startStopTimer(this);
                };

                var totalSpan = this.gel("total_time_span_" + existingTaskId);
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

                Sortable.create(this.getModuleElementId('tasks'), {handle:'handle_image',constraint:'vertical'});
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

    var textElement = this.gel(textElementId);
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

TimesheetDisplay.prototype.addOnKeyUpEvent = function(input, mandatory, maxNum, linkedInput)
{
    input.onkeyup = function(event)
    {
        if (!event)
        {
            event = window.event;
        }
        return _validateNumericalTextInput(mandatory, event, maxNum, linkedInput);
    }
}

TimesheetDisplay.prototype.displayNewTask = function(taskId)
{
    var taskList = this.gel('tasks');
    var listRow = document.createElement('li')
    var taskTable = document.createElement('table');
    var lastRow = taskTable.rows.length;
    var taskRow = taskTable.insertRow(lastRow);

    var handleTd = document.createElement('td');
    var handleDiv = document.createElement('div');
    var nameTd = document.createElement('td');
    var nameUpperDiv = document.createElement('div');
    var nameLowerDiv = document.createElement('div');
    var totalTd = document.createElement('td');
    var totalUpperDiv = document.createElement('div');
    var totalLowerDiv = document.createElement('div');
    var controlTd = document.createElement('td');
    var controlUpperDiv = document.createElement('div');
    var controlLowerDiv = document.createElement('div');
    var disableTd = document.createElement('td');

    listRow.id = this.getModuleElementId('li_row_' + taskId);
    listRow.style.position = 'relative';
    listRow.className = 'tasks_li';

    taskTable.id = this.getModuleElementId('table_' + taskId);

    taskRow.id = this.getModuleElementId('row_' + taskId);

    handleTd.id = this.getModuleElementId('handle_td_' + taskId);
    handleTd.className = 'drag_drop tasks_background';
    handleDiv.id = this.getModuleElementId('handle_div_' + taskId);
    handleDiv.className = 'handle_image';

    nameTd.id = this.getModuleElementId('name_td_' + taskId);
    nameTd.className = 'task_name';
    nameUpperDiv.id = this.getModuleElementId('name_upper_div_' + taskId);
    nameUpperDiv.className = 'task_name_upper_div';
    nameLowerDiv.id = this.getModuleElementId('name_lower_div_' + taskId);
    nameLowerDiv.className = 'task_name_lower_div hidden';
//    nameDiv.onclick = '_getTimesheetForElement(this).getDisplay().replaceWithTextBox(this);';
    totalTd.id = this.getModuleElementId('total_time_td_' + taskId);
    totalTd.className = 'total';
    totalUpperDiv.id = this.getModuleElementId('total_upper_div_' + taskId);
    totalUpperDiv.className = 'total_upper_div';
    totalLowerDiv.id = this.getModuleElementId('total_lower_div_' + taskId);
    totalLowerDiv.className = 'total_lower_div hidden';

    controlTd.id = this.getModuleElementId('control_td_' + taskId);
    controlTd.className = 'control';
    controlUpperDiv.id = this.getModuleElementId('control_upper_div_' + taskId);
    controlUpperDiv.className = 'control_upper_div';
    controlLowerDiv.id = this.getModuleElementId('control_lower_div_' + taskId);
    controlLowerDiv.className = 'control_lower_div hidden';

    disableTd.id = this.getModuleElementId('disable_td_' + taskId);
    disableTd.className = 'disable';


//    statusImmediateImg.onclick = function()
    //    {
    //        _getTimesheetForElement(this).startStopTimer(this);
    //    };
    //
    //    statusTimedImg.id = this.getModuleElementId('status_timed_img_' + taskId);
    //    statusTimedImg.className = 'control';
    //    statusTimedImg.style.paddingLeft = '5px';
    //    statusTimedImg.src = 'http://timesheetmod.googlecode.com/svn/trunk/images/start.png';
    //    statusTimedImg.alt = 'Start At Time';
    //    statusTimedImg.onclick = '_getTimesheetForElement(this).startStopTimerAtTime(this);';
    //
    //
    taskTable.className = "tasks_table";
    taskTable.cellPadding = 1;
    taskTable.cellSpacing = 0;

    var timesheetData = this.getTimesheetData();
    var taskName = timesheetData.getTaskName(taskId);

    handleDiv.innerHTML = '&nbsp;';

    nameUpperDiv.innerHTML = taskName;
    nameLowerDiv.innerHTML = 'Start Task at:<br/>&nbsp;<br/>Stop Task at:<br/>&nbsp;';

    var total = timesheetData.getTodaysEventData().getTotalForTask(taskId);
    if (total)
    {
        totalUpperDiv.innerHTML = this.getDurationDisplayString(total.getDuration());
    }
    else
    {
        totalUpperDiv.innerHTML = this.getDurationDisplayString();
    }

    var startHourInputId = this.getModuleElementId('start_hour_input_' + taskId);
    var startMinuteInputId = this.getModuleElementId('start_minute_input_' + taskId);
    var startDateInputId = this.getModuleElementId('start_date_input_' + taskId);
    var endHourInputId = this.getModuleElementId('end_hour_input_' + taskId);
    var endMinuteInputId = this.getModuleElementId('end_minute_input_' + taskId);

    var colonSpan = document.createElement('span');
    colonSpan.innerHTML = '<b>:</b>';
    var colonSpanTwo = colonSpan.cloneNode(true);
    var newLine = document.createElement('br');
    var newLineTwo = document.createElement('br');
    var newLineThree = document.createElement('br');

    var startHourInput = document.createElement('input');
    startHourInput.className = 'timed_text_input timed_input_invalid';
    startHourInput.maxLength = 2;
    this.addOnKeyUpEvent(startHourInput, true, 23, null);
    startHourInput.id = startHourInputId;

    var startMinuteInput = startHourInput.cloneNode(true);
    startMinuteInput.id = startMinuteInputId;
    this.addOnKeyUpEvent(startMinuteInput, true, 59, null);

    var startDateInput = document.createElement('select');
    startDateInput.className = 'timed_date_input';
    startDateInput.id = startDateInputId;
    var dateOptionInputOne = document.createElement('option');
    dateOptionInputOne.value = '18';
    dateOptionInputOne.innerHTML = '18/02';
    startDateInput.appendChild(dateOptionInputOne);

    var endHourInput = startHourInput.cloneNode(true);
    endHourInput.id = endHourInputId;
    endHourInput.className = 'timed_text_input timed_input_ignored';
    this.addOnKeyUpEvent(endHourInput, false, 23, endMinuteInputId);

    var endMinuteInput = endHourInput.cloneNode(true);
    endMinuteInput.id = endMinuteInputId;
    this.addOnKeyUpEvent(endMinuteInput, false, 59, endHourInputId);

    var endDateInput = document.createElement('select');
    endDateInput.className = 'timed_date_input';
    endDateInput.id = startDateInputId;
    var dateOptionInputTwo = document.createElement('option');
    dateOptionInputTwo.value = '18';
    dateOptionInputTwo.innerHTML = '18/02';
    endDateInput.appendChild(dateOptionInputTwo);

    totalLowerDiv.appendChild(startHourInput);
    totalLowerDiv.appendChild(colonSpan);
    totalLowerDiv.appendChild(startMinuteInput);
    totalLowerDiv.appendChild(newLine);
    totalLowerDiv.appendChild(startDateInput);
    totalLowerDiv.appendChild(newLineTwo);
    totalLowerDiv.appendChild(endHourInput);
    totalLowerDiv.appendChild(colonSpanTwo);
    totalLowerDiv.appendChild(endMinuteInput);
    totalLowerDiv.appendChild(newLineThree);
    totalLowerDiv.appendChild(endDateInput);

    var immediateControlId = this.getModuleElementId('immediate_control_' + taskId);
    var timedControlId = this.getModuleElementId('timed_control_' + taskId);

    controlUpperDiv.innerHTML = '<img src="images/start.png" id="' + immediateControlId
            + '" alt="Start Task" title="Start Task" class="enabled_timer_control"/>&nbsp;<img src="images/clock_play.png" id="'
            + timedControlId + '" alt="Start Task At Time" title="Start Task At Time" class="enabled_timer_control"/>';
    controlLowerDiv.innerHTML =
    '&nbsp;<input type="button" class="timer_control_button" title="Start Timer" value="START"/>&nbsp;<br/>&nbsp;<br/>&nbsp;<input type="button" class="timer_control_button" title="Clear Stop Time" value="RESET"/>&nbsp;<br/>&nbsp;';

    disableTd.innerHTML = '<img src="images/report_delete.png" alt="Disable Task" title="Disable Task"/>';

    handleTd.appendChild(handleDiv);
    taskRow.appendChild(handleTd);
    nameTd.appendChild(nameUpperDiv);
    nameTd.appendChild(nameLowerDiv);
    taskRow.appendChild(nameTd);
    totalTd.appendChild(totalUpperDiv);
    totalTd.appendChild(totalLowerDiv);
    taskRow.appendChild(totalTd);
    controlTd.appendChild(controlUpperDiv);
    controlTd.appendChild(controlLowerDiv);
    taskRow.appendChild(controlTd);
    taskRow.appendChild(disableTd);

    listRow.appendChild(taskTable);
    listRow.style.display = 'none';

    taskList.appendChild(listRow);

    Effect.BlindDown(listRow.id);
    Sortable.create(this.getModuleElementId('tasks'), {handle:'handle_image',constraint:'vertical'})
}

TimesheetDisplay.prototype.getModuleElementId = function(elementId)
{
    return _getElementId(elementId, this.getModuleId());
}

TimesheetDisplay.prototype.gel = function(elementId)
{
    var moduleElementId = this.getModuleElementId(elementId);
    return _gel(moduleElementId);
}

TimesheetDisplay.prototype.drawPeriod = function(week)
{
    var dateShift = 7 * week;
    var startDate = new Date();

    // <a href="javascript:drawPeriod(1);">PREVIOUS WEEK</a>

    var previousControl = this.gel("previous_control");
    var nextControl = this.gel("next_control");

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

    var dateRangeDisplay = this.gel("summary_date_range");
    dateRangeDisplay.innerHTML = firstDay + " - " + lastDay;

    var summaryTable = this.gel("summary_table");
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
        for (taskId = 1; taskId < tableRowsToRemoveLength; taskId++)
        {
            var currentRow = tableRowsToRemove[1];
            summaryTable.deleteRow(currentRow.rowIndex);
        }
    }

    if (taskIds.length > 0)
    {
        for (var taskId = 0; taskId < taskIds.length; taskId++)
        {
            var taskIdPointer = taskIds[taskId];
            if (taskIdPointer)
            {
                var dayCounter = 0;

                var lastRow = summaryTable.rows.length;
                var newRow = summaryTable.insertRow(lastRow);
                newRow.id = this.getModuleElementId("summary_row_" + taskId);

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

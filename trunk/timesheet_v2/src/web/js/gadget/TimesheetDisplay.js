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


// todo Not yet done this method.
TimesheetDisplay.prototype.replaceWithContent = function(source)
{
    var nameSplit = source.id.split("_");
    var taskId = parseInt(nameSplit[nameSplit.length - 1], 10);

    var containingDiv = _gel("name_div_" + taskId);
    var taskName = _trim(source.value);
    var textEntry = _gel("rename_text_" + taskId);

    if (taskName.length == 0)
    {
        var miniMessage = new _IG_MiniMessage(__MODULE_ID__, _gel("messages"));
        this.getDisplay().showMessages();
        miniMessage.createTimerMessage("Please enter a task name", 2, this.getDisplay().hideMessages);
        textEntry.focus();
    }
    else
    {
        var existingTaskId = this.getTaskId(taskName);
        var existingTaskName = getTaskName__MODULE_ID__(existingTaskId);

        if (existingTaskId == taskId || !existingTaskName)
        {
            this.setTaskName(taskId, taskName);
            containingDiv.innerHTML = taskName;
            containingDiv.onclick = function()
            {
                replaceWithTextBox__MODULE_ID__(this);
            };
        }
        else if (this.isActiveTask(existingTaskId))
        {
            var miniMessage = new _IG_MiniMessage(__MODULE_ID__, _gel("messages"));
            this.getDisplay().showMessages();
            miniMessage.createTimerMessage("There is already an active task with that name, please enter another.", 5, this.getDisplay().hideMessages);
            textEntry.focus();
        }
        else
        {
            var choice = confirm("There is already an existing task with this name, would you like to switch to it?")

            if (choice)
            {
                _IG_Analytics("UA-2305736-1", "/timesheetmod/task_replaced_with_existing");

                if (currentEvent__MODULE_ID__)
                {
                    startStopTimer__MODULE_ID__(_gel("status_immediate_img_"
                            + currentEvent__MODULE_ID__.getTask().getId()));
                }

                containingDiv.innerHTML = taskName;
                containingDiv.onclick = function()
                {
                    replaceWithTextBox__MODULE_ID__(this);
                };

                var taskRow = _gel("li_row_" + taskId);
                taskRow.id = "li_row_" + existingTaskId;
                var html = taskRow.innerHTML;
                var regex = new RegExp("_" + taskId, "g");
                var regex2 = new RegExp("disableTask__MODULE_ID__\\(" + taskId, "g");
                html = html.replace(regex, "_" + existingTaskId);
                html = html.replace(regex2, "disableTask__MODULE_ID__(" + existingTaskId);
                taskRow.innerHTML = html;

                var nameDiv = _gel("name_div_" + existingTaskId);
                var statusImg = _gel("status_immediate_img_" + existingTaskId);
                nameDiv.onclick = function()
                {
                    replaceWithTextBox__MODULE_ID__(this);
                };
                statusImg.onclick = function()
                {
                    startStopTimer__MODULE_ID__(this);
                };

                var totalSpan = _gel("total_time_span_" + existingTaskId);
                var total = this.getTodaysEventData().getTotalForTask(existingTaskId);

                var durationString;
                if (total)
                {
                    durationString = getDurationDisplayString__MODULE_ID__(total.getDuration());
                }
                else
                {
                    durationString = getDurationDisplayString__MODULE_ID__();
                }

                totalSpan.innerHTML = durationString;

                var activeTaskIds = this.getPrefArray("active_task_ids");

                for (var i = 0; i < activeTaskIds.length; i++)
                {
                    var activeTaskId = activeTaskIds[i];
                    if (taskId == activeTaskId)
                    {
                        activeTaskIds[i] = "" + existingTaskId;
                    }
                }

                this.setPrefArray("active_task_ids", activeTaskIds);

                Sortable.create('tasks', {handle:'handle_image',constraint:'vertical'});
            }
        }
    }
}

TimesheetDisplay.prototype.replaceWithTextBox = function(source)
{
    source.onclick = null;
    var currentContent = source.innerHTML;

    var nameSplit = source.id.split("_");
    var taskId = parseInt(nameSplit[nameSplit.length - 1], 10);

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
    var moduleIdString = "" + this.getModuleId();
    nameDiv.onclick = function()
    {
        _getTimesheet(moduleIdString).getDisplay().replaceWithTextBox(this);
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
        _getTimesheet(moduleIdString).startStopTimer__MODULE_ID__(this);
    };

    statusTimedImg.id = "status_timed_img_" + taskId;
    statusTimedImg.className = "control";
    statusTimedImg.style.paddingLeft = "5px";
    statusTimedImg.src = "http://timesheetmod.googlecode.com/svn/trunk/images/start.png"
    statusTimedImg.alt = "Start At Time";
    statusTimedImg.onclick = function()
    {
        _getTimesheet(moduleIdString).startStopTimerAtTime__MODULE_ID__(this);
    };

    disableTd.id = "disable_td_" + taskId;
    disableTd.className = 'task_data change';

    var taskName = _getTimesheet().getTaskName__MODULE_ID__(taskId);

    handleDiv.innerHTML = "&nbsp;";
    nameDiv.innerHTML = taskName;
    var total = _getTimesheet().getTodaysEventData().getTotalForTask(taskId);
    if (total)
    {
        totalTimeSpan.innerHTML = getDurationDisplayString__MODULE_ID__(total.getDuration());
    }
    else
    {
        totalTimeSpan.innerHTML = getDurationDisplayString__MODULE_ID__();
    }
    disableTd.innerHTML =
    '<a href="javascript:disableTask__MODULE_ID__(' + taskId + ', true);" class="delbox stealImage"></a>';

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
            _getTimesheet(this.getModuleId()).submitNewTaskName();
        }
        else if (target.id.indexOf("rename_text_") != -1)
        {
            target.blur();
        }
        return true;
    }
}

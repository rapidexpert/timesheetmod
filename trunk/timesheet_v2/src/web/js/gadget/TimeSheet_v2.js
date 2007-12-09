function TimeSheet_v2(moduleId)
{
    this.setModuleId(moduleId);
    this.setMonthsEvents(new Array());
    this.setDisplay(new TimesheetDisplay(this, moduleId));
}

TimeSheet_v2.initialise = function(moduleId)
{
    TimeSheet_v2.MODULE_ID = moduleId;
    TimerEvent.MODULE_ID = moduleId;
    DateRecord.MODULE_ID = moduleId;
}

TimeSheet_v2.prototype._moduleId = null;
TimeSheet_v2.prototype._monthsEvents = null;
TimeSheet_v2.prototype._todaysEventData = null;
TimeSheet_v2.prototype._display = null;
TimeSheet_v2.prototype._currentEvent = null;
TimeSheet_v2.prototype._currentTimer = null;

TimeSheet_v2.prototype.getCurrentTimer = function()
{
    return this._currentTimer;
}
TimeSheet_v2.prototype.setCurrentTimer = function(currentTimer)
{
    this._currentTimer = currentTimer;
}
TimeSheet_v2.prototype.getCurrentEvent = function()
{
    return this._currentEvent;
}
TimeSheet_v2.prototype.setCurrentEvent = function(currentEvent)
{
    this._currentEvent = currentEvent;
}
TimeSheet_v2.prototype.getDisplay = function()
{
    return this._display;
}
TimeSheet_v2.prototype.setDisplay = function(display)
{
    this._display = display;
}
TimeSheet_v2.prototype.getModuleId = function()
{
    return this._moduleId;
}
TimeSheet_v2.prototype.setModuleId = function(moduleId)
{
    this._moduleId = moduleId;
}
TimeSheet_v2.prototype.getMonthsEvents = function()
{
    return this._monthsEvents;
}
TimeSheet_v2.prototype.setMonthsEvents = function(monthsEvents)
{
    this._monthsEvents = monthsEvents;
}
TimeSheet_v2.prototype.getTodaysEventData = function()
{
    return this._todaysEventData;
}
TimeSheet_v2.prototype.setTodaysEventData = function(todaysEventData)
{
    this._todaysEventData = todaysEventData;
}

TimeSheet_v2.prototype.getDateRecord = function(date, persistIfOutOfDate)
{
    var today = new Date();
    var currentDate = date.getDate();
    var monthsEvents = this.getMonthsEvents();
    var dateRecord = monthsEvents[currentDate];

    var correctedMonth = date.getMonth() + 1;
    if (!dateRecord || _pInt(dateRecord.getDate().getMonth()) != correctedMonth)
    {
        var existingDateRecordString = _getPrefString("event_data_" + currentDate, this.getModuleId());

        var existingDateRecord;
        if (existingDateRecordString && _trim(existingDateRecordString).length > 0)
        {
            existingDateRecord = new DateRecord();
            existingDateRecord.setDataFromString(existingDateRecordString);
        }

        if (existingDateRecord && existingDateRecord.getDate().getMonth() == correctedMonth)
        {
            dateRecord = existingDateRecord;
        }
        else
        {
            dateRecord = new DateRecord();
            var newDate = new BasicTime();
            newDate.setDataFromDate(date);
            dateRecord.setDate(newDate);
            monthsEvents[currentDate] = dateRecord;
            if (persistIfOutOfDate)
            {
                this.updateDateRecord(dateRecord);
            }
        }
    }

    var dateRecordDate = _pInt(dateRecord.getDate().getDate());
    var dateRecordMonth = _pInt(dateRecord.getDate().getMonth());
    if (dateRecordDate == today.getDate() && dateRecordMonth == (today.getMonth() + 1))
    {
        this.setTodaysEventData(dateRecord);
    }

    return dateRecord;
}

TimeSheet_v2.prototype.startStopTimer = function(source)
{
    var nameSplit = source.id.split("_");
    var taskId = parseInt(nameSplit[nameSplit.length - 1], 10);
    var currentTime = new Date();

    var immediateTimersButton;
    var timersButton;
    if (this.getCurrentEvent())
    {
        clearTimeout(this.getCurrentTimer());
        if (!this.getCurrentEvent().getEnd())
        {
            var endTime = new BasicTime();
            endTime.setDataFromDate(currentTime);
            this.getCurrentEvent().setEnd(endTime);
        }

        var oldTaskId = this.getCurrentEvent().getTask().getId();
        immediateTimersButton = _gel("status_immediate_img_" + oldTaskId);
        immediateTimersButton.src = "http://timesheetmod.googlecode.com/svn/trunk/images/start_immediate.png";
        immediateTimersButton.alt = "Start";

        timersButton = _gel("status_timed_img_" + oldTaskId);
        timersButton.src = "http://timesheetmod.googlecode.com/svn/trunk/images/start.png";
        timersButton.alt = "Start at Time";

        this.setPref("current_event", "");
        this.addNewEvent(this.getCurrentEvent());
        var timeSpan = _gel("total_time_span_" + oldTaskId);
        var currentTotalTimeSpan = _gel("current_task_total_time_span");
        var total = this.getTodaysEventData().getTotalForTask(oldTaskId);
        var totalDuration = total.getDuration();

        timeSpan.innerHTML = this.getDisplay().getDurationDisplayString(totalDuration);
        timeSpan.className = "";
        currentTotalTimeSpan.className = "";
        currentTotalTimeSpan.innerHTML = "None";

        _IG_Analytics("UA-2305736-1", "/timesheetmod/new_event");
    }

    if (!this.getCurrentEvent() || this.getCurrentEvent().getTask().getId() != taskId)
    {
        this.setCurrentEvent(new TimerEvent());
        var task = new Task();
        task.setId(taskId);

        var startTime = new BasicTime();
        startTime.setDataFromDate(currentTime);
        this.getCurrentEvent().setTask(task);
        this.getCurrentEvent().setStart(startTime);

        immediateTimersButton = _gel("status_immediate_img_" + taskId);
        immediateTimersButton.src = "http://timesheetmod.googlecode.com/svn/trunk/images/stop_immediate.png";
        immediateTimersButton.alt = "Stop";

        timersButton = _gel("status_timed_img_" + taskId);
        timersButton.src = "http://timesheetmod.googlecode.com/svn/trunk/images/stop.png";
        timersButton.alt = "Stop at Time";

        this.setPref("current_event", this.getCurrentEvent().toString());
        this.refreshCurrentTimer();
    }
    else
    {
        this.setCurrentEvent(null);
    }
}

TimeSheet_v2.prototype.refreshCurrentTimer = function()
{
    var currentEvent = this.getCurrentEvent();
    var taskId = currentEvent.getTask().getId();
    var currentTime = new Date();

    var timeSpan = _gel("total_time_span_" + taskId);
    var currentTotalTimeSpan = _gel("current_task_total_time_span");
    timeSpan.className = "currentTimer";
    currentTotalTimeSpan.className = "currentTimer";

    var endTime = new BasicTime();
    endTime.setDataFromDate(currentTime);
    currentEvent.setEnd(endTime);

    var eventDuration = currentEvent.getDuration();

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

    currentTotalTimeSpan.innerHTML = this.getDisplay().getDurationDisplayString(eventDuration);

    var currentEventEnd = currentEvent.getEnd();
    if (currentEvent.getStart().getDate() != currentEventEnd.getDate())
    {
        tempDuration.setHours(currentEventEnd.getHours());
        tempDuration.setMinutes(currentEventEnd.getMinutes());
        tempDuration.setSeconds(currentEventEnd.getSeconds());
    }

    timeSpan.innerHTML = this.getDisplay().getDurationDisplayString(tempDuration);

    // todo This may not work, may need to be a string.
    this.setCurrentTimer(setTimeout(this.refreshCurrentTimer, 1000));
}

TimeSheet_v2.prototype.updateDateRecord = function(dateRecord)
{
    var dayOfMonth = _pInt(dateRecord.getDate().getDate());
    this.setPref("event_data_" + dayOfMonth, dateRecord.toString());
}

TimeSheet_v2.prototype.submitNewTaskName = function()
{
    var newTaskName = _gel("new_task_name");
    var taskName = _trim(newTaskName.value);

    if (taskName.length == 0)
    {
        getDisplay().displayTimerMessage("Please enter a task name", 2);
        newTaskName.focus();
    }
    else
    {
        var taskId = this.getTaskId(taskName);
        this.setTaskName(taskId, taskName);

        if (this.isActiveTask(taskId))
        {
            getDisplay().displayTimerMessage("There is already an active task with that name, please enter another.", 5);
            newTaskName.focus();
        }
        else
        {
            this.closeAddTask();
            this.createNewTask(taskId, true);
        }
    }
}

TimeSheet_v2.prototype.getTaskName = function(taskId)
{
    var allTaskNames = this.getPrefArray("task_names");

    var name = null;

    if (allTaskNames)
    {
        name = allTaskNames[taskId];
    }

    return name;
}

TimeSheet_v2.prototype.addActiveTask = function(taskId)
{
    var prefName = "active_task_ids";
    var activeTaskIds = this.getPrefArray(prefName);

    if (!activeTaskIds)
    {
        activeTaskIds = new Array();
    }

    activeTaskIds[activeTaskIds.length] = "" + taskId;
    this.setPrefArray(prefName, activeTaskIds);
}

TimeSheet_v2.prototype.createNewTask = function(taskId, setActiveTaskData)
{
    getDisplay().displayNoTaskMessage(false);

    if (setActiveTaskData)
    {
        this.addActiveTask(taskId);
        _IG_Analytics("UA-2305736-1", "/timesheetmod/new_task_added");
    }

    getDisplay().displayNewTask(taskId);
}

TimeSheet_v2.prototype.isActiveTask = function(taskId)
{
    var activeTaskIds = this.getPrefArray("active_task_ids");

    var activeTask = false;

    if (activeTaskIds && activeTaskIds.length > 0)
    {
        var activeTaskLength = activeTaskIds.length;
        for (var i = 0; i < activeTaskLength && !activeTask; i++)
        {
            if (activeTaskIds[i] == taskId)
            {
                activeTask = true;
            }
        }
    }

    return activeTask;
}

TimeSheet_v2.prototype.setTaskName = function(taskId, taskName)
{
    var taskNamesPref = "task_names";
    var allTaskNames = this.getPrefArray(taskNamesPref);

    if (!allTaskNames)
    {
        allTaskNames = new Array();
    }

    allTaskNames[taskId] = taskName;
    this.setPrefArray(taskNamesPref, allTaskNames);
}

TimeSheet_v2.prototype.getTaskId = function(taskName)
{
    var allTaskNames = this.getPrefArray("task_names");
    var taskId = 0;

    if (allTaskNames)
    {
        var taskNamesLength = allTaskNames.length;
        for (; taskId < taskNamesLength; taskId++)
        {
            if (allTaskNames[taskId] == taskName)
            {
                allTaskNames[taskId] = taskName;
                break;
            }
        }
    }

    return taskId;
}

TimeSheet_v2.prototype.getPrefInt = function(prefName)
{
    return _getPrefInt(prefName, this.getModuleId());
}
TimeSheet_v2.prototype.getPrefString = function(prefName)
{
    return _getPrefString(prefName, this.getModuleId());
}
TimeSheet_v2.prototype.getPrefArray = function(prefName)
{
    return _getPrefArray(prefName, this.getModuleId());
}
TimeSheet_v2.prototype.setPref = function(prefName, prefValue)
{
    return _setPref(prefName, prefValue, this.getModuleId());
}
TimeSheet_v2.prototype.setPrefArray = function(prefName, prefValue)
{
    return _setPrefArray(prefName, prefValue, this.getModuleId());
}
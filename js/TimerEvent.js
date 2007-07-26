function TimerEvent()
{
}

TimerEvent.prototype._task = null;
TimerEvent.prototype._start = null;
TimerEvent.prototype._end = null;
TimerEvent.prototype._synced = null;
TimerEvent.prototype._multiEvent = null;
TimerEvent.prototype._eventId = null;
TimerEvent.prototype._nextEventId = null;

TimerEvent.prototype.getDuration = function()
{
    var start = this.getStart().toDate();
    var end = this.getEnd().toDate();

    start.setMilliseconds(0);
    end.setMilliseconds(0);

    var startMillis = start.getTime();
    var endMillis = end.getTime();

    var durationMillis = endMillis - startMillis;

    var seconds = durationMillis / 1000;

    var duration = new BasicTime();
    duration.addSeconds(seconds);
    return duration;
}

TimerEvent.prototype.setDataFromString = function(eventString, version)
{
    if (!version || version == 1)
    {
        var index = 0;
        var splitData = eventString.split(":");

        this.setTask(getTaskById(splitData[index++]));

        if (splitData.length == 4)
        {
            this.setSynced(splitData[index++] == 1);
        }

        var start = new BasicTime();
        start.setDataFromString(splitData[index++]);
        this.setStart(start);

        if (splitData.length == 4)
        {
            var end = new BasicTime();
            end.setDataFromString(splitData[index++]);
            this.setEnd(end);
        }
    }
    else if (version == 2)
    {
        var index = 0;
        var splitData = eventString.split(":");

        this.setTask(getTaskById(splitData[index++]));
        var start = new BasicTime();
        start.setDataFromString(splitData[index++]);
        this.setStart(start);

        if (splitData.length == 6)
        {
            var end = new BasicTime();
            end.setDataFromString(splitData[index++]);
            this.setEnd(end);
            this.setSynced(splitData[index++] == 1);
            this.setMultiEvent(splitData[index++] == 1);
            this.setEventId(splitData[index++]);
        }
    }
}

TimerEvent.prototype.toString = function()
{
    var eventString = '';
    eventString += this.getTask().getId();
    eventString += ":";
    var end = this.getEnd();
    if (!end)
    {
        eventString += this.getStart().toFullString();
    }
    else
    {
        eventString += this.getStart().toTimeString();
        eventString += ":";
        eventString += end.toTimeString();
        eventString += ":";
        eventString += (this.isSynced() ? "1" : "0");
        eventString += ":";
        eventString += (this.isMultiEvent() ? "1" : "0");
        eventString += ":";
        eventString += this.getEventId();
    }

    return eventString;
}

TimerEvent.prototype.splitDates = function()
{
    var events = new Array();
    var index = 0;
    var duration = this.getDuration();

    var startDate = this.getStart().toDate();
    var endDate = this.getEnd().toDate();

    var numberOfEvents = 1;
    while (startDate.getDate() != endDate.getDate())
    {
        numberOfEvents++;
        var time = startDate.getTime();
        time += 1000 * 60 * 60 * 24;
        startDate.setTime(time);        
    }

    if (this.getStart().getDate() != this.getEnd().getDate() || this.getStart().getMonth() != this.getEnd().getMonth())
    {
        var lastDate = null;
        var eventId = getNextEventId();

        for (; index < numberOfEvents; index++)
        {
            var newEvent = new TimerEvent();
            newEvent.setTask(this.getTask());
            newEvent.setSynced(this.isSynced());
            newEvent.setMultiEvent(true);
            newEvent.setEventId(eventId);

            var start;
            var end;
            var lastDateValue;
            if (index > 0 && (index + 1) != numberOfEvents)
            {
                lastDateValue = lastDate.getTime();
                lastDateValue += 1000 * 60 * 60 * 24;
                lastDate = new Date();
                lastDate.setTime(lastDateValue);

                start = new BasicTime();
                end = new BasicTime();
                start.setDataFromDate(lastDate);
                end.setDataFromDate(lastDate);

                start.setHours(0);
                start.setMinutes(0);
                start.setSeconds(0);
                end.setHours(23);
                end.setMinutes(59);
                end.setSeconds(59);

                newEvent.setStart(start);
                newEvent.setEnd(end);
            }
            else if (index + 1 == numberOfEvents)
            {
                lastDateValue = lastDate.getTime();
                lastDateValue += 1000 * 60 * 60 * 24;
                lastDate = new Date();
                lastDate.setTime(lastDateValue);

                start = new BasicTime();
                start.setDataFromDate(lastDate);

                start.setHours(0);
                start.setMinutes(0);
                start.setSeconds(0);

                newEvent.setStart(start);
                newEvent.setEnd(this.getEnd());
            }
            else
            {
                lastDate = this.getStart().toDate();

                end = new BasicTime();
                end.setDataFromDate(lastDate);
                end.setHours(23);
                end.setMinutes(59);
                end.setSeconds(59);

                newEvent.setStart(this.getStart());
                newEvent.setEnd(end);
            }

            events[index] = newEvent;
        }
    }
    else
    {
        events[index] = this;
    }

    return events;
}

TimerEvent.prototype.getTask = function()
{
    return this._task;
}
TimerEvent.prototype.setTask = function(task)
{
    this._task = task;
}
TimerEvent.prototype.getStart = function()
{
    return this._start;
}
TimerEvent.prototype.setStart = function(start)
{
    this._start = start;
}
TimerEvent.prototype.getEnd = function()
{
    return this._end;
}
TimerEvent.prototype.setEnd = function(end)
{
    this._end = end;
}
TimerEvent.prototype.isSynced = function()
{
    return this._synced;
}
TimerEvent.prototype.setSynced = function(synced)
{
    this._synced = synced;
}
TimerEvent.prototype.isMultiEvent = function()
{
    return this._multiEvent;
}
TimerEvent.prototype.setMultiEvent = function(multiEvent)
{
    this._multiEvent = multiEvent;
}
TimerEvent.prototype.getEventId = function()
{
    if (!this._eventId)
    {
        this._eventId = getNextEventId();
    }
    return this._eventId;
}
TimerEvent.prototype.setEventId = function(eventId)
{
    this._eventId = eventId;
}
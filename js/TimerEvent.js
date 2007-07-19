function TimerEvent()
{
}

TimerEvent.prototype._task = null;
TimerEvent.prototype._synced = null;
TimerEvent.prototype._start = null;
TimerEvent.prototype._end = null;

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
}

TimerEvent.prototype.toString = function()
{
    var eventString = '';
    eventString += this.getTask().getId();
    eventString += ":";
    var end = this.getEnd();
    if (end)
    {
        eventString += (this.isSynced() ? "1" : "0");
        eventString += ":";
        eventString += this.getStart().toTimeString();
        eventString += ":";
        eventString += end.toTimeString();
    }
    else
    {
        eventString += this.getStart().toFullString();
    }

    return eventString;
}

TimerEvent.prototype.splitDates = function()
{
    var events = new Array();
    var index = 0;
    var duration = this.getDuration();

    if (this.getStart().getDate() != this.getEnd().getDate() || this.getStart().getMonth() != this.getEnd().getMonth())
    {
        var durationHoursInt = eval(duration.getHours());
        var durationMinutesInt = eval(duration.getMinutes());
        var hours = durationHoursInt + (durationMinutesInt / 60);
        var numberOfEvents = Math.ceil(hours / 24);

        if (this.getStart().getHours() > this.getEnd().getHours())
        {
            numberOfEvents++;
        }

        var lastDate = null;

        for (; index < numberOfEvents; index++)
        {
            var newEvent = new TimerEvent();
            newEvent.setTask(this.getTask());
            newEvent.setSynced(this.isSynced());

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
TimerEvent.prototype.isSynced = function()
{
    return this._synced;
}
TimerEvent.prototype.setSynced = function(synced)
{
    this._synced = synced;
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
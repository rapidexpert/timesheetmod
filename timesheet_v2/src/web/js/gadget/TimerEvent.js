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
TimerEvent.prototype._dateRecord = null;

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
    if (!version || version == 2)
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
TimerEvent.prototype.setEventId = function(eventId)
{
    this._eventId = eventId;
}
TimerEvent.prototype.getDateRecord = function()
{
    return this._dateRecord;
}
TimerEvent.prototype.setDateRecord = function(dateRecord)
{
    this._dateRecord = dateRecord;
}
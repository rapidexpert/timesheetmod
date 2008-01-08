function DateRecord(moduleId)
{
    this._events = new Array();
    this._totals = new Array();
    this.setModuleId(moduleId);
}

DateRecord.prototype._date = null;
DateRecord.prototype._events = null;
DateRecord.prototype._totals = null;
DateRecord.prototype._moduleId = null;

DateRecord.prototype.setDataFromString = function(dataString, version)
{
    if (!version || version == 1 || version == 2)
    {
        var eventTotalSplit = dataString.split('!');

        var dateData = eventTotalSplit[0];
        var eventData = eventTotalSplit[1];
        var totalsData = eventTotalSplit[2];

        var recordDate = new BasicTime();
        recordDate.setDataFromString(dateData, version);
        this.setDate(recordDate);

        var eventSplit = eventData.split('|');
        var totalSplit = totalsData.split('|');

        var i;
        var eventSplitLength = eventSplit.length;
        for (i = 0; i < eventSplitLength; i++)
        {
            var eventString = eventSplit[i];
            if (eventString.length > 0)
            {
                var event = new TimerEvent(this.getModuleId());
                event.setDataFromString(eventString, version);
                var currentStart = event.getStart();
                var currentEnd = event.getEnd();

                currentStart.setDate(recordDate.getDate());
                currentStart.setMonth(recordDate.getMonth());
                currentStart.setYear(recordDate.getYear());
                if (currentEnd)
                {
                    currentEnd.setDate(recordDate.getDate());
                    currentEnd.setMonth(recordDate.getMonth());
                    currentEnd.setYear(recordDate.getYear());
                }
                this.addEvent(event);
            }
        }
        var totalSplitLength = totalSplit.length;
        for (i = 0; i < totalSplitLength; i++)
        {
            var totalString = totalSplit[i];
            if (totalString.length > 1)
            {
                var total = new Total();
                total.setDataFromString(totalString, version);
                this.addTotal(total);
            }
        }
    }
}

DateRecord.prototype.toString = function()
{
    var date = this.getDate();
    var totals = this.getTotals();
    var events = this.getEvents();

    var recordString = '';
    recordString += date.toFullString();

    recordString += "!";

    var i = 0;
    for (i = 0; i < events.length; i++)
    {
        var event = events[i];
        recordString += '|';
        recordString += event.toString();
        recordString += '|';
    }
    recordString += '!';
    for (i = 0; i < totals.length; i++)
    {
        var total = totals[i];
        recordString += '|';
        recordString += total.toString();
        recordString += '|';
    }

    return recordString;
}

DateRecord.prototype.addEvent = function(event)
{
    event.setDateRecord(this);
    var events = this.getEvents();
    events[events.length] = event;
}

DateRecord.prototype.addNewEvent = function(event)
{
    this.addEvent(event);

    var totals = this.getTotals();
    var totalAdded = false;

    var i = 0;
    var totalsLength = totals.length;
    var eventTaskId = event.getTask().getId();
    var eventDuration = event.getDuration();

    for (i = 0; i < totalsLength; i++)
    {
        var total = totals[i];

        if (total.getTask().getId() == eventTaskId)
        {
            var totalDuration = total.getDuration();
            totalDuration.addHours(eventDuration.getHours());
            totalDuration.addMinutes(eventDuration.getMinutes());
            totalDuration.addSeconds(eventDuration.getSeconds());
            totalAdded = true;
        }
    }

    if (!totalAdded)
    {
        var newTotal = new Total();
        newTotal.setTask(event.getTask());
        newTotal.setDuration(eventDuration);
        this.addTotal(newTotal);
    }
}

DateRecord.prototype.addTotal = function(total)
{
    var totals = this.getTotals();
    totals[totals.length] = total;
}

DateRecord.prototype.getTotalForTask = function(taskId)
{
    var totals = this.getTotals();
    var totalsLength = totals.length;
    for (var i = 0; i < totalsLength; i++)
    {
        var total = totals[i];

        if (total.getTask().getId() == taskId)
        {
            return total;
        }
    }
}

DateRecord.prototype.getTotals = function()
{
    return this._totals;
}
DateRecord.prototype.getEvents = function()
{
    return this._events;
}
DateRecord.prototype.getDate = function()
{
    return this._date;
}
DateRecord.prototype.setDate = function(date)
{
    this._date = date;
}
DateRecord.prototype.getModuleId = function()
{
    return this._moduleId;
}
DateRecord.prototype.setModuleId = function(moduleId)
{
    this._moduleId = moduleId;
}
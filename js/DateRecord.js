function DateRecord()
{
    this._events = new Array();
    this._totals = new Array();
}

DateRecord.prototype._date = null;
DateRecord.prototype._events = null;
DateRecord.prototype._totals = null;

DateRecord.prototype.setDataFromString = function(dataString, version)
{
    var errorDetected = false;
    if (!version || version == 1)
    {
        var eventTotalSplit = dataString.split('!');

        var dateData = eventTotalSplit[0];
        var eventData = eventTotalSplit[1];
        var totalsData = eventTotalSplit[2];

        this._date = new BasicTime();
        this._date.setDataFromString(dateData);

        var eventSplit = eventData.split('|');
        var totalSplit = totalsData.split('|');

        var i = 0;
        for (i = 0; i < eventSplit.length; i++)
        {
            var eventString = eventSplit[i];
            if (eventString.length > 0)
            {
                var event = new TimerEvent();
                event.setDataFromString(eventString);
                var currentStart = event.getStart();
                var currentEnd = event.getEnd();

                currentStart.setDate(this.getDate().getDate());
                currentStart.setMonth(this.getDate().getMonth());
                currentStart.setYear(this.getDate().getYear());
                if (currentEnd)
                {
                    currentEnd.setDate(this.getDate().getDate());
                    currentEnd.setMonth(this.getDate().getMonth());
                    currentEnd.setYear(this.getDate().getYear());
                    event.setDateRecord(this);
                    this.addNewEvent(event);
                }
                else
                {
                    errorDetected = true;
                }
            }
        }
        /*for (i = 0; i < totalSplit.length; i++)
        {
            var totalString = totalSplit[i];
            if (totalString.length > 1)
            {
                var total = new Total();
                total.setDataFromString(totalString);
                this.addTotal(total);
            }
        }*/
    }
    else if (version == 2)
    {
        var eventTotalSplit = dataString.split('!');

        var dateData = eventTotalSplit[0];
        var eventData = eventTotalSplit[1];
        var totalsData = eventTotalSplit[2];

        this._date = new BasicTime();
        this._date.setDataFromString(dateData, version);

        var eventSplit = eventData.split('|');
        var totalSplit = totalsData.split('|');

        var i = 0;
        for (i = 0; i < eventSplit.length; i++)
        {
            var eventString = eventSplit[i];
            if (eventString.length > 0)
            {
                var event = new TimerEvent();
                event.setDataFromString(eventString, version);
                var currentStart = event.getStart();
                var currentEnd = event.getEnd();

                currentStart.setDate(this.getDate().getDate());
                currentStart.setMonth(this.getDate().getMonth());
                currentStart.setYear(this.getDate().getYear());
                if (currentEnd)
                {
                    currentEnd.setDate(this.getDate().getDate());
                    currentEnd.setMonth(this.getDate().getMonth());
                    currentEnd.setYear(this.getDate().getYear());
                    this.addNewEvent(event);
                }
                else
                {
                    errorDetected = true;
                }
            }
        }
        /*for (i = 0; i < totalSplit.length; i++)
        {
            var totalString = totalSplit[i];
            if (totalString.length > 1)
            {
                var total = new Total();
                total.setDataFromString(totalString, version);
                this.addTotal(total);
            }
        }*/
    }
}

DateRecord.prototype.toString = function()
{
    var date = this._date;
    var totals = this._totals;
    var events = this._events;

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
    var events = this._events;
    events[events.length] = event;
}

DateRecord.prototype.addNewEvent = function(event)
{
    var events = this._events;
    var totals = this._totals;

    events[events.length] = event;

    var totalAdded = false;

    var i = 0;
    for (i = 0; i < totals.length; i++)
    {
        var total = totals[i];

        if (total.getTask().getId() == event.getTask().getId())
        {
            var totalDuration = total.getDuration();
            var eventDuration = event.getDuration();
            totalDuration.addHours(eventDuration.getHours());
            totalDuration.addMinutes(eventDuration.getMinutes());
            totalDuration.addSeconds(eventDuration.getSeconds());
            totalAdded = true;
        }
    }

    if (!totalAdded)
    {
        var total = new Total();
        total.setTask(event.getTask());
        var eventDuration = event.getDuration();
        total.setDuration(eventDuration);
        this.addTotal(total);
    }
}

DateRecord.prototype.addTotal = function(total)
{
    var totals = this._totals;
    totals[totals.length] = total;
}

DateRecord.prototype.getTotalForTask = function(taskId)
{
    var totals = this._totals;
    var i = 0;
    for (i = 0; i < totals.length; i++)
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

DateRecord.prototype.getDate = function()
{
    return this._date;
}
DateRecord.prototype.setDate = function(date)
{
    this._date = date;
}
DateRecord.prototype.getEvents = function()
{
    return this._events;
}
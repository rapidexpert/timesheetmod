function BasicTime()
{
}

BasicTime.prototype._year = null;
BasicTime.prototype._month = null;
BasicTime.prototype._date = null;
BasicTime.prototype._hours = null;
BasicTime.prototype._minutes = null;
BasicTime.prototype._seconds = null;

BasicTime.prototype.addHours = function(hours)
{
    this._hours = eval(this._hours) + eval(hours);
}

BasicTime.prototype.addMinutes = function(minutes)
{
    var tempMinutes = eval(this._minutes) + eval(minutes);
    var potentialHoursAddition = Math.floor(tempMinutes / 60);
    this.addHours(potentialHoursAddition);
    this._minutes = tempMinutes % 60;
}

BasicTime.prototype.addSeconds = function(seconds)
{
    var tempSeconds = eval(this._seconds) + eval(seconds);
    var potentialMinutesAddition = Math.floor(tempSeconds / 60);
    this.addMinutes(potentialMinutesAddition);
    this._seconds = tempSeconds % 60;
}

BasicTime.prototype.setDataFromDate = function(date)
{
    this._date = getFormattedNumber(date.getDate());
    this._month = getFormattedNumber(date.getMonth() + 1);
    this._year = getFormattedNumber(date.getYear());
    this._hours = getFormattedNumber(date.getHours());
    this._minutes = getFormattedNumber(date.getMinutes());
    this._seconds = getFormattedNumber(date.getSeconds());
}

BasicTime.prototype.setDataFromString = function(dateString, version)
{
    if (!version || version == 1)
    {
        var offset = 0;

        if (dateString.length == 10 || dateString.length == 12)
        {
            this._date = dateString.slice(0, 2);
            this._month = dateString.slice(2, 4);
            this._year = dateString.slice(4, 6);
            offset = 6;
        }
        this._hours = dateString.slice(offset, 2 + offset);
        this._minutes = dateString.slice(2 + offset, 4 + offset);

        if (dateString.length % 6 == 0)
        {
            this._seconds = dateString.slice(4 + offset, 6 + offset);
        }
    }
}

BasicTime.prototype.toFullString = function()
{
    var dateString = '';
    var date = this.getDate();

    if (date)
    {
        dateString += date;
        dateString += this.getMonth();
        dateString += this.getYear();
    }
    dateString += this.getHours();
    dateString += this.getMinutes();
    var seconds = this.getSeconds();
    if (seconds)
    {
        dateString += seconds;
    }

    return dateString;
}

BasicTime.prototype.toTimeString = function()
{
    var timeString = '';
    timeString += this.getHours();
    timeString += this.getMinutes();
    timeString += this.getSeconds();
    return timeString;
}

BasicTime.prototype.toDate = function()
{
    var currentDate = new Date();

    var date = this.getDate();

    if (date)
    {
        currentDate.setDate(eval(this.getDate()));
        currentDate.setMonth(eval(this.getMonth()) - 1);
        currentDate.setYear(eval("20" + this.getYear()));
    }
    currentDate.setHours(eval(this.getHours()), eval(this.getMinutes()), eval(this.getSeconds()), 0)
    return currentDate;
}

function getFormattedNumber(value, ignoreLargeNumbers)
{
    if (!value)
    {
        value = "00";
    }
    var stringValue = value.toString();
    if (stringValue.length == 1)
    {
        stringValue = "0" + stringValue;
    }
    else if (stringValue.length == 3 && !ignoreLargeNumbers)
    {
        stringValue = stringValue.slice(1);
    }
    else if (stringValue.length == 4 && !ignoreLargeNumbers)
    {
        stringValue = stringValue.slice(2);
    }
    return stringValue;
}

BasicTime.prototype.getYear = function()
{
    return this._year;
}
BasicTime.prototype.getMonth = function()
{
    return this._month;
}
BasicTime.prototype.getDate = function()
{
    return this._date;
}
BasicTime.prototype.getHours = function()
{
    return getFormattedNumber(this._hours, true);
}
BasicTime.prototype.setHours = function(hours)
{
    this._hours = hours;
}
BasicTime.prototype.getMinutes = function()
{
    return getFormattedNumber(this._minutes);
}
BasicTime.prototype.setMinutes = function(minutes)
{
    this._minutes = minutes;
}
BasicTime.prototype.getSeconds = function()
{
    return getFormattedNumber(this._seconds);
}
BasicTime.prototype.setSeconds = function(seconds)
{
    this._seconds = seconds;
}



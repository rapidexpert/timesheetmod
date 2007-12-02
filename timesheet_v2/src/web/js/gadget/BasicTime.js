function BasicTime()
{
    this._hours = 0;
    this._minutes = 0;
    this._seconds = 0;
}

BasicTime.prototype._year = null;
BasicTime.prototype._month = null;
BasicTime.prototype._date = null;
BasicTime.prototype._hours = null;
BasicTime.prototype._minutes = null;
BasicTime.prototype._seconds = null;

BasicTime.prototype.addHours = function(hours)
{
    this.setHours(_pInt(this.getHours()) + _pInt(hours));
}

BasicTime.prototype.addMinutes = function(minutes)
{
    var tempMinutes = _pInt(this.getMinutes()) + _pInt(minutes);
    var potentialHoursAddition = Math.floor(tempMinutes / 60);
    this.addHours(potentialHoursAddition);
    this.setMinutes(tempMinutes % 60);
}

BasicTime.prototype.addSeconds = function(seconds)
{
    var tempSeconds = _pInt(this.getSeconds()) + _pInt(seconds);
    var potentialMinutesAddition = Math.floor(tempSeconds / 60);
    this.addMinutes(potentialMinutesAddition);
    this.setSeconds(tempSeconds % 60);
}

BasicTime.prototype.setDataFromDate = function(date)
{
    this.setDate(_getFormattedNumber(date.getDate()));
    this.setMonth(_getFormattedNumber(date.getMonth() + 1));
    this.setYear(_getFormattedNumber(date.getYear()));
    this.setHours(_getFormattedNumber(date.getHours()));
    this.setMinutes(_getFormattedNumber(date.getMinutes()));
    this.setSeconds(_getFormattedNumber(date.getSeconds()));
}

BasicTime.prototype.setDataFromString = function(dateString, version)
{
    if (!version || version == 1 || version == 2)
    {
        var offset = 0;

        if (dateString.length == 10 || dateString.length == 12)
        {
            this.setDate(dateString.slice(0, 2));
            this.setMonth(dateString.slice(2, 4));
            this.setYear(dateString.slice(4, 6));
            offset = 6;
        }
        this.setHours(dateString.slice(offset, 2 + offset));
        this.setMinutes(dateString.slice(2 + offset, 4 + offset));

        if (dateString.length % 6 == 0)
        {
            this.setSeconds(dateString.slice(4 + offset, 6 + offset));
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
        currentDate.setDate(_pInt(date));
        currentDate.setMonth(_pInt(this.getMonth()) - 1);
        currentDate.setYear(_pInt("20" + this.getYear()));
    }
    currentDate.setHours(_pInt(this.getHours()), _pInt(this.getMinutes()), _pInt(this.getSeconds()), 0)
    return currentDate;
}

BasicTime.prototype.getYear = function()
{
    return this._year;
}
BasicTime.prototype.setYear = function(year)
{
    this._year = year;
}
BasicTime.prototype.getMonth = function()
{
    return this._month;
}
BasicTime.prototype.setMonth = function(month)
{
    this._month = month;
}
BasicTime.prototype.getDate = function()
{
    return this._date;
}
BasicTime.prototype.setDate = function(date)
{
    this._date = date;
}
BasicTime.prototype.getHours = function()
{
    return _getFormattedNumber(this._hours, true);
}
BasicTime.prototype.setHours = function(hours)
{
    this._hours = hours;
}
BasicTime.prototype.getMinutes = function()
{
    return _getFormattedNumber(this._minutes);
}
BasicTime.prototype.setMinutes = function(minutes)
{
    this._minutes = minutes;
}
BasicTime.prototype.getSeconds = function()
{
    return _getFormattedNumber(this._seconds);
}
BasicTime.prototype.setSeconds = function(seconds)
{
    this._seconds = seconds;
}



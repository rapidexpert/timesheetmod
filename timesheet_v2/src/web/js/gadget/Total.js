function Total()
{
}

Total.prototype._task = null;
Total.prototype._duration = null;

Total.prototype.setDataFromString = function(totalString, version)
{
    if (!version || version == 1 || version == 2)
    {
        var splitData = totalString.split(":");

        this.setTask(getTaskById(splitData[0]));

        var duration = new BasicTime();
        duration.setDataFromString(splitData[1]);
        this.setDuration(duration);
    }
}

Total.prototype.toString = function()
{
    var eventString = '';
    eventString += this.getTask().getId();
    eventString += ":";
    eventString += this.getDuration().toTimeString();

    return eventString;
}

Total.prototype.getTask = function()
{
    return this._task;
}
Total.prototype.setTask = function(task)
{
    this._task = task;
}
Total.prototype.getDuration = function()
{
    return this._duration;
}
Total.prototype.setDuration = function(start)
{
    this._duration = start;
}
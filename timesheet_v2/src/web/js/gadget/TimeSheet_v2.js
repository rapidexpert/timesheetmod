function TimeSheet_v2()
{
}

TimeSheet_v2.initialise = function(moduleId)
{
    TimeSheet_v2.MODULE_ID = moduleId;
    TimerEvent.MODULE_ID = moduleId;
}

TimeSheet_v2.MODULE_ID = null;

TimeSheet_v2.prototype.captureKeys = function(ev)
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
            submitNewTaskName();
        }
        else if (target.id.indexOf("rename_text_") != -1)
        {
            target.blur();
        }
        return true;
    }
}

TimeSheet_v2.prototype.getPrefInt = function(prefName)
{
    return _getPrefInt(prefName, TimeSheet_v2.MODULE_ID);
}
TimeSheet_v2.prototype.getPrefString = function(prefName)
{
    return _getPrefString(prefName, TimeSheet_v2.MODULE_ID);
}
TimeSheet_v2.prototype.setPref = function(prefName, prefValue)
{
    return _setPref(prefName, prefValue, TimeSheet_v2.MODULE_ID);
}
function _pInt(intValue)
{
    return parseInt(intValue, 10);
}

function _getFormattedNumber(value, ignoreLargeNumbers)
{
    if (!value)
    {
        value = '00';
    }
    var stringValue = value.toString();
    var stringLength = stringValue.length;
    if (stringLength == 1)
    {
        stringValue = '0' + stringValue;
    }
    else if (stringLength > 2 && !ignoreLargeNumbers)
    {
        stringValue = stringValue.slice(stringLength - 2);
    }
    return stringValue;
}

function _getTaskById(taskId)
{
    var task = new Task();
    task.setId(taskId);
    return task;
}

function _getPrefInt(prefName, moduleId)
{
    var prefs = new _IG_Prefs(moduleId);
    return prefs.getInt(prefName);
}
function _getPrefString(prefName, moduleId)
{
    var prefs = new _IG_Prefs(moduleId);
    return prefs.getString(prefName);
}
function _setPref(prefName, prefValue, moduleId)
{
    var prefs = new _IG_Prefs(moduleId);
    prefs.set(prefName, prefValue);
}
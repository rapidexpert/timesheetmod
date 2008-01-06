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

function _getPrefArray(prefName, moduleId)
{
    var arrayData = _getPrefString(prefName, moduleId);

    if (arrayData && _trim(arrayData).length > 0)
    {
        return arrayData.split("|");
    }
    else
    {
        return null;
    }
}

function _setPref(prefName, prefValue, moduleId)
{
    var prefs = new _IG_Prefs(moduleId);
    prefs.set(prefName, prefValue);
}

function _setPrefArray(prefName, arrayData, moduleId)
{
    _setPref(prefName, arrayData.join("|"), moduleId);
}

function _getTimesheetForModuleId(moduleId)
{
    return eval("timesheetv2_" + moduleId);
}

function _getTimesheetForElement(element)
{
    var elementId = element.id;
    var splitId = elementId.split("_");
    return _getTimesheetForModuleId(splitId[0]);
}

function _getElementId(element, moduleId)
{
    return moduleId + "_" + element;
}
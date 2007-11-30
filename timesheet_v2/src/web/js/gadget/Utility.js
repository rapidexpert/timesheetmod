function _pInt(intValue)
{
    return parseInt(intValue, 10);
}

function getFormattedNumber(value, ignoreLargeNumbers)
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

function getTaskById(taskId)
{
    var task = new Task();
    task.setId(taskId);
    return task;
}
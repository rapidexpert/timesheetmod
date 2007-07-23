var globalModuleId = null;

function _IG_Tabs(moduleId, defaultTab)
{
    var tabDiv = document.createElement("div");
    var tabs = document.createElement("div");
    var tabContent = document.createElement("div");
    globalModuleId = moduleId;
    tabDiv.id = "tabs";
    tabs.id = "tabHeader";
    tabContent.id = "tabContent";

    var bodyContent = _gel("body");
    
    bodyContent.appendChild(tabDiv);
    tabDiv.appendChild(tabs);
    tabDiv.appendChild(tabContent);
}

_IG_Tabs.prototype.addTab = function(name, divId, functionToCall)
{
    var contentDiv = _gel(divId);
    contentDiv.style.display="block";
    contentDiv.style.clear="both";
    var tabHeader = _gel("tabHeader");
    var newTab = document.createElement("div");
    var newTabContent = document.createElement("span");
    newTab.className = "tab unselectedtab";
    newTabContent.innerHTML = name;
    newTabContent.onclick = function()
{
        showTab(divId, functionToCall);
    }
    newTab.appendChild(newTabContent);
    tabHeader.appendChild(newTab);
}

var currentSelectedTab = null;

function showTab(divId, functionToCall)
{
    /*if (currentSelectedTab)
    {
        currentSelectedTab.style.display = "none";
        currentSelectedTab.style.visibility = "hidden";
    }

    var divToShow = _gel(divId);
    divToShow.style.display = "block";
    divToShow.style.visibility = "visible";
    currentSelectedTab = divToShow;*/
    if (functionToCall)
    {
        functionToCall();
    }
}

_IG_Tabs.prototype.alignTabs = function(alignment, offset)
{

}

function _IG_Prefs()
{
}

function _IG_RegisterOnloadHandler(functionObject)
{
    functionObject();
}

_IG_Prefs.prototype.getString = function(name)
{
    var element = document.getElementById(name);

    if (element)
    {
        return element.innerHTML;
    }
}

_IG_Prefs.prototype.getInt = function(name)
{
    var element = document.getElementById(name);

    if (element)
    {
        return eval(element.innerHTML);
    }
    else
    {
        return 0;
    }
}

_IG_Prefs.prototype.set = function(name, value)
{
    var element = document.getElementById(name);

    if (element)
    {
        element.innerHTML = value;
    }
    else
    {
        var dataDiv = document.getElementById("dataDiv");
        var lineBreak = document.createElement("br");
        var newDataHeading = document.createElement("span");
        newDataHeading.id = name + "_heading";
        newDataHeading.innerHTML = name + " - ";
        var newDataValue = document.createElement("span");
        newDataValue.id = name;
        newDataValue.innerHTML = value;

        dataDiv.appendChild(lineBreak);
        dataDiv.appendChild(newDataHeading);
        dataDiv.appendChild(newDataValue);
    }
}

_IG_Prefs.prototype.getArray = function(name)
{
    var element = document.getElementById(name);

    if (element)
    {
        var arrayContents = element.innerHTML;

        var array = arrayContents.split('|');
        var trimmedArray = new Array();

        for (var i = 0; i < array.length; i++)
        {
            var trimmedX = _trim(array[i]);
            if (trimmedX.length > 0)
            {
                trimmedArray[i] = trimmedX;
            }
        }

        return trimmedArray;
    }
}

_IG_Prefs.prototype.setArray = function(name, values)
{
    var element = document.getElementById(name);

    var value = '';

    for (var i = 0; i < values.length; i++)
    {
        value += values[i];
        value += '|';
    }

    value = value.slice(0, value.length - 1);

    if (element)
    {
        element.innerHTML = value;
    }
    else
    {
        var dataDiv = document.getElementById("dataDiv");
        var lineBreak = document.createElement("br");
        var newDataHeading = document.createElement("span");
        newDataHeading.id = name + "_heading";
        newDataHeading.innerHTML = name + " - ";
        var newDataValue = document.createElement("span");
        newDataValue.id = name;
        newDataValue.innerHTML = value;

        dataDiv.appendChild(lineBreak);
        dataDiv.appendChild(newDataHeading);
        dataDiv.appendChild(newDataValue);
    }
}

var __MODULE_ID__ = "TESTING";

function _trim(a)
{
    return a.replace(/^\s*|\s*$/g, "")
}

_IG_MiniMessage.prototype.opt_container = null;

function _IG_MiniMessage(moduleId, opt_container)
{
    this.opt_container = opt_container;
}

_IG_MiniMessage.prototype.createTimerMessage = function(msg, seconds, opt_callback)
{
    this.opt_container.innerHTML = msg;
    setTimeout("clearMsg('" + this.opt_container.id + "')", seconds * 1000);
}

function clearMsg(opt_container_id)
{
    var opt_container = _gel(opt_container_id);
    opt_container.innerHTML = "&nbsp;";
}

function _gel(id)
{
    return document.getElementById(id);
}
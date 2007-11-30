function Task()
{
}

Task.prototype._id = null;
Task.prototype._name = null;

Task.prototype.getId = function()
{
    return this._id;
}
Task.prototype.setId = function(id)
{
    this._id = id;
}

Task.prototype.getName = function()
{
    return this._name;
}
Task.prototype.setName = function(name)
{
    this._name = name;
}
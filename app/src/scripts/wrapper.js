
console.log("implemented!");

Array.prototype.toClrArray = function () {
    var clrArray = host.newArr(this.length);
    for (let index = 0; index < this.length; index++) {
        const element = this[index];
        clrArray[index] = element;
    }
    return clrArray;
}

Array.prototype.toClrArray = function (type) {
    var clrArray = host.newArr(type, this.length);
    for (let index = 0; index < this.length; index++) {
        const element = this[index];
        clrArray[index] = element;
    }
    return clrArray;
}

String.prototype.toKeys = function () {
    return toKeys(this.toString());
}

function down(keyName, wait1) {
    const key = keyName.toKeys();
    _globals.Down(key, wait1, wait1);
}

function up(keyName, wait) {
    const key = keyName.toKeys();
    _globals.Up(key, wait);
}

function tap(keyName, wait1, wait2) {
    const key = keyName.toKeys();
    _globals.Tap(key, wait1, wait2);
}

function upAll(excludeKeyNames) {
    if (excludeKeyNames) {
        const excludeKeys = excludeKeyNames.map(name => name.toKeys()).toClrArray(clr.KeyToKey.Enums.Keys);
        _globals.Key.UpAll(excludeKeys);
    }
}
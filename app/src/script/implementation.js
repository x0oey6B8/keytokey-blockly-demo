
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

/*
    値関連
*/

function getRandomPoint(x_from, x_to, y_from, y_to) {
    if (x_from > x_to) {
        throw new Error(`不正な値（${x_from}～${x_to}）が指定されています。左辺の値は右辺より小さくしてください。`);
    }

    if (y_from > y_to) {
        throw new Error(`不正な値（${x_from}～${x_to}）が指定されています。左辺の値は右辺より小さくしてください。`);
    }

    return {
        x: _globals.Random(x_from, x_to),
        y: _globals.Random(y_from, y_to),
    }
}

function newPoint(x, y) {
    return { x, y };
}

/*
    待機
*/

function wait(time, unit, mode = "HIGH_PRECISION") {
    if (mode === "HIGH_PRECISION") {
        const waiter = _globals.CreateWaiter(true);
        return waiter.Wait(time);
    } else {
        return _globals.Wait(time);
    }
}

/*
    変数
*/

function getGlobalVariable(name) {

}

function setValueToGlobalVariable(name) {

}

/*
    トリガー
*/

const trigger = {
    isPressed: function () {
        return _globals.Trigger.IsPressed;
    },
    isNotPressed: function () {
        return !_globals.Trigger.IsPressed;
    }
}

/*
    キーボード／マウス
*/

function down(keyName, wait) {
    const key = keyName.toKeys();
    _globals.Down(key, wait);
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

const mouse = {
    setOriginPoint: function (point) {
        _globals.MoveMethodOptions.SetOrigin(point.x, point.y);
    },
    setRandomOffsetRange: function (x, y) {
        _globals.MoveMethodOptions.SetRandomOffsetRange(x, y);
    },
    moveTo: function (point) {
        _globals.Move(point.x, point.y);
    },
    moveTo: function (point, speed) {
        const option = this.getStepsAndWait(speed);
        _globals.MoveWithSteps(point.x, point.y, option.maxSteps, option.wait);
    },
    moveRelTo: function (point) {
        _globals.Offset(point.x, point.y);
    },
    moveRelTo: function (delta, speed) {
        const option = this.getStepsAndWait(speed);
        _globals.OffsetWithSteps(delta.x, delta.y, option.maxSteps, option.wait);
    },
    getStepsAndWait: function (speedText) {
        let maxSteps = 150;
        let wait = 15;

        if (speedText == "FASTEST") {
            maxSteps = 30;
            wait = 5;
        } else if (speedText == "FAST") {
            maxSteps = 100;
            wait = 10;
        } else if (speedText == "SLOW") {
            maxSteps = 200;
            wait = 20;
        } else if (speedText == "SLOWEST") {
            maxSteps = 300
            wait = 25;
        }

        return { maxSteps, wait }
    },
    getPoint: function () {
        const p = _globals.GetCursorPosition();
        return { x: p.Item1, y: p.Item2 };
    },
}
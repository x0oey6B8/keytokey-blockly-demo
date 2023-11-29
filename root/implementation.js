
/*
    Utilities
*/

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

String.prototype.toClrKeys = function () {
    return toKeys(this.toString());
}

String.prototype.toClrControllerButtons = function () {
    const type = host.typeOf(clr.KeyToKey.Enums.ControllerButtons);
    const v = toEnum(type, this.toString());
    return v;
}

String.prototype.isPressed = function () {
    const key = this.toString().toClrKeys();
    return _globals.Key.Find(key).IsPressed;
}

String.prototype.isPressedPhysically = function () {
    const key = this.toString().toClrKeys();
    return _globals.Key.Find(key).IsPressedPhysically;
}

function newBounds(left, top, width, height) {
    return new clr.KeyToKey.Plugins.Bounds(left, top, width, height);
}

function newPoint(x, y) {
    return { x, y };
}

/*
    デバッグ用
*/
function checkPoint(blockId) {
    //console.log(`${blockId}`);
}

/*
    値関連
*/

function randomPoint(x_from, x_to, y_from, y_to) {
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

/*
    待機
*/

function wait(time, unit) {
    const waiter = _globals.CreateWaiter(false);
    const t = calcTime(time, unit);
    waiter.Wait(t);
}

function h_wait(time) {
    const waiter = _globals.CreateWaiter(true);
    waiter.Wait(time);
}

function calcTime(time, unit) {
    switch (unit) {
        case "SECONDS": return time * 1000;
        case "MINUTES": return time * 1000 * 60;
        case "HOURS": return time * 1000 * 60 * 60;
        default: return time;
    }
}

function waitForInput(keyName) {
    return _globals.WaitForInput(keyName.toClrKeys(), true);
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

function down(keyName) {
    const key = keyName.toClrKeys();
    return _globals.Key.Find(key).Down();
}

function up(keyName) {
    const key = keyName.toClrKeys();
    return _globals.Key.Find(key).Up();
}
function tap(keyName, wait1, wait2) {
    const key = keyName.toClrKeys();
    return _globals.Key.Find(key).Tap(wait1, wait2);
}

function inputText(text, interval) {
    _globals.InputText(text, interval);
}

function replay(path) {
    _globals.Replay(path);
}

/*
    v = {
        // array of key name
        excludedKeys: string[]
    }
*/
function upAllKeys(v) {
    if (v.excludedKeys) {
        const excludedKeys = v.excludedKeys.map(name => name.toClrKeys()).toClrArray(clr.KeyToKey.Enums.Keys);
        _globals.Key.UpAll(excludedKeys);
    }
}

const mouse = {
    setOriginPoint: function (point) {
        _globals.MoveMethodOptions.SetOrigin(point.x, point.y);
    },
    setRandomOffsetRange: function (x, y) {
        _globals.MoveMethodOptions.SetRandomOffsetRange(x, y);
    },
    moveTo: function (point, speed) {
        if (!speed) {
            _globals.Move(point.x, point.y, 0);
            return;
        } else {
            const option = this.getStepsAndWait(speed);
            _globals.MoveWithSteps(point.x, point.y, option.maxSteps, option.wait);
        }
    },
    relMoveTo: function (delta, speed) {
        if (!speed) {
            _globals.Offset(delta.x, delta.y);
            return;
        } else {
            const option = this.getStepsAndWait(speed);
            _globals.OffsetWithSteps(delta.x, delta.y, option.maxSteps, option.wait);
        }
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
            maxSteps = 300;
            wait = 25;
        } else if (speedText == "SLOWEST") {
            maxSteps = 300
            wait = 45;
        }
        return { maxSteps, wait }
    },
    getPoint: function () {
        const p = _globals.GetCursorPosition();
        return { x: p.Item1, y: p.Item2 };
    },
    vscroll(delta) {
        if (delta > 0) {
            _globals.WheelDown(delta);
        } else {
            _globals.WheelUp(delta);
        }
    },
    hscroll(delta) {
        if (delta > 0) {
            _globals.WheelRight(delta);
        } else {
            _globals.WheelLeft(delta);
        }
    }
}

const controller = {
    waitForInput(name) {
        const button = name.toClrControllerButtons();
        return _globals.WaitForInput(button, true);
    }
}

/*
    画像認識
*/

const templateMatching = {
    matchById: (identifier) => {
        let clrMatchResult = host.newVar(clr.KeyToKey.Plugins.MatchResult);
        const isMatched = _globals.Match(identifier, clrMatchResult.out);
        const templateMatchingResult = TemplateMatchingResultConverter.convertResult(clrMatchResult, isMatched);
        return templateMatchingResult;
    },
    matchesById: (identifier) => {
        const t = Enumerable.Empty(MatchResult);
        let clrResultCollection = host.newVar(t);
        const isMatched = _globals.Matches(identifier, clrResultCollection.out);
        const result = TemplateMatchingResultConverter.convertResults(identifier, isMatched, clrResultCollection.ToList());
        return result;
    }
}


/*
    ウィンドウ
*/

function getActiveWindow() {
    return new WindowInterface(_globals.ActiveWindow.Handle);
}

function getWindowUnderMouse() {
    return new WindowInterface(_globals.WindowUnderCursor.Handle);
}

function createWindow(windowHandle) {
    const wHnd = new IntPtr(windowHandle);
    const wi = new WindowInterface(wHnd);
    return wi;
}

function findWindow(condition) {

    if (condition.titleContains) {
        var window = _globals.FindWindowTitleContains(condition.titleContains);
        return new WindowInterface(window.Handle);
    }

    if (condition.titleStartsWith) {
        var window = _globals.FindWindowTitleContains(condition.titleStartsWith);
        return new WindowInterface(window.Handle);
    }

    if (condition.titleEndsWith) {
        var window = _globals.FindWindowTitleContains(condition.titleEndsWith);
        return new WindowInterface(window.Handle);
    }

    if (!condition.title) {
        condition.title = "";
    }
    if (!condition.className) {
        condition.className = "";
    }
    if (condition.parentWindow) {
        var window = _globals.FindWindow(condition.parentWindow, condition.className);
        return new WindowInterface(window.Handle);
    } else {
        var window = _globals.FindWindow(condition.title, condition.className);
        return new WindowInterface(window.Handle);
    }
}

class WindowInterface {

    constructor(windowHandle) {
        this.window = _globals.MakeWindowController(windowHandle);
    }

    focus() {
        this.window.Activate();
    }

    dump() {
        this.window.Dump();
    }

    get handle() {
        return this.window.Handle.ToInt32();
    }

    get parent() {
        return new WindowInterface(this.window.Parent.Handle);
    }

    get className() {
        return this.window.ClassName;
    }

    get exists() {
        return this.window.Exists;
    }

    get isVisible() {
        return this.window.IsWindowVisible;
    }

    // point
    get point() {
        const b = this.window.Bounds;
        const x = b.Left;
        const y = b.Top;
        return { x, y };
    }
    set point(newPoint) {
        const b = this.window.Bounds;
        this.window.Bounds = newBounds(newPoint.x, newPoint.y, b.Width, b.Height);
    }

    // size
    get size() {
        const b = this.window.Bounds;
        const width = b.Width;
        const height = b.Height;
        return { width, height };
    }
    set size(newSize) {
        const b = this.window.Bounds;
        this.window.Bounds = newBounds(b.Left, b.Top, newSize.width, newSize.height);
    }

    // client size
    get clientSize() {
        const b = this.window.ClientBounds;
        const width = b.Width;
        const height = b.Height;
        return { width, height };
    }

    // title
    get title() {
        return this.window.Title;
    }
    set title(newTitle) {
        this.window.Title = newTitle;
    }

    // text
    get text() {
        return this.window.Text;
    }
    set text(newText) {
        this.window.Text = newText;
    }

    // process name
    get processName() {
        return this.window.ProcessName;
    }

    // process id
    get processId() {
        return this.window.ProcessId;
    }

    // always on top
    get alwaysOnTop() {
        return this.window.AlwaysOnTop;
    }
    set alwaysOnTop(newValue) {
        this.window.AlwaysOnTop = newValue;
    }

    // childWindows
    get childWindows() {
        const clrChildWindows = this.window.ChildWindows;
        const childWindows = [];
        for (let index = 0; index < clrChildWindows.Count; index++) {
            const childWindow = clrChildWindows[index];
            const wi = new WindowInterface(childWindow.Handle);
            childWindows.push(wi);
        }
        return childWindows;
    }
}

class TemplateMatchingResultConverter {
    static convertResult = (clrMatchResult, isMatched) => {
        const foundImage = new FoundImage(clrMatchResult.FoundBounds, clrMatchResult.Score);
        const identifier = clrMatchResult.Config.Identifier;
        const result = new TemplateMatchingResult(identifier, isMatched, [foundImage]);
        return result;
    }
    static convertResults = (identifier, isMatched, clrMatchResultList) => {
        const foundImages = [];
        for (let index = 0; index < clrMatchResultList.Count; index++) {
            const clrResult = clrMatchResultList[index];
            const result = new FoundImage(clrResult.FoundBounds, clrResult.Score);
            foundImages.push(result);
        }
        const result = new TemplateMatchingResult(identifier, isMatched, foundImages);
        return result;
    }
}

class TemplateMatchingResult {

    _result;

    constructor(identifier, isMatched, foundImages) {

        const isSuccess = isMatched;
        const isNotSuccess = !isMatched;

        if (foundImages.length < 1) {
            const bounds = new clr.KeyToKey.Plugins.Bounds(0, 0, 1, 1);
            foundImages.push(new FoundImage(bounds, 0));
        }

        this._result = {
            isSuccess,
            isNotSucess: isNotSuccess,
            identifier,
            foundImages,
            foundImage: foundImages[0],
        };
    }

    get foundImage() {
        return this._result.foundImage;
    }

    get foundImages() {
        return this._result.foundImages;
    }

    get isSuccess() {
        return this._result.isSuccess;
    }

    get isNotSuccess() {
        return this._result.isNotSucess;
    }
}

class FoundImage {
    _score;
    _centerPoint;
    _topLeftPoint;
    _bottomRightPoint;

    constructor(clrBounds, score) {
        this._score = score;
        this._centerPoint = { x: clrBounds.CenterX, y: clrBounds.CenterY };
        this._topLeftPoint = { x: clrBounds.Left, y: clrBounds.Top };
        this._bottomRightPoint = { x: clrBounds.Right, y: clrBounds.Bottom };
    }

    get score() {
        return this._score;
    }

    get point() {
        return this._centerPoint;
    }

    get topLeftPoint() {
        return this._topLeftPoint;
    }

    get bottomRightPoint() {
        return this._bottomRightPoint;
    }
}
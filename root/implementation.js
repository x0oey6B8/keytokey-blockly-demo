class Debug {

    static Default = new Debug();

    checkPoint(blockId) {
        //console.log(`${blockId}`);
    }
}

class Utilities {

    static Default = new Utilities();

    newBounds(left, top, width, height) {
        return new clr.KeyToKey.Plugins.Bounds(left, top, width, height);
    }

    newPoint(x, y) {
        return { x, y };
    }

    newSize(width, height) {
        return { width, height }
    }

    randomPoint(x_from, x_to, y_from, y_to) {
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

    toClrArray(type) {
        var clrArray = host.newArr(type, this.length);
        for (let index = 0; index < this.length; index++) {
            const element = this[index];
            clrArray[index] = element;
        }
        return clrArray;
    }

    toClrKeys() {
        return toKeys(this.toString());
    }

    toClrControllerButtons() {
        const type = host.typeOf(clr.KeyToKey.Enums.ControllerButtons);
        const v = toEnum(type, this.toString());
        return v;
    }

    toClrIMEConversionMode() {
        const type = host.typeOf(clr.KeyToKey.Enums.IMEConversionModes);
        const v = toEnum(type, this.toString());
        return v;
    }
}

class Bounds {

    _clrBounds;

    constructor(clrBounds) {
        this._clrBounds = clrBounds;
    }

    get left() {
        return this._clrBounds.Left;
    }

    get top() {
        return this._clrBounds.Top;
    }

    get width() {
        return this._clrBounds.Width;
    }

    get height() {
        return this._clrBounds.Height;
    }

    get source() {
        return this._clrBounds;
    }
}

class Variables {
    getGlobalVariable = (name) => {

    }

    setValueToGlobalVariable = (name) => {

    }
}


class Wait {
    static Default = new Wait();

    wait = (ms_time, unit) => {
        const waiter = _globals.CreateWaiter(false);
        const t = this.calcTime(ms_time, unit);
        waiter.Wait(t);
    }

    h_wait = (ms_time) => {
        const waiter = _globals.CreateWaiter(true);
        waiter.Wait(ms_time);
    }

    calcTime = (ms_time, unit) => {
        switch (unit) {
            case "SECONDS": return ms_time * 1000;
            case "MINUTES": return ms_time * 1000 * 60;
            case "HOURS": return ms_time * 1000 * 60 * 60;
            default: return ms_time;
        }
    }

    waitForInput = (keyName) => {
        return _globals.WaitForInput(keyName.toClrKeys(), true);
    }

    waitForController = (controllerButtonName) => {
        const button = controllerButtonName.toClrControllerButtons();
        return _globals.WaitForInput(button, true);
    }
}


class Window {

    static Default = new Window();

    get activeWindow() {
        return new WindowInterface(_globals.ActiveWindow.Handle);
    }

    get windowUnderMouse() {
        return new WindowInterface(_globals.WindowUnderCursor.Handle);
    }

    createWindowById = (id_in32) => {
        const wHnd = new IntPtr(id_in32);
        const wi = new WindowInterface(wHnd);
        return wi;
    }

    findWindow = (condition) => {
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
}


class TemplateMatching {
    matchById = (identifier) => {
        let clrMatchResult = host.newVar(clr.KeyToKey.Plugins.MatchResult);
        const isMatched = _globals.Match(identifier, clrMatchResult.out);
        const templateMatchingResult = TemplateMatchingResultConverter.convertResult(clrMatchResult, isMatched);
        return templateMatchingResult;
    }
    matchesById = (identifier) => {
        const t = Enumerable.Empty(MatchResult);
        let clrResultCollection = host.newVar(t);
        const isMatched = _globals.Matches(identifier, clrResultCollection.out);
        const result = TemplateMatchingResultConverter.convertResults(identifier, isMatched, clrResultCollection.ToList());
        return result;
    }
}

class Trigger {
    isPressed() {
        return _globals.Trigger.IsPressed;
    }
    isNotPressed() {
        return !_globals.Trigger.IsPressed;
    }
}

class Keyboard {

    static Default = new Keyboard();

    down = (keyName) => {
        const key = keyName.toClrKeys();
        return _globals.Key.Find(key).Down();
    }

    up = (keyName) => {
        const key = keyName.toClrKeys();
        return _globals.Key.Find(key).Up();
    }
    tap = (keyName, wait1, wait2) => {
        const key = keyName.toClrKeys();
        return _globals.Key.Find(key).Tap(wait1, wait2);
    }

    inputText = (text, interval) => {
        _globals.InputText(text, interval);
    }

    replay = (path) => {
        _globals.Replay(path);
    }

    /*
        v = {
            excludedKeys: string[] // key name
        }
    */
    upAllKeys = (v) => {
        if (v.excludedKeys) {
            const excludedKeys = v.excludedKeys.map(name => name.toClrKeys()).toClrArray(clr.KeyToKey.Enums.Keys);
            _globals.Key.UpAll(excludedKeys);
        }
    }

    isPressed = () => {
        const key = this.toString().toClrKeys();
        return _globals.Key.Find(key).IsPressed;
    }

    isPressedPhysically = () => {
        const key = this.toString().toClrKeys();
        return _globals.Key.Find(key).IsPressedPhysically;
    }
}

class Mouse {
    setOriginPoint = (point) => {
        _globals.MoveMethodOptions.SetOrigin(point.x, point.y);
    }
    setRandomOffsetRange = (x, y) => {
        _globals.MoveMethodOptions.SetRandomOffsetRange(x, y);
    }
    moveTo = (point, speed) => {
        if (!speed) {
            _globals.Move(point.x, point.y, 0);
            return;
        } else {
            const option = this.getStepsAndWait(speed);
            _globals.MoveWithSteps(point.x, point.y, option.maxSteps, option.wait);
        }
    }
    relMoveTo = (delta, speed) => {
        if (!speed) {
            _globals.Offset(delta.x, delta.y);
            return;
        } else {
            const option = this.getStepsAndWait(speed);
            _globals.OffsetWithSteps(delta.x, delta.y, option.maxSteps, option.wait);
        }
    }
    getStepsAndWait = (speedText) => {
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
    }
    getPoint = () => {
        const p = _globals.GetCursorPosition();
        return { x: p.Item1, y: p.Item2 };
    }
    vscroll = (delta) => {
        if (delta > 0) {
            _globals.WheelDown(delta);
        } else {
            _globals.WheelUp(delta);
        }
    }
    hscroll = (delta) => {
        if (delta > 0) {
            _globals.WheelRight(delta);
        } else {
            _globals.WheelLeft(delta);
        }
    }
}

class WindowInterface {

    constructor(windowHandle) {
        this.window = _globals.MakeWindowController(windowHandle);
    }

    focus = () => {
        this.window.Activate();
    }

    dump = () => {
        this.window.Dump();
    }

    close = () => {
        this.window.Close();
    }

    killProcess() {

    }

    setBounds = (point, size) => {
        this.window.Bounds = newBounds(point.x, point.y, size.width, size.height);
    }

    show = () => {
        this.window.State = clr.KeyToKey.Enums.WindowStates.Show;
    }

    hide = () => {
        this.window.State = clr.KeyToKey.Enums.WindowStates.Hide;
    }

    restore() {
        this.state = "NORMAL";
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

    get isMinimized() {
        return this.window.IsMinimized;
    }

    get isMaximized() {
        return this.window.IsMaximized;
    }

    get isNormalVisible() {
        return !this.isMinimized && !this.isMaximized;
    }

    set state(newState) {
        switch (newState) {
            case "MAXIMIZED":
                this.window.State = clr.KeyToKey.Enums.WindowStates.ShowMaximized;
                break;
            case "MINIMIZED":
                this.window.State = clr.KeyToKey.Enums.WindowStates.Minimized;
                break;
            case "NORMAL":
                this.window.State = clr.KeyToKey.Enums.WindowStates.ShowNormal;
                break;
        }
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

class DirectionValueToDirectionStringConverter {
    static convert(directionValue) {
        const type = this.getTypeFromValue(directionValue);
        const valueName = type.GetEnumName(directionValue);
        switch (valueName) {
            case "Up": return "UP";
            case "UpRight": return "UP_RIGHT";
            case "Right": return "RIGHT";
            case "DownRight": return "DOWN_RIGHT";
            case "Down": return "DOWN";
            case "DownLeft": return "DOWN_LEFT";
            case "Left": return "LEFT";
            case "UpLeft": return "UP_LEFT";
            default: return "NEUTRAL";
        }
    }

    static getTypeFromValue(directionValue) {
        const type = directionValue.GetType();
        const typeName = type.Name;
        if (typeName === "StickDirections") {
            const type_stick_directions = host.typeOf(clr.KeyToKey.Plugins.StickDirections);
            return type_stick_directions;
        }
        else if (typeName === "DPadDirections") {
            const type_dpad_directions = host.typeOf(clr.KeyToKey.Plugins.DPadDirections);
            return type_dpad_directions;
        }

        throw new Error("Invalid Direction Value");
    }
}

class Controller {

    _i_controller;

    constructor(i_controller) {
        this._i_controller = i_controller;
    }

    // not implemented
    get name() {
        return "";
    }

    get isConnected() {
        return this._i_controller.IsConnected;
    }

    get dpadDirection() {
        const directionString = DirectionValueToDirectionStringConverter.convert(this._i_controller.DpadDirection);
        return directionString;
    }

    get leftStick() {
        const stickState = this._i_controller.NormalizedLeftStick;
        return new ControllerStick(stickState);
    }

    get rightStick() {
        const stickState = this._i_controller.NormalizedRightStick;
        return new ControllerStick(stickState);
    }

    get leftTrigger() {
        return new ControllerTrigger(this._i_controller.NormalizedLeftTrigger);
    }

    get rightTrigger() {
        return new ControllerTrigger(this._i_controller.NormalizedRightTrigger);
    }

    get isXInput() {
        return this._i_controller.DeviceType === clr.KeyToKey.Enums.ControllerTypes.XInput;
    }

    get isDirectInput() {
        return this._i_controller.DeviceType === clr.KeyToKey.Enums.ControllerTypes.DirectInput;
    }

    isPressed = (buttonName) => {
        const button = buttonName.toClrControllerButtons();
        return this._i_controller.GetState(button);
    }

    static getController() {
        return new Controller(_globals.Controller);
    }

    static findController(condition) {
        return new Controller(_globals.Controller);
    }
}

class ControllerStick {

    _i_normalized_stick;

    constructor(i_normalized_stick) {
        this._i_normalized_stick = i_normalized_stick;
    }

    get angle() {
        return this._i_normalized_stick.Angle;
    }

    get horizontal() {
        return this._i_normalized_stick.Horizontal;
    }

    get vertical() {
        return this._i_normalized_stick.Vertical;
    }

    get inputRate() {
        return this._i_normalized_stick.DistanceFromCenter;
    }

    get deadzone() {
        return this._i_normalized_stick.DeadZone;
    }

    get overDeadZone() {
        return this._i_normalized_stick.IsOverDeadZone;
    }

    get direction() {
        const directionString = DirectionValueToDirectionStringConverter.convert(this._i_normalized_stick.Direction);
        return directionString;
    }
}

class ControllerTrigger {

    _i_normalized_trigger;

    constructor(i_normalized_trigger) {
        this._i_normalized_trigger = i_normalized_trigger;
    }

    get inputRate() {
        return this._i_normalized_trigger.Value;
    }

    get deadzone() {
        return this._i_normalized_trigger.DeadZone;
    }

    get overDeadZone() {
        return this._i_normalized_trigger.IsOverDeadZone;
    }
}

class DateTime {

    _date;

    constructor(date) {
        this._date = date;
    }

    get year() {
        return this._date.Year;
    }

    get month() {
        return this._date.Month
    }

    get day() {
        return this._date.Day;
    }

    get hour() {
        return this._date.Hour;
    }

    get minute() {
        return this._date.Minute;
    }

    get second() {
        return this._date.Second;
    }

    get toString() {
        return this._date.ToString();
    }

    get dayOfWeek() {
        return this._date.DayOfWeek;
    }

    static get now() {
        const now = clr.System.DateTime.Now;
        return new DateTime(now);
    }
}

class Monitor {

    _screen;

    constructor(screen) {
        this._screen = screen;
    }

    get deviceName() {
        return this._screen.DeviceName;
    }

    get point() {
        const b = this._screen.Bounds;
        return newPoint(b.Left, b.Top);
    }

    get size() {
        const b = this._screen.Bounds;
        return newSize(b.Width, b.Height);
    }

    get isMain() {
        return this._screen.Primary;
    }

    dump = () => {
        const array = [];
        const p = this.point;
        const s = this.size;
        array.push(`デバイス名：9'${this.deviceName}'`);
        array.push(`座標：{ x: ${p.x}, y: ${p.y} }`);
        array.push(`サイズ： { width: ${s.width}, height: ${s.height} }`);
        array.push(`メインモニター？：${this.isMain}`);
        console.log(JSON.stringify(array, " ", 2));
    }

    static getMainMonitor() {
        return new Monitor(_globals.Screen.PrimaryScreen);
    }

    static getAllMonitors() {
        const monitors = [];
        const screens = _globals.Screen.AllScreens;
        for (const screen of screens) {
            monitors.push(new Monitor(screen));
        }
        return monitors;
    }
}

class IME {
    static get conversionMode() {
        return _globals.IME.ConversionMode.ToString();
    }

    static set conversionMode(newMode) {
        _globals.IME.ConversionMode = newMode.toClrIMEConversionMode();
    }
}

/*
    初期化
*/
function initializeGlobalThis() {

    // プロパティ
    globalThis.trigger = new Trigger();
    globalThis.mouse = new Mouse();
    globalThis.controller = new Controller(_globals.Controller);
    globalThis.xinput0 = new Controller(_globals.Controller.GetXInputController(0));
    globalThis.xinput1 = new Controller(_globals.Controller.GetXInputController(1));
    globalThis.xinput2 = new Controller(_globals.Controller.GetXInputController(2));
    globalThis.xinput3 = new Controller(_globals.Controller.GetXInputController(3));
    globalThis.templateMatching = new TemplateMatching();

    // ユーティリティ
    Array.prototype.toClrArray = Utilities.Default.toClrArray;
    String.prototype.toClrKeys = Utilities.Default.toClrKeys;
    String.prototype.toClrControllerButtons = Utilities.Default.toClrControllerButtons;
    String.prototype.toClrIMEConversionMode = Utilities.Default.toClrIMEConversionMode;
    globalThis.randomPoint = Utilities.Default.randomPoint;
    globalThis.newBounds = Utilities.Default.newBounds;
    globalThis.newPoint = Utilities.Default.newPoint;
    globalThis.newSize = Utilities.Default.newSize;

    // デバッグ
    globalThis.checkPoint = Debug.Default.checkPoint;

    // キーボード
    globalThis.down = Keyboard.Default.down;
    globalThis.up = Keyboard.Default.up;
    globalThis.tap = Keyboard.Default.tap;
    globalThis.inputText = Keyboard.Default.inputText;
    globalThis.replay = Keyboard.Default.replay;
    globalThis.upAllKeys = Keyboard.Default.upAllKeys;
    String.prototype.isPressed = Keyboard.Default.isPressed;
    String.prototype.isPressedPhysically = Keyboard.Default.isPressedPhysically;

    // 待機
    globalThis.wait = Wait.Default.wait;
    globalThis.h_wait = Wait.Default.h_wait;
    globalThis.waitForInput = Wait.Default.waitForInput;
    globalThis.waitForController = Wait.Default.waitForController;

    // ウィンドウ
    globalThis.activeWindow = Window.Default.activeWindow;
    globalThis.windowUnderMouse = Window.Default.windowUnderMouse;
    globalThis.createWindowById = Window.Default.createWindowById;
    globalThis.findWindow = Window.Default.findWindow;

    // コントローラー
    globalThis.getController = Controller.getController;
    globalThis.findController = Controller.findController;

    // 時間

    // モニター
    globalThis.getMainMonitor = Monitor.getMainMonitor;
    globalThis.getAllMonitors = Monitor.getAllMonitors;
}

initializeGlobalThis();
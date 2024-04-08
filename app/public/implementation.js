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

    toArray(clrArray) {
        const array = [];
        for (const v of clrArray) {
            array.push(v);
        }
        return array;
    }
}

class Console {

    static Default = new Console();

    /**
    * @param {any} value
    * @returns {void}
    */
    log(value) {
        if (typeof value !== "boolean" && !value) {
            clr.System.Console.WriteLine();
        } else if (value.isJson()) {
            clr.System.Console.WriteLine(JSON.stringify(value));
        } else if (value.dump) {
            value.dump();
        } else {
            const t = host.asType(clr.System.Object, value).GetType();
            const name = t.FullName;
            if (name === "Microsoft.ClearScript.V8.V8ScriptItem+V8ScriptObject") {
                clr.System.Console.WriteLine(value.constructor.name);
            } else if (name === "Microsoft.ClearScript.V8.V8ScriptItem+V8Array") {
                clr.System.Console.WriteLine(JSON.stringify(value));
            } else {
                clr.System.Console.WriteLine(value);
            }
        }
    }

    /** コンソールに区切り線を出力します */
    separate() {
        clr.System.Console.WriteLine("-".repeat(this.width()));
    }

    clear() {
        return clr.System.Console.Clear();
    }

    /**
     * @returns {number} コンソールの横幅
     */
    width() {
        return clr.System.Console.BufferWidth;
    }

    /**
     * @returns {number} コンソールの縦幅
     */
    height() {
        return clr.System.Console.BufferHeight;
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

    get clrBounds() {
        return this._clrBounds;
    }
}

class Variable {

    _variableDic;

    constructor(variableDic) {
        this._variableDic = variableDic;
    }

    exists(name) {
        name = this._prependPrefix(name);
        return this._variableDic.ContainsKey(name);
    }

    get(name) {
        const value = this._getValue(name);
        return value;
    }

    set(name, value) {
        if (this.exists(this._prependPrefix(name))) {
            name = this._prependPrefix(name);
            this._variableDic.SetValue(name, value);
        } else {
            const encodedName = this._prependPrefix(nameEncoder.Encode(name));
            this._variableDic.SetValue(encodedName, value);
        }
    }

    _prependPrefix(name) {
        if (name === undefined) {
            return "";
        }

        if (!name.startsWith("$")) {
            name = `$${name}`;
        }
        return name;
    }

    _getValue(name) {
        const encodedName = this._prependPrefix(nameEncoder.Encode(name));
        if (this.exists(this._prependPrefix(name))) {
            name = this._prependPrefix(name);
            return this._variableDic.GetValue(name);
        } else if (this.exists(encodedName)) {
            return this._variableDic.GetValue(encodedName);
        }
        throw Error(`変数「${name}」が存在しませんでした`);
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
            case "SECONDS":
            case "sec":
                return ms_time * 1000;
            case "MINUTES":
            case "min":
                return ms_time * 1000 * 60;
            case "HOURS":
            case "hr":
                return ms_time * 1000 * 60 * 60;
            default: return ms_time;
        }
    }

    waitForInput = (key) => {
        return _globals.WaitForInput(key, true);
    }

    waitForController = (controllerButtonName) => {
        const button = controllerButtonName.toClrControllerButtons();
        return _globals.WaitForInput(button, true);
    }
}

class Events {
    static listen(eventName, handle) {
        switch (eventName) {
            case "end":
                _globals.Ended.connect(function (_, args) {
                    handle(args);
                });
                return;
            case "trigger-pressed":
                _globals.TriggerPressed.connect(function (_, args) {
                    handle(args);
                });
                return;
            case "trigger-released":
                _globals.TriggerReleased.connect(function (_, args) {
                    handle(args);
                });
                return;
            case "key-pressed":
                _globals.Hooked.connect(function (_, args) {
                    if (args.IsInjected) { return; }
                    if (!args.IsPressed) { return; }
                    if (args.EventType != clr.KeyToKey.Plugins.EventType.Stroke) { return; }
                    const key = args.Key;
                    const isRepeated = args.IsRepeated;
                    const cancel = args.IsCancel;
                    const e = { key, isRepeated, cancel };
                    handle(e);
                    args.IsCancel = e.cancel;
                });
                return;
            case "key-released":
                _globals.Hooked.connect(function (_, args) {
                    if (args.IsInjected) { return; }
                    if (args.IsPressed) { return; }
                    if (args.EventType != clr.KeyToKey.Plugins.EventType.Stroke) { return; }
                    const key = args.Key;
                    const cancel = args.IsCancel;
                    const e = { key, cancel };
                    handle(e);
                    args.IsCancel = e.cancel;
                });
                return;
            case "key-state-changed":
                _globals.Hooked.connect(function (_, args) {
                    if (args.EventType != clr.KeyToKey.Plugins.EventType.Stroke) {
                        return;
                    }
                    const key = args.Key;
                    const isKeyPressed = args.IsPressed;
                    const isInputByApp = args.IsInjected;
                    const isRepeated = args.IsRepeated;
                    const IsToggleKey = args.IsToggleKey;
                    const cancel = args.IsCancel;
                    const e = { key, isKeyPressed, isRepeated, IsToggleKey, isInputByApp, cancel };
                    handle(e);
                    args.IsCancel = e.cancel;
                });
                return;
            case "mouse-moved":
                _globals.MouseMoving.connect(function (_, args) {
                    if (args.IsInjected) {
                        return;
                    }
                    const newPoint = {
                        x: args.NewPoint.X,
                        y: args.NewPoint.Y
                    };
                    const oldPoint = {
                        x: args.OldPoint.X,
                        y: args.OldPoint.Y
                    };
                    const deltaX = args.Delta.X;
                    const deltaY = args.Delta.Y;
                    const isInputByApp = e.IsInjected;
                    const cancel = args.IsCancel;
                    const e = { newPoint, oldPoint, deltaX, deltaY, isInputByApp, cancel };
                    handle(e);
                    args.IsCancel = e.cancel;
                });
                return;
            case "controller-state-changed":
                _globals.ControllerStateChanged.connect(function (_, args) {
                    const input = args.Button;
                    const isInputPressed = args.IsPressed;
                    handle({ input, isInputPressed });
                });
                return;
            case "":
                return;
        }
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

    get isPressed() {
        return _globals.Trigger.IsPressed;
    }

    get isNotPressed() {
        return !_globals.Trigger.IsPressed;
    }

    get isKey() {
        return _globals.Trigger.IsKeyboard;
    }

    get isMouse() {
        return _globals.Trigger.IsMouse;
    }

    get isKeyOrMouse() {
        return _globals.Trigger.IsKeyOrMouse;
    }

    get isController() {
        return _globals.Trigger.IsController;
    }

    get asKey() {
        if (!this.isKeyOrMouse) {
            throw new Error("キーボード、もしくはマウスがトリガーとして使用されていないため値を取得することができません。");
        }
        return _globals.Trigger.Value;
    }

    get asController() {
        if (!this.isController) {
            throw new Error("コントローラーがトリガーとして使用されていないため値を取得することができません。");
        }
        return _globals.Trigger.Value;
    }
}

class Keyboard {

    static Default = new Keyboard();

    /**
     * キーを押します
     * @param {Keys} key 押すキー
     * @returns {void}
     */
    down = (key) => {
        return _globals.Key.Find(key).Down();
    }

    /**
     * キーを離します
     * @param {Keys} key 離すキー
     * @returns {void}
     */
    up = (key) => {
        return _globals.Key.Find(key).Up();
    }

    /**
     * キーを押して離します
     * @param {Keys} key 入力するキー
     * @param {number} wait1 押したあとの待機時間
     * @param {number} wait2 離したあとの待機時間
     * @returns {void}
     */
    tap = (key, wait1, wait2) => {
        return _globals.Key.Find(key).Tap(wait1, wait2);
    }

    /** 
     * 文字を入力
     * @param {string} text 入力する文字
     * @param {number} interval 文字の入力間隔
     * @returns {void}
     */
    inputText = (text, interval) => {
        _globals.InputText(text, interval);
    }

    /** 
     * 入力記録を再生
     * @param {string} path 記録ファイルのパス 
     */
    replay = (path) => {
        _globals.Replay(path);
    }

    /** 
     * すべてのキーを離します
     * @param {{excludedKeys: Keys[]}} v 除外するキー
     */
    upAllKeys = (v) => {
        if (v.excludedKeys) {
            const excludedKeys = v.excludedKeys.toClrArray(clr.KeyToKey.Enums.Keys);
            _globals.Key.UpAll(excludedKeys);
        }
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
        array.push(`デバイス名：'${this.deviceName}'`);
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

class Mapping {

    suspend(targetDevice, inputs) {
        this._setState(targetDevice, inputs, false);
    }

    resume(targetDevice, inputs) {
        this._setState(targetDevice, inputs, true);
    }

    _setState(targetDevice, inputs, newState) {
        const type = host.typeOf(clr.KeyToKey.Enums.MappingSources);
        const mappingSources = inputs.map(name => toEnum(type, name)).toClrArray(clr.KeyToKey.Enums.MappingSources);
        switch (targetDevice) {
            case "XINPUT0":
                _globals.VirtualXInput.SetMappingState(0, mappingSources, newState);
                break;
            case "XINPUT1":
                _globals.VirtualXInput.SetMappingState(1, mappingSources, newState);
                break;
            case "XINPUT2":
                _globals.VirtualXInput.SetMappingState(2, mappingSources, newState);
                break;
            case "XINPUT3":
                _globals.VirtualXInput.SetMappingState(3, mappingSources, newState);
                break;
            case "XINPUT4":
                _globals.VirtualXInput.SetMappingState(0, mappingSources, newState);
                break;
        }
    }
}

class VirtualXInputWrapper {

    _clrVirtualXInput;
    _leftTriggerWrapper;
    _rightTriggerWrapper;
    _leftStickWrapper;
    _rightStickWrapper;

    constructor(clrVirtualXInput) {
        this._clrVirtualXInput = clrVirtualXInput;
        this._leftStickWrapper = new VirtualXInputStickWrapper(clrVirtualXInput.LeftStick);
        this._rightStickWrapper = new VirtualXInputStickWrapper(clrVirtualXInput.RightStick);
        this._leftTriggerWrapper = new VirtualXInputTriggerWrapper(clrVirtualXInput.LeftTrigger);
        this._rightTriggerWrapper = new VirtualXInputTriggerWrapper(clrVirtualXInput.RightTrigger);
    }

    /**
     * @returns {VirtualXInputTriggerWrapper} 左トリガー
     */
    get leftTrigger() {
        return this._leftTriggerWrapper;
    }

    /**
     * @returns {VirtualXInputTriggerWrapper} 右トリガー
     */
    get rightTrigger() {
        return this._rightTriggerWrapper;
    }

    /**
     * @returns {VirtualXInputStickWrapper} 左スティック
     */
    get leftStick() {
        return this._leftStickWrapper;
    }

    /**
     * @returns {VirtualXInputStickWrapper} 右スティック
     */
    get rightStick() {
        return this._rightStickWrapper;
    }

    /**
     * @param {string} buttonName
     */
    down(buttonName) {
        const button = this.getButton(buttonName);
        button.Down(0);
    }

    /**
     * @param {string} buttonName
     */
    up(buttonName) {
        const button = this.getButton(buttonName);
        button.Up(0);
    }

    /**
     * @param {string} buttonName
     * @param {number} wait1
     * @param {number} wait2
     */
    tap(buttonName, wait1, wait2) {
        const button = this.getButton(buttonName);
        button.Tap(wait1, wait2);
    }

    neutralizeDPad() {
        this._clrVirtualXInput.SetDPad(false, false, false, false);
    }

    reset() {
        this._clrVirtualXInput.Reset();
    }

    getButton(buttonName) {
        switch (buttonName) {
            case "A": return this._clrVirtualXInput.A;
            case "B": return this._clrVirtualXInput.B;
            case "X": return this._clrVirtualXInput.X;
            case "Y": return this._clrVirtualXInput.Y;
            case "Start": return this._clrVirtualXInput.Start;
            case "Back": return this._clrVirtualXInput.Back;
            case "LB": return this._clrVirtualXInput.LB;
            case "RB": return this._clrVirtualXInput.RB;
            case "LT": return this._clrVirtualXInput.LeftTrigger;
            case "RT": return this._clrVirtualXInput.RightTrigger;
            case "LeftStickPush": return this._clrVirtualXInput.LeftStickPush;
            case "RightStickPush": return this._clrVirtualXInput.RightStickPush;
            case "DPadUp": return this._clrVirtualXInput.DPadUp;
            case "DPadUpRight": return this._clrVirtualXInput.DPadUpRight;
            case "DPadRight": return this._clrVirtualXInput.DPadRight;
            case "DPadDownRight": return this._clrVirtualXInput.DPadDownRight;
            case "DPadDown": return this._clrVirtualXInput.DPadDown;
            case "DPadDownLeft": return this._clrVirtualXInput.DPadDownLeft;
            case "DPadLeft": return this._clrVirtualXInput.DPadLeft;
            case "DPadUpLeft": return this._clrVirtualXInput.DPadUpLeft;
            default:
                throw new Error(`"${buttonName}" is invalid button name.`);
        }
    }
}

class VirtualXInputStickWrapper {

    _clrVirtualXInputStick;

    constructor(clrVirtualXInputStick) {
        this._clrVirtualXInputStick = clrVirtualXInputStick;
    }

    /**
     * @param {number} angleValue
     * @param {number} inputRate
     */
    angle(angleValue, inputRate) {
        const i = _globals.Clamp(0.0, 1.0, inputRate);
        this._clrVirtualXInputStick.SetValueByAngle(angleValue, i);
    }

    /**
    * @param {{x: number, y: number}} newPoint
    */
    set point(newPoint) {
        this._clrVirtualXInputStick.SetValue(newPoint.x, newPoint.y * -1);
    }
}

class VirtualXInputTriggerWrapper {
    _clrVirtualXInputTrigger;

    constructor(clrVirtualXInputTrigger) {
        this._clrVirtualXInputTrigger = clrVirtualXInputTrigger;
    }

    /**
     * @param {number} inputRate
     */
    set value(inputRate) {
        const i = _globals.Clamp(0.0, 1.0, inputRate);
        this._clrVirtualXInputTrigger.SetValue(i);
    }
}

class VirtualDualShock4Wrapper {
    _clrVirtualDualShock4;
    _leftTriggerWrapper;
    _rightTriggerWrapper;
    _leftStickWrapper;
    _rightStickWrapper;

    constructor(clrVirtualXInput) {
        this._clrVirtualDualShock4 = clrVirtualXInput;
        this._leftStickWrapper = new VirtualDualShock4StickWrapper(clrVirtualXInput.LeftStick);
        this._rightStickWrapper = new VirtualDualShock4StickWrapper(clrVirtualXInput.RightStick);
        this._leftTriggerWrapper = new VirtualDualShock4TriggerWrapper(clrVirtualXInput.L2);
        this._rightTriggerWrapper = new VirtualDualShock4TriggerWrapper(clrVirtualXInput.R2);
    }

    /**
     * @returns {VirtualXInputTriggerWrapper} 左トリガー
     */
    get leftTrigger() {
        return this._leftTriggerWrapper;
    }

    /**
     * @returns {VirtualXInputTriggerWrapper} 右トリガー
     */
    get rightTrigger() {
        return this._rightTriggerWrapper;
    }

    /**
     * @returns {VirtualXInputStickWrapper} 左スティック
     */
    get leftStick() {
        return this._leftStickWrapper;
    }

    /**
     * @returns {VirtualXInputStickWrapper} 右スティック
     */
    get rightStick() {
        return this._rightStickWrapper;
    }

    /**
     * @param {string} buttonName
     */
    down(buttonName) {
        const button = this.getButton(buttonName);
        button.Down(0);
    }

    /**
     * @param {string} buttonName
     */
    up(buttonName) {
        const button = this.getButton(buttonName);
        button.Up(0);
    }

    neutralizeDPad() {
        this._clrVirtualDualShock4.NeutralizeDPad();
    }

    /**
     * @param {string} buttonName
     * @param {number} wait1
     * @param {number} wait2
     */
    tap(buttonName, wait1, wait2) {
        const button = this.getButton(buttonName);
        button.Tap(wait1, wait2);
    }

    reset() {
        this._clrVirtualDualShock4.Reset();
    }

    getButton(buttonName) {
        switch (buttonName) {
            case "A": return this._clrVirtualDualShock4.Cross;
            case "B": return this._clrVirtualDualShock4.Circle;
            case "X": return this._clrVirtualDualShock4.Square;
            case "Y": return this._clrVirtualDualShock4.Triangle;
            case "Start": return this._clrVirtualDualShock4.Options;
            case "Back": return this._clrVirtualDualShock4.Share;
            case "LB": return this._clrVirtualDualShock4.L1;
            case "RB": return this._clrVirtualDualShock4.R1;
            case "LT": return this._clrVirtualDualShock4.L2;
            case "RT": return this._clrVirtualDualShock4.R2;
            case "LeftStickPush": return this._clrVirtualDualShock4.L3;
            case "RightStickPush": return this._clrVirtualDualShock4.R3;
            case "PSButton": return this._clrVirtualDualShock4.PSButton;
            case "Touchpad": return this._clrVirtualDualShock4.Touchpad;
            case "DPadUp": return this._clrVirtualDualShock4.DPadUp;
            case "DPadUpRight": return this._clrVirtualDualShock4.DPadUpRight;
            case "DPadRight": return this._clrVirtualDualShock4.DPadRight;
            case "DPadDownRight": return this._clrVirtualDualShock4.DPadDownRight;
            case "DPadDown": return this._clrVirtualDualShock4.DPadDown;
            case "DPadDownLeft": return this._clrVirtualDualShock4.DPadDownLeft;
            case "DPadLeft": return this._clrVirtualDualShock4.DPadLeft;
            case "DPadUpLeft": return this._clrVirtualDualShock4.DPadUpLeft;
            default:
                throw new Error(`"${buttonName}" is invalid button name.`);
        }
    }
}

class VirtualDualShock4StickWrapper {

    _clrDualShock4Stick;

    constructor(_clrDualShock4Stick) {
        this._clrDualShock4Stick = _clrDualShock4Stick;
    }

    /**
     * @param {number} angleValue
     * @param {number} inputRate
     */
    angle(angleValue, inputRate) {
        const i = _globals.Clamp(0.0, 1.0, inputRate);
        this._clrDualShock4Stick.SetValueByAngle(i, angleValue);
    }

    /**
    * @param {{x: number, y: number}} newPoint
    */
    set point(newPoint) {
        this._clrDualShock4Stick.SetValue(newPoint.x, newPoint.y * -1);
    }
}

class VirtualDualShock4TriggerWrapper {
    _clrDualShock4Trigger;

    constructor(_clrDualShock4Trigger) {
        this._clrDualShock4Trigger = _clrDualShock4Trigger;
    }

    /**
     * @param {number} inputRate
     */
    set value(inputRate) {
        const i = _globals.Clamp(0.0, 1.0, inputRate);
        this._clrDualShock4Trigger.SetValue(i);
    }
}

class Keys {
    static None = clr.KeyToKey.Enums.Keys.None;
    static LButton = clr.KeyToKey.Enums.Keys.LButton;
    static RButton = clr.KeyToKey.Enums.Keys.RButton;
    static MButton = clr.KeyToKey.Enums.Keys.MButton;
    static XButton1 = clr.KeyToKey.Enums.Keys.XButton1;
    static XButton2 = clr.KeyToKey.Enums.Keys.XButton2;
    static LShiftKey = clr.KeyToKey.Enums.Keys.LShiftKey;
    static RShiftKey = clr.KeyToKey.Enums.Keys.RShiftKey;
    static LControlKey = clr.KeyToKey.Enums.Keys.LControlKey;
    static RControlKey = clr.KeyToKey.Enums.Keys.RControlKey;
    static LAlt = clr.KeyToKey.Enums.Keys.LAlt;
    static RAlt = clr.KeyToKey.Enums.Keys.RAlt;
    static LWin = clr.KeyToKey.Enums.Keys.LWin;
    static RWin = clr.KeyToKey.Enums.Keys.RWin;
    static Enter = clr.KeyToKey.Enums.Keys.Enter;
    static Space = clr.KeyToKey.Enums.Keys.Space;
    static Escape = clr.KeyToKey.Enums.Keys.Escape;
    static Back = clr.KeyToKey.Enums.Keys.Back;
    static Tab = clr.KeyToKey.Enums.Keys.Tab;
    static Up = clr.KeyToKey.Enums.Keys.Up;
    static Down = clr.KeyToKey.Enums.Keys.Down;
    static Left = clr.KeyToKey.Enums.Keys.Left;
    static Right = clr.KeyToKey.Enums.Keys.Right;
    static D0 = clr.KeyToKey.Enums.Keys.D0;
    static D1 = clr.KeyToKey.Enums.Keys.D1;
    static D2 = clr.KeyToKey.Enums.Keys.D2;
    static D3 = clr.KeyToKey.Enums.Keys.D3;
    static D4 = clr.KeyToKey.Enums.Keys.D4;
    static D5 = clr.KeyToKey.Enums.Keys.D5;
    static D6 = clr.KeyToKey.Enums.Keys.D6;
    static D7 = clr.KeyToKey.Enums.Keys.D7;
    static D8 = clr.KeyToKey.Enums.Keys.D8;
    static D9 = clr.KeyToKey.Enums.Keys.D9;
    static A = clr.KeyToKey.Enums.Keys.A;
    static B = clr.KeyToKey.Enums.Keys.B;
    static C = clr.KeyToKey.Enums.Keys.C;
    static D = clr.KeyToKey.Enums.Keys.D;
    static E = clr.KeyToKey.Enums.Keys.E;
    static F = clr.KeyToKey.Enums.Keys.F;
    static G = clr.KeyToKey.Enums.Keys.G;
    static H = clr.KeyToKey.Enums.Keys.H;
    static I = clr.KeyToKey.Enums.Keys.I;
    static J = clr.KeyToKey.Enums.Keys.J;
    static K = clr.KeyToKey.Enums.Keys.K;
    static L = clr.KeyToKey.Enums.Keys.L;
    static M = clr.KeyToKey.Enums.Keys.M;
    static N = clr.KeyToKey.Enums.Keys.N;
    static O = clr.KeyToKey.Enums.Keys.O;
    static P = clr.KeyToKey.Enums.Keys.P;
    static Q = clr.KeyToKey.Enums.Keys.Q;
    static R = clr.KeyToKey.Enums.Keys.R;
    static S = clr.KeyToKey.Enums.Keys.S;
    static T = clr.KeyToKey.Enums.Keys.T;
    static U = clr.KeyToKey.Enums.Keys.U;
    static V = clr.KeyToKey.Enums.Keys.V;
    static W = clr.KeyToKey.Enums.Keys.W;
    static X = clr.KeyToKey.Enums.Keys.X;
    static Y = clr.KeyToKey.Enums.Keys.Y;
    static Z = clr.KeyToKey.Enums.Keys.Z;
    static Apps = clr.KeyToKey.Enums.Keys.Apps;
    static NumLock = clr.KeyToKey.Enums.Keys.NumLock;
    static NumPad0 = clr.KeyToKey.Enums.Keys.NumPad0;
    static NumPad1 = clr.KeyToKey.Enums.Keys.NumPad1;
    static NumPad2 = clr.KeyToKey.Enums.Keys.NumPad2;
    static NumPad3 = clr.KeyToKey.Enums.Keys.NumPad3;
    static NumPad4 = clr.KeyToKey.Enums.Keys.NumPad4;
    static NumPad5 = clr.KeyToKey.Enums.Keys.NumPad5;
    static NumPad6 = clr.KeyToKey.Enums.Keys.NumPad6;
    static NumPad7 = clr.KeyToKey.Enums.Keys.NumPad7;
    static NumPad8 = clr.KeyToKey.Enums.Keys.NumPad8;
    static NumPad9 = clr.KeyToKey.Enums.Keys.NumPad9;
    static NumPadEnter = clr.KeyToKey.Enums.Keys.NumPadEnter;
    static Multiply = clr.KeyToKey.Enums.Keys.Multiply;
    static Add = clr.KeyToKey.Enums.Keys.Add;
    static Subtract = clr.KeyToKey.Enums.Keys.Subtract;
    static Decimal = clr.KeyToKey.Enums.Keys.Decimal;
    static Divide = clr.KeyToKey.Enums.Keys.Divide;
    static F1 = clr.KeyToKey.Enums.Keys.F1;
    static F2 = clr.KeyToKey.Enums.Keys.F2;
    static F3 = clr.KeyToKey.Enums.Keys.F3;
    static F4 = clr.KeyToKey.Enums.Keys.F4;
    static F5 = clr.KeyToKey.Enums.Keys.F5;
    static F6 = clr.KeyToKey.Enums.Keys.F6;
    static F7 = clr.KeyToKey.Enums.Keys.F7;
    static F8 = clr.KeyToKey.Enums.Keys.F8;
    static F9 = clr.KeyToKey.Enums.Keys.F9;
    static F10 = clr.KeyToKey.Enums.Keys.F10;
    static F11 = clr.KeyToKey.Enums.Keys.F11;
    static F12 = clr.KeyToKey.Enums.Keys.F12;
    static F13 = clr.KeyToKey.Enums.Keys.F13;
    static F14 = clr.KeyToKey.Enums.Keys.F14;
    static F15 = clr.KeyToKey.Enums.Keys.F15;
    static F16 = clr.KeyToKey.Enums.Keys.F16;
    static F17 = clr.KeyToKey.Enums.Keys.F17;
    static F18 = clr.KeyToKey.Enums.Keys.F18;
    static F19 = clr.KeyToKey.Enums.Keys.F19;
    static F20 = clr.KeyToKey.Enums.Keys.F20;
    static F21 = clr.KeyToKey.Enums.Keys.F21;
    static F22 = clr.KeyToKey.Enums.Keys.F22;
    static F23 = clr.KeyToKey.Enums.Keys.F23;
    static F24 = clr.KeyToKey.Enums.Keys.F24;
    static PrintScreen = clr.KeyToKey.Enums.Keys.PrintScreen;
    static PageUp = clr.KeyToKey.Enums.Keys.PageUp;
    static PageDown = clr.KeyToKey.Enums.Keys.PageDown;
    static Insert = clr.KeyToKey.Enums.Keys.Insert;
    static Delete = clr.KeyToKey.Enums.Keys.Delete;
    static Scroll = clr.KeyToKey.Enums.Keys.Scroll;
    static Pause = clr.KeyToKey.Enums.Keys.Pause;
    static Cancel = clr.KeyToKey.Enums.Keys.Cancel;
    static Clear = clr.KeyToKey.Enums.Keys.Clear;
    static CapsLock = clr.KeyToKey.Enums.Keys.CapsLock;
    static End = clr.KeyToKey.Enums.Keys.End;
    static Home = clr.KeyToKey.Enums.Keys.Home;
    static Select = clr.KeyToKey.Enums.Keys.Select;
    static Help = clr.KeyToKey.Enums.Keys.Help;
    static Print = clr.KeyToKey.Enums.Keys.Print;
    static Oemplus = clr.KeyToKey.Enums.Keys.Oemplus;
    static OemComma = clr.KeyToKey.Enums.Keys.OemComma;
    static OemMinus = clr.KeyToKey.Enums.Keys.OemMinus;
    static OemPeriod = clr.KeyToKey.Enums.Keys.OemPeriod;
    static Oem1 = clr.KeyToKey.Enums.Keys.Oem1;
    static Oem2 = clr.KeyToKey.Enums.Keys.Oem2;
    static Oem3 = clr.KeyToKey.Enums.Keys.Oem3;
    static Oem4 = clr.KeyToKey.Enums.Keys.Oem4;
    static Oem5 = clr.KeyToKey.Enums.Keys.Oem5;
    static Oem6 = clr.KeyToKey.Enums.Keys.Oem6;
    static Oem7 = clr.KeyToKey.Enums.Keys.Oem7;
    static Oem102 = clr.KeyToKey.Enums.Keys.Oem102;
    static ZenHan = clr.KeyToKey.Enums.Keys.ZenHan;
    static KanaMode = clr.KeyToKey.Enums.Keys.KanaMode;
    static JunjaMode = clr.KeyToKey.Enums.Keys.JunjaMode;
    static FinalMode = clr.KeyToKey.Enums.Keys.FinalMode;
    static IMEConvert = clr.KeyToKey.Enums.Keys.IMEConvert;
    static IMENonconvert = clr.KeyToKey.Enums.Keys.IMENonconvert;
    static IMEAccept = clr.KeyToKey.Enums.Keys.IMEAccept;
    static IMEModeChange = clr.KeyToKey.Enums.Keys.IMEModeChange;
    static Packet = clr.KeyToKey.Enums.Keys.Packet;
    static Sleep = clr.KeyToKey.Enums.Keys.Sleep;
    static Play = clr.KeyToKey.Enums.Keys.Play;
    static Zoom = clr.KeyToKey.Enums.Keys.Zoom;
    static OemClear = clr.KeyToKey.Enums.Keys.OemClear;
    static KanaHira = clr.KeyToKey.Enums.Keys.KanaHira;
    static VolumeMute = clr.KeyToKey.Enums.Keys.VolumeMute;
    static VolumeDown = clr.KeyToKey.Enums.Keys.VolumeDown;
    static VolumeUp = clr.KeyToKey.Enums.Keys.VolumeUp;
    static MediaNextTrack = clr.KeyToKey.Enums.Keys.MediaNextTrack;
    static MediaPreviousTrack = clr.KeyToKey.Enums.Keys.MediaPreviousTrack;
    static MediaStop = clr.KeyToKey.Enums.Keys.MediaStop;
}

class ControllerButtons {
    static A = clr.KeyToKey.Enums.ControllerButtons.A;
    static B = clr.KeyToKey.Enums.ControllerButtons.B;
    static X = clr.KeyToKey.Enums.ControllerButtons.X;
    static Y = clr.KeyToKey.Enums.ControllerButtons.Y;
    static DPadUp = clr.KeyToKey.Enums.ControllerButtons.DPadUp;
    static DPadDown = clr.KeyToKey.Enums.ControllerButtons.DPadDown;
    static DPadLeft = clr.KeyToKey.Enums.ControllerButtons.DPadLeft;
    static DPadRight = clr.KeyToKey.Enums.ControllerButtons.DPadRight;
    static Start = clr.KeyToKey.Enums.ControllerButtons.Start;
    static Back = clr.KeyToKey.Enums.ControllerButtons.Back;
    static LB = clr.KeyToKey.Enums.ControllerButtons.LB;
    static RB = clr.KeyToKey.Enums.ControllerButtons.RB;
    static LT = clr.KeyToKey.Enums.ControllerButtons.LT;
    static RT = clr.KeyToKey.Enums.ControllerButtons.RT;
    static LeftStickUp = clr.KeyToKey.Enums.ControllerButtons.LeftStickUp;
    static LeftStickDown = clr.KeyToKey.Enums.ControllerButtons.LeftStickDown;
    static LeftStickLeft = clr.KeyToKey.Enums.ControllerButtons.LeftStickLeft;
    static LeftStickRight = clr.KeyToKey.Enums.ControllerButtons.LeftStickRight;
    static LeftStickPush = clr.KeyToKey.Enums.ControllerButtons.LeftStickPush;
    static RightStickUp = clr.KeyToKey.Enums.ControllerButtons.RightStickUp;
    static RightStickDown = clr.KeyToKey.Enums.ControllerButtons.RightStickDown;
    static RightStickLeft = clr.KeyToKey.Enums.ControllerButtons.RightStickLeft;
    static RightStickRight = clr.KeyToKey.Enums.ControllerButtons.RightStickRight;
    static RightStickPush = clr.KeyToKey.Enums.ControllerButtons.RightStickPush;
    static ExButton0 = clr.KeyToKey.Enums.ControllerButtons.ExButton0;
    static ExButton1 = clr.KeyToKey.Enums.ControllerButtons.ExButton1;
    static ExButton2 = clr.KeyToKey.Enums.ControllerButtons.ExButton2;
    static ExButton3 = clr.KeyToKey.Enums.ControllerButtons.ExButton3;
    static ExButton4 = clr.KeyToKey.Enums.ControllerButtons.ExButton4;
    static ExButton5 = clr.KeyToKey.Enums.ControllerButtons.ExButton5;
    static ExButton6 = clr.KeyToKey.Enums.ControllerButtons.ExButton6;
    static ExButton7 = clr.KeyToKey.Enums.ControllerButtons.ExButton7;
    static ExButton8 = clr.KeyToKey.Enums.ControllerButtons.ExButton8;
    static ExButton9 = clr.KeyToKey.Enums.ControllerButtons.ExButton9;
    static ExButton10 = clr.KeyToKey.Enums.ControllerButtons.ExButton10;
    static ExButton11 = clr.KeyToKey.Enums.ControllerButtons.ExButton11;
    static ExButton12 = clr.KeyToKey.Enums.ControllerButtons.ExButton12;
    static ExButton13 = clr.KeyToKey.Enums.ControllerButtons.ExButton13;
    static ExButton14 = clr.KeyToKey.Enums.ControllerButtons.ExButton14;
}

/*
    初期化
*/
try {
    // プロパティ
    globalThis.console = Console.Default;
    globalThis.trigger = new Trigger();
    globalThis.mouse = new Mouse();
    globalThis.controller = new Controller(_globals.Controller);
    globalThis.xinput0 = new Controller(_globals.Controller.GetXInputController(0));
    globalThis.xinput1 = new Controller(_globals.Controller.GetXInputController(1));
    globalThis.xinput2 = new Controller(_globals.Controller.GetXInputController(2));
    globalThis.xinput3 = new Controller(_globals.Controller.GetXInputController(3));
    globalThis.virtualXInput0 = new VirtualXInputWrapper(_globals.VirtualXInput.GetController(0));
    globalThis.virtualXInput1 = new VirtualXInputWrapper(_globals.VirtualXInput.GetController(1));
    globalThis.virtualXInput2 = new VirtualXInputWrapper(_globals.VirtualXInput.GetController(2));
    globalThis.virtualXInput3 = new VirtualXInputWrapper(_globals.VirtualXInput.GetController(3));
    globalThis.dualShock4 = new VirtualDualShock4Wrapper(_globals.DualShock4);
    globalThis.templateMatching = new TemplateMatching();
    globalThis.mapping = new Mapping();

    // 変数
    globalThis.localVariable = new Variable(_globals.LocalVariables);
    globalThis.globalVariable = new Variable(_globals.GlobalVariables);

    // ユーティリティ
    globalThis.randomPoint = Utilities.Default.randomPoint;
    globalThis.newBounds = Utilities.Default.newBounds;
    globalThis.newPoint = Utilities.Default.newPoint;
    globalThis.newSize = Utilities.Default.newSize;
    Object.prototype.isKey = function () {
        const isKey = host.isType(clr.KeyToKey.Enums.Keys, this);
        return isKey;
    }
    Object.prototype.isControllerElement = function () {
        const isControllerElement = host.isType(clr.KeyToKey.Enums.ControllerElements, this);
        return isControllerElement;
    }
    Object.prototype.isJson = function () {
        return this.constructor.name === "Object";
    }
    Object.prototype.isClassInstance = function () {
        return this.constructor.name !== "Object";
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
        const keyName = this.toString();
        return toKeys(keyName);
    };
    String.prototype.toClrControllerButtons = function () {
        const type = host.typeOf(clr.KeyToKey.Enums.ControllerButtons);
        const v = toEnum(type, this.toString());
        return v;
    }
    String.prototype.toClrIMEConversionMode = function () {
        const type = host.typeOf(clr.KeyToKey.Enums.IMEConversionModes);
        const v = toEnum(type, this.toString());
        return v;
    }

    // キーボード
    globalThis.down = Keyboard.Default.down;
    globalThis.up = Keyboard.Default.up;
    globalThis.tap = Keyboard.Default.tap;
    globalThis.inputText = Keyboard.Default.inputText;
    globalThis.replay = Keyboard.Default.replay;
    globalThis.upAllKeys = Keyboard.Default.upAllKeys;
    Object.prototype.isPressed = function () {
        return this.isKey() && _globals.Key.Find(this).IsPressed;
    }
    Object.prototype.isHardwarePressed = function () {
        return this.isKey() && _globals.Key.Find(this).IsPressedPhysically;
    }

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
} catch (error) {
    clr.System.Console.WriteLine("implementationエラー：");
    clr.System.Console.WriteLine(error.stack);
}
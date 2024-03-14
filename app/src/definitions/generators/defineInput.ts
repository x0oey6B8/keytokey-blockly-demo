import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";

// キーを押す／離す
export class KEY_DOWN_UP extends BlockCodeGenerator {
    name = "down_up";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const key = this.valueToCode(block, "KEY", "NONE");
        const behavior = this.getFieldValue(block, "BEHAVIOR").toString().toLowerCase();
        const code = `${behavior}(${key});\n`;
        return { code, order: "RAW" }
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        const key = this.valueToCode(block, "KEY", "NONE");
        const behavior = this.getFieldValue(block, "BEHAVIOR").toString().toLowerCase();
        const code = `${key}キーを${(behavior == "down" ? "押す" : "離す")}\n`
        return { code, order: "RAW" }
    }
}

// キーを押して離す
export class KEY_TAP extends BlockCodeGenerator {
    name = "tap";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `tap(${v.key}, ${v.wait1}, ${v.wait2});\n`;
        return { code, order: "RAW" }
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.key}キーを押して${v.wait1}ms待つ、離して${v.wait2}ms待つ\n`
        return { code, order: "RAW" }
    }
    getValues(block: BlockSvg) {
        var key = this.valueToCode(block, 'KEY1', "NONE");
        var wait1 = this.valueToCode(block, 'WAIT1', "ATOMIC");
        var wait2 = this.valueToCode(block, 'WAIT2', "ATOMIC");
        return { key, wait1, wait2 }
    }
}

// キーをすべて離す
export class KEY_UP_ALL extends BlockCodeGenerator {
    name: string = "up_all";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        var value_excluded_keys = this.valueToCode(block, 'EXCLUDED_KEYS', "ATOMIC");
        var code = `upAllKeys({ excludedKeys: ${value_excluded_keys} });\n`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        var value_excluded_keys = this.valueToCode(block, 'EXCLUDED_KEYS', "ATOMIC");
        var code = `upAllKeys({ excludedKeys: ${value_excluded_keys} });\n`
        return code;
    }
}

// キーが押されてるかどうか
export class KEY_IS_PRESSED extends BlockCodeGenerator {
    name = "key_is_pressed";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        var dropdown_value = this.getFieldValue(block, 'DROPDOWN');
        var key = this.valueToCode(block, 'KEY', "NONE");
        var code = `${key}.isPressed()`;
        if (dropdown_value === "RELEASED") {
            code = "!" + code;
        }
        return { code, order: "NONE" };
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        var dropdown_value = this.getFieldValue(block, 'DROPDOWN');
        var key = this.valueToCode(block, 'KEY', "NONE");
        var code = `${key}が` + (dropdown_value === "PRESSED" ? "押されてる" : "離されてる");
        return { code, order: "NONE" };
    }
}

// 物理キーが押されてるかどうか
export class key_is_hardware_pressed extends BlockCodeGenerator {
    name = "key_is_hardware_pressed";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        let code = `${v.key}.isHardwarePressed()`;
        if (v.dropdown_value === "RELEASED") {
            code = "!" + code;
        }
        return { code, order: "NONE" };
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `${v.key}が物理的に押されて` + (v.dropdown_value === "PRESSED" ? "いる" : "いない");
        return { code, order: "NONE" };
    }
    getValues(block: BlockSvg) {
        var dropdown_value = this.getFieldValue(block, 'DROPDOWN');
        var key = this.valueToCode(block, 'KEY', "NONE");
        return {
            dropdown_value,
            key
        }
    }
}

// 複数のキーが押されてるかどうか
export class KEYS_ARE_PRESSED extends BlockCodeGenerator {
    name = "keys_are_pressed";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        if (v.dropdown_value === "ALL_PRESSED") {
            return {
                code: `${v.keyArray}.every(key => key.isPressed())`,
                order: "NONE"
            }
        } else if (v.dropdown_value === "ALL_RELEASED") {
            return {
                code: `${v.keyArray}.every(key => !key.isPressed())`,
                order: "NONE"
            }
        } else {
            return {
                code: `${v.keyArray}.some(key => key.isPressed())`,
                order: "NONE"
            }
        }
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        if (v.dropdown_value === "ALL_PRESSED") {
            return {
                code: `${v.keyArray}すべてが押されてる`,
                order: "NONE"
            }
        } else if (v.dropdown_value === "ALL_RELEASED") {
            return {
                code: `${v.keyArray}すべてが離されてる`,
                order: "NONE"
            }
        } else {
            return {
                code: `${v.keyArray}のうちどれかが押されてる`,
                order: "NONE"
            }
        }
    }

    getValues(block: BlockSvg) {
        var keyArray = this.valueToCode(block, 'KEY_ARRAY', "ATOMIC");
        var dropdown_value = block.getFieldValue('DROPDOWN');
        return { keyArray, dropdown_value };
    }
}

// マウスの移動処理にランダム性を加える
export class MOUSE_SET_RANDOM_OFFSET_RANGE extends BlockCodeGenerator {
    name = "mouse_set_random_offset_range";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        var v = this.getValues(block);
        var code = `mouse.setRandomOffsetRange(${v.x}, ${v.y});\n`;
        return { code, order: "ATOMIC" };
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        var v = this.getValues(block);
        var code = `マウスの移動先に(${v.x}, ${v.y})の範囲でランダム性を加える\n`;
        return { code, order: "ATOMIC" };
    }
    getValues(block: BlockSvg) {
        var x = this.valueToCode(block, 'X', "ATOMIC");
        var y = this.valueToCode(block, 'Y', "ATOMIC");
        return { x, y };
    }
}

// マウスの移動処理の原点座標を設定
export class MOUSE_SET_ORIGIN_POINT extends BlockCodeGenerator {
    name = "mouse_set_origin_point";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        var v = this.getValues(block);
        var code = `mouse.setOriginPoint(${v.origin});\n`;
        return { code, order: "ATOMIC" };
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        var v = this.getValues(block);
        var code = `マウス：原点座標を(${v.origin})に設定\n`;
        return { code, order: "ATOMIC" };
    }
    getValues(block: BlockSvg) {
        var origin = this.valueToCode(block, 'ORIGIN', "ATOMIC");
        return { origin };
    }
}

// マウスの移動処理の基底クラス
abstract class MOUSE_MOVE_BASE extends BlockCodeGenerator {
    protected speedToText(speed: string) {
        switch (speed) {
            case "WARP": return "一瞬";
            case "FASTEST": return "とても速い速度";
            case "FAST": return "速い速度";
            case "NORMAL": return "普通速度";
            case "SLOW": return "遅い速度";
            case "SLOWEST": return "とても遅い速度";
            default: throw new Error();
        }
    }
}

// マウスの移動（絶対座標）
export class MOUSE_MOVE extends MOUSE_MOVE_BASE {
    name = "mouse_move";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        if (v.speed === "WARP") {
            return `mouse.moveTo(${v.point});\n`;
        } else {
            return `mouse.moveTo(${v.point}, "${v.speed}");\n`;
        }
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        return `マウスを${this.speedToText(v.speed)}で(${v.point})に移動\n`;
    }

    getValues(block: BlockSvg) {
        var point = this.valueToCode(block, 'POINT', "ATOMIC");
        var speed = this.getFieldValue(block, 'SPEED');
        return { point, speed };
    }
}

// マウスの移動（相対座標）
export class MOUSE_RELATIVE_MOVE extends MOUSE_MOVE_BASE {
    name = "mouse_move_relative";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        if (v.speed === "WARP") {
            return `mouse.relMoveTo({ x: ${v.dx}, y: ${v.dy} });\n`;
        } else {
            return `mouse.relMoveTo({ x: ${v.dx}, y: ${v.dy} }, "${v.speed}");\n`;
        }
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        return `マウスを${this.speedToText(v.speed)}で、横に(${v.dx})、縦に(${v.dy})移動\n`;
    }

    getValues(block: BlockSvg) {
        const dx = this.valueToCode(block, 'DX', "ATOMIC");
        const dy = this.valueToCode(block, 'DY', "ATOMIC");
        const speed = this.getFieldValue(block, 'SPEED');
        return { dx, dy, speed };
    }
}

// マウスの座標
export class MOUSE_GET_POINT extends MOUSE_MOVE_BASE {
    name = "mouse_get_point";
    GenerateAsJavascript(): GeneratedCode {
        var code = `mouse.getPoint()`;
        return { code, order: "NONE" };
    }
    GenerateAsFreeString(): GeneratedCode {
        var code = `マウスカーソルの座標`;
        return { code, order: "NONE" };
    }

    getValues(block: BlockSvg) {
        const dx = this.valueToCode(block, 'DX', "ATOMIC");
        const dy = this.valueToCode(block, 'DY', "ATOMIC");
        const speed = this.getFieldValue(block, 'SPEED');
        return { dx, dy, speed };
    }
}

// スクロール
export class MOUSE_SCROLL extends BlockCodeGenerator {
    name = "scroll";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const directionInitial = v.isVertical ? "v" : "h";
        if (v.isMinusDirection) {
            return `mouse.${directionInitial}scroll(-(${v.delta}))\n`;
        } else {
            return `mouse.${directionInitial}scroll(${v.delta})\n`;
        }
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const direction = this.toDisplayText(v.direction);
        return `${direction}方向に${v.delta}移動する`;
    }

    getValues(block: BlockSvg) {
        const direction = this.getFieldValue(block, 'direction');
        const delta = this.valueToCode(block, 'DELTA', "ATOMIC");
        const isVertical = direction === "up" || direction === "down";
        const isHorizontal = direction === "left" || direction === "right";
        const isMinusDirection = direction === "left" || direction === "up";
        return { delta, direction, isVertical, isHorizontal, isMinusDirection };
    }

    toDisplayText(direction: string) {
        switch (direction) {
            case "up": return "上";
            case "down": return "下";
            case "left": return "左";
            case "right": return "右";
            default: return "unknown";
        }
    }
}

// テキストの入力
export class INPUT_TEXT extends BlockCodeGenerator {
    name = "input_text";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `inputText(${v.text}, ${v.interval})`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `テキスト ${v.text} を ${v.interval} 間隔で入力`;
        return code;
    }

    getValues(block: BlockSvg) {
        const text = this.valueToCode(block, 'TEXT', "ATOMIC");
        const interval = this.valueToCode(block, 'INTERVAL', "ATOMIC");
        return { text, interval };
    }
}

// 再生
export class INPUT_REPLAY extends BlockCodeGenerator {
    name = "replay";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `replay(${v.path})`;
        return code;
    }
    GenerateAsFreeString(block: BlockSvg): GeneratedCode {
        const v = this.getValues(block);
        const code = `replay(${v.path})`;
        return code;
    }

    getValues(block: BlockSvg) {
        const path = this.valueToCode(block, 'PATH', "ATOMIC");
        return { path };
    }
}
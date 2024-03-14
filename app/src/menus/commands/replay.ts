import { CommandItem, CommandPaletteOptions } from "../../models/commandPalette";
import { useCommandPaletteStore } from "../../stores/commandPaletteStore";
import { useReplayStore } from "../../stores/replayStore";

export class JumpCommandOptions extends CommandPaletteOptions {
    constructor() {
        super({});

        const store = useReplayStore();
        this.hint = `ジャンプしたい位置（0～${store.ids.length - 1}）を入力してください`
        this.closeAuto = false;
        this.filtering = false;
        this.lockModal = false;
        this.validator = {
            validate: async (text) => {
                const index = Number(text);
                if (Number.isNaN(index)) {
                    return {
                        isValid: false,
                        validationMessage: ``
                    }
                }
                if (index < 0 || index >= store.ids.length) {
                    return {
                        isValid: false,
                        validationMessage: `範囲外：0～${store.ids.length - 1}`
                    }
                }
                return {
                    isValid: true,
                    validationMessage: ``
                }
            },
        }
        this.commandItems = [
            new CommandItem({
                header: "ジャンプする",
                subHeader: "ジャンプしたい位置を指定してください",
                callback(args) {
                    const index = Number(args.text);
                    if (Number.isNaN(index)) {
                        return;
                    }
                    const cp = useCommandPaletteStore();
                    cp.close();
                    const replay = useReplayStore();
                    replay.jump(index);
                },
            })
        ]
    }
}
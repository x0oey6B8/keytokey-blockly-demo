import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";


export class COMMENT extends BlockCodeGenerator {
    name = "comment";
    GenerateAsJavascript(block: BlockSvg): GeneratedCode {
        const comment = block.getFieldValue('COMMENT') as string;
        const isNewLineIncluding = comment.includes("\n");
        if (isNewLineIncluding) {
            return `/*\n${comment}\n*/\n`;
        } else {
            return `// ${comment}\n`;
        }
    }
    GenerateAsComment(block: BlockSvg): GeneratedCode {
        return this.GenerateAsJavascript(block);
    }
}
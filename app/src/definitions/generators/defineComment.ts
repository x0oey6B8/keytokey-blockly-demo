import { BlockSvg } from "blockly";
import { BlockCodeGenerator, GeneratedCode } from "./codeGenerator";


export class COMMENT extends BlockCodeGenerator {
    name = "comment";
    generateCode(block: BlockSvg): GeneratedCode {
        const comment = block.getFieldValue('COMMENT') as string;
        const isNewLineIncluding = comment.includes("\n");
        if (isNewLineIncluding) {
            return `/*\n${comment}\n*/\n`;
        } else {
            return `// ${comment}\n`;
        }
    }
}

export class COMMENT_STATEMENT extends BlockCodeGenerator {
    name = "comment_statement";
    generateCode(block: BlockSvg): GeneratedCode {
        const comment = block.getFieldValue('COMMENT') as string;
        const statement = this.statementToCode(block, "DO", "ATOMIC");
        const code = `// ${comment}\n{\n${statement}}\n`;
        return code;
    }
}
import {window} from 'vscode';


export const convertSwitch = (): String => {
    const editor = window.activeTextEditor;

    if (!editor) {
        return '';
    }

    const document = editor.document;
    const selection = editor.selection;

    const selectedText = document.getText(selection);

    const switchRegex = /switch\s*\(([^)]+)\)\s*{([\s\S]*?)}/g;
    const caseRegex = /case\s+([^:\s]+)\s*:\s*([\s\S]*?)(?=\bcase\b|\bdefault\b|$)/g;
    const defaultRegex = /default\s*:\s*([\s\S]*?)(?=\bcase\b|$)/;

    const converted = selectedText.replace(switchRegex, (_: any, switchExpression: any, cases: any) => {
        const convertedCases = cases.replace(caseRegex, (_: any, caseValues: any, caseBody: any) => {
            const convertedStatement = caseBody.replace(/^return\s+/, '').trim();

            if (caseBody) {
                return `${caseValues} => ${convertedStatement.endsWith(';') ? convertedStatement.slice(0, -1) + ',' : convertedStatement}`;
            } else {
                return `${caseValues} ||`;
            }
        }).replace(defaultRegex, (_: any, defaultBody: any) => {
            const convertedDefault = defaultBody.replace(/^return\s+/, '').trim();
            return `_ => ${convertedDefault.endsWith(';') ? convertedDefault.slice(0, -1) + ',' : convertedDefault}`;
        });

        return `return switch (${switchExpression}) {${convertedCases}\n  };`;
    });

    editor.edit((editBuilder) => {
        editBuilder.replace(selection, converted);
    });

    return converted;
};

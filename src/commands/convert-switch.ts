export const convertSwitch = (text: string): string => {
    const switchRegex = /switch\s*\(([^)]+)\)\s*{([\s\S]*?)}/g;
    const caseRegex = /case\s+([^:\s]+)\s*:\s*([\s\S]*?)(?=\bcase\b|\bdefault\b|$)/g;
    const defaultRegex = /default\s*:\s*([\s\S]*?)(?=\bcase\b|$)/;

    const converted = text.replace(switchRegex, (_: any, switchExpression: any, cases: any) => {
        const convertedCases = cases.replace(caseRegex, (_: any, caseValues: any, caseBody: any) => {
            const convertedStatement = caseBody.replace(/^return\s+/, '').trim();
            
            const caseValuesArray = caseValues.includes('||')
                ? `(${caseValues.split(/\s+/).join(' || ')})`
                : caseValues;

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

    return converted;
};

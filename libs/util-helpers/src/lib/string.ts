import { isEmptyHtml } from './html';

export const newLineStringsFromList = (list: Array<string>) => (
    list ? list.reduce(
        (prev, curr) => (prev ? `${prev}\r\n${curr}` : curr),
        '',
    ) : ''
);

export const commaStringsFromList = (list: Array<string>) => (
    list ? list.reduce(
        (prev, curr) => (prev ? `${prev}, ${curr}` : curr),
        '',
    ) : ''
);

export const listFromNewLineStrings = (string: string) => (
    string ? string.split(/[\r\n]+/).map((d) => d.trim()) : []
);

export const listFromCommaStrings = (string: string, defaultValue = []) => (
    string ? string.split(',').map((d) => d.trim()) : defaultValue
);

export const isNullOrUndefined = (string: string) => !string || string === '' || string === 'null' || string === 'undefined';

export const trimIfString = (obj: unknown) => {
    if (typeof obj === 'string' || obj instanceof String) {
        if (isEmptyHtml(obj as string)) {
            return undefined;
        }
        return obj.trim();
    }
    return obj;
};

export const firstLetterUp = (string: string) => (string ? string.charAt(0).toUpperCase() + string.slice(1) : null);

export const caseInsensitiveContains = (inputString: string, searchString: string) => inputString && inputString.toLowerCase().indexOf(searchString) > -1;

export const generateRandomString = (length = 8) => (+new Date() + Math.random().toString(36)).slice(-length);

export const trimDown = (str: string, maxLength: number) => (str.length > maxLength ? `${str.slice(0, maxLength)}...` : str);

export const parseBoolString = (str: string | boolean | undefined) => {
    if (!str) return false;
    if (str === true) return true;
    const lowerStr = str.toLowerCase();

    return lowerStr === 'true' || lowerStr === '1';
};

export const getInitials = (name?: string, maxLength = 3) => {
    if (!name) return '';
    const aplhanumName = name.replace(/[^A-Za-z0-9]s/g, '');
    const alphanumNameSplit = aplhanumName.split(' ');
    return alphanumNameSplit.map((word, index) => (index < maxLength ? word?.[0]?.toUpperCase() : '')).join('');
};

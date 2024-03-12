import { newLineStringsFromList } from '../string';

test('Returns empty string when list is empty', () => {
    const list: string[] = [];
    const result = newLineStringsFromList(list);
    expect(result).toBe('');
});

test('Returns single string when list has only one element', () => {
    const list = ['Hello'];
    const result = newLineStringsFromList(list);
    expect(result).toBe('Hello');
});

test('Returns strings separated by new lines', () => {
    const list = ['Hello', 'World', 'GitHub', 'Copilot'];
    const result = newLineStringsFromList(list);
    expect(result).toBe('Hello\r\nWorld\r\nGitHub\r\nCopilot');
});

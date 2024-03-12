import { isInBetween } from '../number';

test('Returns true when score is within the range', () => {
    const result = isInBetween(5, 0, 10);
    expect(result).toBe(true);
});

test('Returns true when score is equal to the minimum value', () => {
    const result = isInBetween(0, 0, 10);
    expect(result).toBe(true);
});

test('Returns true when score is equal to the maximum value', () => {
    const result = isInBetween(10, 0, 10);
    expect(result).toBe(true);
});

test('Returns false when score is less than the minimum value', () => {
    const result = isInBetween(-5, 0, 10);
    expect(result).toBe(false);
});

test('Returns false when score is greater than the maximum value', () => {
    const result = isInBetween(15, 0, 10);
    expect(result).toBe(false);
});

test('Returns true when only minimum value is provided and score is equal to the minimum value', () => {
    const result = isInBetween(0, 0);
    expect(result).toBe(true);
});

test('Returns true when only maximum value is provided and score is equal to the maximum value', () => {
    const result = isInBetween(10, undefined, 10);
    expect(result).toBe(true);
});

test('Returns true when no range is provided', () => {
    const result = isInBetween(5);
    expect(result).toBe(true);
});

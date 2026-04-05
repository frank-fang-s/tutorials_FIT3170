import { describe, test, expect } from 'vitest';
import { add, subtract, multiply, divide } from './App';

describe('Pure Math Functions', () => {
    test('adds two numbers correctly', () => {
        expect(add(2, 3)).toBe(5);
        expect(add(-5, 10)).toBe(5);
    });

    test('subtracts two numbers correctly', () => {
        expect(subtract(10, 4)).toBe(6);
        expect(subtract(5, 10)).toBe(-5);
    });

    test('multiplies two numbers correctly', () => {
        expect(multiply(4, 3)).toBe(12);
        expect(multiply(4, -3)).toBe(-12);
        expect(multiply(-4, -3)).toBe(12);
    });

    test('divides two numbers correctly', () => {
        expect(divide(20, 5)).toBe(4);
    });

    test('returns Error when dividing by zero', () => {
        expect(divide(5, 0)).toBe('Error');
    });
});

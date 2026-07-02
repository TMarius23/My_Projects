import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {formatExactDate, formatRelativeDate} from '@shared/utils/dateFormat.js';

describe('formatRelativeDate', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('returns "recently" for null', () => {
        expect(formatRelativeDate(null)).toBe('recently');
    });

    it('returns "recently" for undefined', () => {
        expect(formatRelativeDate(undefined)).toBe('recently');
    });

    it('returns "recently" for empty string', () => {
        expect(formatRelativeDate('')).toBe('recently');
    });

    it('returns "just now" for less than 60 seconds ago', () => {
        vi.setSystemTime(new Date('2024-06-01T12:00:30Z'));
        expect(formatRelativeDate('2024-06-01T12:00:00Z')).toBe('just now');
    });

    it('returns "just now" for 59 seconds ago', () => {
        vi.setSystemTime(new Date('2024-06-01T12:00:59Z'));
        expect(formatRelativeDate('2024-06-01T12:00:00Z')).toBe('just now');
    });

    it('returns "1m ago" for exactly 1 minute ago', () => {
        vi.setSystemTime(new Date('2024-06-01T12:01:00Z'));
        expect(formatRelativeDate('2024-06-01T12:00:00Z')).toBe('1m ago');
    });

    it('returns "5m ago" for 5 minutes ago', () => {
        vi.setSystemTime(new Date('2024-06-01T12:05:00Z'));
        expect(formatRelativeDate('2024-06-01T12:00:00Z')).toBe('5m ago');
    });

    it('returns "59m ago" for 59 minutes ago', () => {
        vi.setSystemTime(new Date('2024-06-01T12:59:00Z'));
        expect(formatRelativeDate('2024-06-01T12:00:00Z')).toBe('59m ago');
    });

    it('returns "1h ago" for exactly 1 hour ago', () => {
        vi.setSystemTime(new Date('2024-06-01T13:00:00Z'));
        expect(formatRelativeDate('2024-06-01T12:00:00Z')).toBe('1h ago');
    });

    it('returns "3h ago" for 3 hours ago', () => {
        vi.setSystemTime(new Date('2024-06-01T15:00:00Z'));
        expect(formatRelativeDate('2024-06-01T12:00:00Z')).toBe('3h ago');
    });

    it('returns "23h ago" for 23 hours ago', () => {
        vi.setSystemTime(new Date('2024-06-01T11:00:00Z'));
        expect(formatRelativeDate('2024-05-31T12:00:00Z')).toBe('23h ago');
    });

    it('returns "yesterday, ..." for 1 day ago', () => {
        vi.setSystemTime(new Date('2024-06-02T14:00:00Z'));
        const result = formatRelativeDate('2024-06-01T14:00:00Z');
        expect(result).toMatch(/^yesterday,\s/);
    });

    it('returns "2 days ago, ..." for 2 days ago', () => {
        vi.setSystemTime(new Date('2024-06-03T12:00:00Z'));
        const result = formatRelativeDate('2024-06-01T12:00:00Z');
        expect(result).toMatch(/^2 days ago,\s/);
    });

    it('returns "6 days ago, ..." for 6 days ago', () => {
        vi.setSystemTime(new Date('2024-06-07T12:00:00Z'));
        const result = formatRelativeDate('2024-06-01T12:00:00Z');
        expect(result).toMatch(/^6 days ago,\s/);
    });

    it('returns full date string for 7 or more days ago', () => {
        vi.setSystemTime(new Date('2024-06-08T12:00:00Z'));
        const result = formatRelativeDate('2024-06-01T12:00:00Z');
        expect(result).toMatch(/01 Jun 2024/);
    });

    it('includes a time portion for yesterday', () => {
        vi.setSystemTime(new Date('2024-06-02T14:00:00Z'));
        const result = formatRelativeDate('2024-06-01T14:00:00Z');
        expect(result).toMatch(/\d{2}:\d{2}$/);
    });

    it('includes a time portion for the full date format', () => {
        vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
        const result = formatRelativeDate('2024-06-01T10:00:00Z');
        expect(result).toMatch(/\d{2}:\d{2}$/);
    });
});

describe('formatExactDate', () => {
    it('returns empty string for null', () => {
        expect(formatExactDate(null)).toBe('');
    });

    it('returns empty string for empty string', () => {
        expect(formatExactDate('')).toBe('');
    });

    it('includes the day, month, year and time', () => {
        const result = formatExactDate('2024-06-15T10:30:00Z');
        expect(result).toMatch(/15/);
        expect(result).toMatch(/Jun/);
        expect(result).toMatch(/2024/);
    });

    it('returns a non-empty string for a valid date', () => {
        const result = formatExactDate('2024-01-01T00:00:00Z');
        expect(result.length).toBeGreaterThan(0);
    });
});

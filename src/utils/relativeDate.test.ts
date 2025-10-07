import { describe, expect, it } from 'vitest';
import { getRelativeDate } from './relativeDate';

describe('getRelativeDate', () => {
    const pastDate = new Date("2025-10-07T10:00:00");

    const testCases = [
        { date: "2025-10-07T10:00:00", expected: "now" },
        { date: "2025-10-07T10:01:00", expected: "1 minute ago" },
        { date: "2025-10-07T10:02:00", expected: "2 minutes ago" },
        { date: "2025-10-07T11:00:00", expected: "1 hour ago" },
        { date: "2025-10-07T12:00:00", expected: "2 hours ago" },
        { date: "2025-10-08T11:00:00", expected: "1 day ago" },
        { date: "2025-10-09T11:00:00", expected: "2 days ago" },
        { date: "2025-10-14T11:00:00", expected: "1 week ago" },
        { date: "2025-10-21T11:00:00", expected: "2 weeks ago" },
        { date: "2025-11-07T11:00:00", expected: "1 month ago" },
        { date: "2025-12-07T11:00:00", expected: "2 months ago" },
    ];

    testCases.forEach(({ date, expected }) => {
        it(`Should display "${expected}"`, () => {
            const newDate = new Date(date);
            expect(getRelativeDate(pastDate, newDate)).toBe(expected);
        });
    });
});


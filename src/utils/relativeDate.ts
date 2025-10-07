// Time unit constants in minutes
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 24 * MINUTES_IN_HOUR;
const MINUTES_IN_WEEK = 7 * MINUTES_IN_DAY;
const MINUTES_IN_MONTH = 30 * MINUTES_IN_DAY;

type TimeUnit = 'minute' | 'hour' | 'day' | 'week' | 'month';

/**
 * Formats a time difference into a human-readable relative date string
 */
const formatRelativeTime = (value: number, unit: TimeUnit): string => {
    const plural = value > 1 ? 's' : '';
    return `${value} ${unit}${plural} ago`;
};

/**
 * Calculates the difference between two dates in minutes
 */
const getTimeDifferenceInMinutes = (pastDate: Date, newDate: Date): number => {
    return Math.abs(newDate.getTime() - pastDate.getTime()) / (1000 * 60);
};

/**
 * Returns a human-readable relative date string
 * @param pastDate - The past date to compare
 * @param newDate - The current/reference date
 * @returns A string like "2 hours ago", "1 day ago", etc.
 */
export const getRelativeDate = (pastDate: Date, newDate: Date): string => {
    const differenceInMinutes = getTimeDifferenceInMinutes(pastDate, newDate);

    if (differenceInMinutes < 1) {
        return 'now';
    }

    if (differenceInMinutes < MINUTES_IN_HOUR) {
        return formatRelativeTime(Math.floor(differenceInMinutes), 'minute');
    }

    if (differenceInMinutes < MINUTES_IN_DAY) {
        return formatRelativeTime(Math.floor(differenceInMinutes / MINUTES_IN_HOUR), 'hour');
    }

    if (differenceInMinutes < MINUTES_IN_WEEK) {
        return formatRelativeTime(Math.floor(differenceInMinutes / MINUTES_IN_DAY), 'day');
    }

    if (differenceInMinutes < MINUTES_IN_MONTH) {
        return formatRelativeTime(Math.floor(differenceInMinutes / MINUTES_IN_WEEK), 'week');
    }

    return formatRelativeTime(Math.floor(differenceInMinutes / MINUTES_IN_MONTH), 'month');
}

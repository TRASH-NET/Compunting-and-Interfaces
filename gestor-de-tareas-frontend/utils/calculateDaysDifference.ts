export const calculateDaysDifference = (startDate: Date, endDate: Date): number => {
    const start = new Date(startDate.toISOString().split('T')[0]);
    const end = new Date(endDate.toISOString().split('T')[0]);

    const timeDiff = end.getTime() - start.getTime();

    return Math.floor(timeDiff / (1000 * 3600 * 24));
};
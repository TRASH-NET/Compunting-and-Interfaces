import { calculateDaysDifference } from "./calculateDaysDifference";

export const getColorClass = (finishDate: Date): string => {
    const currentDate = new Date();
    const finish = new Date(finishDate);

    const daysDifference = calculateDaysDifference(currentDate, finish);
    if (daysDifference <= 0) {
        return 'text-red-500';
    } else if (daysDifference >= 1 && daysDifference <= 2) {
        return 'text-amber-500';
    } else if (daysDifference > 2) {
        return 'text-green-500';
    } else {
        return 'text-gray-700';
    }

};
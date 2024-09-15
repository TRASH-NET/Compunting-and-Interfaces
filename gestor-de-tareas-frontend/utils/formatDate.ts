export const formatDate = (isoDateString: Date): string => {

    const date = new Date(isoDateString);

    const formatedDate = date.toLocaleString('en-US');

    return formatedDate;
}
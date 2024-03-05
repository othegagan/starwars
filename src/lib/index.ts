export const formatLargeNumber = (number: number): string => {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(('' + number).length / 3);
    let shortNumber: number;

    if (suffixNum !== 0) {
        shortNumber = number / Math.pow(1000, suffixNum);
    } else {
        shortNumber = number;
    }

    shortNumber = parseFloat(shortNumber.toPrecision(2));

    if (shortNumber % 1 !== 0) {
        shortNumber = parseFloat(shortNumber.toFixed(1));
    }

    return shortNumber + suffixes[suffixNum] || "";
}



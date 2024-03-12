export const moduloBase1 = (number: number, modulo: number) => {
    let nr = ((number - 1) % modulo) + 1;

    while (nr < 1) {
        nr += modulo;
    }

    return nr;
};

export const isInBetween = (score: number, min?: number, max?:number) => {
    if (min !== undefined) {
        if (score < min) return false;
    }
    if (max !== undefined) {
        if (score > max) return false;
    }
    return true;
};

// Finds the number(s) in a list with the highest occurence.
// If several modes are present (bimodal or multimodal) it returns the avg of the numbers.
export const getMode = (list: Array<number>) => {
    let max = 0;
    const counts:{ [key: string]: number; } = {};

    list.forEach((num) => {
        counts[num] = counts[num] ? counts[num] + 1 : 1;

        if (counts[num] > max) {
            max = counts[num];
        }
    });
    const modes = Object.keys(counts).filter((key) => counts[key] === max).map(Number);

    return modes.length >= 2 ? Math.round(modes.reduce((acc, curr) => acc + curr) / modes.length) : modes[0];
};

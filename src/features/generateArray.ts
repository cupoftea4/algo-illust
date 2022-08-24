import { SortTypeId } from "../types";

// This functions are needed for my university. You can use just random numbers

const VARIANT = 12;

const getWayToGenerateArray = (sortType: SortTypeId): number => {
    switch (sortType) {
        case "bubble":
            return VARIANT;
        case "selection":
            return VARIANT + 1;
        case "shell":
            return VARIANT + 2;
        case "quick":
            return VARIANT + 3;
        case "merge":
            return VARIANT + 4;
        case "counting":
            return VARIANT + 5;
        default:
            return VARIANT;
    }
};


const generateArray = (length: number, sortType: SortTypeId): number[] | void => {
    console.log("Generating array...");
    const way = getWayToGenerateArray(sortType);
    const array = Array.from({ length }, () => Math.floor(Math.random() * 100) * (Math.floor(Math.random() * 2) === 1 ? 1 : -1));
    console.log("Random array: ", array);
    switch (way) {
        case 11:
            
        case 12:
            const maxIndex = array.indexOf(Math.max(...array));
            const arrayAfterMax = array.slice(maxIndex);
            console.log("Array after max: ", arrayAfterMax);       
            return arrayAfterMax;
        case 13:
            const arrayWithoutMultiples = array.filter(item => item % 3 !== 0);
            console.log("Array without multiples: ", arrayWithoutMultiples);
            const arrayWithPower2 = arrayWithoutMultiples.map(item => item * item);
            console.log("Array with power 2: ", arrayWithPower2);
            return arrayWithPower2;
        case 14:
            const cities = ['London', 'New York', 'Paris', 'Berlin', 'Madrid', 'Rome', 'Barcelona', 'Kiev', 'Minsk',
             'Warsaw', 'Prague', 'Budapest', 'Vienna', 'Bratislava', 'Bucharest', 'Belgrade', 'Brno', 'Copenhagen', 'Helsinki',
             'Krakow', 'Lisbon', 'Ljubljana', 'Luxembourg', 'Madrid', 'Munich', 'Oslo', 'Paris', 'Prague', 'Riga',
             'Rome', 'Sarajevo', 'Skopje', 'Stockholm', 'Vienna', 'Vilnius', 'Zagreb'];
            cities.filter(item => item.length < 8);
            console.log("Cities: ", cities);
            break;
        case 15:
            const matrix = Array.from({ length: length }, () => Array.from({ length: length }, () => Math.floor(Math.random() * 100)));
            console.log("Matrix: ", matrix);
            break;
        case 16:
            const min = Math.min(...array);
            const arrayWithMin = array.map(item => item < 0 ? item * min : item);
            return arrayWithMin;
        case 17:
            // До всіх парних елементів застосувати функцію tg(x) - x, до непарних - функцію |x|.
            const arrayWithTg = array.map(item => item % 2 === 0 ? Math.tan(item) - item : Math.abs(item));
            return arrayWithTg;
        default:
            break;
    }
    return;
};

export default generateArray;
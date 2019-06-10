// @ts-ignore
import { PAGE, SORT, ORDER, ID, NAME, DESIGNATION, JOINING_DATE, DEPARTMENT } from 'Constants/Constants';

export const isValidRoute = ({ page, sort, order, check }: any) => {
    switch(check) {
        case PAGE:
            return Number.isInteger(parseInt(page)) ? true : false;
        case SORT:
            if ([ID, NAME, DESIGNATION, JOINING_DATE, DEPARTMENT].includes(sort)) return true;
            return false;
        case ORDER:
            return order == 'asc' || order == 'desc' ? true : false;
        default: return false;
    }
}
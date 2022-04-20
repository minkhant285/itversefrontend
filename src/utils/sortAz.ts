import { Product } from "../models";

export function sortItems(a: Product, b: Product) {
    if (a.item_name < b.item_name) {
        return -1;
    }
    if (a.item_name > b.item_name) {
        return 1;
    }
    return 0;
}

import { Item } from "src/models/item";

export interface ItemUpdaterInterface {
    updateQuality(item: Item): Item;
}
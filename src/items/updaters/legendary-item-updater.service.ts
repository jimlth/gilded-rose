import { Item } from "src/models/item";
import { ItemUpdaterInterface } from "../item-updater.interface";

export class LegendaryItemUpdater implements ItemUpdaterInterface {
    updateQuality(item: Item): Item {
        // Legendary items never change
        return { ...item };
    }
}
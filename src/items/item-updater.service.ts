import { Item } from "src/models/item";
import { ItemUpdaterFactory } from "./item-updater.factory";

export class ItemUpdaterService {
    // Get the item with updated quality
    getUpdatedItemQuality(item: Item): Item {
        const itemUpdater = ItemUpdaterFactory.getItemUpdater(item);

        return itemUpdater.updateQuality(item);
    }

    // Get items with updated quality
    getUpdatedItemsQuality(items: Item[]): Item[] {
        return items.map((item) => this.getUpdatedItemQuality(item));
    }
}
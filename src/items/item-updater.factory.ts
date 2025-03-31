import { Item } from "src/models/item";
import { ItemUpdaterInterface } from "./item-updater.interface";
import { AgedBrieUpdater } from "./updaters/aged-brie-updater.service";
import { StandardItemUpdater } from "./updaters/standard-item-updater.service";
import { BackstagePassesUpdater } from "./updaters/backstage-pass-updater.service";
import { LegendaryItemUpdater } from "./updaters/legendary-item-updater.service";
import { ConjuredItemUpdater } from "./updaters/conjured-item-updater.service";

const STANDARD_ITEM_ALIAS = 'standard';
const CONJURED_ITEM_ALIAS = 'conjured';
const LEGENDARY_ITEM_ALIAS = 'legendary';
const BACKSTAGE_PASSES_ALIAS = 'backstage_passes';
const CONJURED_ITEM_NAME_PREFIX = 'conjured';
const BACKSTAGE_PASSES_ITEM_PREFIX = 'backstage passes';

export class ItemUpdaterFactory {
    private static itemUpdaters: Record<string, ItemUpdaterInterface> = {
        [STANDARD_ITEM_ALIAS]: new StandardItemUpdater(), // alias for standard items
        'aged brie': new AgedBrieUpdater(),
        [BACKSTAGE_PASSES_ALIAS]: new BackstagePassesUpdater(),
        [LEGENDARY_ITEM_ALIAS]: new LegendaryItemUpdater(), // alias for legendary items, like sulfuras
        [CONJURED_ITEM_ALIAS]: new ConjuredItemUpdater(), // alias for conjured items
    };

    // Get item updater instance by item name
    static getItemUpdater(item: Item): ItemUpdaterInterface {
        // Lowercase item name for normalized match
        const lowercaseItemName = item.name.toLowerCase();

        const itemUpdater = this.itemUpdaters[lowercaseItemName];

        // Direct match for explicitly listed items
        // i.e. "aged brie"
        if (itemUpdater != null) {
            return itemUpdater;
        }

        // Match conjured items by prefix
        if (lowercaseItemName.startsWith(CONJURED_ITEM_NAME_PREFIX)) {
            return this.itemUpdaters[CONJURED_ITEM_ALIAS];
        }

        // Match backstage passes by prefix
        if (lowercaseItemName.startsWith(BACKSTAGE_PASSES_ITEM_PREFIX)) {
            return this.itemUpdaters[BACKSTAGE_PASSES_ALIAS];
        }

        // Match legendary items, like Sulfuras
        if (this.isLegendaryItem(lowercaseItemName)) {
            return this.itemUpdaters[LEGENDARY_ITEM_ALIAS];
        }

        // Default to standard items if no match was found
        return this.itemUpdaters[STANDARD_ITEM_ALIAS];
    }

    private static isLegendaryItem(itemName: string): boolean {
        return itemName.includes('sulfuras') || itemName.includes(LEGENDARY_ITEM_ALIAS);
    }
}
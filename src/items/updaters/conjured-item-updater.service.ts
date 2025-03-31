import { Item } from "src/models/item";
import { ItemUpdaterInterface } from "../item-updater.interface";

export class ConjuredItemUpdater implements ItemUpdaterInterface {
    updateQuality(item: Item): Item {
        const { sellIn, quality } = item;

        // Update sellIn by removing one day
        const updatedSellIn = sellIn - 1;

        // Get the quality rate associated with the updated sellIn
        const qualityRate = this.getQualityChangeRate(updatedSellIn);

        // Update quality by decreasing it according to its rate
        // Item quality cannot be lower than 0
        const updatedQuality = Math.max(0, quality - qualityRate);

        return { ...item, sellIn: updatedSellIn, quality: updatedQuality };
    }

    private getQualityChangeRate(sellIn: number): number {
        // Normal items degrade by 1 or 2 depending on sellIn value, conjured items degrade twice as fast (2 or 4)
        return sellIn < 0 ? 4 : 2;
    }
}
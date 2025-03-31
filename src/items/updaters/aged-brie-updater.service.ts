import { Item } from "src/models/item";
import { ItemUpdaterInterface } from "../item-updater.interface";

export class AgedBrieUpdater implements ItemUpdaterInterface {
    updateQuality(item: Item): Item {
        const { sellIn, quality } = item;

        // Update sellIn by removing one day
        const updatedSellIn = sellIn - 1;

        // Get the quality rate associated with the updated sellIn
        const qualityRate = this.getQualityChangeRate(updatedSellIn);

        // Update quality by increasing it according to its rate
        // Item quality cannot be higher than 50
        const updatedQuality = Math.min(50, quality + qualityRate);

        return { ...item, sellIn: updatedSellIn, quality: updatedQuality };
    }

    private getQualityChangeRate(sellIn: number): number {
        // If sellIn is lower than 0, quality rate is 2. Otherwise, quality rate is 1.
        return sellIn < 0 ? 2 : 1;
    }
}
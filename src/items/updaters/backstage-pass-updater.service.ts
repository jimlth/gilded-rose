import { Item } from "src/models/item";
import { ItemUpdaterInterface } from "../item-updater.interface";

export class BackstagePassesUpdater implements ItemUpdaterInterface {
    updateQuality(item: Item): Item {
        const { sellIn, quality } = item;

        // Update sellIn by removing one day
        const updatedSellIn = sellIn - 1;

        // Get the quality rate associated with the updated sellIn
        const qualityRate = this.getQualityChangeRate(updatedSellIn, quality);

        // Update quality by increasing it according to its rate
        // Item quality cannot be higher than 50
        const updatedQuality = Math.min(50, quality + qualityRate);

        return { ...item, sellIn: updatedSellIn, quality: Math.min(50, updatedQuality) };
    }

    private getQualityChangeRate(sellIn: number, quality: number): number {
        // Quality drops to 0 after the concert
        if (sellIn < 0) {
            return -quality;
        }

        // Quality increases by 3 when there 5 days or less
        if (sellIn <= 5) {
            return 3;
        }

        // Quality increases by 2 when there are 10 days or less
        if (sellIn <= 10) {
            return 2;
        }

        // Quality increases by 1 as its sellIn value approaches
        return 1;
    }
}
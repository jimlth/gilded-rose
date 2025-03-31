import { Item } from "./models/item";

export class GildedRose {
  items: Array<Item>;

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality() {
    const updatedItems = this.items.map((item) => {
      let { name, sellIn, quality } = item;

      if (name != 'Aged Brie' && name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (quality > 0) {
          if (name != 'Sulfuras, Hand of Ragnaros') {
            quality--;
          }
        }
      } else {
        if (quality < 50) {
          quality++;

          if (name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (sellIn < 11) {
              if (quality < 50) {
                quality++;
              }
            }

            if (sellIn < 6) {
              if (quality < 50) {
                quality++;
              }
            }
          }
        }
      }

      if (name != 'Sulfuras, Hand of Ragnaros') {
        sellIn--;
      }

      if (sellIn < 0) {
        if (name != 'Aged Brie') {
          if (name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (quality > 0) {
              if (name != 'Sulfuras, Hand of Ragnaros') {
                quality--;
              }
            }
          } else {
            quality = quality - quality
          }
        } else {
          if (quality < 50) {
            quality++;
          }
        }
      }

      return { name, sellIn, quality } as Item;
    });

    this.items = updatedItems;

    return this.items;
  }
}

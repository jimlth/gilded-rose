import { GildedRose } from "src/gilded-rose";
import { Item } from "src/models/item";


describe('Gilded Rose', () => {
  it('should decrease quality and sellIn for normal items', () => {
    const items = [new Item('Normal Item', 10, 20)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].sellIn).toBe(9);
    expect(updatedItems[0].quality).toBe(19);
  });

  it('should degrade quality twice as fast after sellIn date', () => {
    const items = [new Item('Normal Item', 0, 20)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(18);
  });

  it('should never allow quality to go below 0', () => {
    const items = [new Item('Normal Item', 5, 0)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(0);
  });

  it('should increase quality for Aged Brie', () => {
    const items = [new Item('Aged Brie', 10, 30)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(31);
  });

  it('should not increase quality above 50 for Aged Brie', () => {
    const items = [new Item('Aged Brie', 5, 50)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(50);
  });

  it('should not change Sulfuras', () => {
    const items = [new Item('Sulfuras, Hand of Ragnaros', 0, 80)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].sellIn).toBe(0);
    expect(updatedItems[0].quality).toBe(80);
  });

  it('should increase quality for Backstage passes', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(21);
  });

  it('should drop Backstage pass quality to 0 after concert', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(0);
  });

  it('should degrade Conjured items twice as fast', () => {
    const items = [new Item('Conjured Mana Cake', 5, 10)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(8);
  });

  it('should degrade Conjured items twice as fast after sellIn date', () => {
    const items = [new Item('Conjured Mana Cake', 0, 10)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(6);
  });

  it('should correctly update an item over multiple updates', () => {
    const items = [new Item('Normal Item', 2, 5)];
    const gildedRose = new GildedRose(items);

    // First update (sellIn = 1, quality = 4)
    const updatedItemsFirst = gildedRose.updateQuality();
    expect(updatedItemsFirst[0].sellIn).toBe(1);
    expect(updatedItemsFirst[0].quality).toBe(4);

    // Second update (sellIn = 0, quality = 2)
    const updatedItemsSecond = gildedRose.updateQuality();
    expect(updatedItemsSecond[0].sellIn).toBe(0);
    expect(updatedItemsSecond[0].quality).toBe(3);

    // Third update (sellIn < 0, quality = 0)
    const updatedItemsThird = gildedRose.updateQuality();
    expect(updatedItemsThird[0].sellIn).toBe(-1);
    expect(updatedItemsThird[0].quality).toBe(1);
  });

  it('should increase Backstage Passes quality by 2 when sellIn is between 6 and 10', () => {
    const items = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20),
      new Item('Backstage passes to a TAFKAL80ETC concert', 8, 15)
    ];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(22); // 20 + 2
    expect(updatedItems[1].quality).toBe(17); // 15 + 2
  });

  it('should increase Backstage Passes quality by 3 when sellIn is 5 or less', () => {
    const items = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 3, 10),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 15)
    ];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(13); // 10 + 3
    expect(updatedItems[1].quality).toBe(18); // 15 + 3
  });

  it('should drop Backstage Passes quality to 0 when sellIn is less than 0', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 40)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].sellIn).toBe(-1);
    expect(updatedItems[0].quality).toBe(0);
  });

  it('should keep Backstage Passes quality to 0 when sellIn is less than 0', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].sellIn).toBe(-2);
    expect(updatedItems[0].quality).toBe(0);
  });

  it('should degrade Conjured items twice as fast when sellIn is 1', () => {
    const items = [
      new Item('Conjured Mana Cake', 1, 10),
      new Item('Conjured Mana Cake', 0, 10)
    ];
    const gildedRose = new GildedRose(items);

    // First update (sellIn = 0, quality = 8)
    const updatedItemsFirst = gildedRose.updateQuality();
    expect(updatedItemsFirst[0].sellIn).toBe(0);
    expect(updatedItemsFirst[0].quality).toBe(8);

    // Second update (sellIn < 0, quality = 4)
    const updatedItemsSecond = gildedRose.updateQuality();
    expect(updatedItemsSecond[0].sellIn).toBe(-1);
    expect(updatedItemsSecond[0].quality).toBe(4);
  });

  it('should continue increasing quality for Aged Brie after sellIn date', () => {
    const items = [new Item('Aged Brie', 0, 30)];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(32); // Quality still increases after sellIn < 0
  });
});

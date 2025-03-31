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
});

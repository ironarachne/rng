'use strict';

import random from 'random';

export function simple(max: number): number {
  /**
   * This function takes a maximum value and returns a random number between 1
   * and that value.
   * 
   * @param {Number} max - The maximum value to return
   * @returns {Number} - A random number between 1 and the maximum value
   */
  return random.int(1, max);
}

export function item(items: any[]) {
  /**
   * This function takes an array and returns a random item from it.
   * 
   * @param {Array} items - The array to get the item from
   * @returns {Any} - A random item from the array
   */
  return items[random.int(0, items.length - 1)];
}

export function bellFloat(min: number, max: number): number {
  /**
   * This function takes a minimum and maximum value and returns a random float
   * between them, weighted towards the middle.
   * 
   * @param {Number} min - The minimum value to return
   * @param {Number} max - The maximum value to return
   * @returns {Number} - A random float between the minimum and maximum values
   */
  const divisor = (max - min) / 3;

  let result = min;

  for (let i = 0; i < 3; i++) {
    result += random.float(0, divisor);
  }

  return result;
}

export function randomSet(itemCount: number, items: any[]): any[] {
  /**
   * This function takes an array and returns a random set of items from it.
   * 
   * @param {Number} itemCount - The number of items to return
   * @param {Array} items - The array to get the items from
   * @returns {Array} - A random set of items from the array
   */
  let result: any = [];

  items = shuffle(items);

  for (let i = 0; i < itemCount; i++) {
    result.push(items.pop());
  }

  return result;
}

export function randomString(length: number): string {
  /**
   * This function takes a length and returns a random string of that length.
   * 
   * @param {Number} length - The length of the string to return
   * @returns {String} - A random string of the specified length
   */
  let result: string = '';

  for (let i = 0; i < length; i++) {
    result += Math.random().toString(36).slice(2)[0];
  }

  return result;
}

export function shuffle(items: any[]) {
  /**
   * This function takes an array and returns a shuffled version of it.
   * 
   * @param {Array} items - An array of items to shuffle
   * @returns {Array} - A shuffled version of the array
   */
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }

  return items;
}

export function weighted(items: any[]) {
  /**
   * This function takes an array of objects with a commonality property
   * and returns a random result, weighted by the commonality property.
   * 
   * @param {Array} items - An array of objects with a commonality property
   * @returns {Object} - A random object from the array, weighted by the commonality property
   */
  let ceiling = 0;

  if (items.length == 1) {
    return items[0];
  }

  items.forEach(function (item: any) {
    ceiling += item.commonality;
  });

  let randomValue = random.int(0, ceiling);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    randomValue -= item.commonality;
    if (randomValue <= 0) {
      return item;
    }
  }

  throw new Error(
    `Tried to get weighted result from array with length ${items.length}, failed to get anything back`,
  );
}

/* eslint-disable no-trailing-spaces */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-delimiter-style */
export class ArrayHelper {
  static sortNumberArray(a: number, b: number): number {
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }

  static sortNumberValues(
    a: { name: string; rank: number },
    b: { name: string; rank: number }
  ): number {
    return a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : 0;
  }

  static sortStringValues(
    a: { name: string; rank: number },
    b: { name: string; rank: number }
  ): number {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  }

  static numberOfRepetitions(val: number, arr: number[]): number {
    let count: number = 0;
    arr.forEach(item => {
      if (item === val) count++;
    });

    return count;
  }
}

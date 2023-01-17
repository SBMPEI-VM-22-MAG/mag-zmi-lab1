/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable curly */
/* eslint-disable prefer-const */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */

export interface IRow {
  value: number[];
}

export class BaseModel {
  private _table: IRow[] = [];

  private _cols: number = 0;
  private _rows: number = 0;

  public get IsNotEmpty(): boolean {
    if (this._cols !== 0 || this._rows !== 0) return true;
    else return false;
  }

  public get colsCount(): number {
    return this._cols;
  }

  public get rowsCount(): number {
    return this._rows;
  }

  public get table(): IRow[] {
    if (this._cols === 0 || this._rows === 0) return [];
    return this._table;
  }

  public getRowValues(idx: number): IRow {
    if(this._table.length > 0 && idx <= this._table.length) {
      return this._table[idx];
    } else {
      return null;
    }
  }

  public setRowValues(idx: number, row: IRow) {
    if(this._table.length > 0 && idx <= this._table.length) {
      this._table[idx] = row;
    }
  }

  public getColValues(idx: number): IRow {
    let res: IRow;
    if (this._table.length > 0) {
      if (this._table[0].value.length > 0 && idx <= this._table[0].value.length) {
        let values: number[] = [];
        this._table.forEach((item) => values.push(item.value[idx]));
        res.value = values;
        return res;
      } else return null;
    } else return null;
  }

  public setColValues(idx: number, row: IRow) {
    if (this._table.length > 0 && row.value.length === this._table.length) {
      if (this._table[0].value.length > 0 && idx <= this._table[0].value.length) {
        let i = 0;
        this._table.forEach((item) => {
          item.value[idx] = row.value[i];
          i++;
        });
      }
    }
  }

  constructor(
    cols: number,
    rows: number
  ) {
    this._cols = cols;
    this._rows = rows;

    if (cols !== 0 && rows !== 0) {
      for(let i = 0; i < rows; i++) {
        let rowVals: IRow = { value: [] };
        for(let j = 0; j < cols; j++) {
          rowVals.value.push(j + 1);
        }
        this._table.push(rowVals);
      }
    }
  }
}

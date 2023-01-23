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

  public setRowValues(idx: number, row: IRow) {
    if(this._table.length > 0 && idx <= this._table.length) {
      this._table[idx] = row;
    }
  }

  constructor(
    cols: number,
    rows: number,
    table: IRow[] = []
  ) {
    if (table.length === 0) this._constructorByColsRows(cols, rows);
    else this._constructorByColsRowsAndTable(cols, rows, table);
  }

  private _constructorByColsRows(
    cols: number,
    rows: number,
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

  private _constructorByColsRowsAndTable(
    cols: number,
    rows: number,
    table: IRow[]
  ) {
    this._cols = cols;
    this._rows = rows;

    if (cols !== 0 && rows !== 0) {
      table.forEach(row => this._table.push(row));
    }
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class NamesService {
  private _names: string[];
  constructor() {
    this._names = [];
  }

  createName(name: string) {
    const nameExists = this._names.find((n) => n.toLowerCase().trim() == name.toLowerCase().trim());

    if (!nameExists) {
      this._names.push(name);
      return true;
    } else {
      return false;
    }
  }

  getNames(start?: string) {
    if (start) {
      return this._names.filter((n) => n.toLowerCase().startsWith(start.toLowerCase()));
    } else {
      return this._names;
    }
  }

  updateName(name: string, newName: string) {
    const nameIndex = this._names.findIndex((n) => n.toLowerCase().trim() == name.toLowerCase().trim());
    const newNameExists = this._names.find((n) => n.toLowerCase().trim() == newName.toLowerCase().trim());

    if (nameIndex > -1 && !newNameExists) {
      this._names[nameIndex] = newName;
      return true;
    } else {
      return false;
    }
  }

  deleteName(name: string) {
    const nameIndex = this._names.findIndex((n) => n.toLowerCase().trim() == name.toLowerCase().trim());

    if (nameIndex > -1) {
      this._names.splice(nameIndex, 1);
      return true;
    } else {
      return false;
    }
  }
}

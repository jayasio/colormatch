class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  isEqualTo(other: Vector) {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }
}

export class CoordVector extends Vector {
  constructor(x: number, y: number, z: number) {
    super(x, y, z);
  }

  static random(max: number) {
    function randomize(max: number) {
      return Math.floor(Math.random() * max);
    }

    return new CoordVector(randomize(max), randomize(max), randomize(max));
  }

  toPercent(max: number) {
    function calcPercent(val: number, max: number) {
      return Math.round((val / (max - 1)) * 100);
    }

    return new PercentVector(
      calcPercent(this.x, max),
      calcPercent(this.y, max),
      calcPercent(this.z, max),
    );
  }

  toColor(max: number) {
    function calcColor(val: number, max: number) {
      return Math.ceil((val / (max - 1)) * 255);
    }

    return new ColorVector(
      calcColor(this.x, max),
      calcColor(this.y, max),
      calcColor(this.z, max),
    );
  }
}

export class ColorVector extends Vector {
  constructor(x: number, y: number, z: number) {
    super(x, y, z);
  }

  toString() {
    return `rgb(${this.x},${this.y},${this.z})`;
  }

  getLuminance() {
    const luminance = (0.299 * this.x + 0.587 * this.y + 0.114 * this.z) / 255;
    return luminance > 0.5 ? "light" : "dark";
  }
}

export class PercentVector extends Vector {
  constructor(x: number, y: number, z: number) {
    super(x, y, z);
  }
}

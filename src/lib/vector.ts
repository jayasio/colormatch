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
  static random(max: number) {
    function randomize(limit: number) {
      return Math.floor(Math.random() * limit);
    }

    return new CoordVector(randomize(max), randomize(max), randomize(max));
  }

  toPercent(max: number) {
    function calcPercent(val: number, limit: number) {
      return Math.round((val / (limit - 1)) * 100);
    }

    return new PercentVector(
      calcPercent(this.x, max),
      calcPercent(this.y, max),
      calcPercent(this.z, max)
    );
  }

  toFraction(max: number) {
    return {
      x: `${this.x}/${max - 1}`,
      y: `${this.y}/${max - 1}`,
      z: `${this.z}/${max - 1}`,
    };
  }

  toColor(max: number) {
    function calcColor(val: number, limit: number) {
      return Math.ceil((val / (limit - 1)) * 255);
    }

    return new ColorVector(
      calcColor(this.x, max),
      calcColor(this.y, max),
      calcColor(this.z, max)
    );
  }
}

export class ColorVector extends Vector {
  toString() {
    return `rgb(${this.x},${this.y},${this.z})`;
  }

  getLuminance() {
    const luminance = (0.299 * this.x + 0.587 * this.y + 0.114 * this.z) / 255;
    return luminance > 0.5 ? "light" : "dark";
  }
}

export class PercentVector extends Vector {}

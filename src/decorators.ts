function Mojo(fn: Function) {
  fn.prototype.mojo = true;
  fn.prototype.toggleMojo = function () {
    this.mojo = !this.mojo
  }
}

function Giorno(years: number) {
  // 1. decorator factory invoked
  return function (fn: Function) {
    // 2. decorator invoked
    fn.prototype.years = years;
  }
}

function Mongo<T extends Custom>(fn: T) {
  return class extends fn {
    gears = 5;
    wheels = 3;
  }
}

function Vash(numGears: number, numWheels: number) {
  return function <T extends Custom>(fn: T) {
    return class extends fn {
      gears = numGears;
      wheels = numWheels;
    }
  }
}

type Custom = {
  new(...args: any[]): {}
}



@Mongo
class Automobile {
  wheels: number = 4;
  constructor(public make: string) { }
}

const auto = new Automobile('Ford');
console.log(auto);


@Vash(3, 4)
class Wagon {
  constructor(public make: string) { }
}

const wagon = new Wagon('More')
console.log(wagon)
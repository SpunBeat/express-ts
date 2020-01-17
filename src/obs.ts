function CarModel(config: any) {
  return function <T extends { new(...args: any[]): {} }>(fn: T) {
    return class extends fn {
      model = config.model;
      color = config.color;
    }
  }
}

function CarColor(config: any) {
  return function <T extends { new(...args: any[]): {} }>(fn: T) {
    return class extends fn {
      color = config.color;
    }
  }
}


@CarModel({model:'A5', color: 'Black'})
@CarColor({ color: 'Red'})
class Car {
  constructor(public marca: string) {}
}

const car = new Car('Audi')

console.log(car)
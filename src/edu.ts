function Sport(fn: Function) {
  fn.prototype.sport = true;
}

function Color(color: string) {
  return function(fn: Function) {
    fn.prototype.color = color;
  }
}

type CustomType = {
  new(...args: any[]): {}
}

function Hatchback<T extends CustomType>(fn: T) {
  return class extends fn {
    hatchback = true;
  }
}


function Model(model: any) {
  return function <T extends CustomType>(fn: T) {
    return class extends fn {
      model = model;
    }
  }
}




@Sport
@Hatchback
@Color('rojo')
@Model('A3')
class Coche {
  constructor(public marca: string) {}
}


const coche = new Coche('Audi')
console.log(coche)
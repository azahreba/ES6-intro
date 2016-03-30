'use strict';

function iteratorFn() {
  let numbers = [1, 2, 3, 4];

  // numbers.values();
  let iterator = numbers[Symbol.iterator]();
  //next() forces a code inside the generator
  let next = iterator.next();

  let sum = 0;
  while (!next.done) {
    sum += next.value;
    next = iterator.next();
  }

  alert(sum);
}

function forOfFn() {
  let numbers = [1, 2, 3, 4];

  let sum = 0;
  for (let n of numbers) {
    sum += n;
  }

  alert(sum);
}

function customIteratorFn() {
  class Company {
    constructor() {
      this.employees = [];
    }

    addEmployees(...names) {
      this.employees = this.employees.concat(names);
    }

    [Symbol.iterator]() {
      return new ArrayIterator(this.employees);
    }
  }

  class ArrayIterator {
    constructor(arr) {
      this.array = arr;
      this.index = 0;
    }

    next() {
      var result = {
        value: undefined,
        done: true
      };
      //do whatever we want: sorting, steping, etc.
      if (this.index < this.array.length) {
        result.value = this.array[this.index];
        result.done = false;
        this.index += 1;
      }

      return result;
    }
  }

  let company = new Company();
  let count = 0;

  company.addEmployees('Tim', 'John', 'Alex');

  for (let employee of company) {
    count += 1;
  }

  alert(count);
}

function generatorsFn() {
  let numbers = function*() {
    yield 1;
    yield 2;
    /* yield could return a param from next */
    yield 3;
  };

  let sum = 0;
  for (let n of numbers()) {
    sum += n;
  }
  alert(sum);

  sum = 0;
  let iterator = numbers();
  let next = iterator.next(/* could accept param */);
  while (!next.done) {
    sum += next.value;
    next = iterator.next();
  }

  alert(sum);
}

function customGeneratorFn() {
  class Company {
    constructor() {
      this.employees = [];
    }

    addEmployees(...names) {
      this.employees = this.employees.concat(names);
    }

    *[Symbol.iterator]() {
      for(let e of this.employees) {
        yield e;
      }
    }
  }

  let company = new Company();
  let count = 0;

  company.addEmployees('Tim', 'John', 'Alex', 'Tom');

  for (let employee of company) {
    count += 1;
  }

  alert(count);

  let filter = function*(items, predicate) {
    //return undefined/0/-1; sets done flag to true
    for (let item of items) {
      if(predicate(item)) {
        yield item;
      }
    }
  };

  count = 0;
  for (let employee of filter(company, e => e[0] == 'T')) {
    count += 1;
  }

  alert(count);
}

/**
 * function comprehensionsFn() {
 * var numbers = [for (n of [1,2,3]) n * n];
 * console.log(n);
 * }
 * */


function numbersFn() {
  isNan("NaN") === true;

  Number.isNaN("NaN") === false;

  Number.isInteger(1) === true;
  Number.isInteger(1.0) === true;
}

function arraysFn() {
  (new Array(3)).fill('b');

  var arrayLike = document.querySelector('div');
  Array.from(arrayLike);

  var a  = ['a', 'b', 'c'];
  a.entries().next().value;
  a.keys().next().value;

  var arr = [
    for (first of ['William', 'John', 'Blake'])
    for (middle of ['Robert', 'Andrew', 'John'])
    if (first != middle) (first + ' ' + middle)
  ];
}

function setsFn() {
  var set = new Set();
  var key = {};

  set.size;
  set.add(key);
  set.has(key);

  //return iterator;
  set.entries();
  set.values();

  set.delete(key);
  set.clear();
}

function mapsFn() {
  var map = new Map();

  map.set('age', 25);
  map.get('age');

  map.delete('age');
  map.set({name: 'Artur'}, 25);

  for (let [key, value] of map) {}

  map.clear();
}

function weak() {
  var set = new WeakSet();
  console.log(set.size);
  console.log(set.entries);
  console.log(set.values);
  console.log(set.forEach);
}
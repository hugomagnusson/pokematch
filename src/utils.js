function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function randomIntList(size, min, max){
    return  Array.from({length: size}, () => randomInt(min, max));
  }

export { capitalize, randomInt, randomIntList };

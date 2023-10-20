function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomIntList(size, min, max) {
  return Array.from({ length: size }, () => randomInt(min, max));
}

function sortList(list, property) {
  return list.sort((a, b) =>
    a[property].toString().localeCompare(b[property].toString(), "en", { sensitivity: "case" })
  );
}

export { capitalize, randomInt, randomIntList, sortList };

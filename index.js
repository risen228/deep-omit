const processValue = (value, keys, path = "") => {
  if (typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    const newValue = [];
    for (let i = 0; i < value.length; i++) {
      const newPath = path ? `${path}.${i}` : `${i}`;

      if (keys.includes(newPath)) {
        continue;
      }

      newValue.push(processValue(value[i], keys, newPath));
    }
    return newValue;
  }

  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      const newPath = path ? `${path}.${key}` : key;

      if (keys.includes(newPath)) {
        value[key] = undefined;
        continue;
      }

      value[key] = processValue(value[key], keys, newPath);
    }
  }

  return value;
};

const omit = (value, keys) => {
  if (typeof value !== "object") {
    return value;
  }

  if (typeof keys === "number") {
    keys = [keys.toString()];
  }

  if (typeof keys === "string") {
    keys = [keys];
  }

  if (!Array.isArray(keys)) {
    return value;
  }

  let valueClone = Array.isArray(value) ? [...value] : { ...value };

  return processValue(valueClone, keys);
};

module.exports = omit;

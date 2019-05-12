const omit = require(".");

describe("omit", () => {
  const obj = {
    one: 1,
    two: 2,
    prop: 123,
    nested: {
      prop: 321,
      very: {
        deep: true
      }
    },
    array: [{ id: 0 }, { id: 1 }, { id: 2 }]
  };

  test("should for first level keys", () => {
    expect(omit(obj, "one")).toEqual({ ...obj, one: undefined });
    expect(omit(obj, "two")).toEqual({ ...obj, two: undefined });
    expect(omit(obj, ["prop"])).toEqual({ ...obj, prop: undefined });
  });

  test("should work for multiple keys", () => {
    expect(omit(obj, ["one", "two", "prop"])).toEqual({
      ...obj,
      one: undefined,
      two: undefined,
      prop: undefined
    });
  });

  test("should work for nested keys and not affect other keys with the same name", () => {
    expect(omit(obj, "nested.prop")).toEqual({
      ...obj,
      nested: { ...obj.nested, prop: undefined }
    });
  });

  test("should work for very deep nested keys", () => {
    expect(omit(obj, ["nested.very.deep"])).toEqual({
      ...obj,
      nested: {
        ...obj.nested,
        very: {
          ...obj.nested.very,
          deep: undefined
        }
      }
    });
  });

  test("should work with arrays", () => {
    expect(omit(obj, "array.1")).toEqual({
      ...obj,
      array: [{ id: 0 }, { id: 2 }]
    });
    expect(omit(obj, "array.1.id")).toEqual({
      ...obj,
      array: [{ id: 0 }, {}, { id: 2 }]
    });
  });

  test("should work with array initial value", () => {
    expect(omit(["one", "two", "three"], "1")).toEqual(["one", "three"]);
    expect(omit(["one", "two", "three"], 2)).toEqual(["one", "two"]);
  });

  test("should work with nested arrays", () => {
    expect(omit(["one", "two", ["three"]], '2.0')).toEqual(["one", "two", []]);
  });
});

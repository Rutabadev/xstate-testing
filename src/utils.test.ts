import { crawlToLastChild } from "./utils";

describe("utils", () => {
  describe("crawlToLastChild", () => {
    const obj = {
      first: { second: { third: "end" } },
    };

    it("should find last string", () => {
      expect(crawlToLastChild(obj)).toEqual("end");
    });

    it("should early return if object is a string", () => {
      expect(crawlToLastChild("end")).toEqual("end");
    });

    it("should work if last child is a number", () => {
      expect(crawlToLastChild(obj)).toEqual("end");
    });
  });
});

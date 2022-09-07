const isPrimitive = (obj) => obj !== Object(obj);

export const crawlToLastChild = (obj) => {
  if (isPrimitive(obj)) {
    return obj;
  }
  const childValue = Object.values(obj)[0];
  if (typeof childValue === "string") {
    return childValue;
  }
  return crawlToLastChild(childValue);
};

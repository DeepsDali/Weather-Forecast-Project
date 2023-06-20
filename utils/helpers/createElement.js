export const createElement = (tagName, attributes = {}) => {
  const element = document.createElement(tagName);

  for (const attribute in attributes) {
    element[attribute] = attributes[attribute];
  }

  return element;
};

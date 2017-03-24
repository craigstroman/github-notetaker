export const loadState = (item) => {
  try {
    const serializedState = localStorage.getItem(item);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (item, name) => {
  try {
    const serializedState = JSON.stringify(item);

    localStorage.setItem(name, serializedState);
  } catch (err) {
    // Ignore errors
  }
};

export const generateUniqueId = (): React.Key => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

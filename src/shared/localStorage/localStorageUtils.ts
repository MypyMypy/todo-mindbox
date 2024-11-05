import { LocalStorageDataTypesI } from "./localStorage.types";

export const LocalStorageGetItem = <T extends keyof LocalStorageDataTypesI>(
  key: T
): LocalStorageDataTypesI[T] | null => {
  const item = localStorage.getItem(key);

  if (item === null) {
    return null;
  }

  try {
    return JSON.parse(item) as LocalStorageDataTypesI[T];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return item as unknown as LocalStorageDataTypesI[T];
  }
};

export const LocalStorageSetItem = <T extends keyof LocalStorageDataTypesI>(
  key: T,
  value: LocalStorageDataTypesI[T]
): void => {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    }
  } catch (error) {
    console.error(
      `Error setting item in localStorage for key "${key}":`,
      error
    );
  }
};

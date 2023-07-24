import { useState, useEffect, Dispatch, SetStateAction } from "react";
export default function useLocalStorage(
  key: string,
  defaultValue: string,
  forceValue: string | null
): [string, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState<string>(() => {
    if (forceValue) return forceValue;
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? storedValue : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

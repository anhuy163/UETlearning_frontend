import React from "react";

export const useDebounce = () => {
  let timer: any = null;
  const debounceFunction = (callback: () => void) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(), 500);
  };

  return { debounceFunction };
};

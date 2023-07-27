// usehooks-ts

import { type MutableRefObject, type Ref, useEffect, useRef } from "react";

export const useCombinedRefs = (
  ...refs: Array<React.Ref<HTMLInputElement> | MutableRefObject<null>>
): MutableRefObject<HTMLInputElement | null> => {
  const targetRef = useRef(null);

  useEffect(() => {
    refs
      .filter((r) => Boolean(r))
      .forEach((ref: Ref<HTMLInputElement> | MutableRefObject<null>) => {
        if (!ref) return;
        if (typeof ref === "function") ref(targetRef.current);
        else ref.current = targetRef.current;
      });
  }, [refs]);

  return targetRef;
};

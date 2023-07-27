import { type Ref, forwardRef, useEffect, useRef } from "react";
import type { HTMLProps } from "react";
import { useCombinedRefs } from "~/hooks/useCombinedRefs";

const Checkbox = forwardRef(function Checkbox(
  {
    indeterminate,
    className = "",
    ...props
  }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>,
  ref: Ref<HTMLInputElement>
) {
  const defaultRef = useRef(null);
  const combinedRef = useCombinedRefs(ref, defaultRef);

  useEffect(() => {
    if (combinedRef && typeof indeterminate === "boolean") {
      combinedRef.current!.indeterminate = !props.checked && indeterminate;
    }
  }, [props.checked, indeterminate, combinedRef]);

  return (
    <input
      type="checkbox"
      ref={combinedRef}
      className={className + " cursor-pointer"}
      {...props}
    />
  );
});

export default Checkbox;

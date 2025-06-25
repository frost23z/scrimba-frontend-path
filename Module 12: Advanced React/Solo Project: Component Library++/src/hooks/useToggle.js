import React from "react";
import useEffectOnUpdate from "./useEffectOnUpdate";

export default function useToggle({
  defaultValue = false,
  onToggle = () => {},
}) {
  const [on, setOn] = React.useState(defaultValue);

  function toggle() {
    setOn((prevOn) => !prevOn);
  }

  useEffectOnUpdate(onToggle, [on]);

  return [on, toggle];
}

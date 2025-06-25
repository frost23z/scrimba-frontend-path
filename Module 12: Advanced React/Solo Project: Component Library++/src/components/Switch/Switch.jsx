import useToggle from "../../hooks/useToggle";
import "./Switch.css";

export default function Switch({ defaultValue = false, onChange }) {
  const [isOn, toggle] = useToggle({
    defaultValue,
    onToggle: onChange,
  });

  return (
    <div
      className={`switch ${isOn ? "switch-on" : "switch-off"}`}
      onClick={toggle}
    >
      <div className="switch-track">
        <div className="switch-thumb" />
      </div>
    </div>
  );
}

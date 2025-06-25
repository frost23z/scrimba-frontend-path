import classnames from "classnames";
import "./Button.css";

export default function Button({
  children,
  className,
  size,
  variant,
  ...rest
}) {
  let sizeClass = size && `button-${size}`;
  let variantClass = variant && `button-${variant}`;
  const allClasses = classnames(sizeClass, variantClass, className);

  return (
    <button className={allClasses} {...rest}>
      {children}
    </button>
  );
}

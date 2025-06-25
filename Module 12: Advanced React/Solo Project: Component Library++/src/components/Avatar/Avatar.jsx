import { IoPersonSharp } from "react-icons/io5";
import "./Avatar.css";
import getRandomColorClass from "../utils/getRandomColorClass";

export default function Avatar({ src, alt, children }) {
  const className = `avatar ${getRandomColorClass()}`;

  if (src) {
    return (
      <div className={className}>
        <img src={src} alt={alt} />
      </div>
    );
  }
  if (children) {
    return <div className={`${className} avatar-letters `}>{children}</div>;
  } else {
    return (
      <div className={`${className} avatar-icon`}>
        <IoPersonSharp />
      </div>
    );
  }
}

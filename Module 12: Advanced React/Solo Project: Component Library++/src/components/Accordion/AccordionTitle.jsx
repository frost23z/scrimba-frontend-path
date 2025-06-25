import React from "react";
import { AccordionContext } from "./Accordion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function AccordionTitle({ children, id }) {
  const { toggleItem, isItemOpen } = React.useContext(AccordionContext);
  const isOpen = isItemOpen(id);

  return (
    <div className="accordion-header" onClick={() => toggleItem(id)}>
      <h3 className="accordion-title">{children}</h3>
      <span className="accordion-icon">
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </div>
  );
}

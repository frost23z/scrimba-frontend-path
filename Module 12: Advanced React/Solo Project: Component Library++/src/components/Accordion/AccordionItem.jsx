import React from "react";
import { AccordionContext } from "./Accordion";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

export default function AccordionItem({
  title,
  children,
  defaultOpen = false,
  id,
}) {
  const itemId = id || title;

  return (
    <div className="accordion-item">
      <AccordionTitle id={itemId}>{title}</AccordionTitle>
      <AccordionContent id={itemId}>{children}</AccordionContent>
    </div>
  );
}

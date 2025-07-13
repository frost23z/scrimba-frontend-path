import React from "react"
import { AccordionContext } from "./Accordion"
import AccordionContent from "./AccordionContent"
import AccordionTitle from "./AccordionTitle"

export default function AccordionItem({ title, children, defaultOpen = false, id }) {
	const itemId = id || title

	return (
		<div className="accordion-item">
			<AccordionTitle id={itemId}>{title}</AccordionTitle>
			<AccordionContent id={itemId}>{children}</AccordionContent>
		</div>
	)
}

import React from "react"
import { AccordionContext } from "./Accordion"

export default function AccordionContent({ children, id }) {
	const { isItemOpen } = React.useContext(AccordionContext)
	const isOpen = isItemOpen(id)

	return (
		<div className={`accordion-content ${isOpen ? "accordion-content-open" : ""}`}>
			{children}
		</div>
	)
}

import React from "react"

export const AccordionContext = React.createContext()

export default function Accordion({ children }) {
	// Initialize with default open items
	const [openItems, setOpenItems] = React.useState(() => {
		const defaultOpenSet = new Set()

		// Find children with defaultOpen prop
		React.Children.forEach(children, child => {
			if (child?.props?.defaultOpen) {
				const itemId = child.props.id || child.props.title
				if (itemId) {
					defaultOpenSet.add(itemId)
				}
			}
		})

		return defaultOpenSet
	})

	const toggleItem = itemId => {
		setOpenItems(prev => {
			const newSet = new Set(prev)
			if (newSet.has(itemId)) {
				newSet.delete(itemId)
			} else {
				newSet.add(itemId)
			}
			return newSet
		})
	}

	const isItemOpen = itemId => openItems.has(itemId)

	return (
		<AccordionContext.Provider value={{ toggleItem, isItemOpen }}>
			<div className="accordion">{children}</div>
		</AccordionContext.Provider>
	)
}

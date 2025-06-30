import { BsStar, BsStarFill } from "react-icons/bs"
import useToggle from "../../hooks/useToggle"
import "./Star.css"

export default function Star({ onChange }) {
	const [filled, toggleFilled] = useToggle({ onToggle: onChange })
	return (
		<>
			{filled ? (
				<BsStarFill onClick={toggleFilled} className="star filled" />
			) : (
				<BsStar onClick={toggleFilled} className="star" />
			)}
		</>
	)
}

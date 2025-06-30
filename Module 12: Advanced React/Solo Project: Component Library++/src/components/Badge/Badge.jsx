import "./Badge.css"

export default function Badge({ children, variant = "square", color = "gray" }) {
	return <span className={`badge badge-${variant} badge-${color}`}>{children}</span>
}

import { useEffect } from "react"
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router"

export default function ErrorBoundary() {
	const error = useRouteError()
	const navigate = useNavigate()

	useEffect(() => {
		// Handle redirect responses
		if (error && error.status === 302) {
			const location = error.headers?.get?.("Location") || error.headers?.Location
			if (location) {
				console.log("ErrorBoundary handling redirect to:", location)
				navigate(location, { replace: true })
				return
			}
		}
	}, [error, navigate])

	// Show loading while redirect is happening
	if (error && error.status === 302) {
		return <div>Redirecting...</div>
	}

	// For some reason the redirect is getting passed here when I click Host as not logged in

	if (isRouteErrorResponse(error)) {
		return (
			<div>
				<h1>Oops! {error.status}</h1>
				<p>{error.statusText}</p>
				{error.data?.message && <p>{error.data.message}</p>}
			</div>
		)
	}

	return (
		<div>
			<h1>Oops! Something went wrong</h1>
			<p>{error?.message || "Unknown error occurred"}</p>
		</div>
	)
}

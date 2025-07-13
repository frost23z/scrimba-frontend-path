import { useActionState } from "react"
import { redirect, useActionData, useLoaderData, useNavigate } from "react-router"
import { loginUser } from "../api"

export function loader({ request }) {
	return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
	const formData = await request.formData()
	const email = formData.get("email")
	const password = formData.get("password")
	const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"

	try {
		const data = await loginUser({ email, password })
		localStorage.setItem("loggedin", true)
		return redirect(pathname)
	} catch (err) {
		return {
			message: err.message || "Login failed. Please try again."
		}
	}
}

export default function Login() {
	const routerErrorMessage = useActionData()
	const message = useLoaderData()
	const navigate = useNavigate()

	async function loginAction(prevState, formData) {
		const email = formData.get("email")
		const password = formData.get("password")

		if (!email || !password) {
			return {
				error: "Please fill in all fields",
				success: false
			}
		}

		try {
			const data = await loginUser({ email, password })
			localStorage.setItem("loggedin", true)

			// Get redirect path from URL or default to /host
			const url = new URL(window.location.href)
			const redirectTo = url.searchParams.get("redirectTo") || "/host"

			// Use React Router's navigate for better integration
			navigate(redirectTo, { replace: true })

			return {
				error: null,
				success: true
			}
		} catch (err) {
			return {
				error: err.message || "Login failed. Please try again.",
				success: false
			}
		}
	}

	const [state, formAction, isPending] = useActionState(loginAction, {
		error: null,
		success: false
	})

	return (
		<div className="login-container">
			<h1>Sign in to your account</h1>
			{message && <h3 className="red">{message}</h3>}
			{routerErrorMessage && <h3 className="red">{routerErrorMessage.message}</h3>}
			{state.error && <h3 className="red">{state.error}</h3>}

			<form action={formAction} className="login-form">
				<input
					name="email"
					type="email"
					placeholder="Email address"
					required
					autoComplete="email"
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
					autoComplete="current-password"
				/>
				<button type="submit" disabled={isPending} aria-disabled={isPending}>
					{isPending ? "Logging in..." : "Log in"}
				</button>
			</form>
		</div>
	)
}

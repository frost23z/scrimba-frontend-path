exports.handler = async (event, context) => {
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS"
	}

	if (event.httpMethod === "OPTIONS") {
		return {
			statusCode: 200,
			headers,
			body: ""
		}
	}

	if (event.httpMethod !== "GET") {
		return {
			statusCode: 405,
			headers,
			body: JSON.stringify({ error: "Method not allowed" })
		}
	}

	try {
		const { queryStringParameters } = event

		if (!queryStringParameters || (!queryStringParameters.s && !queryStringParameters.i)) {
			return {
				statusCode: 400,
				headers,
				body: JSON.stringify({ error: "Missing required parameters (s or i)" })
			}
		}

		const apiKey = process.env.OMDB_API_KEY

		if (!apiKey) {
			return {
				statusCode: 500,
				headers,
				body: JSON.stringify({ error: "API key not configured" })
			}
		}

		const baseUrl = "https://www.omdbapi.com/"
		const params = new URLSearchParams({
			...queryStringParameters,
			apikey: apiKey
		})

		const apiUrl = `${baseUrl}?${params.toString()}`

		// Make the request to OMDB API
		const response = await fetch(apiUrl)
		const data = await response.json()

		return {
			statusCode: 200,
			headers,
			body: JSON.stringify(data)
		}
	} catch (error) {
		console.error("Error in OMDB proxy:", error)
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({ error: "Internal server error" })
		}
	}
}

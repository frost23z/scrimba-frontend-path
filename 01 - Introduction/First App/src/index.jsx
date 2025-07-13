import { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom/client"

const clientID = "t-FQWYk2PUt13LidWIblzu7SNd9HVOQsK3QA7Lg1Mg4"
const utm = "?utm_source=scrimba_degree&utm_medium=referral"

const loadData = options => {
	fetch(options.url)
		.then(response => response.json())
		.then(data => {
			if (options.onSuccess) options.onSuccess(data)
		})
}

function App(props) {
	const [photos, setPhotos] = useState([])

	const [query, setQuery] = useState("nature")
	const queryInput = useRef(null)

	const numberOfPhotos = 20
	const url = `https://api.unsplash.com/photos/random/?count=${numberOfPhotos}&client_id=${clientID}`

	useEffect(() => {
		const photosUrl = query ? `${url}&query=${query}` : url

		loadData({
			url: photosUrl,
			onSuccess: res => {
				setPhotos(res)
			}
		})
	}, [query, url])

	const searchPhotos = e => {
		e.preventDefault()
		setQuery(queryInput.current.value)
	}

	return (
		<div className="box">
			<h2>{props.emoji}</h2>
			<h1>{props.name}'s website</h1>
			<form onSubmit={searchPhotos}>
				<input
					type="text"
					placeholder="Search for photos..."
					ref={queryInput}
					defaultValue={query}
				/>
				<button type="submit">Search</button>
			</form>

			<div className="grid">
				{query
					? photos.map(photo => {
							return (
								<div key={photo.id} className="item">
									<img
										className="img"
										src={photo.urls.regular}
										alt={photo.alt_description || `Photo by ${photo.user.name}`}
									/>
									<div className="caption">
										<span className="credits">
											Photo by
											<a href={photo.user.links.html + utm}>
												{" "}
												{photo.user.name}
											</a>
											<span> on </span>
											<a href={`https://unsplash.com${utm}`}>Unsplash</a>
										</span>
									</div>
								</div>
							)
						})
					: ""}
			</div>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(<App name="Zayed" emoji="💐" />)

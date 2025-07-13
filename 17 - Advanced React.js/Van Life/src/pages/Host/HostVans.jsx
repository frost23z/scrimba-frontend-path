import React from "react"
import { Await, Link, useLoaderData } from "react-router"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"

export async function loader({ request }) {
	await requireAuth(request)
	return getHostVans()
}

export default function HostVans() {
	const vans = useLoaderData()

	function renderVanElements(vans) {
		const hostVansEls = vans.map(van => (
			<Link to={van.id} key={van.id} className="host-van-link-wrapper">
				<div className="host-van-single" key={van.id}>
					<img src={van.imageUrl} alt={`Photo of ${van.name}`} />
					<div className="host-van-info">
						<h3>{van.name}</h3>
						<p>${van.price}/day</p>
					</div>
				</div>
			</Link>
		))
		return (
			<div className="host-vans-list">
				<section>{hostVansEls}</section>
			</div>
		)
	}

	return (
		<section>
			<h1 className="host-vans-title">Your listed vans</h1>
			<React.Suspense fallback={<h2>Loading vans...</h2>}>
				<Await resolve={vans}>
					{vans.length > 0 ? (
						<section>{renderVanElements}</section>
					) : (
						<h2>No vans listed yet</h2>
					)}
				</Await>
			</React.Suspense>
		</section>
	)
}

import Banner from "../components/Banner"

export default function BannerDemo() {
	return (
		<section>
			<header>
				<h2>Banner</h2>
			</header>
			<main className="banner-demo">
				<div className="demo-item">
					<p className="demo-item-label">Multi-line Banners</p>
					<div className="banners">
						<Banner variant="success" multiline={true} title="Congratulations!">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
							pariatur, ipsum similique veniam.
						</Banner>

						<Banner variant="warning" multiline={true} title="Attention">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
							pariatur, ipsum similique veniam.
						</Banner>

						<Banner
							variant="error"
							multiline={true}
							title="There is a problem with your application"
						>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
							pariatur, ipsum similique veniam.
						</Banner>

						<Banner variant="neutral" multiline={true} title="Update available">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
							pariatur, ipsum similique veniam.
						</Banner>
					</div>
				</div>

				<div className="demo-item">
					<p className="demo-item-label">Single-line Banners</p>
					<div className="banners">
						<Banner variant="success" title="Congratulations!" />

						<Banner variant="warning" title="Attention" />

						<Banner variant="error" title="There is a problem with your application" />

						<Banner variant="neutral" title="Update available" />
					</div>
				</div>
			</main>
		</section>
	)
}

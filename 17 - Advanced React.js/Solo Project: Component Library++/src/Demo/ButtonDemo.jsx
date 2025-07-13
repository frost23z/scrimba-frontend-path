import Button from "../components/Button"

export default function ButtonDemo() {
	return (
		<section>
			<header>
				<h2>Button</h2>
			</header>
			<main className="button-demo">
				<div className="demo-item">
					<p className="demo-item-label">Small Button</p>
					<div className="button-grid">
						<Button size="sm">Default</Button>
						<Button size="sm" variant="success">
							Success
						</Button>
						<Button size="sm" variant="danger">
							Danger
						</Button>
						<Button size="sm" variant="warning">
							Warning
						</Button>
					</div>
				</div>

				<div className="demo-item">
					<p className="demo-item-label">Medium Button</p>
					<div className="button-grid">
						<Button>Default</Button>
						<Button variant="success">Success</Button>
						<Button variant="danger">Danger</Button>
						<Button variant="warning">Warning</Button>
					</div>
				</div>
				<div className="demo-item">
					<p className="demo-item-label">Large Button</p>
					<div className="button-grid">
						<Button size="lg">Default</Button>
						<Button size="lg" variant="success">
							Success
						</Button>
						<Button size="lg" variant="danger">
							Danger
						</Button>
						<Button size="lg" variant="warning">
							Warning
						</Button>
					</div>
				</div>
			</main>
		</section>
	)
}

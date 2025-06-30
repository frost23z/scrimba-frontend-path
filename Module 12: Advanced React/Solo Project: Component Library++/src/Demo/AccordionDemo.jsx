import Accordion from "../components/Accordion"

export default function AccordionDemo() {
	return (
		<section>
			<header>
				<h2>Accordion</h2>
			</header>
			<main className="accordion-demo">
				<div className="demo-item">
					<p className="demo-item-label">Simple Usage</p>
					<div style={{ width: "100%", maxWidth: "600px" }}>
						<Accordion>
							<Accordion.Item title="This is a summary" defaultOpen={true}>
								<p>
									This is the first item's accordion body. It is shown by default,
									until the collapse plugin adds the appropriate classes that we
									use to style each element. These classes control the overall
									appearance, as well as the showing and hiding via CSS
									transitions. You can modify any of this with custom CSS or
									overriding our default variables. It's also worth noting that
									just about any HTML can go within the .accordion-body, though
									the transition does limit overflow.
								</p>
							</Accordion.Item>

							<Accordion.Item title="Second accordion item">
								<p>
									This is the second item's accordion body. It is hidden by
									default, until the collapse plugin adds the appropriate classes
									that we use to style each element.
								</p>
							</Accordion.Item>
						</Accordion>
					</div>
				</div>
			</main>
		</section>
	)
}

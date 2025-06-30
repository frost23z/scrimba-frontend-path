import Menu from "../components/Menu"
import Star from "../components/Star"
import Switch from "../components/Switch"

export default function ToggleDemo() {
	return (
		<section>
			<header>
				<h2>Toggle Component</h2>
			</header>
			<main className="toggle-demo">
				<div className="demo-item">
					<p className="demo-item-label">Icon</p>
					<Star onChange={filled => console.log("Star", filled)} />
				</div>
				<div className="demo-item">
					<p className="demo-item-label">Menu</p>
					<Menu>
						<Menu.Button>Menu</Menu.Button>
						<Menu.Dropdown>
							<Menu.Item>Item 1</Menu.Item>
							<Menu.Item>Item 2</Menu.Item>
							<Menu.Item>Item 3</Menu.Item>
							<Menu.Item>Item 4</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</div>
				<div className="demo-item">
					<p className="demo-item-label">Switch</p>
					<Switch onChange={isOn => console.log("Switch:", isOn)} />
				</div>
			</main>
		</section>
	)
}

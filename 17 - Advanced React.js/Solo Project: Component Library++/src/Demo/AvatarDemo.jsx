import Avatar from "../components/Avatar"

export default function AvatarDemo() {
	return (
		<section>
			<header>
				<h2>Avatar</h2>
			</header>
			<main className="avatar-demo">
				<div className="demo-item">
					<p className="demo-item-label">With image</p>
					<Avatar src="./random.jpg" alt="Random Picture" />
				</div>
				<div className="demo-item">
					<p className="demo-item-label">With initials</p>
					<Avatar>SZ</Avatar>
				</div>
				<div className="demo-item">
					<p className="demo-item-label">Anonymous</p>
					<Avatar />
				</div>
			</main>
		</section>
	)
}

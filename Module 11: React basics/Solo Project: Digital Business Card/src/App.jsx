import "./App.css"
import {
	faFacebook,
	faGithub,
	faInstagram,
	faLinkedin,
	faTwitter
} from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function App() {
	return (
		<div className="business-card">
			<div className="profile-image">
				<img src="avatar.png" alt="Profile" className="profile-image" />
			</div>
			<div className="profile-section">
				<h1 className="name">Shaiekh Zayed Bin Hasan</h1>
				<p className="title">Fullstack Developer</p>
				<p className="website">zayedbinhasan.me</p>
				<div className="buttons">
					<button className="email-btn">
						<FontAwesomeIcon icon={faEnvelope} className="icon" />
						Email
					</button>
					<button className="linkedin-btn">
						<FontAwesomeIcon icon={faLinkedin} className="icon" />
						LinkedIn
					</button>
				</div>
			</div>

			<div className="content-section">
				<div className="about">
					<h2>About</h2>
					<p>
						I'm a passionate fullstack developer who thrives on building innovative
						solutions and automating complex workflows. I enjoy creating seamless user
						experiences while architecting robust systems. I'm particularly drawn to
						emerging technologies and always eager to explore how they can solve
						real-world problems.
					</p>
				</div>

				<div className="interests">
					<h2>Interests</h2>
					<p>
						Technology enthusiast. Automation advocate. Machine learning explorer. Avid
						reader of tech blogs and research papers.
					</p>
				</div>
			</div>

			<div className="social-section">
				<div className="social-icons">
					<div className="social-icon twitter">
						<FontAwesomeIcon icon={faTwitter} />
					</div>
					<div className="social-icon facebook">
						<FontAwesomeIcon icon={faFacebook} />
					</div>
					<div className="social-icon instagram">
						<FontAwesomeIcon icon={faInstagram} />
					</div>
					<div className="social-icon github">
						<FontAwesomeIcon icon={faGithub} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default App

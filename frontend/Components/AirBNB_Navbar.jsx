import "../Styles/AirBNB_Navbar.css";

import airbnbLogo from "../Media/airbnb-logo.png";

let HOME = "http://localhost:3000";

export default function AirBNB_Navbar() {
    return(
        <nav class="Navbar">
            <div className="logo">
                <img alt="Airbnb Logo" src={airbnbLogo} />
		<div className="logo-text">airbnb</div>
	    </div>
            <a href={HOME}>Back</a>
	</nav>
    )
}

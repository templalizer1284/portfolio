import { useState } from "react";
import axios from "axios";

import "../Styles/HRSoft.css";
import HRBackgroundImage from "../Media/warehouse.svg";

function HRBackground() {
    return(
        <div id="HRBackground">
            <img src={HRBackgroundImage} />
	</div>
    );
}

function HRFooter() {
    return(
        <div id="HRFooter">
	    <p>© Copyright Aleksandar M. 2023. This software is covered under <a id="footer_license" href="https://spdx.org/licenses/BSD-4-Clause.html">4-Clause BSD License.</a></p>
	</div>
    );
}

function HRRecruitForms() {
    return(
        <div id="HRRecruitForms">
            <div className="FormEntry">
		<div className="HRForm">
                    <label for="dob">Date of Birth: </label>
		    <input name="dob" type="date"/>
		</div>
		<div className="HRForm">
                    <label for="first_name">First Name: </label>
		    <input name="first_name" type="text"/>
		</div>
		<div className="HRForm">
                    <label for="last_name">Last Name: </label>
		    <input name="last_name" type="text"/>
		</div>
		<div className="HRForm">
                    <label for="sector">Sector: </label>
                    <select ref={null} name="sector">
			
                    </select>
		</div>
	    </div>
	</div>
    );
}

function HRPanelButton(props) {
    return(
        <div className="HRPanelButton" onClick={() => {
		 props.setter(<HRRecruitForms />);
	     }}>
	    {props.name}
	</div>
    );
}

function HRPanel(props) {
    return(
	<div id="HRPanel">
            <div>
		<a id="HRPanelHead" href={"http://localhost:3000"}>HRSoft - Back</a>
	    </div>

            <div id="HRPanelButtonSection">
		<HRPanelButton
		    name="Recruitment"
		    setter={props.setter}
		/>
	    </div>
	</div>
    );
}

function HRMainContent(props) {
    return(
        <div id="HRMainContent">
	    {props.content}
	</div>
    );
}

export default function HRSoft() {
    const [mainContent, setMainContent] = useState();
    
    return(
        <div id="HRSoft">
	    <HRBackground />
	    <HRPanel setter={setMainContent}/>
	    <HRMainContent
		content={mainContent}
		setter={setMainContent}
	    />
	    <HRFooter />
	</div>
    );
}

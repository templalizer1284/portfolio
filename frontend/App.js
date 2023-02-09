import './App.css';
import "./Styles/PortfolioMenu.css";

import axios from "axios";
import { useState, useEffect } from "react";

import Login from "./Components/Login.jsx";
import WMS from "./Components/WMS.jsx";
import AirBNB from "./Components/AirBNB.jsx";
import HRSoft from "./Components/HRSoft.jsx";
import DataUPDOWN from "./Components/DataUPDOWN.jsx";

function MenuEntry(props) {
    return(
	<div className="port_entry" onClick={() => {
		 props.setter(props.content);
	     }}>
            <p>{props.name}</p>
	</div>
    );
}

function Menu(props) {
    return(
        <div id="PortfolioMenu">
	    <MenuEntry
		name="WMS"
		setter={props.setter}
		content={<WMS />}
	    />
	    <MenuEntry
		name="AirBNB"
		setter={props.setter}
		content={<AirBNB />}
	    />
	    <MenuEntry
		name="HRSoft"
		setter={props.setter}
		content={<HRSoft />}
	    />
	    <MenuEntry
		name="Data Upload/Download"
		setter={props.setter}
		content={<DataUPDOWN />}
	    />
	</div>
    );
}

function App() {
    const [content, setContent] = useState();

    useEffect(() => {
	setContent(<Menu setter={setContent} content={<Menu />}/>);
    }, []);
    
    return (
	<div className="App">
	    {content}
	</div>
    );
}

export default App;

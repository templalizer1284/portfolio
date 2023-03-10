import axios from "axios";
import { useState } from "react";

import "../Styles/Common.css";

import WelcomeContent from "./WelcomeContent.jsx";
import WMSNavbar from "./WMS_navbar";
import WMSToolbar from "./WMS_toolbar.jsx";
import WMSMainContent from "./WMS_mainContent.jsx";
import WMSFooter from "./WMS_footer.jsx";

import "../Styles/WMS.css";

export default function WMS(props) {

    const [ MainContentState, setMainContentState ] = useState(<WelcomeContent />);
    const [ LayoutStateWarehouses, setLayoutStateWarehouses ] = useState();
    const [ LayoutStateItems, setLayoutStateItems ] = useState();
    
    return(
        <div className="WMS">
	    <WMSNavbar
		left = "WMS - Warehouse Management Software"
	    />
	    <WMSToolbar
		MainStateSet={setMainContentState}
	    />
	    <WMSMainContent
		State={MainContentState}
		setState={setMainContentState} />
	    <WMSFooter /> 
	</div>
    );
}

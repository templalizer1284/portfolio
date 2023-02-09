import BackgroundImagePath from "../Media/warehouse.svg";

function BackgroundImage() {
    return(
        <div className="Background_Image">
            <img alt="Background Alt" src={BackgroundImagePath}
		 draggable="false"
	    />
	</div>
    );
}

export default function WMSMainContent(props) {
    return(
	<div className="WMS_mainContent">
	    <BackgroundImage />
	    {props.State}
	</div>
    );
}

import "../Styles/WMS.css";

let HOME = "http://localhost:3000";

export default function WMS_navbar(props) {
    return(
	<div className="WMS_navbar my-panel">
            <div id="WMS_navbar_leftSection">{props.left}</div>
            <a id="navbar_back" href={HOME}><p>Back</p></a>
	</div>
    );
}

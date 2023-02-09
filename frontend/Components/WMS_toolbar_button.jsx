import React from "react";

export default class WMSToolbarButton extends React.Component {
    constructor(props){
	super();
	this.name = props.name;
	this.icon = props.icon;
	this.action = props.action;
    }
    
    render() {
	return(
            <div className="WMS_toolbar_button my-panel-el" draggable="false" onClick={this.action}>
                <img alt={this.name.concat("-alt")}
		     src={this.icon}/>
                <p>{this.name}</p>
	    </div>
	);
    };
}

import WMSToolbarButton from "./WMS_toolbar_button.jsx";

import Home_Icon from "../Media/home.svg";
import Inventory_Icon from "../Media/Inventory_icon.svg";
import Layout_Icon from "../Media/layout.svg";
import Settings_Icon from "../Media/settings.svg";

import WelcomeContent from "../Components/WelcomeContent.jsx";
import WMSInventory from "../Components/WMS_inventory";
import WMSLayout from "../Components/WMS_layout.jsx";
import WMSSettings from "../Components/WMS_settings.jsx";

export default function WMS_toolbar(props) {
    
    return(
        <div className="WMS_toolbar my-panel">
	    <WMSToolbarButton
		name="Home"
		icon={Home_Icon}
		action={() => {
		    props.MainStateSet(<WelcomeContent />);
		}}
	    />
	    <WMSToolbarButton
		name="Inventory"
		icon={Inventory_Icon}
		action={() => {
		    props.MainStateSet(<WMSInventory />);
		}}
	    />
	    <WMSToolbarButton
		name="Layout"
		icon={Layout_Icon}
		action={() => {
		    props.MainStateSet(<WMSLayout
					   StateWarehouses={props.LayoutStateWarehouses}
					   setStateWarehouses={props.LayoutStateWarehousesSet}
					   StateItems={props.LayoutStateItems}
					   setStateItems={props.LayoutStateItemsSet}
				       />);
		}}
	    />
	    <WMSToolbarButton
		name="Settings"
		icon={Settings_Icon}
		action={() => {
		    props.MainStateSet(<WMSSettings />);
		}}
	    />
	</div>
    );
}

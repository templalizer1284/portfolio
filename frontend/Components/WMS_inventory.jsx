import { useState, useEffect, useRef } from "react";
import axios from "axios";

let API_location_get = "http://localhost:8080/api/wms/layout/location_get";
let API_register = "http://localhost:8080/api/wms/inventory/register";
let API_delete = "http://localhost:8080/api/wms/inventory/delete";
let API_modify_quantity = "http://localhost:8080/api/wms/inventory/modify_quantity";
let API_relocate = "http://localhost:8080/api/wms/inventory/relocate";

export default function WMSInventory() {

    const [ inventory, setInventory ] = useState();
    const [ locations, setLocations ] = useState(<option>None</option>);
    const [ registerNotif, setregisterNotif ] = useState();
    const [ Console, setConsole ] = useState();

    const refs = {
	inputRegisterName: useRef(null),
	inputRegisterCustomer: useRef(null),
	inputRegisterReference: useRef(null),
	inputRegisterLocation: useRef(null),
	inputRegisterQuantity: useRef(null),
	inputRegisterPPU: useRef(null)
    };

    const delete_refs = {
	inputDeleteReference: useRef(null),
	inputDeleteLocation: useRef(null)
    };

    const modify_refs = {
	inputModifyReference: useRef(null),
	inputModifyLocation: useRef(null),
	inputModifyQuantity: useRef(null)
    };

    const relocate_refs = {
	inputRelocateReference: useRef(null),
	inputRelocateFromLocation: useRef(null),
	inputRelocateToLocation: useRef(null)
    };

    useEffect(() => {
	const interval = setInterval(() => {
	    axios.get(API_location_get)
		.then((res) => {
		    setLocations(() => {
			return(
			    <>
				{res.data.map( ({id,name}) => (
				    <option key={id} value={name}>{name}</option>
				))}
			    </>
			);
		    });
		})

		.catch((err) => {
		    console.log(err);
		});
	}, 1000);

	return () => {
	    clearInterval(interval);
	}
    }, []);

    function register_item() {
	setConsole("");
	let data = JSON.stringify({
	    name: refs.inputRegisterName.current.value,
	    customer: refs.inputRegisterCustomer.current.value,
	    reference: refs.inputRegisterReference.current.value,
	    location: refs.inputRegisterLocation.current.value,
	    quantity: refs.inputRegisterQuantity.current.value,
	    ppu: refs.inputRegisterPPU.current.value
	});

	let config = {
	    headers: {
		"Content-Type" : "application/json"
	    }
	};

	if(refs.inputRegisterName.current.value === ""){setConsole("Form is not complete."); return;}
	if(refs.inputRegisterCustomer.current.value === ""){setConsole("Form is not complete."); return;}
	if(refs.inputRegisterReference.current.value === ""){setConsole("Form is not complete."); return;}
	if(refs.inputRegisterLocation.current.value === ""){setConsole("Form is not complete."); return;}
	if(refs.inputRegisterQuantity.current.value === ""){setConsole("Form is not complete."); return;}
	if(refs.inputRegisterPPU.current.value === ""){setConsole("Form is not complete."); return;}
	
	axios.post(API_register, data, config)
	    .then((res) => {
		setConsole(res.data);
	    })
	    .catch((err) => {
		setConsole(err.data.message);
	    });
	
	refs.inputRegisterName.current.value = "";
	refs.inputRegisterCustomer.current.value = "";
	refs.inputRegisterReference.current.value = "";
	refs.inputRegisterLocation.current.value = "";
	refs.inputRegisterQuantity.current.value = "";
	refs.inputRegisterPPU.current.value = "";
    }
    
    function delete_item() {
	axios.get(API_delete,
		  {
		      params: {
			  reference: delete_refs.inputDeleteReference.current.value,
			  location: delete_refs.inputDeleteLocation.current.value
		      }
		  })
	    .then((res) => {
		setConsole(res.data);
	    })
	    .catch((err) => {
		setConsole(err.data.message);
	    });

	reference: delete_refs.inputDeleteReference.current.value = "";
    }

    function modify_item() {
	setConsole("");
	axios.get(API_modify_quantity, {
	    params: {
		reference: modify_refs.inputModifyReference.current.value,
		location: modify_refs.inputModifyLocation.current.value,
		quantity: modify_refs.inputModifyQuantity.current.value
	    }
	})
	    .then((res) => {
		setConsole(res.data);
	    })
	    .catch((err) => {
		setConsole(err.message);
	    })
	
	modify_refs.inputModifyReference.current.value = "";
	modify_refs.inputModifyLocation.current.value = "";
	modify_refs.inputModifyQuantity.current.value = "";
    }

    function relocate_item() {
	setConsole("");
	axios.get(API_relocate,
		  {
		      params: {
			  reference: relocate_refs.inputRelocateReference.current.value,
			  location_from: relocate_refs.inputRelocateFromLocation.current.value,
			  location_to: relocate_refs.inputRelocateToLocation.current.value
		      }
		  })
	    .then((res) => {
		setConsole(res.data);
	    })
	    .catch((err) => {
		setConsole(err.message);
	    });

	reference: relocate_refs.inputRelocateReference.current.value = "";
    }
    
    return(
        <div id="Inventory">
            <div className="inventory_form">
                <h2>Register Item</h2>
                <div className="inventory_form_entry">
                    <p>Name: </p>
                    <input ref={refs.inputRegisterName} type="text"/>
		</div>
		<div className="inventory_form_entry">
                    <p>Customer: </p>
                    <input ref={refs.inputRegisterCustomer} type="text"/>
		</div>
		<div className="inventory_form_entry">
                    <p>Reference: </p>
                    <input ref={refs.inputRegisterReference} type="number"/>
		</div>
		<div className="inventory_form_entry">
                    <p>Location: </p>
                    <select ref={refs.inputRegisterLocation}>
			{locations}
                    </select>
		</div>
		<div className="inventory_form_entry">
                    <p>Quantity: </p>
                    <input ref={refs.inputRegisterQuantity} type="number"/>
		</div>
		<div className="inventory_form_entry">
                    <p>Price: </p>
                    <input ref={refs.inputRegisterPPU} type="number"/>
		</div>
                <div className="button-center">
                    <button className="my-buttons" onClick={register_item}>Register</button>
		</div>
	    </div>

            <div className="inventory_form">
                <h2>Modify item: </h2>
                <div className="inventory_form_entry">
                    <p>Reference: </p>
                    <input ref={modify_refs.inputModifyReference} type="number"/>
		</div>
		<div className="inventory_form_entry">
                    <p>Location: </p>
                    <select ref={modify_refs.inputModifyLocation}>
			{locations}
                    </select>
		</div>
		<div className="inventory_form_entry">
                    <p>Quantity: </p>
                    <input ref={modify_refs.inputModifyQuantity} type="number"/>
		</div>
		<div className="button-center">
                    <button className="my-buttons" onClick={modify_item}>Modify</button>
		</div>
	    </div>

            <div className="inventory_form">
                <h2>Delete item</h2>
                <div className="inventory_form_entry">
                    <p>Reference: </p>
                    <input ref={delete_refs.inputDeleteReference} type="number"/>
		</div>
		<div className="inventory_form_entry">
                    <p>Location: </p>
                    <select ref={delete_refs.inputDeleteLocation}>
			{locations}
                    </select>
		</div>
		<div className="button-center">
		    <button style={{color: "#FF0000"}} className="my-buttons" onClick={delete_item}>Delete</button>
		</div>
	    </div>

            <div className="inventory_form">
                <h2>Relocate item</h2>
                <div className="inventory_form_entry">
                    <p>Reference</p>
                    <input ref={relocate_refs.inputRelocateReference} type="number"/>
		</div>
		<div className="inventory_form_entry">
                    <p>From: </p>
                    <select ref={relocate_refs.inputRelocateFromLocation}>
			{locations}
                    </select>
		    <p>To: </p>
                    <select ref={relocate_refs.inputRelocateToLocation}>
			{locations}
                    </select>
		</div>
		<div className="button-center">
		    <button className="my-buttons" onClick={relocate_item}>Relocate</button>
		</div>
	    </div>

	    <div id="Console">
                <div id="Console_title">
		    <p>Console Prompt:</p>
		</div>
		{Console}
	    </div>

	</div>
    );
}

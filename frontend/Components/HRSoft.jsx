import { useState, useRef, useEffect } from "react";
import axios from "axios";

import "../Styles/HRSoft.css";
import HRBackgroundImage from "../Media/hs_background.svg";
import LoadingGIF from "../Media/loading.gif";
import WarningSVG from "../Media/warning.svg";

let API_get_sectors = "http://localhost:8080/api/hrsoft/get_sectors";
let API_recruit = "http://localhost:8080/api/hrsoft/employee/recruit";
let API_modify = "http://localhost:8080/api/hrsoft/employee/modify";
let API_terminate = "http://localhost:8080/api/hrsoft/employee/terminate";
let API_get_employees = "http://localhost:8080/api/hrsoft/get_employees";
let API_expenses_list = "http://localhost:8080/api/hrsoft/expenses_list";
let API_expenses_calculate = "http://localhost:8080/api/hrsoft/expenses_calculate";
let API_invoice_get = "http://localhost:8080/api/hrsoft/invoice_get";
let API_expenses_add = "http://localhost:8080/api/hrsoft/expenses_add";
let API_expenses_remove = "http://localhost:8080/api/hrsoft/expenses_remove";
let HOME = "http://localhost:3000";

const Loading = () => {
    return(
        <div className="loading">
            <img alt="GIF" src={LoadingGIF}/>
	</div>
    );
};

const Warning = () => {
    return(
        <div className="warning">
            <img alt="ACHTUNG" src={WarningSVG}/>
	</div>
    );
};

function HRWelcomePage() {
    return(
	<div id="HRWelcomePage">
            <h1>Welcome</h1>
            <h3>Notes: </h3>
            <div style={{width: 400, fontColor: "black"}}>
		Recruiting employees is always acceptable because there can easily be two people with the same name and same sector in companies.
		What separates them is their personal account and ID which i will not implement here because there is not need for that.
	    </div>
            <div style={{marginTop: 50, fontColor: "black", width: 400}}>
		This software works only for one WORKING year. Currently its 2023. Food and travel expenses are also not implemented. Currency is in RSD.
	    </div>
	    <div style={{width: 400, fontColor: "black", marginTop: 50}}>
		Also to note, for more precise invoice calculation i need to implement check-in and check-out system for counting working hours.
		I also think that for demonstration purpose it is not needed, it is easily programmable anyway.
	    </div>
	    <div style={{width: 400, fontColor: "black", marginTop: 100, fontWeight: "bold", fontSize: 25}}>
		Thank you for checking this out!
	    </div>
	</div>
    );
}

function HRBackground() {
    return(
        <div id="HRBackground">
            <img alt="HRBPic" src={HRBackgroundImage} />
	</div>
    );
}

function HRFooter() {
    return(
        <div id="HRFooter">
	    <p style={{fontSize: 12}}>© Copyright Aleksandar M. 2023. This software is covered under <a id="footer_license" href="https://spdx.org/licenses/BSD-4-Clause.html">4-Clause BSD License.</a></p>
	</div>
    );
}

function HRRecruitForms(props) {

    const [sectors, setSectors] = useState(<option>None</option>);
    const [RecruitNotif, setRecruitNotif] = useState();
    const [ModNotif, setModNotif] = useState();

    const refs = {
	inputDOB: useRef(null),
	inputFirstName: useRef(null),
	inputLastName: useRef(null),
	inputSector: useRef(null)
    };

    const mod_refs = {
	inputId: useRef(null),
	inputSector: useRef(null) 
    };

    useEffect(() => {
	const interval = setInterval(() => {
	    axios.get(API_get_sectors)
		.then((res) => {
		    setSectors(() => {
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
		    console.log(err.message);
		})
	}, 1000);

	return () => {
	    clearInterval(interval);
	}
    }, []);

    function recruit() {
	setRecruitNotif(<Loading />);
	let data = JSON.stringify({
	    dob: refs.inputDOB.current.value,
	    first_name: refs.inputFirstName.current.value,
	    last_name: refs.inputLastName.current.value,
	    sector: refs.inputSector.current.value
	});

	let config = {
	    headers: {
		"Content-Type" : "application/json"
	    }
	};
	
	axios.post(API_recruit,
		   data, config)
	
	    .then((res) => {
		setRecruitNotif(res.data);
	    })
	    .catch((err) => {
		setRecruitNotif(err.data.message);
	    });

	refs.inputDOB.current.value = "";
	refs.inputFirstName.current.value = "";
	refs.inputLastName.current.value = "";
	refs.inputSector.current.value = "";
    }

    function modify() {
	setModNotif(<Loading />);
	
	let data = {
	    params: {
		id: mod_refs.inputId.current.value,
		sector: mod_refs.inputSector.current.value
	    }
	};

	axios.get(API_modify,
		  data)
	    .then((res) => {
		setModNotif(res.data);
	    })
	    .catch((err) => {
		console.log(err.message);
	    });
    }
    
    return(
        <div id="HRRecruitForms">
            <div className="FormEntry">
                <h2>Recruit: </h2>
		<div className="HRForm">
                    <label for="dob">Date of Birth: </label>
		    <input style={{textAlign: "center"}} ref={refs.inputDOB}name="dob" type="date"/>
		</div>
		<div className="HRForm">
                    <label for="first_name">First Name: </label>
		    <input ref={refs.inputFirstName} name="first_name" type="text"/>
		</div>
		<div className="HRForm">
                    <label for="last_name">Last Name: </label>
		    <input ref={refs.inputLastName} name="last_name" type="text"/>
		</div>
		<div className="HRForm">
                    <label for="sector">Sector: </label>
                    <select ref={refs.inputSector} name="sector">
			{sectors}
                    </select>
		</div>
                <div className="button-center">
                    <button className="content_button" onClick={recruit}>Recruit</button>
		</div>
		{RecruitNotif}
	    </div>

	    <div className="FormEntry">
                <h2>Modify contract: </h2>
                <p style={{fontSize: 14, color: "black"}}>This option changes payment of employee according to sector.</p>
		<div className="HRForm">
                    <label for="id">Employee ID: </label>
		    <input ref={mod_refs.inputId} name="id" type="number"/>
		</div>
		<div className="HRForm">
                    <label for="sector">Sector: </label>
                    <select ref={mod_refs.inputSector} name="sector">
			{sectors}
                    </select>
		</div>
                <div className="button-center">
                    <button className="content_button" onClick={modify}>Modify</button>
		</div>
		{ModNotif}
	    </div>
	</div>
    );
}

function HRPanelButton(props) {
    return(
        <div className="HRPanelButton" onClick={() => {
		 props.setter(props.content);
	     }}>
	    {props.name}
	</div>
    );
}

function HRTermination() {

    const [TerminateNotif, setTerminateNotif] = useState();
    const [TerminateNotifInput, setTerminateNotifInput] = useState(() => {
	return(
	    <div style={{opacity: 0}}>Bleh</div>
	);
    });

    let refs = {
	inputId: useRef(null)
    };

    function terminate() {
	if(refs.inputId.current.value === "") {
	    setTerminateNotifInput(() => {
		return(
		    <div style={{color: "#EA0000", marginLeft: 145, inlineSize: "max-content"}}>Please fill in the ID input of employee.</div>
		);
	    });
	    document.getElementById("terminate_input_id").style.borderColor = "#EA0000";
	    return;
	}

	setTerminateNotif(<Loading />);
	
	axios.get(API_terminate,
		  {
		      params: {
			  id: refs.inputId.current.value
		      }
		  })
	    .then((res) => {
		setTerminateNotif(res.data);
	    })
	    .catch((err) => {
		setTerminateNotif(err.message);
	    });

	refs.inputId.current.value = "";
    }
    
    return(
        <div id="HRTermination">
            <div className="FormEntry">
                <h2>Termination Form: </h2>
		{TerminateNotifInput}
                <div className="HRForm">
                    <label for="term_id">Employee ID: </label>
                    <input ref={refs.inputId} name="term_id" id="terminate_input_id" type="number" />
		</div>
                <div className="button-center">
                    <button className="content_button" id="terminate_button" onClick={terminate} onMouseEnter={() => {
				document.getElementById("warning_text").style.opacity = 1;
			    }}
			    onMouseLeave={() => {
				document.getElementById("warning_text").style.opacity = 0;
			    }}>Terminate</button>
                    <div id="warning_overlay">
			<Warning />
                        <div id="warning_text">
			    By clicking this button you are firing the employee.
			</div>
		    </div>
		</div>
		{TerminateNotif}
	    </div>
	</div>
    );
}

function HREmployeeList() {

    const [content, setContent] = useState(<Loading />);
    
    useEffect(() => {
	const interval = setInterval(() => {
	    axios.get(API_get_employees)
		.then((res) => {
		    setContent(() => {
			return(
			    <>
				{res.data.map( ({id,dob,first_name,last_name,sector}) => (
                                    <div key={id} className="employee_list_entry">
                                        <div>ID: <span style={{textDecoration: "underline"}}>{id}</span></div>
                                        <div>Name: <span style={{fontWeight: "bold"}}>{first_name} {last_name}</span></div>
                                        <div>DOB: {dob}</div>
                                        <div>Sector: {sector}</div>
				    </div>
				))}
			    </>
			);
		    }); 
		})
		.catch((err) => {
		    setContent(err.message);
		});
	}, 1000);

	return () => {
	    clearInterval(interval);
	};
    }, []);
    
    return(
        <div id="HREmployeeList">
            <h2>Employee List</h2>
	    {content}
	</div>
    );
}

function HRListExpenses() {

    const [content, setContent] = useState(<Loading />);
    const [ExpensesNotif, setExpensesNotif] = useState();
    
    useEffect(() => {
	const interval = setInterval(() => {
	    axios.get(API_expenses_list)
		.then((res) => {
		    setContent(() => {
			return(
			    <>
				{res.data.map( ({id,name,price}) => (
                                    <div key={id} className="employee_list_entry">
                                        <div>Name: {name}</div>
                                        <div>Price: {price}</div>
				    </div>
				))}
			    </>
			);
		    });
		})
		.catch((err) => {
		    setExpensesNotif(err.message);
		});
	}, 1000);

	return () => {
	    clearInterval(interval);
	};
    }, []);
    
    return(
        <div id="HRListExpenses">
            <h2>List of expenses:</h2>
            <div>Note: These prices are basically daily cost.</div>
	    {content}
	    {ExpensesNotif}
	</div>
    );
}

function HRExpensesCalculate() {

    const [notif, setNotif] = useState();

    const refs = {
	inputMonth: useRef(null)
    };

    function calculate() {
	setNotif(<Loading />);

	axios.get(API_expenses_calculate, {
	    params: {
		month: refs.inputMonth.current.value
	    }
	})
	    .then((res) => {
		setNotif(() => {
		    return(
                        <div style={{fontSize: 22, width: 500,
				     borderStyle: "dotted",
				     borderWidth: 5,
				     borderColor: "black",
				     borderRadius: 5,
				     position: "absolute",
				     top: 250}}>
			    Expenses are <div style={{ display: "inline-block",fontWeight: "bold"}}>{res.data}</div> RSD.
			</div>
		    );
		});
	    })
	    .catch((err) => {
		setNotif(err.message);
	    });
    }
    
    return(
        <div id="HRExpensesCalculate">
            <h2>Calculate expenses by month:</h2>
            <div style={{margin: 10, fontSize: 15}}>These expenses consist of all employees salaries plus general daily expenses.</div>
            <div className="FormEntry">
                <div className="HRForm">
                    <label for="exp_calc">Select month: </label>
                    <select ref={refs.inputMonth} name="exp_calc">
                        <option value="100">CURRENT</option>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
			<option value="11">11</option>
			<option value="12">12</option>
                    </select>
		</div>
                <div className="button-center ">
                    <button className="content_button" onClick={calculate}>
			Calculate
		    </button>
		</div>
		{notif}
	    </div>
	</div>
    );
}

function HRExpensesInvoice() {

    const [notif, setNotif] = useState();

    const refs = {
	inputId: useRef(null),
	inputMonth: useRef(null)
    };

    function invoice() {
	setNotif(<Loading />);
	axios.get(API_invoice_get,
		  {
		      params: {
			  id: refs.inputId.current.value,
			  month: refs.inputMonth.current.value
		      }
		  })
	    .then((res) => {
		setNotif(res.data);
	    })
	    .catch((err) => {
		setNotif(err.message);
	    });
	refs.inputId.current.value = "";
    }
    
    return(
        <div id="HRExpensesInvoice">
            <div className="FormEntry">
                <h2>Invoice calculation: </h2>
                <div className="HRForm">
                    <label for="invoice_id">Employee ID: </label>
                    <input ref={refs.inputId} name="invoice_id" type="number"/>
		</div>
		<div className="HRForm">
                    <label for="invoice_months">Month: </label>
		    <select ref={refs.inputMonth} name="invoice_months">
                        <option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
			<option value="11">11</option>
			<option value="12">12</option>
                    </select>
		</div>
                <div className="button-center">
                    <button className="content_button" onClick={invoice}>Pay</button>
		</div>
		{notif}
	    </div>
	</div>
    );
}

function HRExpensesManage() {

    const [AddNotif, setAddNotif] = useState();
    const [RemoveNotif, setRemoveNotif] = useState();

    const add_refs = {
	inputName: useRef(null), 
	inputPrice: useRef(null)
    };

    const remove_refs = {
	inputName: useRef(null),
	inputPrice: useRef(null)
    };

    function add() {
	setAddNotif(<Loading />);
	
	let data = JSON.stringify(
	    {
		name: add_refs.inputName.current.value,
		price: add_refs.inputPrice.current.value
	    }
	);

	let config = {
	    headers: {
		"Content-Type" : "application/json"
	    }
	};

	axios.post(API_expenses_add,
		   data, config)
	    .then((res) => {
		setAddNotif(res.data);
	    })
	    .catch((err) => {
		setAddNotif(err.message);
	    });

	add_refs.inputName.current.value = "";
	add_refs.inputPrice.current.value = "";
    }

    function remove() {
	setRemoveNotif(<Loading />);

	axios.get(API_expenses_remove,
		  {
		      params: {
			  name: remove_refs.inputName.current.value
		      }
		  },
		 )
	    .then((res) => {
		setRemoveNotif(res.data);
	    })
	    .catch((err) => {
		setRemoveNotif(err.message);
	    });

	remove_refs.inputName.current.value = "";
    }
    
    return(
        <div id="HRExpensesManage">
            <div className="FormEntry">
		<h2>Add expense:</h2>
                <div className="HRForm">
                    <label for="expenseadd_name">Expense name: </label>
                    <input ref={add_refs.inputName} name="expenseadd_name" type="text"/>
		</div>
		<div className="HRForm">
                    <label for="expenseadd_price">Price: </label>
                    <input ref={add_refs.inputPrice} name="expenseadd_price" type="number"/>
		</div>
                <div className="button-center">
                    <button className="content_button" onClick={add}>Add Expense</button>
		</div>
		{AddNotif}
	    </div>
	    <div className="FormEntry">
		<h2>Remove expense:</h2>
                <div className="HRForm">
                    <label for="expensedelete_name">Expense name: </label>
                    <input ref={remove_refs.inputName} name="expensedelete_name" type="text"/>
		</div>
                <div className="button-center">
                    <button className="content_button" onClick={remove}>Delete Expense</button>
		</div>
		{RemoveNotif}
	    </div>
	</div>
    );
}

function HRPanel(props) {
    return(
	<div id="HRPanel">
            <div>
		<a id="HRPanelHead" href={HOME}>HRSoft - Back</a>
	    </div>

	    <div className="HRPanelButtonSection" style={{marginTop: 50}}>
		<HRPanelButton
		    name="Home"
		    setter={props.setter}
		    content={<HRWelcomePage />}
		/>
	    </div>
            <p className="HRPanelCategory">Employees</p>
            <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="Termination"
		    setter={props.setter}
		    content={<HRTermination />}
		/>
	    </div>
	    <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="Recruitment"
		    setter={props.setter}
		    content={<HRRecruitForms />}
		/>
	    </div>
	    <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="List"
		    setter={props.setter}
		    content={<HREmployeeList />}
		/>
	    </div>

            <p className="HRPanelCategory">Expenses</p>
	    <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="Manage Expenses"
		    setter={props.setter}
		    content={<HRExpensesManage />}
		/>
	    </div>
            <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="List of Expenses"
		    setter={props.setter}
		    content={<HRListExpenses />}
		/>
	    </div>
	    <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="Calculate"
		    setter={props.setter}
		    content={<HRExpensesCalculate />}
		/>
	    </div>
	    <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="Invoice"
		    setter={props.setter}
		    content={<HRExpensesInvoice />}
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
    const [mainContent, setMainContent] = useState(<HRWelcomePage />);
    
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

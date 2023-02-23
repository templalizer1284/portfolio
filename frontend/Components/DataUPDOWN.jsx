import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {Base64} from "js-base64";

import "../Styles/DataUPDOWN.css";

import LoadingGIF from "../Media/loading.gif";
import DownloadIMG from "../Media/download_test.svg";
import DeleteIMG from "../Media/delete_button.svg";

let API_download = "http://localhost:8080/api/dataupdown/download";
let API_delete = "http://localhost:8080/api/dataupdown/delete";
let API_get_all = "http://localhost:8080/api/dataupdown/get_all";
let API_upload = "http://localhost:8080/api/dataupdown/upload";
let HOME = "http://localhost:3000";

const Loading = () => {
    return(
        <div className="loading">
            <img alt="ACHTUNG" src={LoadingGIF}/>
	</div>
    );
};

export default function DataUPDOWN() {

    const [content, setContent] = useState(<Loading />);
    const [UploadNotif, setUploadNotif] = useState();

    const refs = {
	inputFile: useRef(null)
    };
    
    function download(filename) {
	axios({
	    url: API_download,
	    method: "GET",
	    params: {
		filename: filename
	    },
	})
	    .then((res) => {
		console.log(res.data);
		const url = window.URL.createObjectURL(new Blob([Base64.toUint8Array(res.data.data)]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", res.data.filename);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	    });
    }

    function delete_file(filename) {
	axios({
	    url: API_delete,
	    method: "GET",
	    params: {
		filename: filename
	    }
	})
	    .then((res) => {
		setUploadNotif(res.data);
	    })
	    .catch((err) => {
		setUploadNotif(err.message);
	    });
    }
    
    useEffect(() => {
	const interval = setInterval(() => {
	    axios.get(API_get_all)
		.then((res) => {
		    setContent(() => {
			return(
			    <>
				{res.data.map( ({id,filename,filetype}) => (
                                    <div key={id} className="fileEntry">
                                        <button className="fileEntryDeleteButton" onClick={() => {
						    delete_file(filename);
						}}>
                                            <img src={DeleteIMG}/>
					</button>
                                        <img alt={id} src={DownloadIMG} draggable="false" onClick={() => {
						 download(filename);
					     }}/>
					<div style={{fontSize: 16}}>{filename}</div>
                                        <div style={{fontSize: 12, color: "teal"}}>Filetype: {filetype}</div>
				    </div>
				))}
			    </>
			);
		    });
		})
		.catch((err) => {
		    setContent(err.message);
		});
	}, 1000)

	return () => {
	    clearInterval(interval);
	}
    }, []);

    function upload() {

	let data = new FormData();
	data.append("file", refs.inputFile.current.files[0]);

	let config = {
	    headers: {
		"Content-Type" : "multipart/form-data"
	    }
	};

	axios.post(API_upload,
		   data, config)
	    .then((res) => {
		setUploadNotif(res.data);
	    })
	    .catch((err) => {
		setUploadNotif(err.message);
	    });

	refs.inputFile.current.files[0] = "";
    }
    
    return(
        <div id="DataUPDOWN">
            <div id="DataUPDOWNHead">
		<h1>Data Upload/Download Service                <a href={HOME} style={{color: "white", margin: 0}}>(Back)</a></h1>
		<input ref={refs.inputFile} type="file"/>
                <button id="upload_button" onClick={upload}>Upload</button>
		{UploadNotif}
	    </div>
            <div id="DataUPDOWNContent">
		{content}
	    </div>
	</div>
    );
}

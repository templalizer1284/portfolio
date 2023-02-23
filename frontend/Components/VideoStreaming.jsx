import { useState, useRef, useEffect } from "react";
import { Base64 } from "js-base64";
import axios from "axios";

import "../Styles/VideoStream.css";
import VStreamLogoIMG from "../Media/vstreamlogo.svg";

import QuestionMark from "../Media/question_mark.svg";
import LoadingGIF from "../Media/loading.gif";
import PlayIMG from "../Media/play.svg";
import DeleteIMG from "../Media/delete_button.svg";

let API_fetch_video = "http://localhost:8080/api/vstream/fetch_video";
let API_delete_video = "http://localhost:8080/api/vstream/delete_video";
let API_upload = "http://localhost:8080/api/vstream/upload";
let API_get_videos = "http://localhost:8080/api/vstream/get_videos";
let HOME = "http://localhost:3000";

function getVideos() {
    return(
        <div className="VideoEntry">
	    Test
	</div>
    );
}

function uploadVideo(refs, setVideoPreview, setLoading) {
    let canvas = refs.VideoThumbnailCanvas.current;
    let ctx = canvas.getContext("2d");
    let video = refs.VideoPointer.current;
    
    if(video === null){
	setVideoPreview("Please select video from your PC.");
	setLoading();
	return;
    }
	
    canvas.height = video.videoHeight / 3.5;
    canvas.width = video.videoWidth / 3.5;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Download PIC from canvas.
    // let link = document.createElement("a");
    // link.download = "testpic.png";
    // link.href = canvas.toDataURL();
    // link.click();
    
    canvas.toBlob((blob) => {
	let data = new FormData();
	data.append("videotitle", refs.inputVideoTitle.current.value);
	data.append("videodescription", refs.inputVideoDescription.current.value)
	data.append("videodata", refs.inputVideoData.current.files[0]);
	data.append("thumbnail", blob);

	let config = {
	    headers: {
		"Content-Type" : "multipart/form-data"
	    }
	};

	axios.post(API_upload,
		   data, config)
	    .then((res) => {
		if(res.status === 200) {
		    refs.inputVideoTitle.current.value = "";
		    refs.inputVideoDescription.current.value = "";
		}

		setVideoPreview(res.data);
		setLoading();
	    })
	    .catch((err) => {
		setVideoPreview(err.response.data);
		setLoading();
	    });	
    });
}

function UploadForm(props) {

    const [Loading, setLoading] = useState();
    
    const refs = {
	inputVideoTitle: useRef(null),
	inputVideoDescription: useRef(null),
	inputVideoData: useRef(null),
	VideoUploadPreview: useRef(null),
	VideoThumbnailCanvas: useRef(null),
	VideoPointer: useRef(null)
    };
    
    const [VideoPreview, setVideoPreview] = useState(() => {
	return(
            <div>
		<img alt={()=>{Math.random()}} ref={refs.VideoUploadPreview} src={QuestionMark}/>
	    </div>
	);
    });
    
    return(
        <div ref={props.myref} id="VStreamUploadForm">

            <div className="VStreamUploadFormEntry">
		<label for="VideoTitle">Title: </label>
		<input ref={refs.inputVideoTitle} name="VideoTitle" type="text"/>
	    </div>
	    
            <div className="VStreamUploadFormEntry">
		<label for="VideoDescription">Description: </label>
		<input ref={refs.inputVideoDescription} name="VideoDescription" type="text" accept="video/*"/>
	    </div>

	    <div className="VStreamUploadFormEntry">
		<input onChange={() => {
			   setVideoPreview(() => {

			       let blobURL = URL.createObjectURL(refs.inputVideoData.current.files[0]);
			       
			       return(
                                   <div>
                                       <video ref={refs.VideoPointer} src={blobURL} style={{width: 440, height: 292}} controls>
                                       </video>
				   </div>
			       );
			   });
		       }} ref={refs.inputVideoData} id="upload_file_entry" type="file"/>
	    </div>
            <div id="VStreamUploadFormEntry">
		{VideoPreview}
		<canvas ref={refs.VideoThumbnailCanvas}></canvas>
	    </div>
	    <button id="VStreamUploadButton" onClick={() => {
			setLoading(<img src={LoadingGIF} />);
			uploadVideo(refs, setVideoPreview, setLoading);
		    }} className="VStreamHeadButton">Send</button>
            <button id="VStreamCloseButton" className="VStreamHeadButton" onClick={() => {
			document.getElementById("VStreamContent").style.zIndex = -5;
			document.getElementById("VStreamUploadForm").style.display = "none";
		    }}>
		Close
	    </button>
            <div id="VStreamNotif">
		{Loading}
	    </div>
	</div>
    );
}

export default function VideoStreaming() {

    let menu_opened = false;
    
    const [content, setContent] = useState(<img src={LoadingGIF} style={{filter: "invert(80%)", marginLeft: 520}}/>);

    const refs = {
	head: useRef(null),
	headButtonMenu: useRef(null),
	uploadForm: useRef(null)
    };

    useEffect(() => {
	const interval = setInterval(() => {
	    axios.get(API_get_videos)
		.then((res) => {
		    // let link = document.createElement("img");
		    // link.src = URL.createObjectURL(new Blob([Base64.toUint8Array(thumbnails.at(1))]));
		    // link.style.display = "block";
		    // link.style.position = "relative";
		    // document.body.appendChild(link);
		    
		    setContent(() => {
			return(
			    <>
		     		{res.data.map(({id,title,description}) => (
                                    <div key={id} className="Video">
					
                                        <div id={"overlay-".concat(id)} className="VideoOverlay" onClick={() => {
						 axios.get(API_fetch_video, {
						     params: {
							 id: id+50
						     }
						 })
						     .then((res) => {
							 document.getElementById(id).style.opacity = 0;
							 document.getElementById("video-".concat(id)).src = URL.createObjectURL(new Blob([Base64.toUint8Array(res.data.videodata)]));
							 document.getElementById("video-".concat(id)).style.display = "block";
							 document.getElementById("overlay-".concat(id)).style.display = "none";
						     })
						     .catch((err) => {
							 console.log(err.message);
						     });
					     }}>
                                            <img style={{filter: "invert(80%)", transform: "scale(0.5)"}} id={"playimg-".concat(id)} src={PlayIMG} onClick={() => {
						     document.getElementById("playimg-".concat(id)).src = LoadingGIF;
						 }} />
					</div>
                                        <img id={id} src={LoadingGIF}/>
					{title}
					<img src={DeleteIMG} className="close_button" onClick={() => {
						 document.getElementById("playimg-".concat(id)).src = LoadingGIF;
						 axios.get(API_delete_video,
							   {
							       params: {
								   id: id+50,
								   info_id: id
							       }
							   })
						     .then((res) => {
							 console.log(res.data)
						     })
						     .catch((err) => {
							 console.log(res.message);
						     });
					     }}/>
					<video id={"video-".concat(id)} src="" style={{display: "none"}} autoPlay controls>
                                        </video>
				    </div>
				))}
		     	    </>
			);
		    });
		})
		.catch((err) => {
		    console.log(err.message);
		});

	    axios.get(API_get_videos)
	    	.then((res) => {
		    let thumbnails = new Array(res.data.length);
		    for(let i = 0; i < res.data.length; i++) {
			thumbnails.push(res.data[i].thumbnail);
		    }
		    for(let i = 0; i < res.data.length; i++) {
			document.getElementById(res.data[i].id).src = URL.createObjectURL(new Blob([Base64.toUint8Array(res.data[i].thumbnail)]));
		    }
		})
		.catch((err) => {
		    console.log(err.message);
		});
	}, 3000);

	return () => {
	    clearInterval(interval);
	};
    }, []);
    
    return(
        <div id="VideoStreaming">
            <div id="VStreamHead" ref={refs.head}>
                <div id="VStreamLogo">
                    <img src={VStreamLogoIMG} onClick={() => {
			     let link = document.createElement("a");
			     link.href = HOME;
			     link.click();
			 }} />
		</div>
		
		<UploadForm
		    myref = {refs.uploadForm}
		/>
		
                <button ref={refs.headButtonMenu} className="VStreamUploadForm" onClick={() => {
			    document.getElementById("VStreamUploadForm").style.display = "flex";
			}} className="VStreamHeadButton">
		    Upload
		</button>
	    </div>
	    
            <div id="VStreamContent">
		{content}
	    </div>
	</div>
    );
}

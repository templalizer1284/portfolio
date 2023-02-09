import "../Styles/AirBNB_Hero.css";

import pic_1 from "../Media/1.png";
import pic_2 from "../Media/2.png";
import pic_3 from "../Media/3.png";
import pic_4 from "../Media/4.png";
import pic_5 from "../Media/5.png";
import pic_6 from "../Media/6.png";
import pic_7 from "../Media/7.png";
import pic_8 from "../Media/8.png";
import pic_9 from "../Media/9.png";
import pic_10 from "../Media/10.png";
import pic_11 from "../Media/11.png";
import pic_12 from "../Media/12.png";
import pic_13 from "../Media/13.png";

export default function AirBNB_Hero() {
    return(
        <div className="Hero">
            <div className="image-grid">
                <div className="imageContainer">
		    <img className="picAnim" alt="HeroPic" src={pic_1 }/>
		</div>

                <div className="imageContainer" id="first_c">
		    <img className="picAnim" alt="HeroPic" src={pic_11 }/>
                    <img className="picAnim" alt="HeroPic" src={pic_3 }/>
		</div>
		
                <div className="imageContainer" id="second_c">
		    <img className="picAnim" alt="HeroPic" src={pic_4 }/>
		    <img className="picAnim" alt="HeroPic" src={pic_10 }/>	
		</div>
		
                <div className="imageContainer" id="third_c">
		    <img className="picAnim" alt="HeroPic" src={pic_6 }/>
		    <img className="picAnim" alt="HeroPic" src={pic_7 }/>	
		</div>

                <div className="imageContainer" id="fourth_c">
		    <img className="picAnim" alt="HeroPic" src={pic_8 }/>
                    <img className="picAnim" alt="HeroPic" src={pic_9 }/>
		</div>
		
	    </div>
	    
	    
	    <div className="info">
                <p className="info-head">
		    Online Experiences
		</p>
                <p className="info-desc">
		    The terms "mushroom" and "toadstool" go back centuries and were never precisely defined, nor was there consensus on application. During the 15th and 16th centuries, the terms mushrom, mushrum, muscheron, mousheroms, mussheron, or musserouns were used.
		</p>
	    </div>
	    
	</div>
    )
}

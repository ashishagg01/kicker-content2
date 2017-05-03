/**
 * 
 */
package org.kicker.aem.content.featuredmedia;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;


/**
 * The Class FeaturedMedia.
 */
public class FeaturedMedia extends WCMUse {

	/** The featured media list. */
	List<FeaturedMediaBean> featMedList;

	/** The Constant FM_DIALOG_NAME. */
	static final String FM_DIALOG_NAME="featuredMedia";
	
	/** The Constant VIDEO. */
	static final String VIDEO = "FMvideo";
	
	/** The Constant IMAGE. */
	static final String IMAGE = "FMimage";
	
	/** The Constant INTRO. */
	static final String INTRO = "FMintro";
	
	/** The Constant TITLE. */
	static final String TITLE = "FMtitle";
	
	/** The Constant CALL_TO_ACTION. */
	static final String CALL_TO_ACTION = "FMcallToAction";
	
	/** The Constant CALL_TO_ACTION_TEXT. */
	static final String CALL_TO_ACTION_TEXT = "FMcallToActionText";

	/** LOGGER is a variable of type Logger. */
	private static final  Logger LOGGER = LoggerFactory.getLogger(FeaturedMedia.class);

	@Override
	public void activate() throws JSONException  {
		LOGGER.info("Reading FeaturedMedia Data");
		
		String[] fetMedArr = getProperties().get(FM_DIALOG_NAME, String[].class);

		if ( null!=fetMedArr && fetMedArr.length > 0) {
			featMedList = new ArrayList<FeaturedMediaBean>();

			for (int fmCount = 0; fmCount < fetMedArr.length; fmCount++) {

				JSONObject jsonObj;

				jsonObj = new JSONObject(fetMedArr[fmCount]);
				FeaturedMediaBean fmBean = new FeaturedMediaBean();

				fmBean.setFMvideo(jsonObj.get(VIDEO).toString());
				fmBean.setFMimage(jsonObj.get(IMAGE).toString());
				fmBean.setFMintro(jsonObj.get(INTRO).toString());
				fmBean.setFMtitle(jsonObj.get(TITLE).toString());
				if (jsonObj.get(CALL_TO_ACTION).toString()
						.startsWith("/content")) {
					fmBean.setFMcallToAction(jsonObj.get(CALL_TO_ACTION)
							.toString() + ".html");
				} else {
					fmBean.setFMcallToAction(jsonObj.get(CALL_TO_ACTION)
							.toString()); 
				}

				fmBean.setFMcallToActionText(jsonObj.get(
						CALL_TO_ACTION_TEXT).toString());

				featMedList.add(fmBean);


			}
		}
	}

	/**
	 * Gets the featured media list.
	 *
	 * @return the featured media list
	 */
	public List<FeaturedMediaBean> getFeatMedList() {
		return featMedList;
	}

}

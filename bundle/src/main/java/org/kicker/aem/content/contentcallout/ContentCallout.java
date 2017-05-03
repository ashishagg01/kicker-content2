package org.kicker.aem.content.contentcallout;

import com.adobe.cq.sightly.WCMUse;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ContentCallout extends WCMUse {

	private static final  Logger LOGGER=LoggerFactory.getLogger(ContentCallout.class);
	
	/**
	 * This is a collection of ContentCalloutBean which store the ContentCallout data
	 * captured from the Component Dialog
	 */
	List<ContentCalloutBean> calloutList;
	
	/**
	 * Constants to fetch properties
	 */
	static final String	CC_DIALOG_NAME="callout";
	static final String INTRO="intro";
	static final String TITLE="title";
	static final String DESCRIPTION="description";
	static final String CALL_TO_ACTION="callToAction";
	
	/* (non-Javadoc)
	 * @see com.adobe.cq.sightly.WCMUse#activate()
	 */
	@Override
	public void activate() throws JSONException {
		
		LOGGER.info("Reading Content Callout Data");
		
		String[] calloutArr;
		calloutArr = getProperties().get(CC_DIALOG_NAME, String[].class);
		
		if ( null!=calloutArr  && calloutArr.length > 0) {
			calloutList = new ArrayList<ContentCalloutBean>();

			for (int ccCount = 0; ccCount < calloutArr.length; ccCount++) {
				JSONObject jsonObj = new JSONObject(calloutArr[ccCount]);
				ContentCalloutBean ccBean = new ContentCalloutBean();
				ccBean.setIntro(jsonObj.get(INTRO).toString());
				ccBean.setTitle(jsonObj.get(TITLE).toString());
				ccBean.setDescription(jsonObj.get(DESCRIPTION).toString());
				if(jsonObj.get(CALL_TO_ACTION).toString()
						.startsWith("/content"))
				{
					ccBean.setCallToAction(jsonObj.get(CALL_TO_ACTION).toString()+".html");
				}
				else
				{
					ccBean.setCallToAction(jsonObj.get(CALL_TO_ACTION).toString());
				}
				calloutList.add(ccBean);
			}
		}
	}
	/**
	 * This method returns the list of ContentCalloutBean
	 * @return List of ContentCalloutBean
	 */
	
	public List<ContentCalloutBean> getCalloutList() {
		return calloutList;
	}

}
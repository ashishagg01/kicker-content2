package org.kicker.aem.content.ticker;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

/**
 * This class is responsible for creating a list of TickerBean and 
 * returning the same to the calling component for display
 * 
 * @author b.mazumdar
 *
 */
public class Ticker extends WCMUse{
	
	
	/**
	 * Logger for this class
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(Ticker.class);
	
	/**
	 * This is a collection of TickerBeans which store the ticker date
	 * captured from the Component Dialog
	 */
	private List<TickerBean> tickerItems;
	
	/**
	 * Constants to fetch properties
	 */
	static final String TICKER_DIALOG_NAME = "ticker";
	static final String HEADLINE = "headline";
	static final String CALL_TO_ACTION = "callToAction";
	static final String CALL_TO_ACTION_TEXT = "callToActionText";

	/* (non-Javadoc)
	 * @see com.adobe.cq.sightly.WCMUse#activate()
	 */
	@Override
	public void activate() throws JSONException {
		String tickerData[] = getProperties().get(TICKER_DIALOG_NAME, String[].class);
		
		if(null!=tickerData && tickerData.length>0){
			LOGGER.info("Processing Ticker Data");
			tickerItems = new ArrayList<TickerBean>();
			
			for(int iCount=0;iCount<tickerData.length;iCount++){
				JSONObject jsonObject = new JSONObject(tickerData[iCount]);
				TickerBean tickerBean = new TickerBean();
				tickerBean.setHeadline(jsonObject.get(HEADLINE).toString());
				if(jsonObject.get(CALL_TO_ACTION).toString().startsWith("/content")){
					tickerBean.setCallToAction(jsonObject.getString(CALL_TO_ACTION).toString()+".html");
				}else{
					tickerBean.setCallToAction(jsonObject.getString(CALL_TO_ACTION).toString());
				}
				tickerBean.setCallToActionText(jsonObject.getString(CALL_TO_ACTION_TEXT).toString());
				tickerItems.add(tickerBean);
			}
		}
	}
	
	/**
	 * This method returns the list of TickerBeans
	 * @return List of TickerBean
	 */
	public List<TickerBean> getTickerItems(){
		return tickerItems;
	}

}

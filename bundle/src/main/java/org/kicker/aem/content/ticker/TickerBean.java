package org.kicker.aem.content.ticker;

/**
 * @author b.mazumdar
 *
 */
public class TickerBean {
	
    /**
     * Ticker Headline
     */
    private String headline;

    /**
     * Call to Action Link
     */
    private String callToAction;

    /**
     * Call to Action Text
     */
    private String callToActionText;

	/**
	 * Getter for Headline
	 * @return headline
	 */
	public String getHeadline() {
		return headline;
	}

	/**
	 * Setter for Headline
	 * @param headline
	 */
	public void setHeadline(String headline) {
		this.headline = headline;
	}

	/**
	 * Getter for Call to Action Link
	 * @return callToAction
	 */
	public String getCallToAction() {
		return callToAction;
	}

	/**
	 * Setter for Call to Action Link
	 * @param callToAction
	 */
	public void setCallToAction(String callToAction) {
		this.callToAction = callToAction;
	}

	/**
	 * Getter for Call to Action Text
	 * @return callToActionText
	 */
	public String getCallToActionText() {
		return callToActionText;
	}

	/**
	 * Setter for Call to Action Text
	 * @param callToActionText
	 */
	public void setCallToActionText(String callToActionText) {
		this.callToActionText = callToActionText;
	} 

}

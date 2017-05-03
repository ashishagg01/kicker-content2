/**
 * 
 */
package org.kicker.aem.content.contentcallout;

/**
 * @author priyanka.a.biswal
 *
 */
public class ContentCalloutBean {
	/**
	 * intro is a variable of type String which hold the data provided by author in the dialog
	 */
	private String intro;
	
	/**
	 * title is a variable of type String which hold the data provided by author in the dialog
	 */
	private String title;
	
	/**
	 * description is a variable of type String which hold the data provided by author in the dialog
	 */
	private String description;
	
	/**
	 * callToAction is a variable of type String which hold the data provided by author in the dialog
	 */
	private String callToAction;
	
	public String getIntro() {
		return intro;
	}
	public void setIntro(String intro) {
		this.intro = intro;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCallToAction() {
		return callToAction;
	}
	public void setCallToAction(String callToAction) {
		this.callToAction = callToAction;
	}

}
/**
 * 
 */
package org.kicker.aem.content.footer;

/**
 * POJO used for putting values in the list used in footer component.
 *
 * @author Parag, Swati
 * @version 1.0
 * @since 2015-08-20
 */
public class FooterLinkVO {

	/** The url. */
	private String url;
	
	/** The text. */
	private String text;

	/**
	 * Gets the url.
	 *
	 * @return the url
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * Gets the text.
	 *
	 * @return the text
	 */
	public String getText() {
		return text;
	}

	/**
	 * Sets the url.
	 *
	 * @param url            the url to set
	 */
	public void setUrl(String url) {
		this.url = url;
	}

	/**
	 * Sets the text.
	 *
	 * @param text            the text to set
	 */
	public void setText(String text) {
		this.text = text;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "FooterLinkVO [url=" + url + ", text=" + text + "]";
	}

}

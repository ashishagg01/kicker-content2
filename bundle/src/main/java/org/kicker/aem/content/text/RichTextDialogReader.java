package org.kicker.aem.content.text;

import com.adobe.cq.sightly.WCMUse;


/**
 * The Class RichTextDialogReader.
 */
public class RichTextDialogReader extends WCMUse {

	/** The input text. */
	private String inputText;

	/** The default blank txt. */
	private static final String DEFAULT_BLANK_TXT = "&nbsp;";

	/* (non-Javadoc)
	 * @see com.adobe.cq.sightly.WCMUse#activate()
	 */
	@Override
	public void activate() throws Exception {

		inputText = getProperties().get("richTxtEditor", DEFAULT_BLANK_TXT);

	}
	
	/**
	 * Gets the input text.
	 *
	 * @return the input text
	 */
	public String getInputText() {
		return inputText;
	}

}

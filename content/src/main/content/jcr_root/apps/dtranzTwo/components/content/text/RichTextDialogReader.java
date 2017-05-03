package apps.dtranzTwo.components.content.text;

import com.adobe.cq.sightly.WCMUse;

/**
 * This Class is used to read content from dialog
 * 
 * @author mayank.b.saxena
 *
 */
public class RichTextDialogReader extends WCMUse {

	/**
	 * Attribute for inputText
	 */
	private String inputText;

	/**
	 * Attribute for default blank text
	 */
	private final String DEFAULT_BLANK_TXT = "&nbsp;";

	/**
	 * @throws Exception
	 */
	@Override
	public void activate() throws Exception {

		inputText = getProperties().get("richTxtEditor", DEFAULT_BLANK_TXT);

	}

	/**
	 * getter for inputText
	 * 
	 * @return
	 */
	public String getInputText() {
		return inputText;
	}

}
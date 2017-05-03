package org.kicker.aem.content.utilitynav;

import com.adobe.cq.sightly.WCMUse;
import java.util.List;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * The Class UtilityNavMultiFieldReader.
 */
public class UtilityNavMultiFieldReader extends WCMUse {

	/** The Constant LOGGER. */
	public static final Logger LOGGER = LoggerFactory.getLogger(UtilityNavMultiFieldReader.class);

	/** The text from utility nav. */
	private String[] textFromUtilityNav;

	/** The utility nav. */
	private List<UtilityNavigation> utilityNav = new ArrayList<UtilityNavigation>();

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.adobe.cq.sightly.WCMUse#activate()
	 */
	@Override
	public void activate() throws Exception {
		textFromUtilityNav = getCurrentStyle().get("links", String[].class);
		LOGGER.info("Text From UtilityNav JSON Obj::: ", Arrays.toString(textFromUtilityNav));

		if (textFromUtilityNav != null && textFromUtilityNav.length > 0) {
			for (int i = 0; i < textFromUtilityNav.length; i++) {
				LOGGER.info("Utility Nav Object ::: ", textFromUtilityNav[i]);
				JSONObject utilityJson = new JSONObject(textFromUtilityNav[i]);
				UtilityNavigation utility = new UtilityNavigation();
				utility.setUrl(utilityJson.get("url").toString());
				utility.setText(utilityJson.get("text").toString());
				utilityNav.add(utility);
			}
		}
	}

	/**
	 * Gets the utility nav.
	 *
	 * @return the utility nav
	 */
	public List<UtilityNavigation> getUtilityNav() {
		LOGGER.info("Returning List From UtilityNavMultiFieldReader with Size:::: ", utilityNav.size());
		return utilityNav;
	}

	/**
	 * Gets the text from utility nav.
	 *
	 * @return the text from utility nav
	 */
	public String[] getTextFromUtilityNav() {
		return textFromUtilityNav;
	}
}

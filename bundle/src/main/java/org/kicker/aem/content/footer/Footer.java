package org.kicker.aem.content.footer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

/**
 * Footer class is used to: * Fetch data from the Footer component's
 * design_dialog using currentStyle object. * Process and return data to the
 * HTML file for displaying.
 *
 * @author Parag, Swati
 * @version 1.0
 * @since 2015-08-20
 */
public class Footer extends WCMUse {

	/** containing properties from footer design_dialog. */
	private Map<String, String> result;

	/** contains composite field(Link URL and Link Text) values. */
	private List<FooterLinkVO> footerLinks;

	/** initialising logger object. */
	private static final Logger LOGGER = LoggerFactory.getLogger(Footer.class);

	/**
	 * copyright property for dialog
	 */
	static final String COPYRIGHT = "copyright";

	/** description property for dialog. */
	static final String DESCRIPTION = "description";

	/** twitter property for dialog. */
	static final String TWITTER = "twitter";

	/** facebook property for dialog. */
	static final String FACEBOOK = "facebook";

	/** linkedin property for dialog. */
	static final String LINKEDIN = "linkedin";

	/** rss property for dialog. */
	static final String RSS = "rss";

	/** followUs property for dialog. */
	static final String FOLLOWUS = "followUs";

	/** links property from dialog. */
	static final String LINKS = "links";

	/** url property from composite field in dialog. */
	private static final String URL = "url";

	/** text property from composite field in dialog. */
	private static final String TEXT = "text";

	/**
	 * This method is used to perform post initialization tasks i.e. getting
	 * data from the footer dialog and process it.
	 *
	 * @return void
	 * @throws Exception the exception
	 */
	@Override
	public void activate() throws Exception {
		LOGGER.info("****** Inside activate ******");

		result = getDataInMap();
		footerLinks = getDataInList();
	}

	/**
	 * Storing link URL and text data in arraylist from footer dialog.
	 *
	 * @return List<FooterLinkVO>
	 * @throws JSONException the JSON exception
	 */
	public List<FooterLinkVO> getDataInList() throws JSONException {
		String[] links = getCurrentStyle().get(LINKS, String[].class);
		List<FooterLinkVO> arrayList = null;
		if (links != null) {

			arrayList = new ArrayList<FooterLinkVO>();

			for (int listCounter = 0; listCounter < links.length; listCounter++) {
				LOGGER.info(" Inside List for loop ");

				// parsing JSON from String array and putting values in
				// FooterLinkVO
				JSONObject footerJSONObj = new JSONObject(links[listCounter]);
				FooterLinkVO footerLinkObj = new FooterLinkVO();
				footerLinkObj.setUrl(footerJSONObj.get(URL).toString());
				footerLinkObj.setText(footerJSONObj.get(TEXT).toString());
				arrayList.add(footerLinkObj);
			}
		}
		return arrayList;
	}

	/**
	 * Storing the footer dialog data using getCurrentStyle().
	 *
	 * @return Map<String, String>
	 */
	public Map<String, String> getDataInMap() {

		Map<String, String> footerContentMap = new HashMap<String, String>();

		String copyright = getCurrentStyle().get(COPYRIGHT, String.class);

		if (copyright != null && copyright.length() > 7) {
			copyright = copyright.substring(3, copyright.length() - 5);
		}
		
		footerContentMap.put(COPYRIGHT, copyright);
		footerContentMap.put(DESCRIPTION, getCurrentStyle().get(DESCRIPTION, String.class));
		footerContentMap.put(TWITTER, getCurrentStyle().get(TWITTER, String.class));
		footerContentMap.put(FACEBOOK, getCurrentStyle().get(FACEBOOK, String.class));
		footerContentMap.put(LINKEDIN, getCurrentStyle().get(LINKEDIN, String.class));
		footerContentMap.put(RSS, getCurrentStyle().get(RSS, String.class));
		footerContentMap.put(FOLLOWUS, getCurrentStyle().get(FOLLOWUS, String.class));

		return footerContentMap;
	}

	/**
	 * Contains properties from dialog.
	 *
	 * @return Map<String, String>
	 */
	public Map<String, String> getResult() {
		return result;
	}

	/**
	 * The list containing composite field(Link URL and Link Text) values.
	 * 
	 * @return List<FooterLinkVO>
	 */
	public List<FooterLinkVO> getLinkList() {
		return footerLinks;
	}

}

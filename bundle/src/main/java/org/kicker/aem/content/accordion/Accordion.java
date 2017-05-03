package org.kicker.aem.content.accordion;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.adobe.cq.sightly.WCMUse;

public class Accordion extends WCMUse {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(Accordion.class);
	private String seeMore;
	private String seeLess;
	static final String DEFSEEMORE = "See More";
	static final String DEFSEELESS = "See Less";

	@Override
	public void activate() throws Exception {
		seeMore = getProperties().get("seeMore", DEFSEEMORE);
		seeLess = getProperties().get("seeLess", DEFSEELESS);
		LOGGER.info("Value of seeMore and seeLess are <" + seeMore + "> and <"
				+ seeLess + "> repectively.");
	}

	public String getSeeMore() {
		return seeMore;
	}

	public String getSeeLess() {
		return seeLess;
	}

}
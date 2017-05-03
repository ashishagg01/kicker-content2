package org.kicker.aem.content.healthcondition;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Value;

import org.apache.felix.scr.annotations.Reference;
import org.apache.jackrabbit.api.security.user.User;
import org.apache.sling.api.resource.Resource;
import org.kicker.aem.content.catFinder.CatFinderBean;
import org.kicker.aem.content.service.HealthConditionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

/**
 * The Class HealthCondition.
 */
public class HealthCondition extends WCMUse {

	/** The logger. */
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	/** The Constant PROFILE. */
	final static String PROFILE = "/profile";

	/** The Constant HTML_EXT. */
	final static String HTML_EXT = ".html";

	final static String HEALTH_CONDITION_PREF = "healthCondPrefs";

	/** The preferences. */
	private List<String> preferences;

	/** The health condition page list. */
	private List<CatFinderBean> healthConditionPageList;

	@Reference
	private HealthConditionService healthConditionService;

	/**
	 * Gets the health condition page list.
	 *
	 * @return the health condition page list
	 */
	public List<CatFinderBean> getHealthConditionPageList() {

		return healthConditionPageList;
	}

	/*
	 * 
	 * @see com.adobe.cq.sightly.WCMUse#activate()
	 */
	@Override
	public void activate() throws Exception {
		User user = getResourceResolver().adaptTo(User.class);
		Resource res = getResourceResolver().getResource(user.getPath() + PROFILE);
		Node node = res.adaptTo(Node.class);
		preferences = new ArrayList<String>();
		healthConditionPageList = new ArrayList<CatFinderBean>();

		try {
			Property prop = node.getProperty(HEALTH_CONDITION_PREF);
			if (prop != null) {
				Value[] values = prop.getValues();
				for (Value val : values) {
					preferences.add(val.getString());
				}
				iterateUserPreferences(preferences);
			}
		} catch (RepositoryException e) {
			throw e;
		}

	}

	public Map<String, String> getHealthConditionPageMap() {
		Map<String, String> healthConditionPageMap = HealthConditionService.getPageDataMap();
		LOGGER.info("healthConditionService ------::" + healthConditionService
				+ "HealthConditionService.getPageDataMap() ----::" + HealthConditionService.getPageDataMap());
	
		// populating pageDatMap in case of deleted cache.
		if (null == HealthConditionService.getPageDataMap()) {
			healthConditionService.getChildPages(getResourceResolver());
			getHealthConditionPageMap();
		}
		
		return healthConditionPageMap;
	}

	/**
	 * Iterate user preferences.
	 *
	 * @param preferences
	 *            the preferences
	 */
	public void iterateUserPreferences(List<String> preferences) {
		for (String preference : preferences) {
			if (null != getHealthConditionPageMap() && getHealthConditionPageMap().containsKey(preference)) {
				CatFinderBean healthConditonPageBean = new CatFinderBean();
				healthConditonPageBean.setPath(getHealthConditionPageMap().get(preference));
				healthConditonPageBean.setTitle(preference);
				healthConditionPageList.add(healthConditonPageBean);
			}
		}
	}
}

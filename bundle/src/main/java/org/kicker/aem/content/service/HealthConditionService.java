package org.kicker.aem.content.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

/**
 * The Class ServiceConfigConsumer.
 */

@Component(label = "Service for Children Pages", immediate = true, enabled = true, metatype = true, configurationFactory = true)
@Service(HealthConditionService.class)
public class HealthConditionService {
	/** initialzing logger object. */
	private static final Logger LOGGER = LoggerFactory.getLogger(HealthConditionService.class);

	/** The resolver factory. */

	@Reference
	private ResourceResolverFactory resolverFactory;

	public ResourceResolverFactory getResolverFactory() {
		return resolverFactory;
	}

	public void setResolverFactory(ResourceResolverFactory resolverFactory) {
		this.resolverFactory = resolverFactory;
	}

	private static Map<String, String> pageDataMap = new HashMap<String, String>();

	/**
	 * @return the pageDataMap
	 */
	public static Map<String, String> getPageDataMap() {
		return pageDataMap;
	}

	/** The page uri. */
	private static String pageUri = "/content/dtranzTwo/en-US/health-conditions";

	/**
	 * Gets the specific page.
	 *
	 * @return the specific page
	 * @throws LoginException 
	 * @throws Exception
	 *             the exception
	 */
	@SuppressWarnings("deprecation")
	@Activate
	public void getSpecificPage() throws LoginException {
		ResourceResolver resourceResolver = resolverFactory.getAdministrativeResourceResolver(null);
		getChildPages(resourceResolver);
	}


	/**
	 * Gets the child page.
	 *
	 * @param resourceResolver
	 *            the resource resolver
	 * @return the child page
	 */
	public void getChildPages(ResourceResolver resourceResolver) {
		if (null == pageDataMap || pageDataMap.isEmpty()) {
			pageDataMap = new HashMap<String, String>();
			PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
			Page page = pageManager.getPage(pageUri);
			LOGGER.info("Fetching Child Pages : " + page.getTitle());
			Iterator<Page> pageIterator = page.listChildren();
			int child = 0;
			while (pageIterator.hasNext()) {
				Page catPage = pageIterator.next();
				pageDataMap.put(catPage.getTitle(), catPage.getPath() + ".html");
				child++;
				LOGGER.info("path[" + child + "]  : " + catPage.getPath() + ".html");
				LOGGER.info("title[" + child + "]  : " + catPage.getTitle());
			}
			LOGGER.info("getChildPages(ResourceResolver) exit");
		}
	}
}

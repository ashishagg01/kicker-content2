package org.kicker.aem.content.service;

import static org.junit.Assert.*;

import java.util.Map;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.common.collect.ImmutableMap;

import io.wcm.testing.mock.aem.junit.AemContext;

/**
 * The Class TestHealthConditionService.
 */
@RunWith(MockitoJUnitRunner.class)
public class TestHealthConditionService {

	/** The resource resolver. */
	@Mock
	ResourceResolver resourceResolver;

	/** The request. */
	@Mock
	SlingHttpServletRequest request;

	/** The resolver factory. */
	@Mock
	ResourceResolverFactory resolverFactory;

	/** The page manager. */
	@Mock
	PageManager pageManager;

	/** The page data map. */
	@Mock
	Map<String, String> pageDataMap;

	/** The context. */
	@Rule
	public final AemContext context = new AemContext();

	/** The health condition service. */
	HealthConditionService healthConditionService = new HealthConditionService();

	/**
	 * Test get specific page.
	 * @throws LoginException 
	 *
	 * @throws Exception the exception
	 */
	@SuppressWarnings("deprecation")
	@Test
	public void testGetSpecificPage() throws LoginException {

		Page page = context.create().page("/content/dtranzTwo/en-US/health-conditions", "template", "test");
		Page childPage = context.create().page("/content/dtranzTwo/en-US/health-conditions/asthma", "mockTemplate",
				ImmutableMap.<String, Object> builder().put("title", "Test").put("name", "test2").build());
		healthConditionService.setResolverFactory(resolverFactory);
		Mockito.when(resolverFactory.getAdministrativeResourceResolver(null)).thenReturn(resourceResolver);
		Mockito.when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		Mockito.when(pageManager.getPage(Mockito.anyString())).thenReturn(page);
		healthConditionService.getSpecificPage();
		assertEquals("/content/dtranzTwo/en-US/health-conditions/asthma.html", childPage.getPath() + ".html");
	}

}

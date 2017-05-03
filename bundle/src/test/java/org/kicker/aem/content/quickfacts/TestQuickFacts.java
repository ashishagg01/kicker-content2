/**
 * 
 */
package org.kicker.aem.content.quickfacts;

import static org.junit.Assert.*;

import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;



/**
 * @author b.kaushal.karanwal
 *
 */

@RunWith(MockitoJUnitRunner.class)
public class TestQuickFacts {
	private String FILE_REFERENCE="/content/dam/dtranzTwo/img/explore-customer-service.png";
	private String CTA_TEXT="Quick Facts about Boston Scientific";
	private String QUICK_TITLE="/content/geometrixx-outdoors/en/men";
	private String CTA_LINK="/content/geometrixx-outdoors/en/men";
	
	@Mock
	ValueMap properties;
	/**
	 * Test method for {@link org.kicker.aem.content.quickfacts.QuickFacts#activate()}.
	 */

	
	QuickFacts quickFacts = new QuickFacts() {
		public ValueMap getProperties() {
			return properties;
		}
	};
	
	@Before
	public void setup() {
		Mockito.when(properties.get(QuickFactsConstants.PROPERTY_LINK, String[].class))
				.thenReturn(setUpAndReturnData());
		Mockito.when(properties.get(QuickFactsConstants.FILE_REFERENCE,""))
		.thenReturn(FILE_REFERENCE);
		Mockito.when(properties.get(QuickFactsConstants.CTA_TEXT, QuickFactsConstants.CTA_TEXT_DEFAULT))
		.thenReturn(CTA_TEXT);
		Mockito.when(properties.get(QuickFactsConstants.CTA_LINK, QuickFactsConstants.CTA_LINK_DEFAULT))
		.thenReturn(CTA_LINK);
		Mockito.when(properties.get(QuickFactsConstants.QUICK_TITLE, QuickFactsConstants.QUICK_TITLE_DEFAULT))
		.thenReturn(QUICK_TITLE);
	}
	

	@Test(expected=JSONException.class)
	public void testActivate() throws  Exception {
		quickFacts.activate();
		assertNotNull(quickFacts.getFactList());
//		assertTrue(quickFacts.getFactList().size()>0);
		assertEquals(2, quickFacts.getFactList().size());
		assertEquals(CTA_LINK, quickFacts.getCtaLink());
		assertEquals(CTA_TEXT, quickFacts.getCtaText());
		assertEquals(FILE_REFERENCE, quickFacts.getImage());
		assertEquals(QUICK_TITLE, quickFacts.getTitle());
		assertNotNull(quickFacts.getFactList().get(0).getFact());
		assertNotNull(quickFacts.getFactList().get(0).getFactDesc());
		assertNotNull(quickFacts.getFactList().get(1).getFact());
		assertNotNull(quickFacts.getFactList().get(1).getFactDesc());
		assertNotNull(quickFacts.getCtaLink());
		assertNotNull(quickFacts.getCtaText());
		assertNotNull(quickFacts.getImage());
		assertNotNull(quickFacts.getTitle());
		Mockito.when(properties.get(QuickFactsConstants.PROPERTY_LINK, String[].class))
		.thenReturn(null);
		quickFacts.activate();
		Mockito.when(properties.get(QuickFactsConstants.PROPERTY_LINK, String[].class))
		.thenReturn(new String[]{ "" });
		quickFacts.activate();
	
	}
	private String[] setUpAndReturnData() {
		return new String[] { "{\"mainTitle\":\"check\",\"description\":\"cjecl\"}",
				"{\"mainTitle\":\"check\",\"description\":\"cjecl\"} "
				 };

	}

}

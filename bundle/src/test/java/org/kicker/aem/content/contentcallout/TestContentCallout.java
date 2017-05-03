/**
 * 
 */
package org.kicker.aem.content.contentcallout;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertNotEquals;

import org.apache.sling.api.resource.ValueMap;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

// TODO: Auto-generated Javadoc
/**
 * The Class TestContentCallout.
 */
/**
 * @author priyanka.a.biswal
 *
 */
@RunWith(MockitoJUnitRunner.class)
public class TestContentCallout {

	/** The mocked properties. */
	@Mock
	ValueMap properties;

	/** The ccallout. */
	ContentCallout cCallout = new ContentCallout() {
		public ValueMap getProperties() {
			return properties;
		}

	};

	/**
	 * Setup.
	 */
	@Before
	public void setup() {
		Mockito.when(
				properties.get(ContentCallout.CC_DIALOG_NAME, String[].class))
				.thenReturn(setUpAndReturnData());
	}

	/**
	 * Test activate.
	 *
	 * @throws Exception
	 *             the exception
	 */
	@Test
	public void testActivateForNull() throws Exception {
		cCallout.activate();
		assertNotNull(cCallout.getCalloutList());
		assertTrue(cCallout.getCalloutList().size() > 0);
		
		assertNotNull(cCallout.getCalloutList().get(0).getIntro());	
		assertNotNull(cCallout.getCalloutList().get(0).getTitle());
		assertNotNull(cCallout.getCalloutList().get(0).getDescription());
		assertNotNull(cCallout.getCalloutList().get(0).getCallToAction());

		assertNotNull(cCallout.getCalloutList().get(1).getIntro());	
		assertNotNull(cCallout.getCalloutList().get(1).getCallToAction());
		
		assertNotNull(cCallout.getCalloutList().get(2).getIntro());	
		assertNotNull(cCallout.getCalloutList().get(2).getCallToAction());
	}
	
	@Test
	public void testActivateForEquals() throws Exception {
		
		cCallout.activate();
		assertEquals("For",cCallout.getCalloutList().get(0).getIntro());
		assertEquals("http://Google.com",cCallout.getCalloutList().get(2).getCallToAction());
		

	}
	
	@Test
	public void testActivateForNotEquals() throws Exception {
		cCallout.activate();
		assertNotEquals("Intro", cCallout.getCalloutList().get(0).getIntro());

	}

	/**
	 * Sets the up and return data.
	 *
	 * @return the string[]
	 */
	private String[] setUpAndReturnData() {
		return new String[] { "{\"intro\":\"For\",\"title\":\"Healthcare Professionals\",\"description\":"
				+ "\"Discover a medical specialty and related resources.\",\"callToAction\":\"/content/geometrixx/en\"}",
				"{\"intro\":\"For\",\"title\":\"Patients & Caregivers\",\"description\":\"Find information on conditions and learn about our treatment options.\""
				+ ",\"callToAction\":\"/content/geometrixx-outdoors-mobile/en\"}",
				"{\"intro\":\"Browse\",\"title\":\"Products\",\"description\":\"Explore product details and how we innovate.\","
				+ "\"callToAction\":\"http://Google.com\"}" };

	}

}

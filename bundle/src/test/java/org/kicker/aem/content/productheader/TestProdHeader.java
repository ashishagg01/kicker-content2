/**
 * 
 */
package org.kicker.aem.content.productheader;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import io.wcm.testing.mock.aem.junit.AemContext;

import org.apache.sling.api.resource.ValueMap;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;


/**
 * The Class TestProdHeader.
 *
 * @author deepak.singla
 */
@RunWith(MockitoJUnitRunner.class)
public class TestProdHeader {

	/** The map. */
	@Mock
	ValueMap map;

	/** The context. */
	@Rule
	public final AemContext context = new AemContext();

	/** The home page carousel. */
	ProdHeader prodHeader = new ProdHeader() {
		public ValueMap getProperties() {
			return map;
		};

	};

	/**
	 * Setup.
	 */
	@Before
	public void setup() {
		Mockito.when(map.get(ProdHeaderConstants.CAROUSEL_TAB, String[].class))
				.thenReturn(setUpAndReturnDataForCarousel());
		Mockito.when(
				map.get(ProdHeaderConstants.RESOURCE_LINKS, String[].class))
				.thenReturn(setUpAndReturnDataForRes());
		Mockito.when(map.get(ProdHeaderConstants.CALLOUT_LINKS, String[].class))
				.thenReturn(setUpAndReturnDataForCallout());
	}

	/**
	 * Test activate.
	 *
	 * @throws Exception
	 *             the exception
	 */
	@Test
	public void testActivate() throws Exception {
		prodHeader.activate();

		assertNotNull(prodHeader.getProdHeaderCarouselList());
		assertTrue(prodHeader.getProdHeaderCarouselList().size() > 0);
		assertNotNull(prodHeader.getProdHeaderCarouselList().get(0)
				.getDescription_ph());
		assertNotNull(prodHeader.getProdHeaderCarouselList().get(0)
				.getIsVideo_ph());
		assertNotNull(prodHeader.getProdHeaderCarouselList().get(0)
				.getMedia_ph());

		assertNotNull(prodHeader.getProdHeaderResourceList());
		assertTrue(prodHeader.getProdHeaderResourceList().size() > 0);
		assertNotNull(prodHeader.getProdHeaderResourceList().get(0)
				.getResourcelinktext());
		assertNotNull(prodHeader.getProdHeaderResourceList().get(0)
				.getResourcelinkto());

		assertNotNull(prodHeader.getProdHeaderCalloutList());
		assertTrue(prodHeader.getProdHeaderCalloutList().size() > 0);
		assertNotNull(prodHeader.getProdHeaderCalloutList().get(0)
				.getCallouticon());
		assertNotNull(prodHeader.getProdHeaderCalloutList().get(0)
				.getCalloutlinktext());
		assertNotNull(prodHeader.getProdHeaderCalloutList().get(0)
				.getCalloutlinkto());
	}

	/**
	 * Sets the up and return data.
	 *
	 * @return the string[]
	 */
	private String[] setUpAndReturnDataForCarousel() {
		return new String[] { "{\"carouselMedia\":\"/etc/designs/dtranzTwo/designs/clientBase/img/"
				+ "productheaderimages/Blazer-Prime-Catheter_940x940.image.460.0.png\","
				+ "\"carouselDescription\":\"Blazer Prime Catheter\",\"carouselIsVideo\":false}" };
	}

	/**
	 * Sets the up and return data for callout.
	 *
	 * @return the string[]
	 */
	private String[] setUpAndReturnDataForCallout() {

		return new String[] { "{\"calloutLinkTo\":\"#\",\"calloutlinkText\":\"Contact Us\","
				+ "\"calloutIcon\":\"/etc/designs/dtranzTwo/designs/clientBase/img"
				+ "/icons/icon-contact-updates.png\"}" };
	}

	/**
	 * Sets the up and return data for res.
	 *
	 * @return the string[]
	 */
	private String[] setUpAndReturnDataForRes() {
		return new String[] { "{\"resourceLinkTo\":\"#\",\"resourceLinkText\":\"Product Brochure\"}" };

	}

}

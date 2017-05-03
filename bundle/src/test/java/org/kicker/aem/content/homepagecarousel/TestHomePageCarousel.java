/**
 * 
 */
package org.kicker.aem.content.homepagecarousel;

import static org.junit.Assert.*;
import io.wcm.testing.mock.aem.junit.AemContext;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONException;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

/**
 * The Class TestHomePageCarousel.
 *
 * @author deepak.singla
 */
@RunWith(MockitoJUnitRunner.class)
public class TestHomePageCarousel {

	/** The map. */
	@Mock
	ValueMap map;
	
	/** The res resolver obj. */
	@Mock
	ResourceResolver resResolverObj;
	
	/** The context. */
	@Rule
	public final AemContext context = new AemContext();
	
	/** The home page carousel. */
	HomePageCarousel homePageCarousel = new HomePageCarousel() {
		public ValueMap getProperties() {
			return map;
		};
		public ResourceResolver getResourceResolver() {
			return resResolverObj;
		};
	};
	
	/**
     * Setup.
     */
     @Before
     public void setup() {
    	 Resource resource = null;
    	 Mockito.when(map.get(HomePageCarouselConstants.LINK, String[].class)).thenReturn(setUpAndReturnData());
    	 Mockito.when(resResolverObj.getResource(Mockito.anyString())).thenReturn(resource);
     }
	

	/**
	 * Test method for {@link org.kicker.aem.content.homepagecarousel.HomePageCarousel#processMultiFieldData(java.lang.String[])}.
	 *
	 * @throws JSONException the JSON exception
	 */
	@Test
	public void testProcessMultiFieldDataWith() throws JSONException {
		homePageCarousel.processMultiFieldData(setUpAndReturnData());
		assertNotNull(homePageCarousel.getDataList());
        assertTrue(homePageCarousel.getDataList().size()>0);
        assertNotNull(homePageCarousel.getDataList());
        assertNotNull(homePageCarousel.getDataList().get(0).getDescription());
        assertNotNull(homePageCarousel.getDataList().get(0).getImage());
        assertNotNull(homePageCarousel.getDataList().get(0).getIntro());
        assertNotNull(homePageCarousel.getDataList().get(0).getMainTitle());
        assertNotNull(homePageCarousel.getDataList().get(0).getPreviewTitle());
        assertNotNull(homePageCarousel.getDataList().get(0).getCallToAction());
        assertNotNull(homePageCarousel.getDataList().get(0).getCallToActionText());
        assertNull(homePageCarousel.getDataList().get(0).getPreviewThumbnail());
	}
	
	/**
	 * Test process multi field data with null.
	 *
	 * @throws JSONException the JSON exception
	 */
	@Test
	public void testProcessMultiFieldDataWithNull() throws JSONException{
		homePageCarousel.processMultiFieldData(null);
	}
	
	/**
	 * Test process multi field data with zero length.
	 *
	 * @throws JSONException the JSON exception
	 */
	@Test
	public void testProcessMultiFieldDataWithZeroLength() throws JSONException{
		String[] strArray={};
		homePageCarousel.processMultiFieldData(strArray);
	}

	/**
     * Sets the up and return data.
     *
     * @return the string[]
     */
     private String[] setUpAndReturnData() {
    	 return new String[] {"{\"image\":\"/content/dam/dtranzTwo/carousel/masthead-rollover-2.jpg\","
			    	 		+ "\"lightIntro\":\"We Are\", \"mainTitle\":\"Advancing\", \"description\":\"Boundaries of life\","
			    	 		+ "\"callToAction\":\"/content/geometrixx-gov\", \"callToActionText\":\"Gov\","
			    	 		+ "\"previewThumbnail\":\"/content/dam/dtranzTwo/carousel/masthead-rollover-2.jpg\", \"previewTitle\":\"Preview\"}"};
     }
     
     

}

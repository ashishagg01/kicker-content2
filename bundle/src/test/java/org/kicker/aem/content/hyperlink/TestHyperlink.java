package org.kicker.aem.content.hyperlink;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNotEquals;

import org.apache.sling.api.resource.ValueMap;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.day.cq.wcm.api.Page;

/**
 * The Class TestHyperlink.
 * 
 * @author dishant.verma
 *
 */
@RunWith(MockitoJUnitRunner.class)
public class TestHyperlink {

	/** The properties. */
	@Mock	
	ValueMap properties;
	
	/** The page. */
	@Mock
	Page page;
	
	/** The obj hyperlink. */
	Hyperlink objHyperlink= new Hyperlink(){
		public ValueMap getProperties() {
			return properties;
		}
		public Page getCurrentPage() {
			return page;
		}
	};
	
	
	/**
	 * Test activate.
	 */
	@Test
	public void testActivate() throws Exception {
		//setting values for properties
		Mockito.when(properties.get(Hyperlink.LINK, page.getPath())).thenReturn("/content/dtranzTwo/en");
		Mockito.when(properties.get(Hyperlink.LINK_TEXT, page.getTitle())).thenReturn("My Locale");
		
		//testing activate method of Hyperlink Class
		objHyperlink.activate();
		
		//check for notNull values
		assertNotNull(objHyperlink.getLink());
		assertNotNull(objHyperlink.getLinkText());
		
		//Check for Equals
		assertEquals("/content/dtranzTwo/en.html", objHyperlink.getLink());
        assertEquals("My Locale", objHyperlink.getLinkText());
        
        //Check for Not Equals
        assertNotEquals("Hyperlink", objHyperlink.getLink());
        assertNotEquals("Hyperlink Text", objHyperlink.getLinkText());
        
        //null check
        Mockito.when(properties.get(Hyperlink.LINK, page.getPath())).thenReturn(null);
        Mockito.when(properties.get(Hyperlink.LINK_TEXT, page.getTitle())).thenReturn(null);
        objHyperlink.activate();
        assertEquals(null, objHyperlink.getLink());
        assertEquals(null, objHyperlink.getLinkText());
        
        
	}
}

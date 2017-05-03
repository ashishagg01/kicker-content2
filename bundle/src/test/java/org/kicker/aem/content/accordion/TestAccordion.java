package org.kicker.aem.content.accordion;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNotEquals;

import io.wcm.testing.mock.aem.junit.AemContext;

import org.apache.sling.api.resource.ValueMap;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

/**
 * The Class TestAccordion.
 *
 * @author dishant.verma
 */
@RunWith(MockitoJUnitRunner.class)
public class TestAccordion {
	
	/** The mocked properties. */
	@Mock
	ValueMap properties;
	
	
	/** The context. */
	@Rule
	public final AemContext context = new AemContext();
	
	/** The accordion. */
	Accordion accordion = new Accordion() {
		public ValueMap getProperties() {
			return properties;
		}
	};

	
	/**
	 * Test method for {@link org.kicker.aem.content.Accordion#activate()}.
	 */
	@Test
	public void testActivate() {
		try {
			//setting values for properties
			Mockito.when(properties.get("seeMore", accordion.DEFSEEMORE)).thenReturn("See More");
			Mockito.when(properties.get("seeLess", accordion.DEFSEELESS)).thenReturn("See Less");
			
			//testing activate method of Accordion Class
			accordion.activate();
			
			//check for notNull values
			assertNotNull(accordion.getSeeMore());
			assertNotNull(accordion.getSeeLess());
			
			//check for Equals
			assertEquals("See More", accordion.getSeeMore());
			assertEquals("See Less", accordion.getSeeLess());
			
			//check for NotEquals
			assertNotEquals("Expand", accordion.getSeeMore());
			assertNotEquals("Collpase", accordion.getSeeLess());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

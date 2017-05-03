package org.kicker.aem.content.utilitynav;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import io.wcm.testing.mock.aem.junit.AemContext;

import org.apache.sling.commons.json.JSONException;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.day.cq.wcm.api.designer.Style;


/**
 * 
 * @author monika.mishra
 * 
 * The Class TestUtilityNavMultiFieldReader.
 */
@RunWith(MockitoJUnitRunner.class)
public class TestUtilityNavMultiFieldReader {


	/** The style. */
	@Mock
	Style style;

	
	/** The context. */
	@Rule
	public final AemContext context = new AemContext();



	/** The utility nav multi field reader. */
	UtilityNavMultiFieldReader utilityNavMultiFieldReader = new UtilityNavMultiFieldReader() {
		public Style getCurrentStyle() {
			return style;
		}
		
	};

	/**
	 * Setup.
	 */
	@Before
	public void setup() {
		Mockito.when(style.get("links",String[].class))
				.thenReturn(setUpAndReturnData());
	}

	/**
	 * Test activate.
	 *
	 * @throws JSONException the JSON exception
	 */
	@Test
	public void testActivate() throws JSONException {
		try {
			utilityNavMultiFieldReader.activate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		assertNotNull(utilityNavMultiFieldReader.getUtilityNav());
		assertTrue(utilityNavMultiFieldReader.getUtilityNav().size()>0);
		assertNotNull(utilityNavMultiFieldReader.getUtilityNav().get(0).getText());
		assertNotNull(utilityNavMultiFieldReader.getUtilityNav().get(0).getUrl());
		
	}

	/**
	 * Sets the up and return data.
	 *
	 * @return the string[]
	 */
	private String[] setUpAndReturnData() {
		return new String[]{"{\"url\":\"http://dev.day.com/content/ddc/en/gems/introduction-to-sightly.html\",\"text\":\"Home\",\"openInNewWindow\":true}"};

	}

}

package org.kicker.aem.content.ticker;

import static org.junit.Assert.*;
import io.wcm.testing.mock.aem.junit.AemContext;

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
 * The Class TestTicker.
 * 
 * @author b.mazumdar
 *
 */
@RunWith(MockitoJUnitRunner.class)
public class TestTicker {

	/** The mocked properties. */
	@Mock
	ValueMap properties;

	/** The mocked AEM context. */
	@Rule
	public final AemContext context = new AemContext();

	/** The ticker. */
	Ticker ticker = new Ticker() {
		public ValueMap getProperties() {
			return properties;
		}
	};

	/**
	 * Setup.
	 */
	@Before
	public void setup() {
		Mockito.when(properties.get(Ticker.TICKER_DIALOG_NAME, String[].class))
				.thenReturn(setUpAndReturnData());
	}

	/**
	 * Test activate.
	 * @throws JSONException 
	 */
	@Test
	public void testActivate() throws JSONException {
		ticker.activate();
		assertNotNull(ticker.getTickerItems());
		assertTrue(ticker.getTickerItems().size()>0);
		assertNotNull(ticker.getTickerItems().get(0).getHeadline());
		assertNotNull(ticker.getTickerItems().get(0).getCallToAction());
		assertNotNull(ticker.getTickerItems().get(0).getCallToActionText());
	}

	/**
	 * Sets the up and return data.
	 *
	 * @return the string[]
	 */
	private String[] setUpAndReturnData() {
		return new String[] { "{\"headline\":\"Boston Scientific Announces CE Mark "
				+ "Approval And First Implants Of Its Next-Generation X4 Quadripolar "
				+ "CRT-D Systems\",\"callToAction\":\"http://news.bostonscientific.com/press-releases\","
				+ "\"callToActionText\":\"http://news.bostonscientific.com/press-releases\"}","{\"headline\":\"Testing again and yet again\",\"callToAction\":"
				+ "\"http://news.bostonscientific.com/press-releases\",\"callToActionText\":"
				+ "\"View All\"}","{\"headline\":\"Geometrixx News\",\"callToAction\":\"/content/geometrixx/en/events\",\"callToActionText\":\"Visit Site\"}" };

	}

}

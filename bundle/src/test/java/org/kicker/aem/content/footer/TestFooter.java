package org.kicker.aem.content.footer;

import static org.junit.Assert.*;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertNotNull;

import java.util.HashMap;
import java.util.Map;

import org.apache.jackrabbit.oak.commons.json.JsonObject;
import org.apache.sling.commons.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.day.cq.wcm.api.designer.Style;

/**
 * The Class TestFooter.
 * 
 * @author parag.b.garg
 */
@RunWith(MockitoJUnitRunner.class)
public class TestFooter {

	@Mock
	Style style;

	@Mock
	JSONObject jsonObject;

	/** The footer. */
	public Footer footer = new Footer() {
		public Style getCurrentStyle() {
			return style;
		};
	};

	/**
	 * Test activate.
	 *
	 * @throws Exception
	 *             the exception
	 */
	@Test
	public void testActivate() throws Exception {
		Mockito.when(style.get(Footer.LINKS, String[].class)).thenReturn(
				setUpAndReturnData());

		Mockito.when(style.get(Footer.COPYRIGHT, String.class))
				.thenReturn(
						"<p>©2014 Boston Scientific or its affiliates. All rights reserved.</p>");

		Mockito.when(style.get(Footer.DESCRIPTION, String.class))
				.thenReturn(
						"Boston Scientific is dedicated to transforming lives through innovative medical solutions ");
		Mockito.when(style.get(Footer.TWITTER, String.class)).thenReturn(
				"http://twitter.com");
		Mockito.when(style.get(Footer.FACEBOOK, String.class)).thenReturn("#");
		Mockito.when(style.get(Footer.LINKEDIN, String.class)).thenReturn("#");
		Mockito.when(style.get(Footer.RSS, String.class)).thenReturn("#");
		Mockito.when(style.get(Footer.FOLLOWUS, String.class)).thenReturn(
				"Follow Us");
		footer.activate();
		assertNotNull(footer.getDataInMap());
		assertNotNull(footer.getDataInMap().get(Footer.COPYRIGHT));
		assertNotNull(footer.getDataInMap().get(Footer.DESCRIPTION));
		assertNotNull(footer.getDataInMap().get(Footer.TWITTER));
		assertNotNull(footer.getDataInMap().get(Footer.FACEBOOK));
		assertNotNull(footer.getDataInMap().get(Footer.LINKEDIN));
		assertNotNull(footer.getDataInMap().get(Footer.RSS));
		assertNotNull(footer.getDataInMap().get(Footer.FOLLOWUS));
		assertNotNull(footer.getDataInList());
		assertNotNull(footer.getDataInList().get(0).getUrl());
		assertNotNull(footer.getDataInList().get(0).getText());

	}

	@Test
	public void testGetResult() throws Exception {

		footer.getResult();
		assertNull(footer.getResult());
	}

	@Test
	public void testGetLinkList() throws Exception {

		footer.getLinkList();
		assertNull(footer.getLinkList());
	}

	@Test
	public void testDataInMapWithCopyrightSeven() throws Exception {
		Mockito.when(style.get(Footer.COPYRIGHT, String.class)).thenReturn(
				"<p></p>");
		footer.activate();
		assertNotNull(footer.getDataInMap());
	}

	/**
	 * Test activate.
	 *
	 * @throws Exception
	 *             the exception
	 */
	@Test
	public void testActivateWithNullLinks() throws Exception {
		Mockito.when(style.get(Footer.LINKS, String[].class)).thenReturn(null);
		footer.activate();
		assertNull(footer.getDataInList());

	}

	@Test
	public void testActivateWithNullCopyRight() throws Exception {
		Mockito.when(style.get(Footer.COPYRIGHT, String.class))
				.thenReturn(null);
		footer.activate();
		assertNull(footer.getDataInMap().get(Footer.COPYRIGHT));

	}

	/**
	 * Sets the up and return data.
	 *
	 * @return the string[]
	 */
	private String[] setUpAndReturnData() {
		return new String[] { "{\"url\":\"/content/geometrixx/en\",\"text\":\"Contact Us\"}"
				+ "{\"url\":\"/content/geometrixx-gov\",\"text\":\"Location Directory\"}"
				+ "{\"url\":\"/content/geometrixx-media\",\"text\":\"Site Map\"}"
				+ "{\"url\":\"/content/community-components\",\"text\":\"Terms of Use & Privacy\"}"
				+ "{\"url\":\"/content/geometrixx_mobile\",\"text\":\"Copyright Notice\"}" };
	}

}

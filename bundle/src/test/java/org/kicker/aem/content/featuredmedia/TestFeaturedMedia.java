package org.kicker.aem.content.featuredmedia;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.apache.sling.api.resource.ValueMap;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.kicker.aem.content.featuredmedia.FeaturedMedia;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
// TODO: Auto-generated Javadoc

/**
 * The Class TestFeaturedMedia.
 */
/**
 * @author priyanka.a.biswal
 *
 */
@RunWith(MockitoJUnitRunner.class)

public class TestFeaturedMedia {
	
	/** The properties. */
	@Mock
	ValueMap properties;
	
	/** The featured media. */
	FeaturedMedia featuredMedia= new FeaturedMedia(){
		public ValueMap getProperties() {
			return properties;
		}
	};
	
	/**
	 * Sets the up.
	 */
	@Before
	public void setUp() {
		
		Mockito.when(properties.get(FeaturedMedia.FM_DIALOG_NAME, String[].class)).thenReturn(setUpAndReturnData());

	}

	/**
	 * Test activate.
	 *
	 * @throws Exception the exception
	 */
	@Test
	public void testActivate() throws Exception {
		featuredMedia.activate();
		assertTrue(featuredMedia.getFeatMedList().size()>0);
		
		assertNotNull(featuredMedia.getFeatMedList().get(0).getFMvideo());
		assertNotNull(featuredMedia.getFeatMedList().get(0).getFMimage());
		assertNotNull(featuredMedia.getFeatMedList().get(0).getFMintro());
		assertNotNull(featuredMedia.getFeatMedList().get(0).getFMtitle());
		assertNotNull(featuredMedia.getFeatMedList().get(1).getFMcallToAction());
		assertNotNull(featuredMedia.getFeatMedList().get(1).getFMcallToActionText());
			
	}

	@Test
	public void testActivateForNotEquals() throws Exception {
		featuredMedia.activate();
		assertNotEquals("Intro", featuredMedia.getFeatMedList().get(0).getFMintro());

	}


	/**
	 * Sets the up and return data.
	 *
	 * @return the string[]
	 */
	private String[] setUpAndReturnData() {
		return new String[] {				
				"{\"FMvideo\":\"/etc/designs/dtranzTwo/designs/clientBase/img/fpo/feature-content-video-carousel-1.jpg\""
				+ ",\"FMimage\":\"/etc/designs/dtranzTwo/designs/clientBase/img/icons/icon-video-play_80.png\",\"FMintro\":\"Introduction\","
				+ "\"FMtitle\":\"Transforming Lives Exerchitat Volupta\",\"FMcallToAction\":\"/content/\",\"FMcallToActionText\":\"Watch the Video \"}"
				, "{\"FMvideo\":\"/etc/designs/dtranzTwo/designs/clientBase/img/fpo/feature-content-video-carousel-1.jpg\""
				+ ",\"FMimage\":\"/etc/designs/dtranzTwo/designs/clientBase/img/icons/icon-video-play_80.png\",\"FMintro\":\"Introduction\""
				+ ",\"FMtitle\":\"Transforming Lives Exerchitat Volupta\",\"FMcallToAction\":\"#\",\"FMcallToActionText\":\"Watch the Video \"}"				
		};

	}

}

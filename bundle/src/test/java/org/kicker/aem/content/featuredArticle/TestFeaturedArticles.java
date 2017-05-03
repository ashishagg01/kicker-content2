/**
 * 
 */
package org.kicker.aem.content.featuredArticle;

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
 * The Class TestFeaturedArticles.
 *
 * @author deepak.singla
 */
@RunWith(MockitoJUnitRunner.class)
public class TestFeaturedArticles {

        /** The mocked properties. */
        @Mock
        ValueMap properties;

        /** The mocked AEM context. */
        @Rule
        public final AemContext context = new AemContext();

        /** The FeaturedArticles. */
        FeaturedArticles farticle = new FeaturedArticles() {
            public ValueMap getProperties() {
                return properties;
            }
        };

        /**
         * Setup.
         */
        @Before
        public void setup() {
            Mockito.when(properties.get(ArticleConstants.LINK, String[].class)).thenReturn(setUpAndReturnData());
        }

        /**
         * Test activate.
         *
         * @throws Exception the exception
         */
        @Test
        public void testActivate() throws Exception {
			farticle.activate();
	        assertNotNull(farticle.getArticles());
	        assertTrue(farticle.getArticles().size()>0);
	        assertNotNull(farticle.getArticles().get(0).getArticle());
	        assertNotNull(farticle.getArticles().get(0).getColor());
	        assertNotNull(farticle.getArticles().get(0).getHeaders());
	        assertNotNull(farticle.getArticles().get(0).getImage());
	        assertNotNull(farticle.getArticles().get(0).getTitle());
        }

        /**
         * Sets the up and return data.
         *
         * @return the string[]
         */
        private String[] setUpAndReturnData() {
			return new String[] { "{\"Header\":\"ACT CAMPAIGN\",\"Title\":\"Atndesti Vol Orepel Mo Dipicide Exerciae Perit.\","
									+ "\"Image\":\"/content/dam/dtranzTwo/img/featured-article-img-hd.png\","
									+ "\"Article\":\"/content/geometrixx-media/en\",\"Color\":\"blue\"}" };
        }
}

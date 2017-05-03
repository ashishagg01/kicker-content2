package org.kicker.aem.content.countryselector;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
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
 * The Class TestCountrySelector.
*/
@RunWith(MockitoJUnitRunner.class)
public class TestCountrySelector {

                /** The style. */
                @Mock
                Style style;

                /** The context. */
                @Rule
                public final AemContext context = new AemContext();


                /** The county selector. */
                CountrySelector countySelector = new CountrySelector() {
                                public Style getCurrentStyle() {
                                                return style;
                                }
                                
                };


                /**
                * Test activate.
                *
                * @throws JSONException the JSON exception
                */
                @Test
                public void testActivate() throws JSONException {
                                Mockito.when(style.get("multifield",String[].class))
                                .thenReturn(setUpAndReturnData());
                                try {
                                                countySelector.activate();
                                                
                                } catch (Exception e) {
                                                e.printStackTrace();
                                }
                                assertNotNull(countySelector.getCountrySelMulti());
                                assertTrue(countySelector.getCountrySelMulti().length>0);
                                assertNotNull(countySelector.getCountryList());
                                assertTrue(countySelector.getCountryList().size()>0);
                                assertNotNull(countySelector.getCountryList().get(0).getText());
                                assertNotNull(countySelector.getCountryList().get(0).getUrl());
                                assertNotNull(countySelector.getCountryList().get(0).getImage());
                                
                }

                /**
                * Test activate.
                *
                * @throws JSONException the JSON exception
                */
                @Test
                public void testActivateWithNullMultiField() throws JSONException {
                                Mockito.when(style.get("multifield",String[].class))
                                .thenReturn(null);
                                try {
                                                countySelector.activate();
                                                
                                } catch (Exception e) {
                                                e.printStackTrace();
                                }
                                assertNull(countySelector.getCountrySelMulti());
                                
                }
                
                /**
                * Test activate.
                *
                * @throws JSONException the JSON exception
                */
                @Test
                public void testActivateWithZeroLengthMultiField() throws JSONException {
                                String[] strArray={};
                                Mockito.when(style.get("multifield",String[].class))
                                .thenReturn(strArray);
                                try {
                                                countySelector.activate();
                                                
                                } catch (Exception e) {
                                                e.printStackTrace();
                                }
                                assertNotNull(countySelector.getCountrySelMulti());
                                
                }
                /**
                * Sets the up and return data.
                *
                * @return the string[]
                */
                private String[] setUpAndReturnData() {
                                return new String[]{"{\"url\":\"/content/geometrixx/en\",\"text\":\"India\",\"image\":\"/etc/designs/dtranzTwo/designs/clientBase/assets/img/icons/country_austria.gif\",\"openInNewWindow\":true}"};

                }

}

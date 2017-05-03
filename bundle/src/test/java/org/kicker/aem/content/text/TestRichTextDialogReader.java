package org.kicker.aem.content.text;

import static org.junit.Assert.assertEquals;

import org.apache.sling.api.resource.ValueMap;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

/**
 * The Class TestRichTextDialogReader.
 */
@RunWith(MockitoJUnitRunner.class)
public class TestRichTextDialogReader {
	/** The default blank txt. */
	private static final String DEFAULT_BLANK_TXT = "&nbsp;";

	/** The map. */
	@Mock
	ValueMap map;

	/** The txt reader obj. */
	public RichTextDialogReader txtReaderObj = new RichTextDialogReader() {
		public ValueMap getProperties() {
			return map;
		};
	};


	/**
	 * Test activate as default text.
	 */
	@Before 
    public void setup() {
		Mockito.when(map.get("richTxtEditor", DEFAULT_BLANK_TXT)).thenReturn("<p>Utre necate nonsed quam, odis elignitios que non restis aspeles equiate mporum quunto officiis et "
        		+ "hil il et ut volorio. Ab inciatquam reste nulluptas quis ipsus adigenisit quiaspictur arcilibusa ipsunt eost "
        		+ "volesseque nonsequist paritibusto que volliqui ullicipsam.</p>");
    }

	/**
	 * Test activate as custom text.
	 */
	@Test
	public void testActivate() throws Exception{
		
		txtReaderObj.activate();
		assertEquals(txtReaderObj.getInputText(), "<p>Utre necate nonsed quam, odis elignitios que non restis aspeles equiate mporum quunto officiis et "
        		+ "hil il et ut volorio. Ab inciatquam reste nulluptas quis ipsus adigenisit quiaspictur arcilibusa ipsunt eost "
        		+ "volesseque nonsequist paritibusto que volliqui ullicipsam.</p>");
	}
	
	
}

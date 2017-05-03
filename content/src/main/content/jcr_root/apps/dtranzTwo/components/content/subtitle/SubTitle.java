package apps.dtranzTwo.components.content.subtitle;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

/**
 * @author devendra.dugar
 *
 */

public class SubTitle extends WCMUse {
    private String text;
    private String selectType;    
    private static final String txt = "text";
    private static final String sValue = "selectType";
    private static final String defaultHeading = "h2";
    public static final Logger logger = LoggerFactory.getLogger(SubTitle.class);    
   
    /*
     * (non-Javadoc)
     * @see com.adobe.cq.sightly.WCMUse#activate()
     */
    
    @Override
    public void activate() throws Exception {
    	text = getProperties().get(txt,getCurrentPage().getPageTitle());
        if(text == null) { 
        	text=getCurrentPage().getName(); 
      	}        
        selectType = getProperties().get(sValue,defaultHeading);
        logger.info("Value of Subtitle :  " + text + " Value of Header Selected : " + selectType);
        
    }

	/**
	 * @return the text
	 */	
	public String getText() {
		return text;
	}


	/**
	 * @return the selectType
	 */
	public String getSelectType() {
		return selectType;
	}
    
}

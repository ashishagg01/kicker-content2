package org.kicker.aem.content.hyperlink;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

/*
* This Class is responsible for getting the hyperlink and hyperlinkText
*
*/
public class Hyperlink extends WCMUse {
 
	private static final Logger LOGGER = LoggerFactory.getLogger(Hyperlink.class);
	
	
	/**
	 * Constants to fetch properties
	 */
	static final String LINK = "link";
	static final String LINK_TEXT = "linktext";
	
    /**
     * link is a variable of type String which holds the value of hyperlink from dialog
     */
    String link = null;
	
    /**
     * hyperlinkText is a variable of type String holds the value of hyperlink text from dialog
     */
    String linkText = null;

    // This method is a callback method and returns the property named: hyperlink and hyperlinkText
    
    @Override
    public void activate() throws Exception {
    	LOGGER.info("Processing Hyperlink Data");
    	
        link = getProperties().get(LINK,getCurrentPage().getPath());
        
        if(null!= link && link.startsWith("/content"))
        {
            link=link+".html";
        }
     
        linkText = getProperties().get(LINK_TEXT,getCurrentPage().getPageTitle());
        
        if(linkText == null || linkText=="") 
        
        {
            linkText = getCurrentPage().getName();
        }
    }

    // getter method, return the hyperlink
    public String getLink() {
        return link;
    }

    // getter method, return the hyperlinkText
    public String getLinkText() {
        return linkText;
    }
}
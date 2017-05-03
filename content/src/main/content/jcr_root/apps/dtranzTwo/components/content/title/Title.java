package apps.dtranzTwo.components.content.title;

import com.adobe.cq.sightly.WCMUse;

/**
 * This Class is responsible for getting the value of page title
 *
 * @author deepak.a.chauhan
 */
public class Title extends WCMUse {

	/*
	 * holds the value of page title
	 */
    private String pageTitle = null;
    
    /*
     * Activate is a callback method, that set the value of title to pageTitle variable 
     * @see com.adobe.cq.sightly.WCMUse#activate()
     */
    @Override
    public void activate() throws Exception {
        pageTitle = getProperties().get("pageTitle",getCurrentPage().getPageTitle());
        if(pageTitle == null) {
            pageTitle=getCurrentPage().getName();
        }
    }

    /**
     * Getter method 
     * @return pageTitle
     */
    public String getPageTitle() {
        return pageTitle;
    }
}

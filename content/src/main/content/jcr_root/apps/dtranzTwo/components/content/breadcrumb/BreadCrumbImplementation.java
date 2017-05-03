package apps.dtranzTwo.components.content.breadcrumb;

import javax.jcr.*;
import org.apache.sling.api.resource.Resource;
import com.day.cq.wcm.commons.WCMUtils;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.designer.Designer;
import com.day.cq.wcm.api.designer.Design;
import com.day.cq.wcm.api.designer.Style;
import com.adobe.cq.sightly.WCMUse;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;



public class BreadCrumbImplementation extends WCMUse{


    // pageList is an ArrayList used to pass on the required data to breadcrumb.html
    private List<Map<String,String>> pageList;

    static final String HTML_SUFFIX_IDENTIFIER = ".html";
    static final String PATH_REF_IDENTIFIER = "pathRef";
    static final String TITLE_REF_IDENTIFIER = "title";

    /* The activate() method from the WCMUse class is extended here.
		 */
    @Override
    public void activate() throws Exception {
    	
    	long absParentLevel;
        long relParentLevel;
        int currentLevel;
        Page trail;
        String title;
        Map<String, String> pageMap;
        String pathRef;

	// By default breadcrumbs will start from the level 2-> requirement specs.
	absParentLevel = getCurrentStyle().get("absParent", 2L);
    relParentLevel = getCurrentStyle().get("relParent", 1L);
    currentLevel = getCurrentPage().getDepth();


	pageList =  new ArrayList<Map<String,String>>();

    /* The Breadcrumbs will start from the level 2 under locale on the left ends with the current page on the right.
    	The parent level is reduced by 1 with each loop and the respective parent is stored in a list. */
	while (absParentLevel < currentLevel - relParentLevel + 1) {

        trail = getCurrentPage().getAbsoluteParent((int) absParentLevel);
        pageMap = new HashMap<String, String>();

        // In case the the current Page has no parent, break. As there is nothing to return/display.
        if (trail == null) {
            break;

        }

        /*
       	If the Navigation Title entered in page properties then it will be passed,
        else if the Page title exists, it will be picked. 
       	else the page name will be fetched.*/
        title = trail.getNavigationTitle();
        if (null == title || title.equals("")) {
            title = trail.getNavigationTitle();

        }
        if (null == title || title.equals("")) {
            title = trail.getTitle();

        }
        if (null == title || title.equals("")) {
            title = trail.getName();

        }

        pathRef=trail.getPath()+HTML_SUFFIX_IDENTIFIER;

		pageMap.put(PATH_REF_IDENTIFIER,pathRef);
        pageMap.put(TITLE_REF_IDENTIFIER,title);

      	pageList.add(pageMap);


        absParentLevel++;


    }

}		

    // An arrayList containing the page objects is returned.
	    public List getPageList() {
	        return pageList;
	    }



}
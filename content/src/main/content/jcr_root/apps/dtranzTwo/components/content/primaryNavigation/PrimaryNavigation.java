package apps.dtranzTwo.components.content.primaryNavigation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONObject;

import com.adobe.cq.sightly.WCMUse;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.PageManager;



public class PrimaryNavigation extends WCMUse{

	private String[] menuItems;
	List<Map<String,String>> stateItems = new ArrayList<Map<String,String>>();
	
	
	private JSONArray finalJsonObject= new JSONArray()  ;
	private ResourceResolver resourceRes;

    @Override
    public void activate() throws Exception {
        //link = getProperties().get("link", String[].class);
		//List<Map<String,String>> menuItems = new ArrayList<Map<String,String>>();
    	resourceRes= getResourceResolver();
      	System.out.println("abc........");
				menuItems=getProperties().get("link",String[].class);
				System.out.println("menuItems");
				
				
				for (int i=0 ; i < menuItems.length; i++) {           
					System.out.println("Links...."+menuItems);
					
					JSONArray statesArray = new JSONArray(menuItems[i]);  
					for(int j = 0; j < statesArray.length(); j++) {      
				    Map<String,String> stateItem = new HashMap<String,String>();  
				    JSONObject jsonObject = statesArray.getJSONObject(j); 
				          
			       String menuItem=jsonObject.getString("menuItem");             
			          stateItem.put("menuItem",menuItem);             
			                       
			          stateItems.add(stateItem); 
					}
		}
				System.out.println("*****************JSON SSTRING********************" +finalJsonObject.toString(2));
				
           
				




   	}



public List getMenuItems(){
	System.out.println(stateItems);
	return stateItems;

}


}
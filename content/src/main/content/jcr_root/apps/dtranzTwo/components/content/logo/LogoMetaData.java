package apps.dtranzTwo.components.content.logo;


import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.resource.Resource;

import com.adobe.cq.sightly.WCMUse;
import com.day.cq.dam.api.Asset;

public class LogoMetaData extends WCMUse{

	private String title;
	private Resource res;
	private String imgPath;
	private String description;
	private Map <String,String> metaMap = new HashMap<String, String>();
	@Override
	public void activate() throws Exception {

    	imgPath = getCurrentStyle().get("fileReference", String.class);
    	res = getResourceResolver().getResource(imgPath); 
		Asset asset = res.adaptTo(Asset.class);
		
        title=asset.getMetadata("dc:title").toString();
        description = asset.getMetadata("dc:title").toString();
        metaMap.put("title", title);
        metaMap.put("decs",description);
        System.out.println("TITLE::::::::::::::" + title);
    }
 public Map <String,String> getLogoMeta(){
	 
	 return metaMap;
 }



}
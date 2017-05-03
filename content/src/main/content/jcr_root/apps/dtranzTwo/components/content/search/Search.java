package apps.dtranzTwo.components.content.search;

import com.adobe.cq.sightly.WCMUse;

public class Search extends WCMUse{

	private String searchText;
    private String actnPath;

     @Override
    public void activate() throws Exception {

		actnPath=getCurrentStyle().get("actPath",String.class);
         System.out.println(actnPath);
        searchText=getCurrentStyle().get("searchText",String.class);
		System.out.println(searchText);
    }

     public String getActnPath() {
		return actnPath;
	}

     public String getSearchText() {
		return searchText;
	}

}
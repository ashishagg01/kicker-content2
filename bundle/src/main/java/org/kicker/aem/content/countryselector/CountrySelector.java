package org.kicker.aem.content.countryselector;

import java.util.List;
import com.adobe.cq.sightly.WCMUse;
import org.apache.sling.commons.json.JSONObject;
import java.util.ArrayList;

public class CountrySelector extends WCMUse{

	private String[] countrySelMulti;
    List<Country> countryList=new ArrayList<Country>();

    @Override
    public void activate() throws Exception {
    	countrySelMulti =getCurrentStyle().get("multifield",String[].class);

        if(countrySelMulti!=null && countrySelMulti.length>0){
            for(int i=0; i<countrySelMulti.length;i++){
			    JSONObject jsonCountry = new JSONObject(countrySelMulti[i]);
				Country country=new Country();
				country.setText(jsonCountry.get("text").toString());
                country.setUrl(jsonCountry.get("url").toString());
                country.setImage(jsonCountry.get("image").toString());

				countryList.add(country);

            }
        }

    }

    public String[] getCountrySelMulti() {
		return countrySelMulti;
	}

	public List<Country> getCountryList() {
		return countryList;
	}

}
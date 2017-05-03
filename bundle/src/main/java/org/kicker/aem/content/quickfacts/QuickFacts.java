package org.kicker.aem.content.quickfacts;

import java.util.ArrayList;
import java.util.List;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import com.adobe.cq.sightly.WCMUse;


/**
 * @author b.kaushal.karanwal and devendra.dugar
 *
 */

public class QuickFacts extends WCMUse {
	/*
	 * title is used for displaying Title of quick facts
	 */
	private String title=null;
	/*
	 * Link on which we have to redirect 
	 */
	private String ctaLink=null;
	/*
	 * text used to refer a Link on which we have to redirect 
	 */
	private String ctaText=null;
	/*
	 * Image file path is drag dropped on dialog 
	 */
	private String imagePath=null;
	/*
	 * List of facts object which contain fact and fact description which 
	 * are to be displayed in quick facts.  
	 */
	private List<Facts> factList =null;
	
	
	/*
	 * (non-Javadoc)
	 * @see com.adobe.cq.sightly.WCMUse#activate()
	 * 
	 */
	@Override
	public void activate() throws Exception{
	
			title = getProperties().get(QuickFactsConstants.QUICK_TITLE, QuickFactsConstants.QUICK_TITLE_DEFAULT);
			ctaLink = getProperties().get(QuickFactsConstants.CTA_LINK, QuickFactsConstants.CTA_LINK_DEFAULT);
			ctaText = getProperties().get(QuickFactsConstants.CTA_TEXT, QuickFactsConstants.CTA_TEXT_DEFAULT);
			imagePath = getProperties().get(QuickFactsConstants.FILE_REFERENCE,"");
			String[] links = getProperties().get(QuickFactsConstants.PROPERTY_LINK, String[].class);
			if (null!=links && links.length > 0) {
				getFactList(links);
			}else{
				getDefaultFactList(); 
			}

		
	}


	/**
	 * Gets the fact list.
	 *
	 * @param links the links
	 * @return the fact list
	 */
	private void getFactList(String[] links) throws JSONException {
		factList = new ArrayList<Facts>(0);
		Facts fact = null;
		JSONObject factJsonObject=null; 
		/**
		 * Looping String array to Parse the json String object 
		 * Filling facts object For each element 
		 */
		
		for (int i = 0; i < links.length; i++) {
			
				factJsonObject = new JSONObject(links[i]);
				fact=new Facts();
				fact.setFact(factJsonObject.get(QuickFactsConstants.MAIN_TITLE).toString());

				fact.setFactDesc(factJsonObject.get(QuickFactsConstants.DESCRIPTION).toString());
				factList.add(fact);
			
			
		}
	}


	/**
	 * 
	 */
	private void getDefaultFactList() {
		Facts fact =new Facts();
		fact.setFact(QuickFactsConstants.FACT_DEFAULT);
		fact.setFactDesc(QuickFactsConstants.FACT_DESC_DEFAULT);
		factList = new ArrayList<Facts>(1);
		factList.add(fact);
	}


	/**
	 * @return the String title
	 */
	public String getTitle() {
		return title;
	}


	/**
	 * @return the String ctaLink
	 */
	public String getCtaLink() {
		return ctaLink;
	}


	/**
	 * @return the String ctaText
	 */
	public String getCtaText() {
		return ctaText;
	}


	/**
	 * @return the String image
	 */
	public String getImage() {
		return imagePath;
	}


	/**
	 * @return the ArrayList<Facts> factList
	 */
	public List<Facts> getFactList() {
		return factList;
	}



}

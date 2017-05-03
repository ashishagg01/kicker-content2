package org.kicker.aem.content.productheader;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

/**
 * The Class ProdHeader.
 */
public class ProdHeader extends WCMUse {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory
			.getLogger(ProdHeader.class);

	/** The prod header carousel list. */
	private List<ProdHeaderCarouselTabBean> prodHeaderCarouselList;
	
	/** The prod header callout list. */
	private List<ProdHeaderCalloutLinksBean> prodHeaderCalloutList;
	
	/** The prod header resource list. */
	private List<ProdHeaderResourceLinksBean> prodHeaderResourceList;
	
	

	/** The prod header carousel tab. */
	private String[] prodHeaderCarouselTab;
	
	/** The prod header resource links. */
	private String[] prodHeaderResourceLinks;
	
	/** The prod header callouts links. */
	private String[] prodHeaderCalloutsLinks;


	
	/** The carousel boundary. */
	ProdHeaderCarouselTabBean carouselBoundary;
	
	/** The callout links. */
	ProdHeaderCalloutLinksBean calloutLinks;
	
	/** The resource links. */
	ProdHeaderResourceLinksBean resourceLinks;
	
	

	/* (non-Javadoc)
	 * @see com.adobe.cq.sightly.WCMUse#activate()
	 */
	@Override
	public void activate() throws Exception {
		LOGGER.info("activate:traceEnter");
		prodHeaderCarouselTab = getProperties().get(
				ProdHeaderConstants.CAROUSEL_TAB, String[].class);

		prodHeaderResourceLinks = getProperties().get(
				ProdHeaderConstants.RESOURCE_LINKS, String[].class);
		
		
		prodHeaderCalloutsLinks = getProperties().get(
				ProdHeaderConstants.CALLOUT_LINKS, String[].class);
		
		
		try {

			prodHeaderCarouselList=getCarouselTabData(prodHeaderCarouselTab);
			
			prodHeaderResourceList=getResourceLinksData(prodHeaderResourceLinks);
					
			prodHeaderCalloutList=getCalloutsLinksData(prodHeaderCalloutsLinks);

			
			
			
		} catch (JSONException e) {
			LOGGER.error("JSONException" + e);
		}
	}

	/**
	 * Gets the carousel tab data.
	 *
	 * @param prodHeaderCarouselTab the prod header carousel tab
	 * @return the carousel tab data
	 * @throws JSONException the JSON exception
	 */
	private List<ProdHeaderCarouselTabBean> getCarouselTabData(
			String[] prodHeaderCarouselTab) throws JSONException {

		List<ProdHeaderCarouselTabBean> carouselItems = new ArrayList<ProdHeaderCarouselTabBean>();

		if (null != prodHeaderCarouselTab && prodHeaderCarouselTab.length > 0) {
			for (int i = 0; i < prodHeaderCarouselTab.length; i++) {
				JSONObject jsonObject = new JSONObject(prodHeaderCarouselTab[i]);
				carouselBoundary = new ProdHeaderCarouselTabBean();

				carouselBoundary.setMedia_ph(jsonObject
						.getString(ProdHeaderConstants.MEDIA));
				carouselBoundary.setDescription_ph(jsonObject
						.getString(ProdHeaderConstants.DESCRIPTION));
				carouselBoundary.setIsVideo_ph(jsonObject
						.getString(ProdHeaderConstants.IS_VIDEO));

				carouselItems.add(carouselBoundary);
			}

		}
		return carouselItems;
		
	}
	
	
	/**
	 * Gets the resource links data.
	 *
	 * @param prodHeaderResourceLinks the prod header resource links
	 * @return the resource links data
	 * @throws JSONException the JSON exception
	 */
	private List<ProdHeaderResourceLinksBean> getResourceLinksData(
			String[] prodHeaderResourceLinks) throws JSONException {

		List<ProdHeaderResourceLinksBean> resourceItems = new ArrayList<ProdHeaderResourceLinksBean>();

		if (null != prodHeaderResourceLinks && prodHeaderResourceLinks.length > 0) {
			for (int i = 0; i < prodHeaderResourceLinks.length; i++) {
				JSONObject jsonObject = new JSONObject(prodHeaderResourceLinks[i]);
				resourceLinks = new ProdHeaderResourceLinksBean();

				resourceLinks.setResourcelinkto(jsonObject
						.getString(ProdHeaderConstants.RESOURCE_LINKTO));
				resourceLinks.setResourcelinktext(jsonObject
						.getString(ProdHeaderConstants.RESOURCE_LINKTEXT));
				

				resourceItems.add(resourceLinks);
			}

		}
		return resourceItems;
	}
	
	
	
	/**
	 * Gets the callouts links data.
	 *
	 * @param prodHeaderCalloutsLinks the prod header callouts links
	 * @return the callouts links data
	 * @throws JSONException the JSON exception
	 */
	private List<ProdHeaderCalloutLinksBean> getCalloutsLinksData(
			String[] prodHeaderCalloutsLinks) throws JSONException {

		List<ProdHeaderCalloutLinksBean> calloutItems = new ArrayList<ProdHeaderCalloutLinksBean>();

		if (null != prodHeaderCalloutsLinks && prodHeaderCalloutsLinks.length > 0) {
			for (int i = 0; i < prodHeaderCalloutsLinks.length; i++) {
				JSONObject jsonObject = new JSONObject(prodHeaderCalloutsLinks[i]);
				calloutLinks = new ProdHeaderCalloutLinksBean();

				calloutLinks.setCalloutlinkto(jsonObject
						.getString(ProdHeaderConstants.CALLOUT_LINKTO));
				calloutLinks.setCalloutlinktext(jsonObject
						.getString(ProdHeaderConstants.CALLOUT_LINKTEXT));
				calloutLinks.setCallouticon(jsonObject
						.getString(ProdHeaderConstants.CALLOUT_ICON));

				calloutItems.add(calloutLinks);
			}

		}
		return calloutItems;
	}
	
	
	


	/**
	 * Gets the prod header carousel list.
	 *
	 * @return the prod header carousel list
	 */
	public List<ProdHeaderCarouselTabBean> getProdHeaderCarouselList() {
		return prodHeaderCarouselList;
	}

	/**
	 * Sets the prod header carousel list.
	 *
	 * @param prodHeaderCarouselList the new prod header carousel list
	 */
	public void setProdHeaderCarouselList(List<ProdHeaderCarouselTabBean> prodHeaderCarouselList) {
		this.prodHeaderCarouselList = prodHeaderCarouselList;
	}

	/**
	 * Gets the prod header resource list.
	 *
	 * @return the prod header resource list
	 */
	public List<ProdHeaderResourceLinksBean> getProdHeaderResourceList() {
		return prodHeaderResourceList;
	}

	/**
	 * Sets the prod header resource list.
	 *
	 * @param prodHeaderResourceList the new prod header resource list
	 */
	public void setProdHeaderResourceList(List<ProdHeaderResourceLinksBean> prodHeaderResourceList) {
		this.prodHeaderResourceList = prodHeaderResourceList;
	}

	/**
	 * Gets the prod header callout list.
	 *
	 * @return the prod header callout list
	 */
	public List<ProdHeaderCalloutLinksBean> getProdHeaderCalloutList() {
		return prodHeaderCalloutList;
	}

	/**
	 * Sets the prod header callout list.
	 *
	 * @param prodHeaderCalloutList the new prod header callout list
	 */
	public void setProdHeaderCalloutList(List<ProdHeaderCalloutLinksBean> prodHeaderCalloutList) {
		this.prodHeaderCalloutList = prodHeaderCalloutList;
	}

	

	

}

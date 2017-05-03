package org.kicker.aem.content.homepagecarousel;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse; 
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;
import com.day.cq.dam.commons.util.UIHelper;
import org.kicker.aem.content.homepagecarousel.LinksMultiField;

/**
 * @author deepak.singla version 1.0 HomePageCarousel class containing logic to
 *         get data from multifield dialog and putting the same data into
 *         arraylist.
 */
public class HomePageCarousel extends WCMUse {

	/**
	 * Logger configuration
	 */
	private static final Logger LOGGER = LoggerFactory
			.getLogger(HomePageCarousel.class);

	/**
	 * dataList property of type java.util.List
	 */
	private List<LinksMultiField> dataList;

	/*
	 * This method calls processMultiFieldData method to process multifield
	 * data.
	 * 
	 * @see com.adobe.cq.sightly.WCMUse#activate()
	 */
	@Override
	public void activate() throws Exception {

		processMultiFieldData(getProperties().get(HomePageCarouselConstants.LINK, String[].class));
	}

	/**
	 * 
	 * This method containing code to fetch link property from multifield,
	 * iterating through it and converting each string into JSON object and
	 * adding them into a linklist.
	 * 
	 * @param links
	 * @throws JSONException 
	 */
	public void processMultiFieldData(String[] links) throws JSONException {
		if (null != links && links.length > 0) {
			dataList = new ArrayList<LinksMultiField>();
			dataList(links);
		}
	}

	private void dataList(String[] links) throws JSONException {
		LinksMultiField linkMultiField = null;
		Resource res = null;
		Asset asset = null;
		Rendition rendition = null;
		JSONObject jsonObject = null;
		for (int i = 0; i < links.length; i++) {
			jsonObject = new JSONObject(links[i]);
			linkMultiField = new LinksMultiField();
			linkMultiField.setImage(jsonObject.get(
					HomePageCarouselConstants.CAROUSEL_IMAGE)
					.toString());
			linkMultiField.setHdimage(getHDImagePath(linkMultiField
					.getImage()));
			linkMultiField.setIntro(jsonObject.get(
					HomePageCarouselConstants.CAROUSEL_LIGHT_INTRO)
					.toString());
			linkMultiField.setMainTitle(jsonObject.get(
					HomePageCarouselConstants.CAROUSEL_MAIN_TITLE)
					.toString());
			linkMultiField.setDescription(jsonObject.get(
					HomePageCarouselConstants.CAROUSEL_DESCRIPTION)
					.toString());
			linkMultiField.setCallToAction(jsonObject.get(
					HomePageCarouselConstants.CAROUSEL_CALL_TO_ACTION)
					.toString());
			linkMultiField
					.setCallToActionText(jsonObject
							.get(HomePageCarouselConstants.CAROUSEL_CALL_TO_ACTION_TEXT)
							.toString());

			res = getResourceResolver()
					.getResource(
							jsonObject
									.get(HomePageCarouselConstants.CAROUSEL_PREVIEW_THUMBNAIL)
									.toString());

			if(null!=res)
			{
			asset = res.adaptTo(Asset.class);
			rendition = UIHelper.getBestfitRendition(asset, 130);
			LOGGER.info("path is " + rendition.getPath());
			linkMultiField.setPreviewThumbnail(rendition.getPath());
			}
			linkMultiField.setPreviewTitle(jsonObject.get(
					HomePageCarouselConstants.CAROUSEL_PREVIEW_TITLE)
					.toString());
			LOGGER.info("testing");
			dataList.add(linkMultiField);
		}
		
	}

	/**
	 * Getter method returning populated dataList.
	 */
	public List<LinksMultiField> getDataList() {
		return dataList;
	}

	/**
	 * 
	 * @param imagePath
	 * @return String
	 */
	private String getHDImagePath(String imagePath) {
		return imagePath.substring(0, imagePath.indexOf("."));
	}

}

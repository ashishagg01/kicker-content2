package org.kicker.aem.content.logo;

import org.apache.sling.api.resource.Resource;
import com.adobe.cq.sightly.WCMUse;
import com.day.cq.dam.api.Asset;

/**
 * @author monika.mishra
 *  
 *  The Class LogoMetaData.
 *
 */
public class LogoMetaData extends WCMUse{

	/** The img. */
	private String img;

	/** The title. */
	private String title;

	/** The description. */
	private String description;

	/** The asset. */
	private Asset asset;


	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "LogoMetaData [title=" + title + ", description=" + description + "]";
	}


	/* (non-Javadoc)
	 * @see com.adobe.cq.sightly.WCMUse#activate()
	 */
	@Override
	public void activate() throws Exception {

		img=getCurrentStyle().get("fileReference",String.class);
		String imgPath = getCurrentStyle().get("fileReference", String.class);
		Resource imageResource = getResourceResolver().getResource(imgPath);
		asset = imageResource.adaptTo(Asset.class);
		title=getLogoAsset().getMetadataValue("dc:title");
		description =getLogoAsset().getMetadataValue("dc:description");
		if(null !=title && !title.equals("")  &&  null !=description && !description.equals(""))
		{
			title=title.toString();
			description =description.toString();
		}
	}

	/**
	 * Gets the logo asset.
	 *
	 * @return the logo asset
	 */
	Asset getLogoAsset(){
		return this.asset;
	}

	/**
	 * Gets the img.
	 *
	 * @return the img
	 */
	public String getImg() {
		return img;
	}

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * Gets the description.
	 *
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	

}

package org.kicker.aem.content.homepagecarousel;

/**
 * @author deepak.singla
 * version 1.0
 * LinkMultifield class is a POJO class containhg getters and setters corresponding to 
 * properties in multifield component.
 */
public class LinksMultiField {
	
	/**
	 * image property holds image path selected from multifield
	 */
	private String image;
	
	/**
	 * hdimage property holds hd images
	 */
	private String hdimage;
	
	/**
	 * intro property holds text written above title on image
	 */
	private String intro;
	
	/**
	 * mainTitle property holds title appearing on image.
	 */
    private String mainTitle;
    
    /**
     * description property holds description appearing below title on image.
     */
    private String description;
    
    /**
     * callToAction property holds path that would redirect author to some other page.
     */
    private String callToAction;
    
    /**
     * callToActionText property holds text that would be a hyperlink 
     */
    private String callToActionText;
    
    /**
     * previewThumbnail property holds path of image that would appear once user hovers on left and right icons.
     */
    private String previewThumbnail;
    
    /**
     * previewTitle property holds text appearing below preview thumnail image.
     */
    private String previewTitle;
    
	/**
	 * @return String
	 */
	public String getImage() {
		return image;
	}
	
	/**
	 * 
	 * @param image
	 */
	public void setImage(String image) {
		this.image = image;
	}
	
	/**
	 * @return String
	 */
	public String getIntro() {
		return intro;
	}
	
	/**
	 * 
	 * @param intro
	 */
	public void setIntro(String intro) {
		this.intro = intro;
	}
	
	/**
	 * @return String
	 */
	public String getMainTitle() {
		return mainTitle;
	}
	
	/**
	 * 
	 * @param mainTitle
	 */
	public void setMainTitle(String mainTitle) {
		this.mainTitle = mainTitle;
	}
	
	/**
	 * @return String
	 */
	public String getDescription() {
		return description;
	}
	
	/**
	 * 
	 * @param description
	 */
	public void setDescription(String description) {
		this.description = description;
	}
	
	/**
	 * @return String
	 */
	public String getCallToAction() {
		return callToAction;
	}
	
	/**
	 * 
	 * @param callToAction
	 */
	public void setCallToAction(String callToAction) {
		this.callToAction = callToAction;
	}
	
	/**
	 * @return String
	 */
	public String getCallToActionText() {
		return callToActionText;
	}
	
	/**
	 * 
	 * @param callToActionText
	 */
	public void setCallToActionText(String callToActionText) {
		this.callToActionText = callToActionText;
	}
	
	/**
	 * @return String
	 */
	public String getPreviewThumbnail() {
		return previewThumbnail;
	}
	
	/**
	 * 
	 * @param previewThumbnail
	 */
	public void setPreviewThumbnail(String previewThumbnail) {
		this.previewThumbnail = previewThumbnail;
	}
	
	/**
	 * @return String
	 */
	public String getPreviewTitle() {
		return previewTitle;
	}
	
	/**
	 * 
	 * @param previewTitle
	 */
	public void setPreviewTitle(String previewTitle) {
		this.previewTitle = previewTitle;
	}

	/**
	 * @return String
	 */
	public String getHdimage() {
		return hdimage;
	}
	
	/** 
	 * @param hdimage
	 */
	public void setHdimage(String hdimage) {
		this.hdimage = hdimage;
	}
    

}

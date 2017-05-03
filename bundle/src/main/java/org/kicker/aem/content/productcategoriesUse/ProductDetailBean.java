package org.kicker.aem.content.productcategoriesUse;

import java.util.List;

/**
 * The Class ProductDetailBean.
 */
public class ProductDetailBean {

/** The prod image. */
private String prodImage;

/** The page path. */
private String pagePath;

/** The page title. */
private String pageTitle;

/** The prod description. */
private String prodDescription;

/** The tags list. */
private List<String> tagsList;

/**
 * Gets the prod image.
 *
 * @return the prodImage
 */
public String getProdImage() {
return prodImage;
}

/**
 * Sets the prod image.
 *
 * @param prodImage the prodImage to set
 */
public void setProdImage(String prodImage) {
this.prodImage = prodImage;
}

/**
 * Gets the page path.
 *
 * @return the pagePath
 */
public String getPagePath() {
return pagePath;
}

/**
 * Gets the tags list.
 *
 * @return the tagsList
 */
public List<String> getTagsList() {
	return tagsList;
}

/**
 * Sets the tags list.
 *
 * @param tagsList the tagsList to set
 */
public void setTagsList(List<String> tagsList) {
	this.tagsList = tagsList;
}

/**
 * Sets the page path.
 *
 * @param pagePath the pagePath to set
 */
public void setPagePath(String pagePath) {
this.pagePath = pagePath;
}

/**
 * Gets the page title.
 *
 * @return the pageTitle
 */
public String getPageTitle() {
return pageTitle;
}

/**
 * Sets the page title.
 *
 * @param pageTitle the pageTitle to set
 */
public void setPageTitle(String pageTitle) {
this.pageTitle = pageTitle;
}

/**
 * Gets the prod description.
 *
 * @return the prodDescription
 */
public String getProdDescription() {
return prodDescription;
}

/**
 * Sets the prod description.
 *
 * @param prodDescription the prodDescription to set
 */
public void setProdDescription(String prodDescription) {
this.prodDescription = prodDescription;
}
} 

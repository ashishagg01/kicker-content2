/*
 * 
 */
package org.kicker.aem.content.productCategories;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.wcm.api.Page;

/**
 * The Class ProductCategories.
 */
public class ProductCategories extends WCMUse {

	/** The logger. */
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	/** The product pages. */
	private List<ProductDetailBean> productPages;
	
	
	List<ProductDetailBean> productList = new ArrayList<ProductDetailBean>();

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.adobe.cq.sightly.WCMUse#activate()
	 */
	@Override
	public void activate() throws Exception {
		LOGGER.info("----------------GETTING JCR SESSION--------------");
		productPages = new ArrayList<ProductDetailBean>();

		productPages = getProductsProperties();

	}

	/**
	 * Gets the product pages.
	 *
	 * @return the product pages
	 */
	public List<ProductDetailBean> getProductPages() {
		return productPages;
	}

	private List<ProductDetailBean> getProductsProperties() throws RepositoryException, JSONException {
		Node pageNode = getCurrentPage().adaptTo(Node.class);
		String path = pageNode.getPath();

		Map<String, String> map = new HashMap<String, String>();
		map.put(ProductCategoriesConstants.PATH, path);
		map.put(ProductCategoriesConstants.TYPE, ProductCategoriesConstants.CQ_PAGE);
		map.put(ProductCategoriesConstants.PROPERTY, ProductCategoriesConstants.PROPERTY_VALUE);
		// Can be done in map or with Query methods
		map.put(ProductCategoriesConstants.OFFSET, "0"); // same as
															// query.setStart(0)
															// below
		map.put(ProductCategoriesConstants.LIMIT, "20"); // same as
															// query.setHitsPerPage(20)
															// below
		int count = 0;
		if (null != getCurrentPage().getTags() && getCurrentPage().getTags().length > 0) {
			Tag currentCategoryTag = getCurrentPage().getTags()[0];
			LOGGER.info("Category Tag property is :::" + currentCategoryTag.getTagID());
			Iterator<Tag> specialityTagsIterator = currentCategoryTag.listChildren();
			if (null != specialityTagsIterator)
				while (specialityTagsIterator.hasNext()) {
					StringBuilder tagProperty = new StringBuilder();
					tagProperty.append(ProductCategoriesConstants.PROPERTY + ".");
					tagProperty.append(String.valueOf(count++));
					tagProperty.append(ProductCategoriesConstants.VALUE);
					String specialityID = specialityTagsIterator.next().getTagID();
					LOGGER.info("next value is :" + specialityID);
					map.put(tagProperty.toString(), specialityID);
				}
		}

		QueryBuilder builder = getSlingScriptHelper().getService(QueryBuilder.class);
		Session session = getResourceResolver().adaptTo(Session.class);
		Query query = builder.createQuery(PredicateGroup.create(map), session);
		LOGGER.info("Query is::::" + query.toString());

		query.setStart(0);
		query.setHitsPerPage(20);

		SearchResult result = query.getResult();
		if (null != result) {
			
			long totalMatches = result.getTotalMatches();
			long offset = result.getStartIndex();
			
			LOGGER.info(" /totalMatches : " + totalMatches + " /offset : " + offset
					+ " /numberOfPages : " + totalMatches / 20);

			// iterating over the results
			LOGGER.info("-----before total hits...---------------" + result.getHits().size());
			if (null != result.getHits()) {
				productList = getProductList(result);
			}
		}

		return productList;
	}

	private List<ProductDetailBean> getProductList(SearchResult result) throws RepositoryException, JSONException {
		for (Hit hit : result.getHits()) {
			ProductDetailBean product = new ProductDetailBean();
			Node node = hit.getResource().adaptTo(Node.class);

			Page prodPage = hit.getResource().adaptTo(Page.class);
			Tag[] prodTags = prodPage.getTags();
			List<String> tagsList = new ArrayList<String>();
			StringBuilder divId = new StringBuilder();
			String s = "";
			for (int tagCount = 0; prodTags.length > tagCount; tagCount++) {
				s = prodTags[tagCount].getTitle();
				divId.append(s.toLowerCase().replace(" ", "-")).append(" ");
				tagsList.add(s);

			}
			String divIds = divId.toString();

			LOGGER.info("NODE pageTitle: " + node.getPath());

			String pageTitle = node.getNode(ProductCategoriesConstants.NODE)
					.getProperty(ProductCategoriesConstants.TITLE).getString();

			String productDesc = node.getNode(ProductCategoriesConstants.NODE)
					.getProperty(ProductCategoriesConstants.PRODUCT_DESC).getString();

			String pagePath = hit.getNode().getPath() + ProductCategoriesConstants.HTML_SUFFIX_IDENTIFIER;
			LOGGER.info("NODE pagePath: " + pagePath);

			String productCarousel = node.getNode(ProductCategoriesConstants.NODE)
					.getProperty(ProductCategoriesConstants.PRODUCT_CAROUSEL).getValues()[0].getString();
			LOGGER.info("NODE productCarousel: " + productCarousel);

			JSONObject json = new JSONObject(productCarousel);

			String carouselMedia = "";
			if (null != json) {
				carouselMedia = json.get(ProductCategoriesConstants.CAROUSEL_MEDIA).toString();
			}
			LOGGER.info("NODE carouselMedia: " + carouselMedia);
			product.setTagsList(tagsList);
			product.setCarouselMedia(carouselMedia);
			product.setPagePath(pagePath);
			product.setPageTitle(pageTitle);
			product.setProductDesc(productDesc);
			product.setDivIds(divIds);
			productList.add(product);
		}
		return productList;
	}
}

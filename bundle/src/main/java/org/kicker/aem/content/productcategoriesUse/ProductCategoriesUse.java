package org.kicker.aem.content.productcategoriesUse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.script.Bindings;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.day.cq.tagging.Tag;

import io.sightly.java.api.Use;

// TODO: Auto-generated Javadoc

/**
 * 
 * The Class ProductCategoriesUse.
 * 
 */

@SuppressWarnings("restriction")
public class ProductCategoriesUse implements Use {

	/** The Constant LOGGER. */

	static final Logger LOGGER = LoggerFactory.getLogger(ProductCategoriesUse.class);

	/** The product pages. */

	private List<ProductDetailBean> productPages;

	/** The resource. */

	Resource resource;

	/** The current page. */

	private Page currentPage;

	/** The session. */

	private Session session;

	/*
	 * 
	 * (non-Javadoc)
	 * 
	 * 
	 * 
	 * @see io.sightly.java.api.Use#init(javax.script.Bindings)
	 */
	@Override
	public void init(Bindings bindings) {

		// All standard objects/binding are available

		resource = (Resource) bindings.get("resource");

		LOGGER.info("Inside init method | Resource:" + resource);

		currentPage = (Page) bindings.get("currentPage");

		session = resource.getResourceResolver().adaptTo(Session.class);

	}

	/**
	 * 
	 * Gets the product pages.
	 *
	 * 
	 * 
	 * @return the product pages
	 * @throws RepositoryException
	 * @throws JSONException
	 * 
	 * @throws Exception
	 * 
	 *             the exception
	 * 
	 */

	public List<ProductDetailBean> getProductPages() throws RepositoryException {

		LOGGER.info("Inside method getProductsProperties");

		productPages = new ArrayList<ProductDetailBean>();

		Tag pageTags = currentPage.getTags()[0];
		Iterator<Tag> tags = pageTags.listChildren();
		

			Map<String, String> map = new HashMap<String, String>();

			Node pageNode = currentPage.adaptTo(Node.class);

			
			String path = pageNode.getPath();

			map.put("path", path);

			map.put("type", "cq:Page");

			map.put("property", "jcr:content/cq:tags");

			map.put("p.offset", "0"); // same as query.setStart(0) below

			map.put("p.limit", "20"); // same as query.setHitsPerPage(20) below

			

			int count = 0;

			// Traversing the tags list
			if(null!=tags){
			while (tags.hasNext()) {

				Tag tag = tags.next();

				StringBuilder tagProperty = new StringBuilder();

				tagProperty.append("property.");

				tagProperty.append(String.valueOf(count++));

				tagProperty.append("_value");

				map.put(tagProperty.toString(), tag.getTagID());

			}
			}

			QueryBuilder builder = resource.getResourceResolver().adaptTo(

			QueryBuilder.class);

			Query query = builder.createQuery(PredicateGroup.create(map),

			session);

			query.setStart(0);

			query.setHitsPerPage(20);

			SearchResult result = query.getResult();

			int hitsPerPage = result.getHits().size();

			long totalMatches = result.getTotalMatches();

			long offset = result.getStartIndex();

			long numberOfPages = totalMatches / 20;

			LOGGER.info("hitsPerPage : " + hitsPerPage + " /totalMatches : "

			+ totalMatches + " /offset : " + offset

			+ " /numberOfPages : " + numberOfPages);

			// iterating over the results

			for (Hit hit : result.getHits()) {

				ProductDetailBean product = new ProductDetailBean();

				Node node = hit.getResource().adaptTo(Node.class);

				Page prodPage = hit.getResource().adaptTo(Page.class);

				Tag[] prodTags = prodPage.getTags();

				List<String> tagsList = new ArrayList<String>();

				for (int j = 0; prodTags.length > j; j++) {

					tagsList.add(prodTags[j].getTitle());

				}

				Node contentNode = node.getNode("jcr:content/productHeader");

				product.setPagePath(node.getPath() + ".html");

				product.setPageTitle(contentNode.getProperty("title").getString());

				product.setProdDescription(contentNode.getProperty("productDesc").getString());

				JSONObject carouselImages = null;
				String productCarousel = contentNode.getProperty("productCarousel").getValues()[0].getString();
				LOGGER.info("NODE productCarousel: " + productCarousel);
				try {
					getCarouselMedia(product, carouselImages);
				} catch (JSONException e) {
					
					LOGGER.error("JSON Exception :"+e);
				}

				product.setTagsList(tagsList);

				productPages.add(product);

			}

			LOGGER.info("getProductsProperties | productList size :"

			+ productPages.size());

		

		return productPages;

	}

	private void getCarouselMedia(ProductDetailBean product,
			JSONObject carouselImages) throws JSONException {
		if (carouselImages != null && carouselImages.get("carouselMedia") != null) {

			product.setProdImage(carouselImages.get("carouselMedia").toString());

		}
	}

}

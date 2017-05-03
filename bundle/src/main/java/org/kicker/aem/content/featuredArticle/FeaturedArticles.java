package org.kicker.aem.content.featuredArticle;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

/**
 * The Class FeaturedArticles.
 */
public class FeaturedArticles extends WCMUse {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(FeaturedArticles.class);

	/** The links. */
	private String[] links;

	/** The articles. */
	private List<ArticleBean> articles;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.adobe.cq.sightly.WCMUse#activate()
	 */
	@Override
	public void activate() throws Exception {

		LOGGER.info("Start of method activate");

		links = getProperties().get(ArticleConstants.LINK, String[].class);
		LOGGER.info("articles" + links.length);
		try {
			articles = getArticleList(links);
		} catch (JSONException e) {

			LOGGER.error("JSONException" + e);
		}

	}

	/**
	 * Gets the article list.
	 *
	 * @param articles
	 *            the articles
	 * @return the article list
	 * @throws JSONException
	 *             the JSON exception
	 */
	private List<ArticleBean> getArticleList(String[] articles) throws JSONException {

		List<ArticleBean> articleList = new ArrayList<ArticleBean>();
		ArticleBean articleObj;
		if (articles != null && articles.length > 0) {
			LOGGER.info("getMenuItems size" + articles.length);
			// Iterating over the articles
			for (int i = 0; i < articles.length; i++) {
				articleObj = new ArticleBean();
				JSONObject jsonObject = new JSONObject(articles[i]);

				articleObj.setHeaders(jsonObject.get(ArticleConstants.HEADERS).toString());
				articleObj.setArticle(jsonObject.getString(ArticleConstants.ARTICLE).toString());
				articleObj.setColor(jsonObject.getString(ArticleConstants.COLOR).toString());
				articleObj.setImage(jsonObject.getString(ArticleConstants.IMAGE).toString());
				articleObj.setTitle(jsonObject.getString(ArticleConstants.TITLE).toString());
				articleList.add(articleObj);
			}

		}
		return articleList;
	}

	/**
	 * Gets the articles.
	 *
	 * @return the articles
	 */
	public List<ArticleBean> getArticles() {
		return articles;
	}

}

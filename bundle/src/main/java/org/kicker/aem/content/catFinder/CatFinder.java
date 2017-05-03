package org.kicker.aem.content.catFinder;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.script.Bindings;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;

import io.sightly.java.api.Use;

// TODO: Auto-generated Javadoc
/**
 * The Class CatFinder.
 */
@SuppressWarnings("restriction")
public class CatFinder implements Use {


	/** The current page. */
	private Page currentPage;

	/** The page filter. */
	private PageFilter pagefilter;

	/** The category list. */
	private List<CatFinderBean> categoryList;

	/*
	 * (non-Javadoc)
	 * 
	 * @see io.sightly.java.api.Use#init(javax.script.Bindings)
	 */
	@Override
	public void init(Bindings bindings) {

		// All standard objects/binding are available
		currentPage = (Page) bindings.get("currentPage");
	}

	/**
	 * Gets the category list.
	 *
	 * @return the category list
	 */

	public List<CatFinderBean> getCategoryList() {
		categoryList = new ArrayList<CatFinderBean>();
		Iterator<Page> catPageIterator = currentPage.listChildren(pagefilter);
	
		while (catPageIterator.hasNext()) {

			CatFinderBean categoryBean = new CatFinderBean();
			Page catPage = catPageIterator.next();
			categoryBean.setPath(catPage.getPath() + ".html");
			categoryBean.setTitle(catPage.getTitle());

			categoryList.add(categoryBean);
		}return categoryList;

	}

}
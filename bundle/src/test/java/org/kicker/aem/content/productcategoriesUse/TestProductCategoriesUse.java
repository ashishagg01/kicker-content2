package org.kicker.aem.content.productcategoriesUse;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.script.Bindings;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.scripting.SlingScriptHelper;
import org.junit.*;
import org.junit.runner.RunWith;
import org.kicker.aem.content.productCategories.ProductCategoriesConstants;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.wcm.api.Page;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.*;

/**
 * @author swati.lamba
 *
 */
@SuppressWarnings("restriction")
@RunWith(MockitoJUnitRunner.class)
public class TestProductCategoriesUse {

	/* Class to be tested */
	ProductCategoriesUse prodCategoriesUse;

	/* Mocked page object */
	@Mock
	Page currentPageMock;

	@Mock
	Resource resource;

	@Mock
	Bindings bindings;

	@Mock
	Tag mockedPageCategoryTag;

	/* Mocked SlingScriptHelper object */
	@Mock
	SlingScriptHelper slingScriptHelperMock;

	/* Mocked QueryBuilder object */
	@Mock
	QueryBuilder queryBuilderMock;

	/* Mocked ResourceResolver object */
	@Mock
	ResourceResolver resourceResolverMock;

	/* Mocked Session object */
	@Mock
	Session sessionMock;

	/* Mocked Query object */
	@Mock
	Query queryMock;

	/* Mocked SearchResult object */
	@Mock
	SearchResult searchResultMock;

	/**
	 * Setup.
	 */

	@Before
	public void setup() {
		prodCategoriesUse = new ProductCategoriesUse() {

			@SuppressWarnings("unused")
			public ResourceResolver getResourceResolver() {

				return resourceResolverMock;

			};
		};
		Mockito.when(bindings.get("resource")).thenReturn(resource);
		Mockito.when(bindings.get("currentPage")).thenReturn(currentPageMock);
		Mockito.when(resource.getResourceResolver()).thenReturn(
				resourceResolverMock);
		Mockito.when(resource.getResourceResolver().adaptTo(Session.class))
				.thenReturn(sessionMock);
		Mockito.when(resource.getResourceResolver().adaptTo(QueryBuilder.class))
				.thenReturn(queryBuilderMock);
	}

	/**
	 * Test method for
	 * {@link org.kicker.aem.content.productCategories.ProductCategories#activate()}
	 * .
	 * 
	 * @throws Exception
	 */
	@Test
	public void testInit() throws Exception {

		String jsonData = "{menuItem:\"/content/geometrixx-outdoors-mobile/en\", carouselMedia:\"true\" , "
				+ "overviewLinkText: \"ABC\",featuredProductImage:\"\",featuredAreaTitle:\"\","
				+ "featuredAreaDescription:\"\", callToAction:\"\", callToActionText:\"\"}";

		Node mockedCurrentPageNode = mock(Node.class);
		when(currentPageMock.adaptTo(Node.class)).thenReturn(
				mockedCurrentPageNode);
		when(mockedCurrentPageNode.getPath()).thenReturn("/en/geometrixx");// TBD
		Node mockedCurrentPageNode2 = mock(Node.class);
		Property propertyMock = mock(Property.class);
		when(propertyMock.getString()).thenReturn("propertyMock");
		Value[] propValuesMockObj = new Value[1];

		Value mockValue = mock(Value.class);
		when(mockValue.getString()).thenReturn(jsonData);
		propValuesMockObj[0] = mockValue;
		when(propertyMock.getValues()).thenReturn(propValuesMockObj);

		when(mockedCurrentPageNode2.getProperty(anyString())).thenReturn(
				propertyMock);
		Mockito.when(propertyMock.isMultiple()).thenReturn(true);
		when(mockedCurrentPageNode.getNode(eq(ProductCategoriesConstants.NODE)))
				.thenReturn(mockedCurrentPageNode2);

		Tag[] mockedTagArray = new Tag[1];
		when(mockedPageCategoryTag.getTagID()).thenReturn("tagId");
		when(mockedPageCategoryTag.getTitle()).thenReturn("Title one");

		mockedTagArray[0] = mockedPageCategoryTag;

		Iterator<Tag> iterator = Mockito.mock(Iterator.class);

		Mockito.when(mockedPageCategoryTag.listChildren()).thenReturn(iterator);

		Mockito.when(iterator.hasNext()).thenReturn(true, false);

		Mockito.when(iterator.next()).thenReturn(mockedPageCategoryTag);
		when(currentPageMock.getTags()).thenReturn(mockedTagArray);

		when(
				queryBuilderMock.createQuery(any(PredicateGroup.class),
						eq(sessionMock))).thenReturn(queryMock);
		when(queryMock.toString()).thenReturn("queryMock");

		when(queryMock.getResult()).thenReturn(searchResultMock);
		List<Hit> hits = new ArrayList<Hit>();
		Hit hitObj = mock(Hit.class);
		when(hitObj.getNode()).thenReturn(mockedCurrentPageNode);
		Resource resourceMock = mock(Resource.class);
		when(hitObj.getResource()).thenReturn(resourceMock);
		when(resourceMock.adaptTo(Node.class))
				.thenReturn(mockedCurrentPageNode);
		when(resourceMock.adaptTo(Page.class)).thenReturn(currentPageMock);

		hits.add(hitObj);
		when(searchResultMock.getHits()).thenReturn(hits);

		prodCategoriesUse.init(bindings);

		assertNotNull(prodCategoriesUse.getProductPages());
	}

}

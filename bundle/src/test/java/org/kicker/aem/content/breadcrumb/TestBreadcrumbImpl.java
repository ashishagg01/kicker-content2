/**
 * 
 */
package org.kicker.aem.content.breadcrumb;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.designer.Style;
import com.google.common.collect.ImmutableMap;

import io.wcm.testing.mock.aem.junit.AemContext;

// TODO: Auto-generated Javadoc
/**
 * The Class TestBreadcrumbImpl.
 *
 * @author swati.lamba
 */
@RunWith(MockitoJUnitRunner.class)
public class TestBreadcrumbImpl {

	/** The style. */
	@Mock
	Style style;

	/** The page. */
	@Mock
	Page page;

	/** The context. */
	@Rule
	public final AemContext context = new AemContext();

	/** The bread crumb obj. */
	BreadcrumbImpl breadCrumbObj = new BreadcrumbImpl() {
		public Style getCurrentStyle() {
			return style;
		}

		public Page getCurrentPage() {
			return page;
		}

	};

	/**
	 * Test method for {@link org.kicker.aem.content.BreadcrumbImpl#activate()}.
	 */
	@Test
	public void testGetNavigationTitle() {
		try {
			Mockito.when(style.get("absParent", 2L)).thenReturn(2L);
			Mockito.when(style.get("relParent", 1L)).thenReturn(1L);
			Mockito.when(page.getDepth()).thenReturn(4);

			Page mockPage = context.create().page("/content/geometrixx-outdoors-mobile/en/Mens", "template",

					ImmutableMap.<String, Object> builder().put("title", "Title").put("navTitle", "Navigation Title").build());
			
			Mockito.when(page.getAbsoluteParent(Mockito.anyInt())).thenReturn(mockPage);
			breadCrumbObj.activate();
			assertNotNull(breadCrumbObj.getPageList());
			assertEquals("Navigation Title", breadCrumbObj.getPageList().get(0).get("title"));


		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Testget page title.
	 */
	@Test
	public void testgetPageTitle() {
		try {
			Mockito.when(style.get("absParent", 2L)).thenReturn(2L);
			Mockito.when(style.get("relParent", 1L)).thenReturn(1L);
			Mockito.when(page.getDepth()).thenReturn(4);

			Page mockPage = context.create().page("/content/geometrixx-outdoors-mobile/en/Mens", "template",
					
					ImmutableMap.<String, Object> builder().put("navTitle", "").build());
			
			Mockito.when(page.getAbsoluteParent(Mockito.anyInt())).thenReturn(mockPage);
			breadCrumbObj.activate();
			assertNotNull(breadCrumbObj.getPageList());
			assertEquals("Mens", breadCrumbObj.getPageList().get(0).get("title"));

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Test page name.
	 */
	@Test
	public void testPageName() {
		try {
			Mockito.when(style.get("absParent", 2L)).thenReturn(2L);
			Mockito.when(style.get("relParent", 1L)).thenReturn(1L);
			Mockito.when(page.getDepth()).thenReturn(4);

			Page mockPage = context.create().page("/content/geometrixx-outdoors-mobile/en/Mens", "mockTemplate", "Page Name");

			Mockito.when(page.getAbsoluteParent(Mockito.anyInt())).thenReturn(mockPage);
			breadCrumbObj.activate();
			assertNotNull(breadCrumbObj.getPageList());
			assertEquals("Page Name", breadCrumbObj.getPageList().get(0).get("title"));

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Test page is null.
	 */
	@Test
	public void testPageIsNull() {
		try {
			Mockito.when(style.get("absParent", 2L)).thenReturn(2L);
			Mockito.when(style.get("relParent", 1L)).thenReturn(1L);
			Mockito.when(page.getDepth()).thenReturn(4);

			Mockito.when(page.getAbsoluteParent(Mockito.anyInt())).thenReturn(null);
			breadCrumbObj.activate();
			assertEquals(0, breadCrumbObj.getPageList().size());

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}

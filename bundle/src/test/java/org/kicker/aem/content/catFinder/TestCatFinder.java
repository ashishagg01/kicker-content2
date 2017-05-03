package org.kicker.aem.content.catFinder;

import static org.junit.Assert.*;

import java.util.Iterator;
import java.util.List;
import javax.script.Bindings;
import org.apache.derby.tools.sysinfo;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import io.wcm.testing.mock.aem.junit.AemContext;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.google.common.collect.ImmutableMap;


@RunWith(MockitoJUnitRunner.class)
public class TestCatFinder {
	
	@Mock
	Page page;

	@Mock
	Bindings bindings;
	
	@Mock
	CatFinderBean catFinderBean;
	
	@Rule
	public final AemContext context = new AemContext();
	
	private PageFilter pagefilter;
	
	@Before
	public void setUp(){
		Mockito.when(bindings.get(Mockito.anyString())).thenReturn(page);

	}
	
	@Test
	public void testGetCategoryList(){
		CatFinder catFinderObj= new CatFinder();
        
        Page mockPage=context.create().page(
                "/content/geometrixx-outdoors-mobile/en",
                "mockTemplate",
                ImmutableMap.<String, Object> builder().put("title", "Test")
                              .put("name", "test2").build());
        
        Page childPage=context.create().page(
                "/content/geometrixx-outdoors-mobile/en/Mens",
                "mockTemplate",
                ImmutableMap.<String, Object> builder().put("title", "Test")
                              .put("name", "test2").build());
        
		Iterator<Page> iterator = Mockito.mock(Iterator.class);
        Mockito.when(page.listChildren(pagefilter)).thenReturn(iterator);
        Mockito.when(iterator.hasNext()).thenReturn(true,false);
        Mockito.when(iterator.next()).thenReturn(mockPage);
		Mockito.when(page.getPath()).thenReturn(childPage.getPath());
		Mockito.when(page.getTitle()).thenReturn(childPage.getTitle());
		catFinderObj.init(bindings);
		List <CatFinderBean> list= catFinderObj.getCategoryList();
		assertNotNull(catFinderObj.getCategoryList());
		assertEquals("/content/geometrixx-outdoors-mobile/en.html", list.get(0).getPath());
		assertEquals("en", list.get(0).getTitle());
		
	}

}

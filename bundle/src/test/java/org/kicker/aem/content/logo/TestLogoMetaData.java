package org.kicker.aem.content.logo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import io.wcm.testing.mock.aem.junit.AemContext;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.day.cq.dam.api.Asset;
import com.day.cq.wcm.api.designer.Style;


@RunWith(MockitoJUnitRunner.class)
public class TestLogoMetaData {
	
	static final String IMG_PATH="/content/dam/dtranzTwo/img/boston-scientific-logo.png";
	

	@Mock
	Style style;
	
	@Mock
	ResourceResolver mockResourceResolver;
	
	@Mock
	Asset mockAsset;
	
	
	@Rule
	public final AemContext context = new AemContext();


	LogoMetaData logoMetaData = new LogoMetaData() {
		public Style getCurrentStyle() {
			return style;
		}
		
		public ResourceResolver getResourceResolver(){
			return mockResourceResolver;
			
		}
				
		public Asset getLogoAsset() {
			return mockAsset;
		}
		
	};
	
	
	@Test
	public void testActivate() {
		try {
				
			Mockito.when(style.get("fileReference", String.class)).thenReturn(IMG_PATH);

			Resource imgResource = context.create().resource(IMG_PATH);
			
			Mockito.when(mockResourceResolver.getResource(IMG_PATH)).thenReturn(imgResource);
			
			/*Asset imgAsset = null;
			Mockito.when(imgResource.adaptTo(Asset.class)).thenReturn(imgAsset);*/
				
			Mockito.when(mockAsset.getMetadataValue("dc:title")).thenReturn("Boston-Scientific-Logo");
			Mockito.when(mockAsset.getMetadataValue("dc:description")).thenReturn("Boston-Scientific-Logo");
			logoMetaData.activate();
			assertNotNull(logoMetaData.getTitle());
			assertNotNull(logoMetaData.getDescription());
			assertEquals(logoMetaData.getTitle(),"Boston-Scientific-Logo");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	@Test
	public void testActivateWithNull() {
		try {
				
			Mockito.when(style.get("fileReference", String.class)).thenReturn(IMG_PATH);

			Resource imgResource = context.create().resource(IMG_PATH);
			
			Mockito.when(mockResourceResolver.getResource(IMG_PATH)).thenReturn(imgResource);
			
			/*Asset imgAsset = null;
			Mockito.when(imgResource.adaptTo(Asset.class)).thenReturn(imgAsset);*/
				
			Mockito.when(mockAsset.getMetadataValue("dc:title")).thenReturn(null);
			Mockito.when(mockAsset.getMetadataValue("dc:description")).thenReturn(null);
			logoMetaData.activate();
			assertNull(logoMetaData.getTitle());
			assertNull(logoMetaData.getDescription());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testActivateWithEmpty() {
		try {
				
			Mockito.when(style.get("fileReference", String.class)).thenReturn(IMG_PATH);

			Resource imgResource = context.create().resource(IMG_PATH);
			
			Mockito.when(mockResourceResolver.getResource(IMG_PATH)).thenReturn(imgResource);
			
			/*Asset imgAsset = null;
			Mockito.when(imgResource.adaptTo(Asset.class)).thenReturn(imgAsset);*/
				
			Mockito.when(mockAsset.getMetadataValue("dc:title")).thenReturn("");
			Mockito.when(mockAsset.getMetadataValue("dc:description")).thenReturn("");
			logoMetaData.activate();
			assertEquals(logoMetaData.getTitle(),"");
			assertEquals(logoMetaData.getDescription(),"");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}

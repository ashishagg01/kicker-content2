package org.kicker.aem.content.service;

import static org.junit.Assert.*;

import java.util.Dictionary;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.osgi.service.component.ComponentContext;

@RunWith(MockitoJUnitRunner.class)

public class TestErrorPageConfig {
	@Mock
	ComponentContext componentContext;
	@Mock
	Dictionary<Object, Object> dictionary;

	ErrorPageConfig errConfig = new ErrorPageConfig();

	@Test
	public void testActivate() {
		Mockito.when(dictionary.get(ErrorConfigConstants.ERROR_CODE)).thenReturn(new String("12345"));
		Mockito.when(dictionary.get(ErrorConfigConstants.ERROR_URL)).thenReturn(new String("test"));
		Mockito.when(componentContext.getProperties()).thenReturn(dictionary);
		errConfig.activate(componentContext);
		assertEquals(errConfig.getErrorCode(),"12345");
		assertEquals(errConfig.getErrorPageURL(),"test");
	}

}

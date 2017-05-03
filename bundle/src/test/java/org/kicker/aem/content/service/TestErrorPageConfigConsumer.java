package org.kicker.aem.content.service;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
@RunWith(MockitoJUnitRunner.class)
public class TestErrorPageConfigConsumer {
@Mock
List<ErrorPageConfig> errorConfigs;
@Mock
ErrorPageConfig errorConfig;
ErrorPageConfigConsumer errPageConsumer=new ErrorPageConfigConsumer();

	@Test
	public void testBindErrorPageConfig() {
		errPageConsumer.bindErrorPageConfig(errorConfig);
		
	}

	@Test
	public void testUnbindErrorPageConfig() {
		errPageConsumer.bindErrorPageConfig(errorConfig);
		
		errPageConsumer.unbindErrorPageConfig(errorConfig);
	}

	@Test
	public void testGetErrorPageDetails() {
		
		errorConfig=new ErrorPageConfig();
		errPageConsumer.bindErrorPageConfig(errorConfig);
		errPageConsumer.getErrorPageDetails("400");
		errorConfig=new ErrorPageConfig();
		errorConfig.setErrorCode("404");
		errorConfig.setErrorPageURL("test");
		errPageConsumer.bindErrorPageConfig(errorConfig);
		errPageConsumer.getErrorPageDetails("404");
	}

}

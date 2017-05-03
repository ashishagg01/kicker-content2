package org.kicker.aem.content.healthcondition;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.Value;

import org.apache.jackrabbit.api.security.user.User;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.kicker.aem.content.service.HealthConditionService;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.day.cq.wcm.api.Page;

/**
 * The Class TestHealthCondition.
 */
@RunWith(MockitoJUnitRunner.class)
public class TestHealthCondition {

	/* Class to be tested */
	HealthCondition healthCondition;

	/** The resource resover. */
	@Mock
	ResourceResolver resourceResover;

	/** The resource. */
	@Mock
	Resource resource;

	/** The user. */
	@Mock
	User user;

	/** The node. */
	@Mock
	Node node;

	/** The property. */
	@Mock
	Property property;

	/** The current page. */
	@Mock
	Page currentPage;

	/** The service conf consumer. */
	@Mock
	HealthConditionService healthConditionMockService;

	/**
	 * Setup.
	 */
	@Before
	public void setup() {
		healthCondition = spy(new HealthCondition());
	}
	/**
	 * Test activate.
	 *
	 * @throws Exception
	 *             the exception
	 */
	@Test
	public void testActivate() throws Exception {
		Mockito.doReturn(resourceResover).when(healthCondition).getResourceResolver();
		Mockito.when(resourceResover.adaptTo(User.class)).thenReturn(user);
		Mockito.when(user.getPath()).thenReturn("/home/users/j/jsovpIukn8ncZdLmdcCj");
		Mockito.when(resourceResover.getResource(Mockito.anyString())).thenReturn(resource);
		Mockito.when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.when(node.getProperty(HealthCondition.HEALTH_CONDITION_PREF)).thenReturn(property);
		Value[] propValuesMockObj = new Value[1];
		Value mockValue = mock(Value.class);
		Mockito.when(property.getValues()).thenReturn(propValuesMockObj);
		Map<String, String> testMap = new HashMap<String, String>();
		testMap.put("Asthma", "/content/dtranzTwo/en-US/health-conditions/asthma.html");
		when(mockValue.getString()).thenReturn("Asthma");
		Mockito.when(healthCondition.getHealthConditionPageMap()).thenReturn(testMap);
	//	HealthConditionService.getPageDataMap().put("key", "value");
		Mockito.doNothing().when(healthConditionMockService).getChildPages(resourceResover);
		propValuesMockObj[0] = mockValue;
		healthCondition.activate();
		assertNotNull(resourceResover.adaptTo(User.class));
		assertNotNull(user.getPath());
		assertNotNull(resourceResover.getResource(Mockito.anyString()));
		assertNotNull(resource.adaptTo(Node.class));
		assertNotNull(node.getProperty(HealthCondition.HEALTH_CONDITION_PREF));
		assertNotNull(property.getValues());
		assertFalse(property.getValues().length < 0);
		assertTrue(property.getValues().length == 1);
		assertNotNull(mockValue.getString());

	}

	/**
	 * Test set health condition child pages.
	 *
	 * @throws Exception
	 *             the exception
	 */
	@Test
	public void testSetHealthConditionChildPages() throws Exception {
		//HealthConditionService.getPageDataMap().put("key", "value");
		healthCondition.getHealthConditionPageList();
		assertNull(healthCondition.getHealthConditionPageList());

	}

	/**
	 * Test activate for property null.
	 *
	 * @throws Exception
	 *             the exception
	 */
	@Test
	public void testActivateForPropertyNull() throws Exception {
		Mockito.doReturn(resourceResover).when(healthCondition).getResourceResolver();
		Mockito.when(resourceResover.adaptTo(User.class)).thenReturn(user);
		Mockito.when(user.getPath()).thenReturn("/home/users/j/jsovpIukn8ncZdLmdcCj");
		Mockito.when(resourceResover.getResource(Mockito.anyString())).thenReturn(resource);
		Mockito.when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.when(node.getProperty(HealthCondition.HEALTH_CONDITION_PREF)).thenReturn(null);
		//HealthConditionService.getPageDataMap().put("key", "value");
		Value[] propValuesMockObj = new Value[1];
		Value mockValue = mock(Value.class);
		Mockito.when(property.getValues()).thenReturn(propValuesMockObj);
		Mockito.when(healthCondition.getHealthConditionPageMap()).thenReturn(null);
		when(mockValue.getString()).thenReturn("Asthma");
		propValuesMockObj[0] = mockValue;
		healthCondition.activate();
		assertNotNull(resourceResover.adaptTo(User.class));
		assertNotNull(user.getPath());
		assertNotNull(resourceResover.getResource(Mockito.anyString()));
		assertNotNull(resource.adaptTo(Node.class));
		assertNull(node.getProperty(HealthCondition.HEALTH_CONDITION_PREF));
		assertNotNull(property.getValues());
		assertFalse(property.getValues().length < 0);
		assertTrue(property.getValues().length == 1);
		assertNotNull(mockValue.getString());
	}
}

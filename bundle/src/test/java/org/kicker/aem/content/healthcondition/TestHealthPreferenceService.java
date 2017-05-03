package org.kicker.aem.content.healthcondition;

import java.io.IOException;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.ServletException;

import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

/**
 * The Class TestHealthPreferenceService.
 */
@RunWith(MockitoJUnitRunner.class)
public class TestHealthPreferenceService {

	/** The health pref service obj. */
	HealthPreferenceServlet healthPrefServiceObj = new HealthPreferenceServlet();

	/** The request. */
	@Mock
	SlingHttpServletRequest request;

	/** The resource resolver. */
	@Mock
	ResourceResolver resourceResolver;

	/** The user manager. */
	@Mock
	UserManager userManager;

	/** The session. */
	@Mock
	Session session;

	/** The auth. */
	@Mock
	Authorizable auth;

	/** The node. */
	@Mock
	Node node;

	/** The response. */
	@Mock
	SlingHttpServletResponse response;

	/**
	 * Test do get.
	 *
	 * @throws LoginException
	 *             the login exception
	 * @throws RepositoryException
	 *             the repository exception
	 * @throws ServletException
	 *             the servlet exception
	 * @throws IOException
	 *             Signals that an I/O exception has occurred.
	 */
	@Test
	public void testDoGet() throws LoginException, RepositoryException,
			ServletException, IOException {

		Mockito.when(request.getParameterValues("healthChk")).thenReturn(
				setUpAndReturnData());
		Mockito.when(request.getResourceResolver())
				.thenReturn(resourceResolver);
		Mockito.when(resourceResolver.adaptTo(UserManager.class)).thenReturn(
				userManager);
		Mockito.when(resourceResolver.adaptTo(Session.class)).thenReturn(
				session);
		Mockito.when(userManager.getAuthorizable(Mockito.anyString()))
				.thenReturn(auth);
		Mockito.when(auth.getPath()).thenReturn("path");
		Mockito.when(session.getNode(Mockito.anyString())).thenReturn(node);

		healthPrefServiceObj.doPost(request, response);
	}

	/**
	 * Test do get with null pref.
	 *
	 * @throws LoginException
	 *             the login exception
	 * @throws RepositoryException
	 *             the repository exception
	 * @throws ServletException
	 *             the servlet exception
	 * @throws IOException
	 *             Signals that an I/O exception has occurred.
	 */
	@Test
	public void testDoGetWithNullPref() throws LoginException,
			RepositoryException, ServletException, IOException {

		Mockito.when(request.getParameterValues("healthChk")).thenReturn(null);
		healthPrefServiceObj.doPost(request, response);
	}

	/**
	 * Test do get with zero pref.
	 *
	 * @throws LoginException
	 *             the login exception
	 * @throws RepositoryException
	 *             the repository exception
	 * @throws ServletException
	 *             the servlet exception
	 * @throws IOException
	 *             Signals that an I/O exception has occurred.
	 */
	@Test
	public void testDoGetWithZeroPref() throws LoginException,
			RepositoryException, ServletException, IOException {
		String[] s = {};
		Mockito.when(request.getParameterValues("healthChk")).thenReturn(s);
		healthPrefServiceObj.doPost(request, response);
	}

	/**
	 * Sets the up and return data.
	 *
	 * @return the string[]
	 */
	private String[] setUpAndReturnData() {
		return new String[] { "Heavy Menstrual Bleeding"
				+ "Stress Urinary Incontinence" + "Sudden Cardiac Arrest" };
	}
}

package org.kicker.aem.content.userRegistration;

import static org.junit.Assert.*;

import java.io.IOException;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.jcr.ValueFactory;
import javax.servlet.ServletException;

import org.apache.jackrabbit.api.security.user.User;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.commons.json.JSONException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.adobe.granite.security.user.UserProperties;

/**
 * The Class TestUserRegisterServ.
 */
@RunWith(MockitoJUnitRunner.class)
public class TestUserRegisterServ {

	/** The resource resolver. */
	@Mock
	ResourceResolver resourceResolver;

	/** The resolver factory. */
	@Mock
	ResourceResolverFactory resolverFactory;

	/** The request. */
	@Mock
	SlingHttpServletRequest request;

	/** The response. */
	@Mock
	SlingHttpServletResponse response;

	/** The user manager. */
	@Mock
	UserManager userManager;

	/** The user. */
	@Mock
	User user;

	/** The session. */
	@Mock
	Session session;

	/** The value factory. */
	@Mock
	ValueFactory valueFactory;

	/** The value. */
	@Mock
	Value value;

	/** The user properties. */
	@Mock
	UserProperties userProperties;

	/** The user register obj. */
	private UserRegisterService userRegisterObj = new UserRegisterService();

	/**
	 * Test do post when user exists.
	 *
	 * @throws JSONException
	 *             the JSON exception
	 * @throws ServletException
	 *             the servlet exception
	 * @throws IOException
	 *             Signals that an I/O exception has occurred.
	 * @throws LoginException
	 *             the login exception
	 * @throws RepositoryException
	 *             the repository exception
	 */
	@Test
	public void testDoPostWhenUserExists() throws JSONException,
			ServletException, IOException, LoginException, RepositoryException {

		Mockito.when(request.getParameter(Mockito.anyString())).thenReturn(
				"Test");
		userRegisterObj.setResolverFactory(resolverFactory);
		Mockito.when(resolverFactory.getAdministrativeResourceResolver(null))
				.thenReturn(resourceResolver);
		Mockito.when(resourceResolver.adaptTo(Session.class)).thenReturn(
				session);
		Mockito.when(resourceResolver.adaptTo(UserManager.class)).thenReturn(
				userManager);
		Mockito.when(userManager.getAuthorizable(Mockito.anyString()))
				.thenReturn(user);
		userRegisterObj.doPost(request, response);
		

	}

	/**
	 * Test do post when user not exists group not exists.
	 *
	 * @throws JSONException
	 *             the JSON exception
	 * @throws ServletException
	 *             the servlet exception
	 * @throws IOException
	 *             Signals that an I/O exception has occurred.
	 * @throws LoginException
	 *             the login exception
	 * @throws RepositoryException
	 *             the repository exception
	 */
	@Test
	public void testDoPostWhenUserNotExistsGroupNotExists()
			throws JSONException, ServletException, IOException,
			LoginException, RepositoryException {

		Mockito.when(request.getParameter(Mockito.anyString())).thenReturn(
				"Test");
		userRegisterObj.setResolverFactory(resolverFactory);
		Mockito.when(resolverFactory.getAdministrativeResourceResolver(null))
				.thenReturn(resourceResolver);
		Mockito.when(resourceResolver.adaptTo(Session.class)).thenReturn(
				session);
		Mockito.when(resourceResolver.adaptTo(UserManager.class)).thenReturn(
				userManager);
		Mockito.when(userManager.getAuthorizable(Mockito.anyString()))
				.thenReturn(null);
		Mockito.when(
				userManager.createUser(Mockito.anyString(), Mockito.anyString()))
				.thenReturn(user);
		Mockito.when(session.getValueFactory()).thenReturn(valueFactory);
		Mockito.when(valueFactory.createValue(Mockito.anyString())).thenReturn(
				value);
		userRegisterObj.doPost(request, response);

	}

}

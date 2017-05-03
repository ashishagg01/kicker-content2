package org.kicker.aem.content.userRegistration;


import java.io.IOException;

import javax.jcr.AccessDeniedException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.UnsupportedRepositoryOperationException;

import org.apache.jackrabbit.api.security.user.User;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.jcr.base.util.AccessControlUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.apache.jackrabbit.api.security.user.Authorizable;



@RunWith(MockitoJUnitRunner.class)
public class TestChangePasswordService {
	
	
	@Mock
	ResourceResolver resourceResolver;

	@Mock
	Session session;
	
	@Mock
	UserManager userManager;
	
	@Mock
	SlingHttpServletRequest request;
	
	@Mock
	SlingHttpServletResponse response;
	
	@Mock
	User user;
	
	private ChangePasswordService changePassObj = new ChangePasswordService();
	
	

	

	@Test
	public void testChangePassword() throws AccessDeniedException, UnsupportedRepositoryOperationException, LoginException, IOException,RepositoryException {
		String target="/content/dtranzTwo/en-US/health-conditions.html";
		
			Mockito.when(request.getResourceResolver()).thenReturn(resourceResolver);
			Mockito.when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
			Mockito.when(resourceResolver.adaptTo(UserManager.class)).thenReturn(userManager);
			Mockito.when(request.getParameter(Mockito.anyString())).thenReturn("password");
			Mockito.when(session.getUserID()).thenReturn("ekta");
			Mockito.when(userManager.getAuthorizable(session.getUserID())).thenReturn(user);
			
			changePassObj.changePassword(request, response, target);
			
		
		
	}
	@Test
	public void testChangePasswordWhenUserisNull() throws AccessDeniedException, UnsupportedRepositoryOperationException, LoginException, IOException,RepositoryException {
		String target="/content/dtranzTwo/en-US/health-conditions.html";
		
			Mockito.when(request.getResourceResolver()).thenReturn(resourceResolver);
			Mockito.when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
			Mockito.when(resourceResolver.adaptTo(UserManager.class)).thenReturn(userManager);
			Mockito.when(request.getParameter(Mockito.anyString())).thenReturn("password");
			Mockito.when(session.getUserID()).thenReturn("ekta");
			Mockito.when(userManager.getAuthorizable(session.getUserID())).thenReturn(null);
			
			changePassObj.changePassword(request, response, target);
		
		
	}
}

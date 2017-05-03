package org.kicker.aem.content.userRegistration;

import java.io.IOException;

import javax.jcr.AccessDeniedException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.UnsupportedRepositoryOperationException;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.jackrabbit.api.security.user.User;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * The Class ChangePasswordService.
 */
@Component(label = "User Change Password Service", immediate = true, enabled = true, metatype = true, configurationFactory = true)
@Service(ChangePasswordService.class)
public class ChangePasswordService {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory
			.getLogger(ChangePasswordService.class);
	
	/** The Constant HTML. */
	private static final String HTML = ".html";
	
	/** The resolver. */
	private ResourceResolver resourceResolver;
	
	/** The session. */
	private Session session;
	
	/** The user manager. */
	private UserManager userManager;

	/** The new user. */
	private User user;
	

	/**
	 * Change password.
	 *
	 * @param request
	 *            the request
	 * @param response
	 *            the response
	 * @param targetPath
	 *            the target path
	 * @throws LoginException
	 *             the login exception
	 */
	public void changePassword(SlingHttpServletRequest request,SlingHttpServletResponse response, String targetPath)throws LoginException{
		LOGGER.info("Start of change password method");
		resourceResolver = request.getResourceResolver();
		session = resourceResolver.adaptTo(Session.class);
		userManager = resourceResolver.adaptTo(UserManager.class);
		String statusMessage = "";
		String newPassword = request.getParameter("newPassword");
		try {
			user = (User) userManager.getAuthorizable(session.getUserID());
		

		if (null != user) {
			user.changePassword(newPassword);
			statusMessage = "Password changed successully. Please login with the new password.";
			LOGGER.info("User Password has been changed");
		}
		session.refresh(true);
		session.save();
		session.logout();
		response.sendRedirect(targetPath + HTML + "?msg=" + statusMessage);
		
		} catch (RepositoryException e) {
			throw new LoginException(e);
		} catch (IOException e) {
			throw new LoginException(e);
		}
		

		}
	}

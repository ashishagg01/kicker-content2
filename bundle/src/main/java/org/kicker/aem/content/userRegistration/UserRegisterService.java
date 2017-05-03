package org.kicker.aem.content.userRegistration;

import java.io.IOException;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.jcr.ValueFactory;
import javax.servlet.ServletException;
import org.apache.jackrabbit.api.security.user.Group;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.jackrabbit.api.security.user.User;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.adobe.granite.security.user.UserProperties;

// TODO: Auto-generated Javadoc
/**
 * The Class UserRegisterServ.
 */
@SlingServlet(paths = "/bin/userRegister", methods = "POST")
public class UserRegisterService extends SlingAllMethodsServlet {

	/** The resolver factory. */
	@Reference
	private ResourceResolverFactory resolverFactory;

	/** Initializing logger object. */
	private static final Logger LOGGER = LoggerFactory
			.getLogger(UserRegisterService.class);

	/** The Constant HTML. */
	private static final String HTML = ".html";

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/** The resolver. */
	private ResourceResolver resolver;
	
	/** The session. */
	private Session session;
	
	/** The user manager. */
	private UserManager userManager;

	/** The new user. */
	private User newUser;
	
	/** The group. */
	private Group group;
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.apache.sling.api.servlets.SlingAllMethodsServlet#doPost(org.apache
	 * .sling.api.SlingHttpServletRequest,
	 * org.apache.sling.api.SlingHttpServletResponse)
	 */
	@Override
	protected void doPost(SlingHttpServletRequest request,
			SlingHttpServletResponse response) throws ServletException,
			IOException {
		LOGGER.info("Inside service ekta changed");
		String statusMessage = "";
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String firstName = request.getParameter("firstName");
		String lastName = request.getParameter("lastName");
		String email = request.getParameter("email");
		String dob = request.getParameter("dob");
		String gender = request.getParameter("gender");
		String dtranzGroup = request.getParameter("dtranzGroup");
		String nextPath = (String) request.getAttribute("redirect");
		String currentPath = (String) request.getAttribute("currentPath");
		String redirectPath = "";

		LOGGER.info("Username :" + username + " | Password :" + password
				+ " dtranzGroup :" + dtranzGroup);

		try {

			resolver = resolverFactory
					.getAdministrativeResourceResolver(null);
			session = resolver.adaptTo(Session.class);
			userManager = resolver.adaptTo(UserManager.class);
			
			newUser = (User) userManager.getAuthorizable(username);

			if (newUser != null) {
				LOGGER.info("User" + username
						+ " exists already in CQ!! Can't create user again!");
				redirectPath = currentPath;
				statusMessage = "User " + username
						+ " exists already in CQ!! Can't create user again!";

			} else {
				/* Just create user if it does not exist */

				newUser = userManager.createUser(username, password);
				if (null != userManager.getAuthorizable(dtranzGroup)) {

					group = (Group) userManager
							.getAuthorizable(dtranzGroup);
					group.addMember(newUser);
					LOGGER.info("User has been added in group :" + group);

				}

				// Creating value factory for user propeties
				ValueFactory valueFactory = session.getValueFactory();
				Value emailValue = valueFactory.createValue(email);
				Value givennameValue = valueFactory.createValue(firstName);
				Value lastNameValue = valueFactory.createValue(lastName);
				Value dobValue = valueFactory.createValue(dob);
				Value genderValue = valueFactory.createValue(gender);

				// User class just accepts Value Object
				newUser.setProperty("profile/" + UserProperties.EMAIL,emailValue);
				newUser.setProperty("profile/" + UserProperties.FAMILY_NAME,lastNameValue);
				newUser.setProperty("profile/" + UserProperties.GIVEN_NAME,
						givennameValue);
				newUser.setProperty("profile/" + UserProperties.DISPLAY_NAME,
						givennameValue);
				newUser.setProperty("profile/" + "birthday", dobValue);
				newUser.setProperty("profile/" + "gender", genderValue);

				LOGGER.info("User properties has been set");
				redirectPath = nextPath;
				statusMessage = "User " + username
						+ " created successully in CQ. Please login.";

			}
			session.refresh(true);
			session.save();
			session.logout();
			response.sendRedirect(redirectPath + HTML + "?msg=" + statusMessage);

		} catch (RepositoryException e) {
			throw new ServletException(e);

		} catch (LoginException e) {
			throw new ServletException(e);
		}

	}

	/**
	 * Sets the resolver factory.
	 *
	 * @param resolverFactory2 the new resolver factory
	 */
	public void setResolverFactory(ResourceResolverFactory resolverFactory2) {
		this.resolverFactory = resolverFactory2;

	}

}

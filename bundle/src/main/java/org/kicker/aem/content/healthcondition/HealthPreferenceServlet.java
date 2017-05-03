package org.kicker.aem.content.healthcondition;

import java.io.IOException;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.ServletException;

import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The Class HealthPreferenceService.
 */
@SlingServlet(paths = "/bin/service/healthpref/save", methods = "POST", metatype = true)
public class HealthPreferenceServlet extends SlingAllMethodsServlet {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 8038893651079416233L;

	/** The logger. */
	private static final Logger LOGGER = LoggerFactory.getLogger(HealthPreferenceServlet.class);

	/** The checked value param name. */
	private static String CHECKED_VALUE_PARAM_NAME = "healthChk";

	/** The profile path. */
	private static String PROFILE_PATH = "/profile";

	/** The health conditions pref prop. */
	private static String HEALTH_CONDITIONS_PREF_PROP = "healthCondPrefs";

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.apache.sling.api.servlets.SlingSafeMethodsServlet#doGet(org.apache
	 * .sling.api.SlingHttpServletRequest,
	 * org.apache.sling.api.SlingHttpServletResponse)
	 */
	@Override
	public void doPost(SlingHttpServletRequest request,
			SlingHttpServletResponse response) throws ServletException,
			IOException {
		LOGGER.info("Inside doPost() ");

		// Getting the checked values
		String[] checkedIds = request
				.getParameterValues(CHECKED_VALUE_PARAM_NAME);

		if (checkedIds != null && checkedIds.length > 0) {
			// Setting the User Node

			try {
				LOGGER.info("Inside try block ");
				ResourceResolver resourceResolver = request
						.getResourceResolver();

				if (null == resourceResolver) {
					throw new ServletException("resourceResolver is null");

				}
				UserManager userManager = resourceResolver
						.adaptTo(UserManager.class);
				/* to get the current user */
				Session session = resourceResolver.adaptTo(Session.class);
				LOGGER.info("User ID of logged-in user is "
						+ session.getUserID());
				Authorizable auth = userManager.getAuthorizable(session
						.getUserID());

				Node node = session.getNode(auth.getPath()
						+ PROFILE_PATH);
				LOGGER.info("USER details Node" + node);
				node.setProperty(HEALTH_CONDITIONS_PREF_PROP, checkedIds);
				session.save();
				LOGGER.info("Health preferences successfully set for the user: "
						+ session.getUserID());

			} catch (RepositoryException e) {
				LOGGER.error("Error occurred while persisting selected health preferences"
						+ e);
				throw new ServletException(e);
			} finally {
				response.sendRedirect("/content/dtranzTwo/en-US/health-conditions.html");
			}
		} else {
			LOGGER.info("Health preferences not set for the user as health Condition prefernces not provided. ");
			response.sendRedirect("/content/dtranzTwo/en-US/health-conditions.html");
		}

	}
}

package org.kicker.aem.login;

import java.io.IOException;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.jcr.RepositoryException;
import javax.jcr.SimpleCredentials;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingException;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.auth.core.AuthUtil;
import org.apache.sling.auth.core.spi.AuthenticationFeedbackHandler;
import org.apache.sling.auth.core.spi.AuthenticationHandler;
import org.apache.sling.auth.core.spi.AuthenticationInfo;
import org.apache.sling.jcr.api.SlingRepository;
import org.apache.sling.jcr.resource.JcrResourceConstants;
import org.apache.sling.settings.SlingSettingsService;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.crx.security.token.TokenCookie;
import com.day.crx.security.token.TokenUtil;

/**
* The Class DtranzAuthenticationHandler.
*/
@Component(label = "Dtranz Custom Sling Authentication Handler", description = "Dtranz Custom Sling Authentication Handler that leverages the CRX Token scheme for authentication.", metatype = true, immediate = false)
@Properties({

              @Property(label = "Authentication Paths", description = "JCR Paths which this Authentication Handler will authenticate", name = AuthenticationHandler.PATH_PROPERTY, value = { "/" }, cardinality = Integer.MAX_VALUE),

              @Property(label = "Service Ranking", description = "Service ranking. Higher gives more priority.", name = "service.ranking", intValue = 100, propertyPrivate = false),

              @Property(name = Constants.SERVICE_DESCRIPTION, value = "Dtranz Custom Sling Authentication Handler"),

              @Property(label = "Vendor", name = "service.vendor", value = "ActiveCQ", propertyPrivate = true)

})
@Service
public class DtranzCustomAuthenticationHandler implements
              AuthenticationHandler, AuthenticationFeedbackHandler {

       /** The log. */
       private static final Logger log = LoggerFactory.getLogger(DtranzCustomAuthenticationHandler.class);

       /** The Constant REQUEST_METHOD. */
       private static final String POST_REQUEST_METHOD = "POST";

       /** The Constant USER_NAME. */
       private static final String USER_NAME = "j_username";

       /** The Constant PASSWORD. */
       private static final String PASSWORD = "j_password";

       /** The Constant REQUEST_URL_SUFFIX. */
       private static final String REQUEST_URL_SUFFIX = "/j_security_check";

       /** The Constant USER. */
       private static final String USER = "user.name";

       /** The Constant REDIRECT_RESOURCE. */
       public static final String REDIRECT_RESOURCE = "resource";

       /**
       * The variable <code>REPO_DESC_ID</code> is used for repository.
       * configurations
       */
       private static final String REPO_DESC_ID = "crx.repository.systemid";
       /**
       * The variable <code>REPO_DESC_CLUSTER_ID</code> is used for repository.
       * configurations
       */
       private static final String REPO_DESC_CLUSTER_ID = "crx.cluster.id";

       /** The repository id. */
       private String repositoryId;

       /** OSGi Service References *. */
       @Reference
       private SlingRepository slingRepository;

       /** The resource resolver factory. */
       @Reference
       private ResourceResolverFactory resourceResolverFactory;

       /** The sling settings. */
       @Reference
       private SlingSettingsService slingSettings;

       /**
       * AuthenticationHandler Methods
       */

       /**
       * This method is an overridden method to extractCredentials.
       * 
        * @param request
       *            the request
       * @param response
       *            the response
       * @return the authentication info
       * @see org.apache.sling.auth.core.spi.AuthenticationHandler#extractCredentials(javax.servlet.http.HttpServletRequest,
       *      javax.servlet.http.HttpServletResponse)
       */
       @Override
       public AuthenticationInfo extractCredentials(HttpServletRequest request,
                     HttpServletResponse response) {
              log.info("Begin Extract Credentials");

              AuthenticationInfo info = null;
              Set<String> runModes = slingSettings.getRunModes();

              if (null != runModes && !runModes.contains("author")) {

                     if (POST_REQUEST_METHOD.equals(request.getMethod())
                                  && request.getRequestURI().endsWith(REQUEST_URL_SUFFIX)
                                  && request.getParameter(USER_NAME) != null) {

                           if (!AuthUtil.isValidateRequest(request)) {
                                  AuthUtil.setLoginResourceAttribute(request,
                                                request.getContextPath());

                           }

                           SimpleCredentials creds = new SimpleCredentials(
                                         request.getParameter(USER_NAME), request.getParameter(
                                                       PASSWORD).toCharArray());

                           // Return a populated AuthenticationInfo object which will be
                           // authenticated by the registered LoginModules
                           info = new AuthenticationInfo(HttpServletRequest.FORM_AUTH,
                                         creds.getUserID());

                           // Add the credentials obj to the AuthenticationInfo obj
                           info.put(JcrResourceConstants.AUTHENTICATION_INFO_CREDENTIALS,
                                         creds);
                           info.put(USER, request.getParameter(USER_NAME));

                           log.info("Exiting Extract credentials with valid auth info object");

                           return info;

                     }
              }
              log.info("Exiting Extract credentials with null value in  auth info object");
              return info;

       }

       public void setSlingSettings(SlingSettingsService slingSettings) {
              this.slingSettings = slingSettings;
       }

       /**
       * This method is an overridden method to dropCredentials. It is used during
       * the /system/sling/logout call also.
       * 
        * @param request
       *            the request
       * @param response
       *            the response
       * @throws IOException
       *             Signals that an I/O exception has occurred.
       * @see org.apache.sling.auth.core.spi.AuthenticationHandler#dropCredentials(javax.servlet.http.HttpServletRequest,
       *      javax.servlet.http.HttpServletResponse)
       */
       @Override
       public void dropCredentials(HttpServletRequest request,
                     HttpServletResponse response) throws IOException {
              // Remove credentials from the request/response
              // This generally removed removing/expiring auth Cookies
              log.info("drop Crdentials : Remove CRX login cookie");
              // Remove the CRX Login Token cookie from the request
              TokenCookie.update(request, response, this.repositoryId, null, null,
                           true);
       }

       /**
       * This method is an overridden method to requestCredentials.
       * 
        * @param request
       *            the request
       * @param response
       *            the response
       * @return true, if successful
       * @throws IOException
       *             Signals that an I/O exception has occurred.
       * @see org.apache.sling.auth.core.spi.AuthenticationHandler#requestCredentials(javax.servlet.http.HttpServletRequest,
       *      javax.servlet.http.HttpServletResponse)
       */
       @Override
       public boolean requestCredentials(HttpServletRequest request,
                     HttpServletResponse response) throws IOException {
              log.error("++ Begin Request credentials");
              // Invoked when an anonymous request is made to a resource this
              // authetication handler handles (based on OSGi paths properties)
              // Also invoked after authenticatedFailed if this auth handler is the
              // best match
              // Returning false to delegate to system default mechanism
              return false;
       }

       /**
       * AuthenticationFeedbackHandler Methods
       *
       */

       /**
       * This method is an overridden method to authenticationFailed.
       * 
        * @param request
       *            the request
       * @param response
       *            the response
       * @param info
       *            the info
       * @see org.apache.sling.auth.core.spi.AuthenticationFeedbackHandler#authenticationFailed(javax.servlet.http.HttpServletRequest,
       *      javax.servlet.http.HttpServletResponse,
       *      org.apache.sling.auth.core.spi.AuthenticationInfo)
       */

       @Override
       public void authenticationFailed(HttpServletRequest request,
                     HttpServletResponse response, AuthenticationInfo authInfo) {
              // Executes if authentication by the LoginModule fails

              // Executes after extractCredentials(..) returns a credentials object
              // that CANNOT be authenticated by the LoginModule
              log.error("DtranzAuthenticationHandler >>>> Authentication failed");
       }

       /**
       * This method is an overridden method to authenticationSucceeded.
       * 
        * @param request
       *            the request
       * @param response
       *            the response
       * @param authInfo
       *            the auth info
       * @return true, if successful
       * @see org.apache.sling.auth.core.spi.AuthenticationFeedbackHandler#authenticationSucceeded(javax.servlet.http.HttpServletRequest,
       *      javax.servlet.http.HttpServletResponse,
       *      org.apache.sling.auth.core.spi.AuthenticationInfo)
       */
       @Override
       public boolean authenticationSucceeded(HttpServletRequest request,
                     HttpServletResponse response, AuthenticationInfo authInfo) {
              // Executes if authentication by the LoginModule succeeds
              log.info("DtranzAuthenticationHandler >>>> Authentication succeeded");

              // Executes after extractCredentials(..) returns a credentials object
              // that CAN be authenticated by the LoginModule
              // Return true if the handler sent back a response to the client and
              // request processing should terminate.
              // Return false if the request should proceed as authenticated through
              // the framework. (This is usually the desired behavior)

              boolean isAuthHandled = false;

              if (null != authInfo && POST_REQUEST_METHOD.equals(request.getMethod())
                           && request.getRequestURI().endsWith(REQUEST_URL_SUFFIX)) {
                     isAuthHandled = handleLoginTasks(request, response, authInfo);
              }
              return isAuthHandled;
       }

       /**
       * Handle login tasks.
       *
       * @param request
       *            the request
       * @param response
       *            the response
       * @param authInfo
       *            the auth info
       * @return true, if successful
       */
       private boolean handleLoginTasks(HttpServletRequest request,
                     HttpServletResponse response, AuthenticationInfo authInfo) {
              boolean handledLogin = false;

              try {
                     // Create CRX login token
                     TokenUtil.createCredentials(request, response, slingRepository,
                                  (String) authInfo.get(USER), false);
                     // Get redirect path after successful login
                     String targetPath = AuthUtil.getAttributeOrParameter(request,
                                  REDIRECT_RESOURCE, null);
                     if (StringUtils.isNotBlank(targetPath)) {
                           log.info("Redirecting to resource : " + targetPath);
                           // Redirecting to resource post successful authentication
                           response.sendRedirect(targetPath);
                           handledLogin = true;
                     }

              } catch (RepositoryException e) {
                     throw new SlingException("Unable to get handle login!!", e);
              } catch (IOException e) {
                     throw new SlingException("Unable to redirect to redirect path!!", e);
              }

              return handledLogin;
       }

       /**
       * This method is used to activate the service.
       * 
        * @param config
       *            the config
       */
       @Activate
       protected void activate(Map<String, String> config) {
              this.repositoryId = slingRepository.getDescriptor(REPO_DESC_CLUSTER_ID);
              if (StringUtils.isBlank(this.repositoryId)) {
                     this.repositoryId = slingRepository.getDescriptor(REPO_DESC_ID);
              }
              if (StringUtils.isBlank(this.repositoryId)) {
                     this.repositoryId = slingSettings.getSlingId();
              }
              if (StringUtils.isBlank(this.repositoryId)) {
                     this.repositoryId = UUID.randomUUID().toString();
                     log.error(" Unable to get Repository ID; falling back to a random UUID.");
              }
       }

}

package org.kicker.aem.content.service;

import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.ConfigurationPolicy;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.osgi.service.component.ComponentContext;

/**
 * The Class ErrorPageConfig.
 *
 * @author b.kaushal.karanwal
 */
@Component(label = ErrorConfigConstants.LABEL_CONFIGURATION, immediate = true, enabled = true, metatype = true, description = ErrorConfigConstants.DESC_CONFIGURATION, policy = ConfigurationPolicy.REQUIRE, configurationFactory = true)
@Service(ErrorPageConfig.class)
@Properties({ @Property(name = ErrorConfigConstants.ERROR_CODE), @Property(name = ErrorConfigConstants.ERROR_URL) })
public class ErrorPageConfig {
	
	/** The error code. */
	private String errorCode;
	
	/** The error page url. */
	private String errorPageURL;

	/**
	 * Activate.
	 *
	 * @param componentContext the component context
	 */
	@Activate
	public void activate(ComponentContext componentContext) {
		this.setErrorCode(
				PropertiesUtil.toString(componentContext.getProperties().get(ErrorConfigConstants.ERROR_CODE), null));
		this.setErrorPageURL(
				PropertiesUtil.toString(componentContext.getProperties().get(ErrorConfigConstants.ERROR_URL), null));
	}

	/**
	 * Gets the error code.
	 *
	 * @return the error code
	 */
	public String getErrorCode() {
		return errorCode;
	}

	/**
	 * Sets the error code.
	 *
	 * @param errorCode the new error code
	 */
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	/**
	 * Gets the error page url.
	 *
	 * @return the error page url
	 */
	public String getErrorPageURL() {
		return errorPageURL;
	}

	/**
	 * Sets the error page url.
	 *
	 * @param errorPageURL the new error page url
	 */
	public void setErrorPageURL(String errorPageURL) {
		this.errorPageURL = errorPageURL;
	}

}

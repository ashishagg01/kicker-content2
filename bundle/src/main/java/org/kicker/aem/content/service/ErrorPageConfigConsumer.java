package org.kicker.aem.content.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.ReferenceCardinality;
import org.apache.felix.scr.annotations.ReferencePolicy;
import org.apache.felix.scr.annotations.Service;


/**
 * The Class ErrorPageConfigConsumer.
 */
/**
 * @author b.kaushal.karanwal
 *
 */
@Component(label = ErrorConfigConstants.LABEL_SERVICE, immediate = true, enabled = true, metatype = true, configurationFactory = true)
@Service(ErrorPageConfigConsumer.class)
@Reference(referenceInterface = ErrorPageConfig.class, cardinality = ReferenceCardinality.OPTIONAL_MULTIPLE, policy = ReferencePolicy.DYNAMIC)

public class ErrorPageConfigConsumer {
	
	/** The error configs. */
	private List<ErrorPageConfig> errorConfigs;

	/**
	 * Bind error page config.
	 *
	 * @param config the config
	 */
	public synchronized void bindErrorPageConfig(ErrorPageConfig config) {
		if (errorConfigs == null)
			errorConfigs = new ArrayList<ErrorPageConfig>();
		errorConfigs.add(config);
	}

	/**
	 * Unbind error page config.
	 *
	 * @param config the config
	 */
	public synchronized void unbindErrorPageConfig(ErrorPageConfig config) {
		errorConfigs.remove(config);
	}

	/**
	 * Gets the error page details.
	 *
	 * @param statusCode the status code
	 * @return the error page details
	 */
	public String getErrorPageDetails(String statusCode) {
		for (ErrorPageConfig errorPageConfig : errorConfigs) {
			if (errorPageConfig.getErrorCode()!=null&&(!errorPageConfig.getErrorCode().isEmpty()) && errorPageConfig.getErrorCode().equals(statusCode)) {
				return errorPageConfig.getErrorPageURL();
			}
		}
		return ErrorConfigConstants.DEFAULT_ERROR_PAGE;
		

	}

}

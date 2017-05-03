package org.kicker.aem.workflowProcess;

import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import io.wcm.testing.mock.aem.junit.AemContext;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.wcm.api.Page;

// TODO: Auto-generated Javadoc
/**
 * The Class TestTimestampUpdateProcessStep.
 */
@RunWith(MockitoJUnitRunner.class)
public class TestTimestampUpdateProcessStep {
	
	/** The page. */
	@Mock
	Page page;
	
	/** The item. */
	@Mock
	WorkItem item;
	
	/** The args. */
	@Mock
	MetaDataMap args;
	
	/** The wfsession. */
	@Mock
	WorkflowSession wfsession;
	
	
	/** The workflow data. */
	@Mock
	WorkflowData workflowData;
	
	/** The session. */
	@Mock
	Session session;
	
	/** The process step. */
	TimestampUpdateProcessStep processStep=new TimestampUpdateProcessStep();
	
	/** The context. */
	@Rule
	public final AemContext context = new AemContext();
	
	
	/**
	 * Test execute.
	 *
	 * @throws WorkflowException the workflow exception
	 * @throws PathNotFoundException the path not found exception
	 * @throws RepositoryException the repository exception
	 */
	@Test
	public void testExecute() throws WorkflowException, PathNotFoundException, RepositoryException {
		
		
		Mockito.when(workflowData.getPayloadType()).thenReturn("JCR_PATH");
		Mockito.when(workflowData.getPayload()).thenReturn("/content/dtranzTwo/localePage");
		Mockito.when(item.getWorkflowData() ).thenReturn(workflowData);	
		Mockito.when(processStep.adaptTo(wfsession)).thenReturn(session);
		processStep.execute(item, wfsession, args);
		Node node = mock(Node.class);
		String path = workflowData.getPayload().toString() + "/jcr:content";
		when(processStep.getItem(path, session)).thenReturn(node);
				
		processStep.execute(item, wfsession, args);
		
		//check for notNull values
		assertNotNull(node);
		
		
	}

}

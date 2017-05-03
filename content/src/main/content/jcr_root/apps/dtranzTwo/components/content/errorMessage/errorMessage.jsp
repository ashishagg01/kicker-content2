<%@ page session="false" %><%
%><%@include file="/libs/foundation/global.jsp"%><%
%><%@page session="false" pageEncoding="utf-8"
         import="com.day.cq.wcm.api.WCMMode,
                    java.io.PrintWriter,
                    org.apache.sling.api.SlingConstants,
                    org.apache.sling.settings.SlingSettingsService,
                    org.apache.sling.api.request.RequestProgressTracker,
                    org.apache.sling.api.request.ResponseUtil,
                    org.apache.commons.lang3.StringEscapeUtils" %><%
%><%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %><%
%><sling:defineObjects />
<article class="masthead container">
<!-- Main Content  Parsys -->
<!-- CONTENT WELL -->
<!-- COMPONENT: page-subtitle -->
<h2>
<%= slingRequest
.getResourceBundle(slingRequest.getLocale())
                        .getString("i18n-error"+ properties.get("errorCode", (String) null)) %>
</h2>
<!-- COMPONENT END: page-subtitle -->
<!-- END CONTENT WELL -->
<div class="parsys_column cq-colctrl-2d2t1m"><div class="parsys_column cq-colctrl-2d2t1m-c0">
<div class="text-container">
<p> </p><p><%= slingRequest
.getResourceBundle(slingRequest.getLocale())
                        .getString("i18n-errorMsg"+ properties.get("errorCode", (String) null)) %></p>

<p>Or you can go to our <a href="/content/dtranzTwo/en-US/home.html">Home Page</a> .</p>
<p></p>
</div>
</div></div><div style="clear:both"></div>
<!-- Back to top Component - COM045-->
<!-- COMPONENT: back-to-top -->
<a class="back-to-top js-back-to-top" href="#">
<i class="fa fa-chevron-up"></i>
<span class="top-text">Top</span>
</a>
<!-- COMPONENT END: back-to-top -->
</article>	
<h2>></h2>
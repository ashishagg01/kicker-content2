package org.kicker.aem.content.utilitynav;

/**
 * The Class UtilityNavigation.
 */
public  class UtilityNavigation{
    
    /** The url. */
    private String url;
    
    /** The text. */
    private String text;

    /**
     * Gets the url.
     *
     * @return the url
     */
    public String getUrl() {
                    return url;
    }
    
    /**
     * Sets the url.
     *
     * @param url the new url
     */
    public void setUrl(String url) {
                    this.url = url;
    }
    
    /**
     * Gets the text.
     *
     * @return the text
     */
    public String getText() {
                    return text;
    }
    
    /**
     * Sets the text.
     *
     * @param text the new text
     */
    public void setText(String text) {
                    this.text = text;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
                    return "LinkClass [url=" + url + ", text=" + text + "]";
    }
   

}
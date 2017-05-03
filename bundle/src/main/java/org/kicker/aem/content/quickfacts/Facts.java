package org.kicker.aem.content.quickfacts;

/**
 * @author b.kaushal.karanwal and devendra.dugar
 *
 */
public class Facts {
	/**
	 * fact input by author have to be shown in Quick Fact Tile 
	 */
    private String fact;
    /**
	 * fact description input by author have to be shown in Quick Fact Tile 
	 */
    private String factDesc;
	/**
	 * @return the String fact
	 */
	public String getFact() {
		return fact;
	}
	
	
	/**
	 * @param fact String the fact to set
	 */
	public void setFact(String fact) {
		this.fact = fact;
	}
	
	/**
	 * @return the String factDesc
	 */
	public String getFactDesc() {
		return factDesc;
	}
	/**
	 * @param factDesc String the factDesc to set
	 */
	public void setFactDesc(String factDesc) {
		this.factDesc = factDesc;
	}



}

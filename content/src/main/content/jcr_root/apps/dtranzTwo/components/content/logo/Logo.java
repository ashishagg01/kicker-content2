package apps.dtranzTwo.components.content.logo;
import com.adobe.cq.sightly.WCMUse;

public class Logo extends WCMUse{

	private String img;

     @Override
    public void activate() throws Exception {

		img=getCurrentStyle().get("fileReference",String.class);
        System.out.println(img);
    }

    public String getImg() {
		return img;
	}



}
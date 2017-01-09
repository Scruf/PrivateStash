import java.io.FileInputStream;
import java.security.DigestInputStream;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.security.NoSuchAlgorithmException;
import java.security.MessageDigest;
import org.apache.commons.codec.binary.Base64;

public class MD5{
	public static String computeContentMD5Value( FileInputStream fis ) 
    throws IOException, NoSuchAlgorithmException {

	    DigestInputStream dis = new DigestInputStream( fis,
	        MessageDigest.getInstance( "MD5" ));

	    byte[] buffer = new byte[8192];
	    while( dis.read( buffer ) > 0 );

	    String md5Content = new String(
	        org.apache.commons.codec.binary.Base64.encodeBase64(
	            dis.getMessageDigest().digest()) ); 

	    // Effectively resets the stream to be beginning of the file
	    // via a FileChannel.
	    fis.getChannel().position( 0 );

	    return md5Content;
	}
	public static void main (String []args) throws IOException,NoSuchAlgorithmException{
		try{
			System.out.print(computeContentMD5Value(new FileInputStream("feed.xml")));

		}catch (FileNotFoundException file){
			System.err.print("Spomething went wrong");
		}
	}
}
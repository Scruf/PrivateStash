public class Reverse{
	//Recursive Java Call
	public String reverse(String str){
		if(null==str) || (str.length()<=1){
			return str;
		}
		else{
			return reverse(str.substring(1))+str.charAt(0);
		}
	}

	public static void main(String []args){

	}
}
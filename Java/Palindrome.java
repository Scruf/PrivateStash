public class Palindrome{
	public static int isRealMid(int length){
		return length%2==0 ? Math.floor(length/2) : Math.floor(length/2+1);
	}

	public static boolean isPalindrome(String str){
		if(str.length()==0)
			return false;
		else{
			if(str.length()==1)
				return true;
			else{

				int leftEnd =  0;
				int rightEnd =  str.length()-1;
				int realMid = isRealMid(str.length());
					while(leftEnd<realMid && rightEnd>=realMid){
						if(str.charAt(leftEnd)==str.charAt(rightEnd))
						{
							leftEnd++;
							rightEnd--;
						}else{
							return false;
						}
					}
					return true;
			}
		}
	}

	public static void main(String []args){
		String pal = "dsed";
		String a="";
		if(isPalindrome(pal))
			System.out.print("Palindrome");
		else
			System.out.print("Nope");
	}
}
#include <iostream>
using namespace std;
int main(){
	int fahren;
	cout<<"Enter temperature in fahrenheit: ";
	cin>>fahren;
	int ctemp = (fahren-32)*5/9;
	cout<<"Equivalent in Celsius is: "<<ctemp<<endl;
	return 0;
}
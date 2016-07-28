#include <iostream>
using namespace std;
int main(){
	float road;
	const float PI = 3.14;
	cout<<"Enter radius of circle: "<<endl;
	cin>>road;
	float area = PI * road * road;
	cout<< "Area is "<<area<<endl;
	return 0;

}
#include<iostream>
using namespace std;
int main(){
int a =10;
int &ref = a;
a = 12;
cout<<ref;
return 0;
}

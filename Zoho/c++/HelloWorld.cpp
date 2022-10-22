#include<iostream>
using namespace std;

int add(int a)
{
    return a+10;
}

int main(){
cout<<"\nEnter a number:";
int n=0;
cin>>n;
int a = add(n);
cout<<a;
return 0;
}

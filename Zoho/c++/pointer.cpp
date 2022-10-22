#include<iostream>
using namespace std;
int main(){
int a =10;
cout<<"\n"<<&a;
int *b = &a;
cout<<"\nPointer :\t"<<b;
void *c = &a;
cout<<"\nAddress of a :\t"<<c;
float g =12.5f;
float *d = &g;
cout<<"\nAddress of float g :\t"<<d;
//Dereference operator
*d = 10.5;
cout<<"\n   After dereferencing :"<<g;
int *ptr = nullptr;
*ptr=10;
cout<< *ptr;
return 0;}

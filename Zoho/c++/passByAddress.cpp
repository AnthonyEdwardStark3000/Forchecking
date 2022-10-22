#include<iostream>
using namespace std;
/*void swap(int *x, int*y){
int temp = *x;
*x = *y;
*y = temp;
}*/

void swap(int &x, int&y){
int temp = x;
x = y;
y = temp;
}

int main(){
int a =15,b=10;
cout<<"\nBefore swapping:\tA:"<<a<<"\tB :"<<b;
swap(a,b);
cout<<"\nAfter swapping:\tA:"<<a<<"\tB :"<<b;
return 0;
}

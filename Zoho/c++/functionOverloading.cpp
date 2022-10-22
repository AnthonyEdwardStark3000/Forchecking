#include<iostream>
using namespace std;
inline void print(int *x)
{
    cout<<*x<<endl;
}
void print(const int* x)
{
    cout<<*x<<endl;
}
void call()
{
    cout<<"Program execution stops";
}
int main(){
int x =10;
const int y =20;
print(&x);
print(&y);
atexit(call);
cout<<"End of the main method"<<endl;
return 0;
}

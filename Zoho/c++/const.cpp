#include<iostream>
using namespace std;
print(int *x){
*x =800;
};
//printer(const int *x){
//*x = 900;
//};

printerRef(const int &x){
    cout<<"\nCheck :"<<x<<endl;
//x = 900;
};

int main(){
int a =10;
cout<<"\nInitial value:"<<a;
print(&a);
cout<<"\nValue after changing it using pointer:"<<a;
cout<<"\nUsing const to avoid this:";
//printer(&a);
cout<<"\nUsing const in Ref to avoid this:";
printerRef(1);
return 0;
}

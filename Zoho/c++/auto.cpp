#include<iostream>
using namespace std;
int main(){
auto a =10;
auto b =12.56;
auto c = a+ b;
cout<<c<<endl;
int check[] = {1,2,3,4,5,6,7};
for(int i=0;i<7;i++){
    cout<<check[i]<<endl;
}
for(int x:check){
    cout<<x<<"\t";
}

//int *begin = &check[0];
int *beginning = begin(check);
//int *end = &check[6];
int *ending = end(check);
while(*beginning != *ending)
{
    cout<<*beginning<<" ";
    *beginning++;
}
return 0;
}

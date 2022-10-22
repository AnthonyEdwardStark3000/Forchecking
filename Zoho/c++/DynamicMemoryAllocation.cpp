#include<iostream>
#include<stdlib.h>
using namespace std;
void Malloc(){
int *p = (int *)malloc( 5* sizeof(int));
if(p==NULL){
    cout<<"\nMemory Allocation Failed.";
    return;
}
*p=5;
printf("%d\n",*p);
free(p);
}

void New(){
int *p = new int(10);
*p = 10;
cout<<"\n"<<*p<<endl;
delete p;
p = nullptr;
}

void NewArrays(){
 int *p = new int[5];
 for(int i=0;i<5;i++)
 {
     cout<<"\nEnter"<<i<<" value:"<<endl;
     cin>>p[i];
 }
 for(int i=0;i<5;i++)
 {
     cout<<p[i]<<" ";
 }
 delete []p;
}

void StringAllocation(){
char * s = new char[1000];
cout<<"\nEnter a string :";
cin>>s;
cout<<"\n"<<s<<endl;
delete []s;
}


int main(){
//Malloc();
//New();
//NewArrays();
//StringAllocation();
return 0;
}

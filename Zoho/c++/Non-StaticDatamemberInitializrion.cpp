#include<iostream>
using namespace std;
class student{
private:
    string name="Stark";
    int number=3000;

public:
    student(){
    cout<<"\nInside the constructor\n"<<"Name is :"<<name<<"\nNumber :"
<<number<<endl;
  }
   student(string n)
   {
       name =n;
       cout<<"\nInside parameterized constructor\n"<<"Name is:"<<name<<"\nNumber:"
       <<number<<endl;
   }
   void study(){
   string studentEntered = this->name;
   cout<<"\nUse of This pointer \n"<<studentEntered<<" is studying"<<endl;
   }
   void study(string name){
       this->name = name;
        cout<<"\nUse of This pointer \n"<<name<<" is studying"<<endl;
   }
};

int main(){
    student s;
    s.study();
    s.study("Suresh");
return 0;
}

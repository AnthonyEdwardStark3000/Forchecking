#include<iostream>
using namespace std;
class student{
int age;
string name;

public:
student(int age, string name){
this->age = age;
this->name = name;
cout<<"Initialization is completed."<<endl;
}

student(student &old){
age = old.age;
name = old.name;
cout<<"Creation of copy constructor.\n"<<endl;
}

void printDetails(){
cout<<"\nThe student name is "<<name<<" and he is "<<age<<" years old\n";
}

};

int main(){
student s(22, "Mr.Stark");
s.printDetails();
return 0;
}


#include<iostream>
using namespace std;
class Student{
public:
    static void printData(int a, string name){
        cout<<check<<endl;
    cout<<"\nHi "<<name<<" how are you ?"<<endl;
    }
};
int main()
{
    int age =10;
    string name="Suresh";
    Student::printData(age,name);
    return 0;
}

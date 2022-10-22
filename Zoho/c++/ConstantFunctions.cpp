#include<iostream>
using namespace std;
class student{
private:
     string name;
     int age;
public:
    student(){
    name="Mr.Stark";
    age=22;
    }
    void Message()const{
    cout<<name<<" Always do something great."<<endl;
    }

    void age(){
    cout<<age<<" Years old."<<endl;
    }
};

int main()
{
    const student s;
    s.Message();
    //s.age();
    return 0;
}

#include<iostream>
using namespace std;
class student{
private:
    string name;
    int age;
public:
    student(){
    cout<<"Inside the constructor"<<endl;
    name = "Suresh";
    age = 10;
    cout<<"Name :"<<name<<endl;
    cout<<"Age :"<<age<<endl;
    cout<<"End of the constructor"<<endl;
    }
    student(string n, int a){
    cout<<"Inside the parameterised constructor"<<endl;
    name = n;
    cout<<"Name :"<<n<<endl;
    age =a;
    cout<<"Age :"<<age<<endl;
    }
    void setName(string n){
        name = n;
    };
    void setAge(int a)
    {
        age = a;
    }
    string getName(){
        return name;
    };
    int getAge()
    {
        return age;
    }
    ~student(){
    cout<<"\nClearing the allocated memory"<<endl;
    }
};
int main(){
student s("Check",121);
s.setName("MR.STARK");
s.setAge(21);
cout<<s.getName()<<endl<<s.getAge();
return 0;
}


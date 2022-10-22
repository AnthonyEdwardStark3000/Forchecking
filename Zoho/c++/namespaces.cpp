#include<iostream>
using namespace std;
namespace welcome{
void printmsg(){
cout<<"Hi"<<endl;
}
}

namespace goodbye{
void printmsg(){
cout<<"Bye"<<endl;
}
}

int main()
{
    using namespace welcome;
    printmsg();
   //using namespace goodbye;
    goodbye::printmsg();
    return 0;
}

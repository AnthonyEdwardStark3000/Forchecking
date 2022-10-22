#include<iostream>
using namespace std;
class example{
    int a{0};
public:
example() = default;
example(int a)
{
    a =a;
}

};
int main(){
example e;
example(10);
return 0;
}

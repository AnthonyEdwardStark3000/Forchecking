#include<iostream>
using namespace std;
int main{
int * p1 = new int(5);
//shallow copy
int *p2 = p1;
//Deep copy
int *p3 = new int(*p1);

return 0;
}

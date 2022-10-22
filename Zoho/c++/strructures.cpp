#include<iostream>
using namespace std;
struct point{
int x, y;
};
void check(point c, point d)
{
    cout<<c.x<<endl<<d.y;
}
int main(){
point p;
p.x = 100;
p.y = 1000;
//cout<<p.x<<"\n"<<p.y<<endl;
check(p,p);
return 0;
}


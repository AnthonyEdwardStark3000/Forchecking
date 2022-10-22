#include<stdio.h>
#include<stdlib.h>
void main(){
int *p = malloc(sizeof(int));
*p=5;
printf("%d",*p);
free(*p);
}

#include<stdio.h>
#include<stdlib.h> 

#define M 20

//顺序存储 
//typedef struct
//{
//	int tree[M+1];
//	int last;
// }Bittree;
 int Two=0;
typedef struct Nodetree
{
	int data;
	struct Nodetree *Lchild;
	struct Nodetree *Rchild;
	int Ltag;//线索二叉树的定义 
	int Rtag;
 } *Bitree;
 
typedef struct link 
  {
  	Bitree data[M];
  	int rear,front;
  }*seQueue;
  
  
  
  //函数声明
 void creat(Bitree *root);
 void output(Bitree root);
 void preorder(Bitree root);
 void change(Bitree root);
 int path(Bitree root,char ph[],int len);
 int treedepth(Bitree root);
 void print(Bitree root,int loop);	
 void init(seQueue s);
 int IsEmpty(seQueue s);
 void push(seQueue s,Bitree root);
 Bitree pop(seQueue s); 
  
  
  void init(seQueue  *s)
  {
  	*s=(seQueue)malloc(sizeof(seQueue));
  	if(*s==NULL)
  		return;
  	(*s)->rear=-1;
  	(*s)->front=-1;
  }
  
  int IsEmpty(seQueue s)
  {
  	if(s->front==s->rear)
  		return 0;
  	else return 1;
  	
  }
  
  void push(seQueue s,Bitree root)
  {
  	if(s->rear==M-1)
  		return;//队满
	else{
		s->rear++;
		s->data[s->rear]=root;
	} 
  }
Bitree pop(seQueue s)
  {
  	Bitree temp;
  	if(IsEmpty(s)==0)
  		return NULL;
  	else {
  		temp=s->data[s->rear];
  		s->rear--;
  		return temp;
	  }
  }  
  

  
 	//创建 
 	void creat(Bitree *root)
 {
 	char ch;
 	ch=getchar();
	if(ch=='#')
		*root=NULL;
	else {
	 		*root=(Bitree)malloc(sizeof(struct Nodetree));
	 		(*root)->data=ch;
	 		creat(&((*root)->Lchild));
	 		creat(&((*root)->Rchild));
		 }
 }
 
 //线索二叉树的建立
// Bitree pre=NULL;
// void Tcreate (Bitree *root)
// {
//	if(root)
//	{
//		if((*root)->Lchild != NULL)
//				(*root)->Ltag=0;	
//		else {
//			(*root)->Ltag = 1;
//			(*root)->Lchild=*pre;//d->qian=b; g->qian=d;
//		}
//		*pre=*root;	//a,b,d,g
//		if((*root)->Rchild != NULL)    //b,
//			(*root)->Rtag=0;
//		else {
//				(*root)->Rtag=1;
//				(*root)->Rchild=(*root)->Lchild;    //b->hou=D ; g->hou=d.;
//			}
////		root=pre;
//		Tcreate(&(*root)->Lchild);
//		
//		Tcreate(&(*root)->Rchild);
//}
//	
//	 
 // } 
 //输出 
 void output(Bitree root)
 {
 	if(root)
 	{
 			printf("%c",root->data);
 	output(root->Lchild);
 	output(root->Rchild);
	 }
 
 }
 //遍历得到度为2的 
 void preorder(Bitree root)
 {
 	if(root)
 	{
 		if(root->Lchild!=NULL && root->Rchild!=NULL)
 			Two++;
 		printf("%c",root->data); 
 		preorder(root->Lchild);
 		preorder(root->Rchild);
	 }
	
 }
 
 //使用队列进行按层遍历
  void Cpeorder(Bitree root)
  { seQueue s;
  	Bitree temp=root;
  	init(&s);
  	
  		if(temp)
  		{
  			push(s,temp);
  			printf("%c",temp->data);
	   }
  		while(temp )
  		{	
	  		if(temp->Lchild!=NULL ) 
	  		{
	  			temp=pop(s);
	  			push(s,temp->Lchild);
			  }
			  else if(temp->Rchild!=NULL)
			  {
			 	push(s,temp->Rchild);
			  	temp=pop(s);
			  }
	 
		  }
  }
 //左右交换 
 	void change(Bitree root)
 	{
 		Bitree temp; 
 		if(root)
 		{
 			temp=root->Lchild;
 			root->Lchild=root->Rchild;
 			root->Rchild=temp;
 			change(root->Lchild);
 			change(root->Rchild);
 			
		 }
	 }
 
//按路径输出 
int path(Bitree root,char ph[],int len)
 {
 	int i;
	if(root)
	{
		if(root->Lchild==NULL && root->Rchild==NULL)
		{	ph[len]=root->data;
			printf("%c: ",ph[len]); 
			for(i=0;i<len;i++)
				printf("%c",ph[i]);
			printf("\n");
			return 0;
		}
		ph[len]=root->data;
		path(root->Lchild,ph,len+1);
		path(root->Rchild,ph,len+1);
	 } 	
 }
 //shu的深度 
 int treedepth(Bitree root)
 {
 	int l,r,h;
 	if(root)
 		return 0;
	l=treedepth(root->Lchild);
	r=treedepth(root->Rchild);
	h=l>r? l:r;
	return h+1;	
 }
 
 //以二元组输出（A,1)
 void print(Bitree root,int loop)
 {
 	if(root)
 	{
 		printf("(%c,%d) ",root->data,loop);
 		print(root->Lchild,loop+1);
 		print(root->Rchild,loop+1);
 		
	 }
  } 
  //叶子节点的数目 
  int leafnum(Bitree root)
  {
  	int l,r;
  	if(root==NULL) 
  		return 0;
  	if(root->Lchild==NULL && root->Rchild==NULL)
  		return 1;
  	l=leafnum(root->Lchild);
  	r=leafnum(root->Rchild);
  	return l+r;
  }
  
  //树型输出
  
  void tree(Bitree root,int h)
  {
  	if(root==NULL)
  		return;
  	tree(root->Rchild,h+1);
  	for(int i=0;i<h;i++)
  		printf("    ");
	printf("%c\n",root->data);	
	tree(root->Lchild,h+1);
	 
   } 
 int main()
 	{
 		Bitree root;
 		seQueue s;
 		creat(&root);	
 		init(&s);
 		push(s,root);
		Cpeorder(root);	printf("kkk\n");
 		preorder(root);
 		printf("\n");
 		printf("%d\n\n",Two);
 		output(root);
 		printf("\n");
 		tree(root,1);
 		change(root);
 		preorder(root);
 		printf("\n");
		int depth=treedepth(root);
		char ph[depth];
		path(root,ph,depth);
		print(root,1);
		int leaf=leafnum(root);
		printf("%d",leaf);
 		
	 }
 	

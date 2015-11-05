/* ilist - a module for manipulating linked-lists of integers
 *    - written by John C. Lusth, 2014
 *
 *    - nodes have values hard-wired as integers
 *    - join takes an integer as its first argument
 *    - head returns an integer
 *    - tail returns the list beyond the first node
 *    - setHead replaces the head value
 *    - setTail replaces the tail
 *    - displayList displays a list like this: {1}{2}{3}{4}
 *    - arrayToList converts an array of integers into a list of integers
 *    - readList reads in a list that look like this: (1,2,3,4)
 *    - freeList frees all the nodes in the given list
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "ilist.h"

#define MAX_SIZE 1024 //size of buffer for readList

/********************* node functions ******************************/

/* newNode
 *     - create a node that holds an integer value
 */

Node *
newNode(int value,Node *next)
    {
    Node *n = malloc(sizeof(Node));
    if (n == 0)
        {
        fprintf(stderr,"newNode: out of memory!\n");
        exit(1);
        }
    n->value = value;
    n->next = next;
    return n;
    }

Node *
newEmptyNode(void)
    {
    Node *n = malloc(sizeof(Node));
    if (n == 0)
        {
        fprintf(stderr,"newEmptyNode: out of memory!\n");
        exit(1);
        }
    n->value = 0;                       //set to the null pointer
    n->next = 0;                        //set to the null pointer
    return n;
    }

/********************* list functions ******************************/

/* newEmptyList
 *    - uses the null pointer to signify an empty list
 */

Node *
newEmptyList(void)
    {
    return 0;
    }

/* head
 *     - return the first integer value in the list
 */

int
head(Node *items)
    {
    return items->value;
    }

/* tail
 *    - return the list minus the first node 
 */

Node *
tail(Node *items)
    {
    return items->next;
    }

/* setHead
 *     - replace the first integer value in the list
 */

void
setHead(Node *items,int v)
    {
    items->value = v;
    }

/* setTail
 *    - replace the tail of a list 
 */

void
setTail(Node *items,Node *newtail)
    {
    items->next = newtail;
    }

/* join
 *     - join an integer value to a list
 */

Node *
join(int i,Node *rest)
    {
    return newNode(i,rest);
    }

/*
 * displayList
 *    - displays a list containing the value 1, 5, and 4 like this: {1}{5}{4}
 *
 */

void
displayList(Node *items)
    {
    while (items != 0)
        {
        printf("{%d}",head(items));
        items = tail(items);
        }
    }

/* arrayToList
 *     - convert an array of integers into a list of integer-valued nodes
 */

Node *
arrayToList(int *items,int size)
    {
    if (size == 0)
        return 0;
    else
        return join(items[0],arrayToList(items+1,size-1));
    }

/*
 * readList 
 *      - reads in a list of integers into a list
 *      - the input should look like: (1,2,3,4,5)
 */

Node *
readList(void)
    {
    Node *start,*hook,*result;
    char *token;
    char buffer[MAX_SIZE];

    if (fgets(buffer,sizeof(buffer),stdin) == 0)
        {
        fprintf(stderr,"readList: read failed!\n");
        exit(1);
        }

    start = join(0,0); //dummy head node
    hook = start;
    token = strtok(buffer,"(,) \n\t");
    while (token != 0) /* the read was good */
        {
        hook->next = join(atoi(token),0);
        hook = tail(hook);
        token = strtok(0,"(,) \n\t");
        }

    result = tail(start);
    free(start); //frees the first node!

    return result;
    }

void
freeList(Node *items)
    {
    while (items != 0)
        {
        Node *spot = items;
        items = tail(items);
        free(spot);
        }
    }


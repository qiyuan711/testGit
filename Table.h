#ifndef TABLE_H
#define TABLE_H

#include "People.h"

class Table {
  public:
    Table(string, int);
    ~Table();
    bool addSeater(People*);
    int calculateAnimosity();
    int getAnimosity(People*, People*);
    void display();

  private:
    string name;
    int size;
    int capacity;
    People** seated;
    int distance(int, int);
};

#endif

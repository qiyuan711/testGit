#ifndef FAMILY_H
#define FAMILY_H

#include "People.h"

class Family {
  public:
    Family(string, string, int);
    ~Family();
    People* getHusband();
    People* getWife();
    int getHusbandWifeAnimosity();
    int getWifeHusbandAnimosity();
    void setAnimosities(int, int);
    void display();

  private:
    string familyName;
    string familyShortName;
    int size;
    People** members;
    void _init();
    int husband2WifeAnimosity, wife2HusbandAnimosity;
};

#endif

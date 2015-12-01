#ifndef PEOPLE_H
#define PEOPLE_H

#include <string>
using std::string;

class Family;

class People {
  public:
    People(string, string, Family*);
    int getAnimosityFactor();
    void setAnimosityFactor(int);
    void setTitle(string);
    Family* getFamily();
    void display();

  private:
    string title;
    string name;
    int animosityFactor;
    Family* family;
};

#endif

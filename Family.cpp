#include <iostream>
#include <sstream>
#include "Family.h"

Family::Family(string name, string sname, int n_members) {
  familyName = name;
  familyShortName = sname;
  size = n_members;
  _init();
}

Family::~Family() {
  for(int i = 0; i < size; i++)
    delete members[i];

  delete[] members;
}

People* Family::getHusband() {
  return members[0];
}

People* Family::getWife() {
  return members[1];
}

int Family::getHusbandWifeAnimosity() {
  return husband2WifeAnimosity;
}

int Family::getWifeHusbandAnimosity() {
  return wife2HusbandAnimosity;
}

void Family::setAnimosities(int hwAnimosity, int whAnimosity) {
  husband2WifeAnimosity = hwAnimosity;
  wife2HusbandAnimosity = whAnimosity;
}

void Family::display() {
  for(int i = 0; i < size; i++) {
    members[i]->display();
    if(i == (size - 1))
      std::cout << ".";
    else
      std::cout << ", "; 
  }
  std::cout << std::endl;
}

void Family::_init() {
  members = new People*[size];
  members[0] = new People("Mr", familyName, this);
  members[1] = new People("Mrs", familyName, this);
  for(int i = 2; i < size; i++) {
    std::stringstream ss;
    ss << familyShortName << i - 1;
    members[i] = new People("", ss.str(), this);
  }
}

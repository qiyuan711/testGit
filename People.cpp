#include "People.h"
#include <iostream>

People::People(string title, string name, Family* family) {
  this->title = title;
  this->name = name;
  animosityFactor = 0;
  this->family = family;
}

int People::getAnimosityFactor() {
  return animosityFactor;
}

void People::setAnimosityFactor(int factor) {
  animosityFactor = factor;
}

void People::setTitle(string t) {
  title = t;
}

Family* People::getFamily() {
  return family;
}

void People::display() {
  if(title.length())
    std::cout << title << " " << name;
  else
    std::cout << name;
}

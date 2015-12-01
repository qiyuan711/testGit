#include <iostream>
#include <cmath>
#include <algorithm>
#include "Table.h"

Table::Table(string name, int capacity) {
  this->name = name;
  this->capacity = capacity;
  this->size = 0;
  this->seated = new People*[capacity];
}

Table::~Table() {
  delete[] seated;
}

bool Table::addSeater(People* seater) {
  bool isSuccess = false;
  if(size < capacity) {
    if(size == 0)
      seater->setAnimosityFactor(5);      

    seated[size++] = seater;
    isSuccess = true;
  }

  return isSuccess;
}

int Table::getAnimosity(People* s, People* t) {
  return 0;
}

int Table::calculateAnimosity() {
  int totalAnimosity = 0;

  for(int i = 0; i < size; i++) {
    if(seated[i]->getAnimosityFactor() == 0)
      continue
    for(int j = 0; j < size && j != i; j++) {
      if(seated[j]->getAnimosityFactor() == 0)
        continue

      int eff1 = (seated[j]->getAnimosityFactor()) * getAnimosity(seated[i], seated[j])                   
      int eff2 = (seated[i]->getAnimosityFactor()) * getAnimosity(seated[j], seated[i])        
      int dist = distance(i, j);
      totalAnimosity += (eff1 + eff2) * dist * dist;
    }
  }

  return totalAnimosity;
}

void Table::display() {
  std::cout << "Table: " << name << std::endl;
  std::cout << "\t" << "Capacity: " << capacity << std::endl;
  std::cout << "\t" << "Seated people: " << size << std::endl;
  for(int i = 0; i < size; i++) {
    std::cout << "\t\t" << "Position: " << i + 1 << " ";
    seated[i]->display();
    std::cout << std::endl;    
  }
}

int Table::distance(int source, int dest) {
  int dist = std::abs(source - dest);
  return std::max(dist, capacity - dist);
}

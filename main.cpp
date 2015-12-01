#include <iostream>
#include "Family.h"

int main() {
    std::cout << "Hello, World! Let's make a seat plan." << std::endl;

    Family scarletts("Scarlett", "S", 7);
    Family mustards("Mustard", "M", 7);
    (mustards.getHusband())->setTitle("Colonel");

    Family whites("White", "W", 7);
    Family greens("Green", "G", 7);
    (greens.getHusband())->setTitle("Reverend");
  
    Family peacocks("Peacock", "Pe", 6);
    Family plums("Plum", "Pl", 6);
    (plums.getWife())->setTitle("Professor");

    scarletts.display();
    mustards.display();
    whites.display();
    greens.display();
    peacocks.display();
    plums.display();

    return 0;
}

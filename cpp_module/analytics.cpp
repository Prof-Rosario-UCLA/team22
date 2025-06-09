#include <emscripten/bind.h>
#include <vector>
#include <string>
#include <numeric>
using namespace std;


struct Hobby {
    string name;
    string category;
    string difficulty;
    int progress;
}

// Struct for the calculated analytics result 
struct HobbyAnalytics {
    int totalHobbies;
    double averageProgress;
    int completedHobbies;
};


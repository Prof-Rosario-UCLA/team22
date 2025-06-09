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

HobbyAnalytics calculateHobbyAnalytics(const vector<Hobby>& hobbies) {
    HobbyAnalytics analytic_results;
    analytic_results.totalHobbies = hobbies.size();

    if (hobbies.empty()){
        analytic_results.averageProgress = 0.0;
        analytic_results.completedHobbies = 0;
        return analytic_results;
    }

    double totalProgress = 0;
    int completedCount = 0;
    for (const auto& hobby : hobbies) {
        totalProgress += hobby.progress;
        if (hobby.progress >= 100) {
            completedCount++;
        }
    }
    analytic_results.averageProgress = totalProgress / hobbies.size();
    analytic_results.completedHobbies = completedCount;

    return analytic_results;
}
#include <emscripten/bind.h>
#include <vector>
#include <string>
#include <numeric>
using namespace std;


struct CPP_Hobby {
    string name;
    string category;
    string difficulty;
    int progress;
};

// Struct for the calculated analytics result 
struct HobbyAnalytics {
    int totalHobbies;
    double averageProgress;
    int completedHobbies;
};

HobbyAnalytics calculateHobbyAnalytics(vector<CPP_Hobby> hobbies) {
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

EMSCRIPTEN_BINDINGS(cpp_module){

    emscripten::value_object<CPP_Hobby>("Hobby")
        .field("name", &CPP_Hobby::name)
        .field("category", &CPP_Hobby::category)
        .field("difficulty", &CPP_Hobby::difficulty)
        .field("progress", &CPP_Hobby::progress);

    emscripten::value_object<HobbyAnalytics>("HobbyAnalytics")
        .field("totalHobbies", &HobbyAnalytics::totalHobbies)
        .field("averageProgress", &HobbyAnalytics::averageProgress)
        .field("completedHobbies", &HobbyAnalytics::completedHobbies);

    emscripten::register_vector<CPP_Hobby>("HobbyVector");

    emscripten::function("calculateHobbyAnalytics", &calculateHobbyAnalytics);

}
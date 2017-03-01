# Quiz App

### Introduction
This simply rolls a random question from a Json file
and a random student from a pre-defined array.
With that combination, it generates a student-question
pair. Enter the answer in the text box and check if it's 
correct.

### Instructions
1. Click the Start Test Button
2. A few lines should have popped up
3. Ask the student shown to give the correct answer
4. Input the student's answer
5. Press the Commit button
6. Check if the answer was correct or not<br>
    (The number of questions each student was asked and
how well they did are stored on local storage)

### Code
```
mc.editStudents = function($index){
            
            //mc.students = mc.latestStudentData();
            var newStudent = {name: mc.randomStudent.name,
                              correct: mc.randomStudent.correct,
                              numQuestions: mc.randomStudent.numberOfQuestions
            };
            for(var i = 0; i < mc.students.length; i++){
                if(mc.randomStudent.name == mc.students[i].name){
                    mc.students.splice($index, 1, newStudent);
                    mc.students[0].name="Anyone Answer!"   
                }
            }
            return QuizStorageService.setData('student-storage', 
                                    angular.toJson(mc.students));
        };
```
Even though this is similar to the pizza app that we used, I had the most
issues with getting this section to work.
The rest of the app was fairly intuitive though.
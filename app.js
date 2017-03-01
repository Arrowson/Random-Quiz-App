var quizModule = angular.module("quizApp", []);

quizModule.controller("MainController", ['$scope', 'QuizStorageService', '$timeout',
                                         '$http',
                        function($scope, QuizStorageService, $timeout, $http){
        var mc = this;
        
        mc.students = [
            {name: "Anyone Answer!",
             correct: 0,
             numberOfQuestions: 0
            },
            {
             name: "Daniel Maratta",
             correct: 0,
             numberOfQuestions: 0
            },
            {
             name: "Phillip Lowe",
             correct: 0,
             numberOfQuestions: 0
            },
            {
             name: "Ronald Regalado",
             correct: 0,
             numberOfQuestions: 0
            },
            {
             name: "Jason Madison",
             correct: 0,
             numberOfQuestions: 0
            },
            {
             name: "Aric Scooter",
             correct: 0,
             numberOfQuestions: 0
            },
            {name: "Aaron Williamson",
             correct: 0,
             numberOfQuestions: 0
            }
            
            ];
        mc.studentName = "";
        mc.question = "";
        mc.answer = "";
        mc.showstudents = false;
        mc.showquestions = false;
        mc.usedStudents = [];
        mc.chosenAnswer = "";
        mc.message = "Display will be here:";
        mc.showMessage = false;
        
        
        $http.get("questions.txt")
            .then(function(response){
                mc.message = response.data;
                mc.questionArray = mc.message.questions;
                
            });
        
        mc.checkAnswer = function(){
            if(mc.chosenAnswer == mc.randomQuestion.answerText){
                mc.randomStudent.correct++;
                mc.message = "You got it right!";
            }else{
                mc.message = "Sorry, that was wrong.";
                mc.randomStudent.correct =+ 0;
            }
            mc.showMessage = true;
            mc.randomStudent.numberOfQuestions++;
            
            mc.editStudents(mc.randomStudent);
        };
        
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
        
        mc.hideStudents = function(){
            mc.showstudents = false;
        }
        
        mc.showStudents = function(){
            mc.showstudents = true;
        }  
        
        mc.showQuestions = function(){
            mc.showquestions = true;
        }
        
        mc.hideQuestions = function(){
            mc.showquestions = false;
        }
            
        mc.latestStudentData = function(){
            return QuizStorageService.getData('student-storage');
        }
        
        mc.studentUpdate = function(sName, correct, numQuestions){
            if(mc.students == null){
                mc.students = [];
            }
            
            var student = {name: sName, correct: correct, numberOfQuestions: numQuestions};
            
            
            mc.students.push(student);
            return QuizStorageService.setData('student-storage', angular.toJson(mc.students));
        }
        
        mc.removeStudent = function($index){
            mc.students = mc.latestStudentData();
            mc.students.splice($index, 1);
            return QuizStorageService.setData('student-storage', angular.toJson(mc.students));
        }
        
        mc.updateArray = function(){
            for (var i in mc.students){
                if(mc.students[i].name == mc.randomStudent.name){
                    mc.students[i].numberOfQuestions
                if(mc.chosenAnswer == mc.randomQuestion.answerText){
                    mc.students[i].correct++
                    }
                    break;
                }
            }
        }
        
        mc.removeQuestion = function($index){
            mc.questions = mc.latestQuestionData();
            mc.questions.splice($index, 1);
            return QuizStorageService.setData('question-storage', angular.toJson(mc.questions));
        }
        
        mc.chooseStudent = function(){
             mc.randomStudent = mc.students[Math.floor(Math.random() * 
                                mc.students.length)];
        }
        
        mc.chooseQuestion = function(){
            mc.randomQuestion = mc.questionArray[Math.floor(Math.random()*
                                mc.questionArray.length)];
            //$timeout( function(){ $scope.callAtTimeout(); }, 3000);
            $timeout(function(){mc.chooseAnswer(); }, 1000);
            
        }
        
        mc.chooseAnswer = function(){
            mc.randomAnswer = mc.randomQuestion.answerText;
            
        }
        
        mc.start = function(){
            
            mc.chooseStudent();
            mc.chooseQuestion();
        }
        
        
        
                            
}]);

quizModule.factory("QuizStorageService", function($window, $rootScope){
    
    angular.element($window).on('storage', function($window, $rootScope){
        if(event.key === 'student-storage'){
            $rootScope.$apply();
        }
        if(event.key === 'question-storage'){
            $rootScope.$apply();
        }
    })
    
    return {
        setData: function(key, val){
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function(key){
            
            var val = $window.localStorage && $window.localStorage.getItem(key);
            
            var data = angular.fromJson(val);
            
            return data;
        }
    }
})


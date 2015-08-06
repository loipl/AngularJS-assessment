'use strict';

app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'C',
		templateUrl: 'template.html',
		link: function(scope) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	questions = [
		{
			question: "Is JavaScript case-sensitive?",
			options: ["Yes", "No"],
			answer: 0
		},
		{
			question: "How do you round the number 3.25, to the nearest integer?",
			options: ["round(3.25)", "Math.rnd(3.25)", "rnd(3.25)", "Math.round(3.25)"],
			answer: 3
		},
		{
			question: "What is the correct JavaScript syntax for opening a new window called 'w2' ?",
			options: ["w2 = window.new('http://www.example.com');", "w2 = window.open('http://www.example.com');"],
			answer: 1
		},
		{
			question: "How can you detect the client's browser name?",
			options: ["client.navName", "navigator.appName", "browser.name"],
			answer: 1
		},
		{	
			question: "What will the following code return: Boolean(2 > 1)",
			options: ["NaN", "false", "true"],
			answer: 2
		}
	];

	return {
		getQuestion: function(id, id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});
const express = require('express');
const router = express.Router();
const { randomUUID } = require("crypto");

const User = require('../../models/user');
const Quiz = require('../../models/quiz');
const { default: mongoose } = require('mongoose');

router.post('/quiz', (req, res) => {
    if (req.isAuthenticated()) {
        /*
        questions: 
            [
                {
                    text: "Some question here",
                    typeOfQuestion: 2,
                    options: [
                        'option1',
                        'option2',
                        'option3',
                        'option4',
                        'option5'
                    ],
                    correctOptions: [
                        'option3',
                        'option5'
                    ]
                },
            ]
        */
        const newQuiz = {
            _id: randomUUID().slice(0, 6),
            owner: req.user._id,
            title: req.body.title,
            questions: req.body.questions,
        }

        // check if quiz has questions and within limit
        if (!newQuiz.questions || newQuiz.questions.length > 10 || newQuiz.questions.length < 1) {
            res.status(400).json({ message: 'Quiz has 0 or more than 10 questions' })
        }
        // check if questions are valid
        else if (
            newQuiz.questions.filter(
                question =>
                (
                    !question.text || question.text.length < 1 ||
                    !question.typeOfQuestion || question.typeOfQuestion < 1 || question.typeOfQuestion > 2 ||
                    !question.options || question.options.length < 1 || question.options.length > 5 ||
                    !question.correctOptions || question.correctOptions.length < 1 || question.correctOptions.length > question.options.length
                )

            ).length > 0) {
            res.status(400).json({ message: 'Invalid quiz question(s)' })
        } else {
            Quiz.create(newQuiz, (err1, quiz) => {
                User.updateOne({ _id: quiz.owner }, {
                    $push: { quizzes: quiz._id }
                }, (err2, user) => {
                    if (err1 || err2) {
                        console.error(err1);
                        console.error(err2);
                        res.status(500).send({ msg: 'Server Error' })
                    } else {
                        res.status(200).send({
                            newQuizId: newQuiz._id, newQuiz: {
                                _id: quiz._id,
                                title: quiz.title,
                                owner: quiz.owner,
                            }
                        })
                    }
                });
            });

        }
    } else {
        res.status(401).send({ msg: 'Unauthorized to create quiz' })
    }
});

router.get('/quiz/list', (req, res) => {
    if (req.isAuthenticated()) {
        Quiz.find({ owner: mongoose.Types.ObjectId(req.user._id) }, { questions: 0, __v: 0 }, (err, quizzes) => {
            if (err) {
                console.error(err);
                res.status(500).json({ msg: 'Server Error' });
            } else {
                res.status(200).json({ quizzes: quizzes });
            }
        }).lean();
    } else {
        res.status(401).send({ msg: 'Unauthorized user' })
    }
});

router.get('/quiz/:id', (req, res) => {
    const quizId = req.params.id;

    Quiz.findById(quizId, {
        _id: 0, __v: 0, owner: 0, questions: { correctOptions: 0 }
    }, (err, quiz) => {
        if (err) {
            console.error(err);
            res.status(500).json({ msg: 'Server Error' });
        } else if (!quiz) {
            res.status(204).json({ msg: 'Invalid quiz Id' });
        } else {
            res.status(200).json(quiz);
        }
    }).lean();
});

router.post('/quiz/:id', (req, res) => {
    const quizId = req.params.id;
    const markedAnswers = req.body.markedAnswers;

    Quiz.findById(quizId, (err, quiz) => {
        if (err) {
            console.error(err);
            res.status(500).json({ msg: 'Server Error' });
        } else if (!quiz) {
            res.status(204).json({ msg: 'Invalid quiz Id' });
        } else {
            const correctAnswers = quiz.questions.map(question => question.correctOptions);
            let score = 0;
            for (let i = 0; i < correctAnswers.length; i++) {
                const arr1 = correctAnswers[i].sort();
                const arr2 = markedAnswers[i].sort();
                if (arr1.length === arr2.length && arr1.every((item, index) => item == arr2[index]))
                    score++;
            }

            res.status(200).json({ score: score });
        }
    }).lean();
});

router.delete('/quiz/:id', (req, res) => {
    const quizId = req.params.id;

    if (req.isAuthenticated()) {
        Quiz.deleteOne({ _id: quizId, owner: mongoose.Types.ObjectId(req.user._id) }, (err, quiz) => {
            if (err) {
                console.error(err);
                res.status(500).json({ msg: 'Server Error' });
            } else if (quiz.deletedCount === 0) {
                res.status(401).send({ msg: 'Wrong quiz ID or you are not the owner' });
            } else {
                res.status(200).json({ message: 'Quiz deleted successfully' })
            }
        });
    } else {
        res.status(401).send({ msg: 'Unauthorized user' })
    }
});

module.exports = router;
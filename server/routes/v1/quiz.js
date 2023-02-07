const express = require('express');
const router = express.Router();
const { randomUUID } = require("crypto");

const User = require('../../models/user');
const Quiz = require('../../models/quiz');

router.get('/quiz/:id', (req, res) => {
    const quizId = req.params.id;

    Quiz.findById(quizId, (err, quiz) => {
        if (err) {
            console.error(err);
            res.status(500).json({ msg: 'Server Error' });
        } else if (!quiz) {
            res.status(204).json({ msg: 'Invalid quiz Id' });
        } else {
            User.findById(quiz.owner, (err, user) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ msg: 'Server Error' });
                } else if (!user) {
                    quiz.owner = '(Account Deleted)'
                } else {
                    quiz.questions.map(question => {
                        delete question['correctOptions'];
                        return question;
                    });
                    quiz.owner = user.name;
                    delete quiz['__v'];
                    res.status(200).json(quiz);
                }
            }).lean();
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

router.post('/quiz', (req, res) => {
    const newQuiz = {
        _id: randomUUID({ disableEntropyCache: true }).slice(0, 6),
        owner: req.user._id,
        questions: req.body.questions,
    }
    /* [
        {
            text: "Q2",
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
    ] */

    if (req.isAuthenticated()) {
        Quiz.create(newQuiz, (err, quiz) => {
            if (err) {
                console.error(err);
                res.status(500).send({ msg: 'Server Error' })
            } else {
                res.status(200).send({ newQuiz: newQuiz._id })
            }
        });
    } else {
        res.status(401).send({ msg: 'Unauthorized to create quiz' })
    }
});

module.exports = router;
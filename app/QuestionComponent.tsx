import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import socket from '../socket';

interface Props {
    player: string;
    roomName: string;
    endGame: () => void;
}

const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // losowy indeks od 0 do i
        [array[i], array[j]] = [array[j], array[i]]; // zamiana miejscami elementów
    }
    return array;
};

const QuestionComponent = ({ player, roomName,endGame }: Props) => {
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [question, setQuestion] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [highlightCorrect, setHighlightCorrect] = useState(false);
    const [answers, setAnswers] = useState<string[]>([]);
    const [secondsLeft, setSecondsLeft] = useState(2);
    const [animatedValues, setAnimatedValues] = useState<Animated.Value[]>([]);
    const selectedAnswerRef = useRef<string | null>(null);



    useEffect(()=>{
        socket.on('new_question', (result) => {
            setQuestion(result.question);
            setCorrectAnswer(result.correct_answer);
            const shuffledAnswers = shuffleArray([result.correct_answer, ...result.incorrect_answers]);
            setAnswers(shuffledAnswers);
            setAnimatedValues(shuffledAnswers.map(() => new Animated.Value(1))); 
        });
    
        socket.on('next_round',(_turn)=>{
            if (_turn > 7) {
                endGame();
                return;
            }
            setSecondsLeft(12);
        })
    },[])

    useEffect(() => {
        if (secondsLeft <= 0) return;

        const timer = setInterval(() => {
            setSecondsLeft((prevSeconds) => {
                if (prevSeconds <= 1) {
                    clearInterval(timer); 
                    onTimerEnd();
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft]);
 

    const onTimerEnd = () => {
       const isCorrectAnswer=selectedAnswerRef.current == correctAnswer;
        
        answers.forEach((answer, index) => {
            if (answer !== correctAnswer) {
                animateIncorrectAnswer(index);
            }
        });
        setTimeout(() => {
          setHighlightCorrect(true);
        }, 800);

        setTimeout(() => {
            setHighlightCorrect(false);
        }, 4000);

        setTimeout(() => {
            socket.emit('score', player,isCorrectAnswer, roomName);
        }, 4800);
    }
    


    const animateIncorrectAnswer = (index:number) => {
        Animated.timing(animatedValues[index], {
            toValue: 0, 
            duration: 1300, 
            useNativeDriver: true, 
        }).start();
    };

    

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        selectedAnswerRef.current = answer;
        console.log(`Player selected: ${answer}`);
    };

    return (
        <>
            <View style={styles.timer}>
                <Text style={{ fontSize: 32 }}>{secondsLeft}s</Text>
            </View>

            <View style={[styles.centerContainer, { bottom: Platform.OS !== 'web' ? 20 : 'auto' }]}>
                <Text style={styles.questionText}>{question}</Text>

                        <View style={styles.answersContainer}>
        {answers.map((answer, index) => (
            <TouchableOpacity
            key={answer}
            onPress={() => handleAnswer(answer)}
            style={[
                styles.answerButton, 
                selectedAnswer === answer &&!highlightCorrect&& styles.selectedButton,
                answer === correctAnswer && highlightCorrect && styles.correctButton, 
            ]}
            >
            <Animated.View
                style={[
                { opacity: animatedValues[index] }, 
                ]}
            >
                <Text style={styles.answerText}>{answer}</Text>
            </Animated.View>
            </TouchableOpacity>
        ))}
        </View>

            </View>
        </>
    );
};

export default QuestionComponent;

const styles = StyleSheet.create({
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '60%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 10,
        padding:5
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 10,
        paddingHorizontal:5
    },
    answersContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    answerButton: {
        width: '20%',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#ADD8E6',
    },
    correctButton: {
        backgroundColor: '#32CD32', 
    },
    answerText: {
        fontSize: 18,
        color: 'black',
    },
    timer: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
        margin: 'auto',
        width: 130,
        height: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
    },
});

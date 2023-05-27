import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  ContactUs: undefined;
};

type ContactUsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContactUs'
>;
type ContactUsScreenRouteProp = RouteProp<RootStackParamList, 'ContactUs'>;

type Props = {
  navigation: ContactUsScreenNavigationProp;
  route: ContactUsScreenRouteProp;
};

function ContactUs() {
  const [mathQuestion, setMathQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const mathQuestions = [
    {
      question:
        "If you bake 12 cupcakes and eat 3 because you just can't resist, how many are you left with?",
      answer: 9,
    },
    {
      question:
        "Imagine you're a pirate who finds 30 gold coins. If you share with your crew of 6 equally, how many coins do each of you get? No stealing, arrr!",
      answer: 5,
    },
    {
      question:
        'You had 15 cookies and a hungry friend took 7. How many are left before you start guarding your cookies?',
      answer: 8,
    },
    {
      question:
        "You're at a concert with 50 seats, and 35 seats are taken. How many empty seats are there? Quick, before the show starts!",
      answer: 15,
    },
    {
      question:
        'A wizard gave you 20 magic potions. You used 7 to fly, how many potions do you have left to become invisible?',
      answer: 13,
    },
    {
      question:
        "You're a superhero who saved 20 people one day, then saved 15 more the next day. How many did you save altogether? Take a bow!",
      answer: 35,
    },
    {
      question:
        'If you plant 30 flowers and 7 got eaten by cheeky rabbits, how many are still blooming?',
      answer: 23,
    },
    {
      question:
        'You had 25 balloons for your birthday party. If 5 popped when you tried to stuff them in the car, how many are left?',
      answer: 20,
    },
    {
      question:
        'A monkey has 40 bananas and eats 6 each day. How many does he have after one day without sharing with his friends?',
      answer: 34,
    },
    {
      question:
        "You're a zookeeper with 12 lions and you just received 3 more. How many roars can you expect now?",
      answer: 15,
    },
    {
      question:
        "You have 60 minutes to watch cat videos and you've already spent 15 minutes. How much more time do you have for the kitten's antics?",
      answer: 45,
    },
    {
      question:
        'A dragon had 30 gold coins. A brave knight took 10 coins while the dragon was sleeping. How many does the dragon have left to guard?',
      answer: 20,
    },
    {
      question:
        'You have 18 books to read and you read 4 in a week. How many are left? Remember, no skimming!',
      answer: 14,
    },
    {
      question:
        "You're making pizza and you have 8 slices. You eat 3 because it smells so good. How many slices are left? No, you can't make more yet!",
      answer: 5,
    },
    {
      question:
        "You are a star traveler visiting 20 planets. If you've already visited 5, how many more are waiting for your arrival?",
      answer: 15,
    },
    {
      question:
        "You're a mermaid with 40 pearls and you gave 7 to your dolphin friend. How many pearls are left in your treasure?",
      answer: 33,
    },
    {
      question:
        "You're an alien with 50 spaceships. After lending 15 to your alien friends, how many do you have left?",
      answer: 35,
    },
    {
      question:
        "You're a photographer with 25 pictures. If you hang 9 on the wall, how many do you still have for your portfolio?",
      answer: 16,
    },
    {
      question:
        'You have 45 sweets. If you ate 20 (oops!), how many are left to share with your friends?',
      answer: 25,
    },
  ];

  useEffect(() => {
    const randomQuestion =
      mathQuestions[Math.floor(Math.random() * mathQuestions.length)];
    setMathQuestion(randomQuestion.question);
    setCorrectAnswer(randomQuestion.answer);
    formik.setFieldValue('math', '');
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
      math: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      message: Yup.string().required('Required'),
      math: Yup.number()
        .required('Required')
        .test(
          'is-correct',
          'Wrong answer',
          (value) => value === correctAnswer // Assuming the math question is '2+2'
        ),
    }),
    onSubmit: (values) => {
      Alert.alert('Submitted', JSON.stringify(values));
      // Here you can handle the submission of your form
    },
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onTouchStart={Keyboard.dismiss}
      keyboardShouldPersistTaps="handled"
    >
      <TextInput
        placeholder="Your name"
        onChangeText={formik.handleChange('name')}
        onBlur={formik.handleBlur('name')}
        value={formik.values.name}
        style={
          formik.touched.name && formik.errors.name
            ? styles.inputError
            : styles.input
        }
      />
      {formik.touched.name && formik.errors.name ? (
        <Text style={styles.errorText}>{formik.errors.name}</Text>
      ) : null}
      <TextInput
        placeholder="Your email"
        onChangeText={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        value={formik.values.email}
        style={
          formik.touched.email && formik.errors.email
            ? styles.inputError
            : styles.input
        }
      />
      {formik.touched.email && formik.errors.email ? (
        <Text style={styles.errorText}>{formik.errors.email}</Text>
      ) : null}
      <TextInput
        placeholder="Your message"
        onChangeText={formik.handleChange('message')}
        onBlur={formik.handleBlur('message')}
        value={formik.values.message}
        style={
          formik.touched.message && formik.errors.message
            ? styles.inputError
            : styles.input
        }
        multiline
      />
      {formik.touched.message && formik.errors.message ? (
        <Text style={styles.errorText}>{formik.errors.message}</Text>
      ) : null}
      <Text style={styles.mathQuestionText}>{mathQuestion}</Text>
      <TextInput
        onChangeText={formik.handleChange('math')}
        onBlur={formik.handleBlur('math')}
        value={formik.values.math}
        keyboardType="numeric"
        style={
          formik.touched.math && formik.errors.math
            ? styles.inputError
            : styles.input
        }
      />
      {formik.touched.math && formik.errors.math ? (
        <Text style={styles.errorText}>{formik.errors.math}</Text>
      ) : null}
      <TouchableOpacity
        style={styles.button}
        onPress={() => formik.handleSubmit()}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  mathQuestionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  goBackButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  goBackButtonText: {
    color: '#2196F3',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  inputError: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});

export default ContactUs;

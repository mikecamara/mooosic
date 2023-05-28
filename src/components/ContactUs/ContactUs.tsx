import React, { useState, useEffect, useContext } from 'react';
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
import mathQuestions from '../../data/mathQuestions.json';
import axios from 'axios';
import { RootStackParamList } from '../../types/RootStackParamList.ts';
import { submitContactForm } from '../../services/contactUsService';
import lightStyles from './ContactUs.styles.ts';
import darkStyles from './ContactUsDark.styles.ts';
import { ThemeContext } from '../../contexts/ThemeContext.tsx';

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
  const { theme } = useContext(ThemeContext);
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  const isDark = theme === 'dark';

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
        .test('is-correct', 'Wrong answer', (value) => value === correctAnswer),
    }),
    onSubmit: async (values) => {
      try {
        const response = await submitContactForm(values);
        console.log(response.data);
        if (
          response.data.message === 'Form submission processed successfully!'
        ) {
          Alert.alert('Submitted', `Thank you ${values.name}`);
          formik.resetForm();
        } else {
          Alert.alert(
            'Error',
            'Something went wrong while submitting your form.'
          );
        }
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Error',
          'Something went wrong while submitting your form.'
        );
      }
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
        placeholderTextColor={isDark ? '#FFFFFF' : '#000000'}
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
        placeholderTextColor={isDark ? '#FFFFFF' : '#000000'}
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
        placeholderTextColor={isDark ? '#FFFFFF' : '#000000'}
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
        placeholderTextColor={isDark ? '#FFFFFF' : '#000000'}
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

export default ContactUs;

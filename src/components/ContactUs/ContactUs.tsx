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
import styles from './ContactUs.styles.ts';
import mathQuestions from '../../data/mathQuestions.json';
import axios from 'axios';
import { RootStackParamList } from '../../types/RootStackParamList.ts';

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
    onSubmit: async (values) => {
      try {
        // Replace this with the URL of your API Gateway
        const apiUrl =
          'https://xir9ziyto0.execute-api.ap-southeast-2.amazonaws.com/contactUsStage-58978dd/contact-us';

        const response = await axios.post(apiUrl, values);
        console.log(response.data);
        if (
          response.data.message === 'Form submission processed successfully!'
        ) {
          Alert.alert('Submitted', JSON.stringify(values));
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

export default ContactUs;

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { registerUser } from '../services/authService'; // Import the registerUser service
import { AuthContext } from '../Context';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [gender, setGender] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for request
  const{setIsAuthenticated,saveLogin}=useContext(AuthContext)
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/;

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const validatePassword = (pass) => {
    if (!passwordRegex.test(pass)) {
      setPasswordError(
        'Password must be at least 8 characters, include an uppercase letter, a number, and a special character.'
      );
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleRegister = async () => {
    if (!validatePassword(password)) return;

    if (password === confirmPassword) {
      const selectedDate = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
      
      const formData = {
        name,
        surname,
        email,
        username,
        password,
        dateOfBirth: selectedDate, // formatted as YYYY-MM-DD
        gender,
        role:'User'
      };

      setLoading(true); // Start loading
      const result = await registerUser(formData);
      setLoading(false); // Stop loading

      if (result.success) {
        Alert.alert('Success', 'You have registered successfully!', [{ text: 'OK' }]);
saveLogin(formData)
        setIsAuthenticated(true);
        // Optionally, navigate to login screen or reset form fields
      } else {
        Alert.alert('Registration Failed', result.error || 'An error occurred', [{ text: 'OK' }]);
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.header}>Register</Text>

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          editable={!loading} // Disable input while loading
        />
        <TextInput
          placeholder="Surname"
          value={surname}
          onChangeText={setSurname}
          style={styles.input}
          editable={!loading}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          editable={!loading}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          editable={!loading}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
          }}
          style={styles.input}
          secureTextEntry
          editable={!loading}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
          editable={!loading}
        />
        {!passwordsMatch && <Text style={styles.errorText}>Passwords do not match.</Text>}

        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.dateContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDay}
              onValueChange={(itemValue) => setSelectedDay(itemValue)}
              style={styles.picker}
              mode="dropdown"
              enabled={!loading} // Disable while loading
            >
              {days.map((day) => (
                <Picker.Item key={day} label={day.toString()} value={day} />
              ))}
            </Picker>
            <Text style={styles.pickerLabel}>Day</Text>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(itemValue) => setSelectedMonth(itemValue)}
              style={styles.picker}
              mode="dropdown"
              enabled={!loading}
            >
              {months.map((month) => (
                <Picker.Item key={month} label={month.toString()} value={month} />
              ))}
            </Picker>
            <Text style={styles.pickerLabel}>Month</Text>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue) => setSelectedYear(itemValue)}
              style={styles.picker}
              mode="dropdown"
              enabled={!loading}
            >
              {years.map((year) => (
                <Picker.Item key={year} label={year.toString()} value={year} />
              ))}
            </Picker>
            <Text style={styles.pickerLabel}>Year</Text>
          </View>
        </View>

        <View style={styles.genderContainer}>
          <Text
            onPress={() => setGender('Male')}
            style={[styles.genderText, gender === 'Male' && styles.selectedGender]}
          >
            Male
          </Text>
          <Text
            onPress={() => setGender('Female')}
            style={[styles.genderText, gender === 'Female' && styles.selectedGender]}
          >
            Female
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Register" onPress={handleRegister} disabled={loading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  picker: {
    height: 100,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  pickerLabel: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  genderText: {
    fontSize: 16,
    color: 'black',
    padding: 10,
  },
  selectedGender: {
    fontWeight: 'bold',
    color: 'blue',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  backButton: {
   marginBottom:5,
    top: 20,
    left: 10,
    zIndex: 10,
  },
});

export default RegisterScreen;

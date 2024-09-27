import React, { useContext, useEffect, useState } from 'react';
import { View, Button, FlatList, Text,ActivityIndicator, StyleSheet, Image, TextInput, Pressable, Modal } from 'react-native';
import { getProgramsByDifficulty } from '../services/fitnessProgramService' // Import your service
import { AuthContext } from '../Context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
const ProfileScreen = () => {
  const [weight, setWeight] = useState(80.0); // Initial weight value
  const[height,setHeight]=useState(100.0)
  const[bmiValue,setBmiVlue]=useState(0)
  const[bmiRangeText,setBmiRangeText]=useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const incrementWeight = () => {
    setWeight(prevWeight => prevWeight + 1);
  };

  const decrementWeight = () => {
    setWeight(prevWeight => (prevWeight > 0 ? prevWeight - 1 : 0));
  };
  const calculateBmiPosition = () => {
    // Calculate the position of the BMI on the scale (0-100%)
    const maxBmi = 40; // We assume the max BMI to visualize is 40 for this example
    return Math.min((bmiValue / maxBmi) * 100, 100); // Ensures the value doesn't exceed 100%
  };
  const progress = useSharedValue(150);
  const min = useSharedValue(100);
  const max = useSharedValue(250);
const{userData}=useContext(AuthContext);
const handleCalculate = () => {
  // Handle the calculation logic
  alert(`Your selected weight is: ${weight} kg`);
};
const calculateAge = (dateOfBirthString) => {
  // Split the date and time parts
  const [datePart, timePart] = dateOfBirthString.split(' ');

  // Split the date into month, day, and year
  const [month, day, year] = datePart.split('/').map(Number);

  // Create a Date object (assuming time is in local timezone)
  const dob = new Date(year, month - 1, day); // Month is zero-based in Date

  // Get the current date
  const today = new Date();

  // Calculate age
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  // Adjust age if the birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
  }

  return age;
};
const onCalculateBmi= ()=>{

  var heightinMeters= height / 100;
  var result=weight/(heightinMeters*heightinMeters);
  console.log(result)
  setBmiVlue(result)
  setBmiRangeText(result <18.5? "Under Weight" : result>=18.5 && result<24.9 ? "Healthy":"Overweight")
  setModalVisible(true);
}
  useEffect(() => {
 
  }, []); 

  return (
    <GestureHandlerRootView>
    <View>
    <View style={{ padding: 20,display:'flex',flexDirection:"row" }}>
     
     <View style={styles.container} >
      <Text style={styles.username} >{userData.username}</Text>
      <Text  style={styles.infoText}>Name:{userData.name} {userData.surname}</Text>
      <Text  style={styles.infoText}> Age:{calculateAge(userData.dateOfBirth)}</Text>
      </View>

      <View style={styles.container2}>
      
      {userData.gender=='Male' ?  <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      
        <Text style={styles.infoText2}>Male</Text>
        <Ionicons name='male' size={70} color='blue'/>
      </View> :<View style={{display:'flex',justifyContent:'center',alignItems:'center'}}> 
      <Text style={styles.infoText2}>Female</Text>
      <Ionicons  name='female' size={70} color='pink'/>
      </View>}
 

    
      </View>
     
    </View>
    <Text style={{textAlign:'center',fontSize:18,fontWeight:"900"}}>See closest scheduled workouts:</Text>
    <Text style={{textAlign:'center',fontSize:18,fontWeight:"900"}}>Calculate your BMI</Text>
    <View style={{paddingLeft:20,paddingRight:20}}>
     <View style={styles.hegihtView}>
     <View style={styles.hegihtInnerView}>
     <Text style={styles.heightTitleText}>Height</Text>
     <View style={styles.heightUnitView}>
       <Text style={styles.heightUnitText}>CM</Text>
     </View>
     </View>
     <Text style={styles.heightValueText}>{height}</Text>
     <Slider
      theme={{
        disableMinTrackTintColor: '#fff',
        maximumTrackTintColor: '#fff',
        minimumTrackTintColor: '#000',
        cacheTrackTintColor: '#333',
        bubbleBackgroundColor: '#666',
        heartbeatColor: '#999',
      }}
      progress={progress}
      minimumValue={min}
      maximumValue={max}
      onValueChange={value=>setHeight(value.toFixed(2).toString())}
    />
     </View>
     <View style={styles.container3}>
      <Text style={styles.label}>Weight</Text>
      <View style={styles.weightContainer}>
        <Pressable style={styles.button} onPress={decrementWeight}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Text style={styles.weightValue}>{weight} kg</Text>
        <Pressable style={styles.button} onPress={incrementWeight}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>

    <TouchableOpacity style={styles.calculateButton} onPress={onCalculateBmi}>
        <Text style={styles.calculateText}>Calculate</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your BMI: {bmiValue.toFixed(2)}</Text>
            <Text style={styles.modalText}>{bmiRangeText}</Text>

            {/* BMI Scale */}
            <View style={styles.bmiScale}>
              <View style={styles.underweight}></View>
              <View style={styles.normal}></View>
              <View style={styles.overweight}></View>
              <View style={styles.obese}></View>

              {/* BMI Marker */}
              <View
                style={[
                  styles.bmiMarker,
                  { left: `${calculateBmiPosition()}%` }, // Position based on BMI value
                ]}
              />
            </View>
            <View style={styles.scaleLabels}>
              <Text style={styles.scaleLabel}>Underweight</Text>
              <Text style={styles.scaleLabel}>Normal</Text>
              <Text style={styles.scaleLabel}>Overweight</Text>
              <Text style={styles.scaleLabel}>Obese</Text>
            </View>

            <Pressable
              style={[styles.buttonModal, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    
      </View>
      </View>
      </GestureHandlerRootView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex:2,
    backgroundColor: '#CD853F', // Light background color
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow for elevation
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Elevation for Android
    margin: 10, 
    // Margin around the container
  },

  container2: {
    padding: 15,
    flex:1,
     // Light background color
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow for elevation
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Elevation for Android
    margin: 10, 
    // Margin around the container
  },
  username: {
    fontSize: 22,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginBottom: 5,
    color:'white' // Dark text color
  },
  infoText: {
    fontSize: 18,
    textTransform: 'capitalize',
    color:'white',// Slightly lighter text color for info
    marginBottom: 3, // Space between text lines
  },
  infoText2: {
    fontSize: 15,
    textAlign:"center",
    textTransform: 'capitalize',
    color:'#495057',// Slightly lighter text color for info
    marginBottom: 8, // Space between text lines
  },
  hegihtView:{
    height:175,
    backgroundColor:'#D3D3D3',
    marginTop:20,
    borderRadius:15,
    padding:15,
  },
  hegihtInnerView:{

    flexDirection:"row",
    justifyContent:'space-between',
  },
  heightTitleText:{
    color:"black",
    fontSize:20,
    fontWeight:'600'
  },
  heightUnitView:{
backgroundColor:'black',
padding:5,
borderRadius:30,
  },
  heightUnitText:{
    color:'white',
    fontSize:18,

  },
  heightValueText:{
    fontSize:32,
    colors:'black',
    alignSelf:"center",
    marginTop:20,
  },
  container3: {
    backgroundColor: '#D3D3D3', // Light grey background
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  weightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'black', // Blue color for the buttons
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff', // White text color for buttons
    fontWeight: 'bold',
  },
  weightValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
  },
  calculateButton: {
    backgroundColor: '#CD853F', // Green button for calculate
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    textAlign:'center',
    marginTop: 20, // Space between the weight controls and the button
  },
  calculateText: {
    color: '#fff',
    textAlign:'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
 
  buttonModal: {
    
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
 
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
 
 
  bmiScale: {
    flexDirection: 'row',
    width: '100%',
    height: 20,
    marginTop: 20,
    marginBottom: 10,
    position: 'relative',
  },
  underweight: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  normal: {
    flex: 2,
    backgroundColor: 'green',
  },
  overweight: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  obese: {
    flex: 1,
    backgroundColor: 'red',
  },
  bmiMarker: {
    position: 'absolute',
    width: 5,
    height: 30,
    backgroundColor: 'black',
    top: -5, // Adjust height of the marker above the scale
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  scaleLabel: {
    fontSize: 12,
  },
  buttonModal: {
    backgroundColor:'#CD853F',
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
  },
}
);
import { View, Text,Image,SafeAreaView,StyleSheet ,TouchableOpacity,ScrollView, Button} from 'react-native'
import React, { useContext, useState } from 'react'
import FitnessCard from '../components/FitnessCard'
import { FitnessAppItems } from '../Context';
import ImageSlider from '../components/ImageSlider';

const HomeScreen = () => {


  const {
    minutes,
    calories,
    workout,
  } = useContext(FitnessAppItems);
  const [activeButton, setActiveButton] = useState('beginner');
  const handleDifficultySelect = async (difficulty) => {
    setActiveButton(difficulty); // Set the active button
   
  };
  return (

    
    <ScrollView> 
     

      <View style={{backgroundColor:"#CD853F",padding:10,height:200,width:"100%"}}>
        <Text style={{color:"white",fontWeight:"bold",fontSize:18}}>HOME WORKOUT</Text>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:20}}>


          <View>
            <Text style={{textAlign:"center",fontWeight:"bold",color:"white",fontSize:18}}>{workout}</Text>
            <Text style={{marginTop:6,color:"#D0D0D0",fontSize:17}}>WORKOUTS</Text>
          </View>
          <View>
          <Text style={{textAlign:"center",fontWeight:"bold",color:"white",fontSize:18}}>{calories}</Text>
          <Text style={{marginTop:6,color:"#D0D0D0",fontSize:17}}>KCAL</Text>
          </View>
          <View>

          <Text style={{textAlign:"center",fontWeight:"bold",color:"white",fontSize:18}}>{minutes}</Text>
          <Text style={{marginTop:6,color:"#D0D0D0",fontSize:17}}>MINS</Text>
          </View>
        </View>
        

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                
                 <Image
                    style={{
                      width: "90%",
                      height: 120,
                      marginTop: 10,

                      borderRadius: 7,
                    }}
                    source={{
                      uri: "https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_842,ar_1.2,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/sku-card-widget/gold2.png",
                    }}
                  />
                  </View>
        </View>
        <View style={{ flexDirection: 'row',justifyContent:"center", marginTop:45 }}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'beginner' && styles.activeButton, // Apply active style
          ]}
          onPress={() => handleDifficultySelect('beginner')}
        >
          <Text style={styles.buttonText}>Beginner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'intermediate' && styles.activeButton,
          ]}
          onPress={() => handleDifficultySelect('intermediate')}
        >
          <Text style={styles.buttonText}>Intermediate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'advanced' && styles.activeButton,
          ]}
          onPress={() => handleDifficultySelect('advanced')}
        >
          <Text style={styles.buttonText}>Advanced</Text>
        </TouchableOpacity>
      </View>

      </View>

        <FitnessCard difficulty={activeButton} />

     



    </ScrollView>
  )
}

export default HomeScreen
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 0,
  },
  button: {
    paddingVertical: 10,
   margin:4,
   // White background for the buttons
   // Center text
   alignItems: 'center', 
    borderBottomWidth: 2, // Bottom border for activity indication
    borderBottomColor: 'transparent', // Hidden border by default
    width: 120, // Fixed width for the buttons
  },
  activeButton: {
    borderBottomColor: '#CD853F', // Show black border for active button
  },
  buttonText: {
    color: 'black', // Black text for the buttons
    fontWeight: 'bold', // Bold font
    fontSize: 17, // Set a nice readable font size
  },
});
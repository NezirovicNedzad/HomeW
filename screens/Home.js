import { View, Text,Image,SafeAreaView,StyleSheet ,ScrollView} from 'react-native'
import React, { useContext } from 'react'
import FitnessCard from '../components/FitnessCard'
import { FitnessItems } from '../Context';



const HomeScreen = () => {


  const {
    minutes,
    calories,
    workout,
  } = useContext(FitnessItems);
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
        <FitnessCard />

     



    </ScrollView>
  )
}

export default HomeScreen
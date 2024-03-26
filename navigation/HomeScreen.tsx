import React, {useState} from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Image } from 'react-native';
import tw from 'twrnc';

import { faker } from '@faker-js/faker';
import type { SexType } from '@faker-js/faker';
import { Dimensions } from "react-native";



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9F0F4', // Or any other background color you prefer
  },
});



// Learned a new trick lol 
const screenWidth = Dimensions.get("window").width;



// Chart Imports 
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


// Chart data for testing 
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

// Chart configuration 
const chartConfig = {
  backgroundGradientFrom: "transparent", // Transparent background
  backgroundGradientFromOpacity: 0, // Not needed for transparency, but for consistency
  backgroundGradientTo: "transparent", // Transparent end to maintain a consistent background
  backgroundGradientToOpacity: 0, // Not needed for transparency, but for consistency
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black text color
  strokeWidth: 2, // optional, default is 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

export default function HomeScreen() {


  // Current activities 
  type ActivityCurrent = 'Active' | 'Inactive' | 'Out'
  type RandomActivity = 'Back Door' | 'Front Door' | 'Side Enterance' | 'Shutter'

  
  // State variables to store the random name and email
  const [randomName, setRandomName] = useState(faker.person.firstName());
  const [randomEmail, setRandomEmail] = useState(faker.internet.email());

  // Function to generate a new name and email
  function generateNewIdentity() {
    setRandomName(faker.person.firstName());
    setRandomEmail(faker.internet.email());
  }
  
 // User defintion (btw im writing all these comments and not gpt)
  interface User {
    _id: string;
    avatar: string; 
    firstName: string; 
    lastName: string; 
    sex: SexType; 
    ActivityCurrent: ActivityCurrent, 
    RandomActivity: RandomActivity, 
  } 

  // Creating a random user this was more cancerous than it looks 
  function createRandomUser(): User{
    return {
      _id: faker.string.uuid(),
      avatar: faker.image.avatar(), 
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      sex: faker.person.sexType(),
      ActivityCurrent: faker.helpers.arrayElement(['Active','Inactive', 'Out']),
      RandomActivity: faker.helpers.arrayElement(['Back Door' , 'Front Door' , 'Side Enterance' , 'Shutter'])
    };
  }

  // User and Date creation 
  const user = createRandomUser();
  const currentDate = new Date();
  
  // User details 
  const name = user.firstName; 
  const sex = user.sex
  const currentActivity = user.ActivityCurrent
  
  
  // Explicitly typing the dateOptions object for TypeScript - Fearghal Desmond made me do this 
  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };

  // Format the current date without the year
  const dateString = currentDate.toLocaleDateString('en-US', dateOptions); 

  // Table data 
  const tableData = Array.from({ length: 4 }, () => createRandomUser()).map(user => {
    const formattedName = `${user.firstName} ${user.lastName.charAt(0)}.`;
    const RandomActivity = user.RandomActivity
    return { pfp: user.avatar, name: formattedName, time: RandomActivity };
  });
  

  return (
<ScrollView>
      <View style={styles.container}>


        {/* Top Blue Bar */}
        <View style={tw`w-[120%] h-[80px] absolute bg-blue-600 top-0 left-[-10%]`} />

        {/* Teamcheck Section */}
        <View style={tw`w-[90%] h-[305px] mx-auto top-[100px] absolute bg-neutral-50 rounded-[15px] `}>
        <Text style={tw`mx-5 mt-2 text-xl`} >Fire</Text>
        <Text style={tw`w-36 h-6 text-center text-black text-sm font-sm font-['DM Sans'] mx-42 mt-3`}>Latest Activity</Text>
        {tableData.map((item, index) => (
        <View key={index} style={[tw`flex-row items-center mt-5`, { top: `${index * 50}px`, left: '6%' }]}> 
          <Image source={{ uri: item.pfp }} style={tw`w-7 h-7 rounded-full mx-3`} />
          <Text style={tw`text-xl text-black `}>{item.name}</Text>
          <Text style={[tw`text-xl text-black mx-20`, {  right: '6%' }]}>{item.time}</Text>
        </View>
      ))}
        </View>

        {/* Teamcheck Extension */}
        <View style={tw`w-[90%] h-[120px] mx-auto top-[440px] absolute bg-neutral-50 rounded-[15px] items-center`}>
          <Text style={tw`text-left text-black text-[25px] font-normal`}>
            {dateString}
          </Text>
        </View>

        {/* Requests */}
        <View style={tw`w-[90%] h-[305px] mx-auto top-[590px] absolute bg-neutral-50 rounded-[15px] items-center`}>
          <BarChart
            data={data}
            width={380}
            height={300}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </View>

      </View>

    </ScrollView>
  );
};



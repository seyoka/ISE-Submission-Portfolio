import React, {useState} from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import tw from 'twrnc';
import CustomButton from './CustomButton';
import { faker } from '@faker-js/faker';
import type { SexType } from '@faker-js/faker';
import { Dimensions } from "react-native";






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
  useShadowColorFromDataset: false, // optional
  // Additional property for underline gradient (assuming line chart and this is for the line)
  // You might need to implement this part differently based on your chart library
  propsForDots: {
    r: "6", // Dot radius
    strokeWidth: "2", // Dot stroke width
    stroke: "#007bff" // Dot stroke color, set to a blue color
  },
  


};

export default function HomeScreen() {


  // Current activities 
  type ActivityCurrent = 'Active' | 'Inactive' | 'Out'
  
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
    };
  }

  // User and Date creation 
  const user = createRandomUser();
  const currentDate = new Date();
  
  // User details 
  const name = user.firstName; 
  const sex = user.sex
  const currentActivity = user.ActivityCurrent
  const formattedName = `${user.firstName} ${user.lastName.charAt(0)}.`;
  
  // Explicitly typing the dateOptions object for TypeScript - Fearghal Desmond made me do this 
  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };

  // Format the current date without the year
  const dateString = currentDate.toLocaleDateString('en-US', dateOptions);

  return (
    <ScrollView>
      <View style={tw`w-[100%] mx-auto h-[1200px] relative bg-[#E9F0F4] items-center`}>
        
        {/* Top Blue Bar */}
        <View style={tw`w-[120%] mx-auto h-[80px] absolute bg-blue-600 `} /> 

        {/* Teamcheck */}
        <View style={tw`w-[90%] h-[305px] mx-auto top-[100px] absolute bg-neutral-50 rounded-[15px] items-center`}>
          <Text style={tw`text-center text-black text-[25px] font-normal`}>
            {formattedName}  {sex}  {currentActivity}
          </Text>
        </View> 
        
        {/* teamcheck extension */}
        <View style={tw`w-[90%] mx-auto h-[120px] top-[440px] absolute bg-neutral-50 rounded-[15px] items-center`}> 
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



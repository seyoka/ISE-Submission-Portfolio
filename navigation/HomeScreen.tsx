import React, {useState} from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import tw from 'twrnc';
import CustomButton from './CustomButton';
import { faker } from '@faker-js/faker';
import type { SexType } from '@faker-js/faker';
// or, if desiring a different locale




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
  

  interface User {
    _id: string;
    avatar: string; 
    firstName: string; 
    sex: SexType; 
    ActivityCurrent: ActivityCurrent
  } 

  function createRandomUser(): User{
    return {
      _id: faker.string.uuid(),
      avatar: faker.image.avatar(), 
      firstName: faker.person.firstName(),
      sex: faker.person.sexType(),
      ActivityCurrent: faker.helpers.arrayElement(['Active','Inactive', 'Out']),
      
    };
  }


  const user = createRandomUser();
  const currentDate = new Date();
  const name = user.firstName; 
  const sex = user.sex
  const currentActivity = user.ActivityCurrent
  // Explicitly typing the dateOptions object for TypeScript
  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };

  // Format the current date without the year
  const dateString = currentDate.toLocaleDateString('en-US', dateOptions);

  return (
    <ScrollView>
      <View style={tw`w-[430px] h-[1200px] relative bg-[#E9F0F4] items-center`}>
        
        {/* Top Blue Bar */}
        <View style={tw`w-[450px] h-[80px] absolute bg-blue-600 `} /> 

        {/* Teamcheck */}
        <View style={tw`w-[400px] h-[305px] top-[100px] absolute bg-neutral-50 rounded-[15px] items-center`}>
          <Text style={tw`text-center text-black text-[25px] font-normal`}>
            {name}  {sex}  {currentActivity}
          </Text>
        </View> 
        
        {/* teamcheck extension */}
        <View style={tw`w-[400px] h-[120px] top-[440px] absolute bg-neutral-50 rounded-[15px] items-center`}> 

          <Text style={tw`text-left text-black text-[25px] font-normal`}>
            {dateString}
          </Text>

        </View>

        {/* Requests */}
        <View style={tw`w-[400px] h-[305px] top-[590px] absolute bg-neutral-50 rounded-[15px] items-center`}>
          <Text style={tw`text-center text-black text-[25px]`}>
            PlaceHolder
          </Text>
          {/* Button to generate new name and email */}
          <Button
            title="Generate New Identity"
            onPress={generateNewIdentity}
          />
        </View> 
  
      </View>
    </ScrollView>
  );
};



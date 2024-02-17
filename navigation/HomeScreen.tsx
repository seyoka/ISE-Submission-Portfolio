import React, {useState} from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import tw from 'twrnc';
import CustomButton from './CustomButton';
import { faker } from '@faker-js/faker';
// or, if desiring a different locale



export default function HomeScreen() {
  // State variables to store the random name and email
  const [randomName, setRandomName] = useState(faker.person.firstName());
  const [randomEmail, setRandomEmail] = useState(faker.internet.email());

  // Function to generate a new name and email
  function generateNewIdentity() {
    setRandomName(faker.person.firstName());
    setRandomEmail(faker.internet.email());
  }
  return (
    <ScrollView>
      <View style={tw`w-[430px] h-[1200px] relative bg-[#E9F0F4] items-center`}>
        
        {/* Top Blue Bar */}
        <View style={tw`w-[450px] h-[80px] absolute bg-blue-600 `} /> 

        {/* Teamcheck */}
        <View style={tw`w-[400px] h-[305px] top-[100px] absolute bg-neutral-50 rounded-[15px] items-center`}>
          <Text style={tw`text-center text-black text-[25px] font-normal`}>
            {randomName}
          </Text>
        </View> 
        
        {/* teamcheck extension */}
        <View style={tw`w-[400px] h-[120px] top-[440px] absolute bg-neutral-50 rounded-[15px] items-center`}> 
          <Text style={tw`text-center text-black text-[25px] font-normal`}>
            {randomEmail}
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



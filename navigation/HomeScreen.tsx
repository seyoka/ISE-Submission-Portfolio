import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import CustomButton from './CustomButton';

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={tw`w-[430px] h-[1200px] relative bg-[#E9F0F4] items-center`}>
        
        {/* Top Blue Bar */}
        <View style={tw`w-[450px] h-[80px] absolute bg-blue-600 `} /> 

        {/* Teamcheck */}
        <View style={tw`w-[400px] h-[305px] top-[100px] absolute bg-neutral-50 rounded-[15px] items-center`}>
          <Text style={tw`text-center text-black text-[25px] font-normal`}>
            samir
          </Text>
        </View> 
        
        {/* teamcheck extension */}
        <View style={tw`w-[400px] h-[120px] top-[440px] absolute bg-neutral-50 rounded-[15px] items-center`}> 
          <Text style={tw`text-center text-black text-[25px] font-normal`}>
            Samir
          </Text>
        </View>

        {/* Requests */}
        <View style={tw`w-[400px] h-[305px] top-[590px] absolute bg-neutral-50 rounded-[15px] items-center`}>
          <Text style={tw`text-center text-black text-[25px]`}>
            PlaceHolder
          </Text>
        </View> 
  
      </View>
    </ScrollView>
  );
};



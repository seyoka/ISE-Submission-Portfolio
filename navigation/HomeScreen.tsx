import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

import { faker } from '@faker-js/faker';
import type { SexType } from '@faker-js/faker';
import { Dimensions } from "react-native";

import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9F0F4', // Or any other background color you prefer
    
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

// Define a simple Circle component
const Circle: React.FC<{ color: string }> = ({ color }) => (
  <View style={{
    width: 10, // Size of the circle
    height: 10, // Size of the circle
    borderRadius: 5, // Half the size of width/height to make it a circle
    backgroundColor: color, // Background color of the circle
  }} />
);

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

  const today = new Date();
  today.setDate(today.getDate() + 1); // This modifies 'today' directly
  const startDate = getFormatedDate(today, 'YYYY/MM/DD'); // Pass 'today' as a Date object
  

  const [dateCal, setDateCal] = useState('12/12/2023')

  const [userName, setUserName] = useState('');
  const [userPfp, setUserPfp] = useState('');
  const [accessTime, setAccessTime] = useState(''); 
  const [readerAction, setReaderAction] = useState('')


  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [auditLogs, setAuditLogs] = useState(null);

  
  useEffect(() => {
    const ws = new WebSocket('ws://100.92.70.95:27941/gateway');
    const audit = fetch('Https://100.92.70.95:27941/api/audits') 

    fetch('https://100.92.70.95:27941/api/audits', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers as required, like authorization tokens
      },
      // mode: 'no-cors' // Uncomment if making a CORS request
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      setAuditLogs(data); // Set the state with the fetched data
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
    

    ws.onerror = (e) => {
      console.log('WebSocket error:', e);
    };

    ws.onmessage = (e) => {
      try {
        const message = JSON.parse(e.data);
        console.log(message)
        const userId = message.data.data.opener.user;
        const newUserName = userId === 1 ? "Will" : `User #${userId}`;
        const accessTimeISO = message.data.data.accessed_at;
        const date = new Date(accessTimeISO);
        const reader = message.data.data.reader;
        console.log(reader)
        const options: Intl.DateTimeFormatOptions = {
          hour: '2-digit', 
          minute: '2-digit',  
          hour12: true
        }; 
        
        let action = '';
        if (reader === "Reader 1") {
          action = 'Entered Room';
        } else if (reader === "Reader 2") {
          action = 'Exited Room';
        }
        
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);

        setReaderAction(action);
        setUserName(newUserName);
        setAccessTime(formattedTime);
      } catch (error) {
        console.error("Error parsing JSON data or extracting information:", error);
      }
    };
    
        // Clean up function
        return () => {
          ws.close();
        };
      }, []); 
    
      // ... the rest of your HomeScreen component
    
    

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
  const tableData = Array.from({ length: 1 }, () => createRandomUser()).map(user => {
    const formattedName = `${user.firstName} ${user.lastName.charAt(0)}.`;
    const RandomActivity = user.RandomActivity
    return { pfp: user.avatar, name: formattedName, time: RandomActivity };
  });
  
  function handleOnPress(){
    setOpen(true)
    console.log('button pressed')
  } 

  function handleChange(propdate: string) { 
    setDateCal(propdate);
  }
  
  

  return (
<ScrollView>
      <View style={styles.container}>


        {/* Top Blue Bar */}
        <View style={tw`w-[120%] h-[80px] absolute bg-blue-600 top-0 left-[-10%]`} />

        {/* Teamcheck Section */}
        <View style={tw`w-[90%] h-[305px] mx-auto top-[100px] absolute bg-neutral-50 rounded-[15px] `}>
            <Text style={tw`mx-5 mt-2 text-xl`} >Will Tracker</Text> 
            <TouchableOpacity onPress={() => setOpen(true)}>
        <Text style={tw`mx-7 text-slate-600 font-['DM Sans']`}>{dateString}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <DatePicker 
            mode='calendar'
            selected={dateCal}
            onDateChange={handleChange}
            maximumDate={startDate}
            />

            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => setOpen(false)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <Text style={tw`text-center text-black text-lg mt-3 `}>Latest Activity</Text>

        <View style={tw`flex-row items-center mt-5 justify-start`}> 
          <Image
            source={require('../assets/images/willy.jpeg')} // Adjust the path based on your component's location
            style={tw`w-10 h-10 rounded-full mx-2`} // Set the size as needed
          />
            
            <Circle color="#60C860" />

            <Text style={tw`text-xl text-black mx-2`}>{userName} D.</Text>
            <View style={tw`mx-6 h-full border-l `} />
            <Text style={tw`text-xl text-black`}>Entered Room</Text>
            <Text style={tw`text-sm text-black mx-2`}>{accessTime}</Text>

          </View>
        </View>


        {/* Teamcheck Extension */}
        <View style={tw`w-[90%] h-[120px] mx-auto top-[440px] absolute bg-neutral-50 rounded-[15px]`}>
          <Text style={tw`text-left text-black text-[25px] font-normal mx-3`}>
            {dateString}
          </Text>

          {/* Horizontal container */}
          <View style={tw`flex-row justify-around items-center mt-4`}>
      
            <View style={tw`items-center`}>
              <Text style={tw`text-sm text-black`}>Active</Text>
              <Circle color="green" />
            </View>

            {/* Busy text-icon pair */}
            <View style={tw`items-center`}>
              <Text style={tw`text-sm text-black`}>Busy</Text>
              <Circle  color="red" />
            </View>

            
            <View style={tw`items-center`}>
              <Text style={tw`text-sm text-black`}>Absent</Text>
              <Circle color="black" />
            </View>
          </View>

        </View>


        {/* Requests */}
        <View style={tw`w-[90%] h-[305px] mx-auto top-[590px] absolute bg-neutral-50 rounded-[15px] items-center`}>

        </View>

      </View>

    </ScrollView>
  );
};

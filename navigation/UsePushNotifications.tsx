import * as device from 'expo-device'
import * as notifications from 'expo-notifications'

import constants from 'expo-constants' 
 
import { Platform } from 'react-native'


export interface PushNotificationState { 
    notification?: notifications.Notification; 
    expoPushToken?: notifications.ExpoPushToken
}

export const usePushNotifications = (): PushNotificationState => {
    
}
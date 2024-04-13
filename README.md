# ISE-Submission-Portfolio
 This is my immerisive software engineering college portfolio submission
 I hope this can better explain my code and things i was not able to address in the application
 Theres more information about this code on my personal site 

# Induct Mobile App - Package Dependencies

## Dependencies
- @expo/vector-icons: ^13.0.0
- @react-native-community/masked-view: ^0.1.11
- @react-native-firebase/app: ^19.1.2
- @react-native-firebase/messaging: ^19.1.2
- @react-native-picker/picker: ^2.7.2
- @react-navigation/bottom-tabs: ^6.5.11
- @react-navigation/native: ^6.1.9
- @react-navigation/native-stack: ^6.9.17
- @react-navigation/stack: ^6.3.21
- dayjs: ^1.11.10
- expo: ^49.0.23
- expo-status-bar: ~1.6.0
- react: 18.2.0
- react-native: 0.72.10
- react-native-chart-kit: ^6.12.0
- react-native-date-picker: ^5.0.0
- react-native-firebase: ^5.6.0
- react-native-gesture-handler: ~2.12.0
- react-native-modern-datepicker: ^1.0.0-beta.91
- react-native-multiple-select: ^0.5.12
- react-native-reanimated: ~3.3.0
- react-native-safe-area-context: 4.6.3
- react-native-screens: ~3.

 

 # IOS docs I created 
 # Certificate Signing Requests


Apple requires you to generate a certificate signing request in order to get any form of certificate in the developer portal.

This is done easily in mac using its keychain application, but has to be done using the OpenSSL command line on linux.

For sake of compatibility, this document describes how to generate a CSR using the OpenSSL command line, since this method works accross all major platforms with OpenSSL.

The following set of commands will generate a public key `apple_pubkey.pem`, private key `apple_privkey.pem` and certificate signing request `apple_cert.csr`

```bash
openssl genrsa -out apple_privkey.pem 2048
```

```bash
openssl rsa -in apple_privkey.pem -pubout -out apple_pubkey.pem
```

```bash
openssl req -new -key apple_privkey.pem -out apple_cert.csr
```


After using these commands, you are able to use `apple_cert.csr` in order to generate certificates in the apple developer portal.

**I was on the only one on my team with a MAC to general CSR certs so this entire task was directed to me. Thers very little documentation for this stuff online its mostly guess work**


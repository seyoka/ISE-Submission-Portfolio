# ISE-Submission-Portfolio
 This is my immerisive software engineering college portfolio submission
 I hope this can better explain my code and things i was not able to address in the application
 This README explains: 
 - Dependencies
 - Issuing an apple pass
 - Openssl IOS NFC docs

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
- react-native-sectioned-multi-select: ^0.10.0
- react-native-svg: 13.9.0
- react-native-svg-transformer: ^1.3.0
- react-native-svg-uri: ^0.0.1
- react-native-ui-datepicker: ^2.0.2
- react-native-vector-icons: ^10.0.3
- twrnc: ^3.6.8
- expo-notifications: ~0.20.1
- expo-device: ~5.4.0
- expo-constants: ~14.4.2

## Development Dependencies

- @babel/core: ^7.20.0
- @faker-js/faker: ^8.4.1
- @types/expo__vector-icons: ^10.0.0
- @types/react: ~18.2.45
- @types/react-native: ~0.64.12
- @types/react-native-modern-datepicker: ^1.0.5
- typescript: ^5.1.3

# Issueing an apple pass 
I never got to full explain this portion in my application due to the world limit. I understand this part will not be graded as a result I still would like to explain it here and its very interesting to me. 

**continuation from where I said explained in Gitub**

Issuing apple passes is more involved,  firstly you have to be a registered apple developer. You have to register a new pass type in their developer portal using a CSR and get a pass-issuing certificate. You use that with the CSR private key and one of their in-date WDR certificates to generate a detached PKCS#7 signature of the pass manifest. Where the manifest is just a JSON document mapping file paths to their corresponding SHA1 hashes for verification purposes. The pass itself is just a .zip file containing a pass.json, manifest.json and signature as well as images, all bundled with the extension changed to .pkpass.

The redemption value also takes its cryptographic public key in base64, this is just the public counterpart of the private key that is loaded onto the pass reader hardware, used to enact secure communications.

 

 # IOS docs I created 
 ## Certificate Signing Requests


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

**I was on the only one on my team with a MAC, apple prefer you generate CSR certs with an apple device so this entire task was directed to me. Theres very little documentation for this stuff online so I decided to make some**


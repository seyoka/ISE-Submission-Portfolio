# Apple Wallet Pass NFC Support

In order to enable NFC on Apple wallet passes, you must first be approved by apple.

Afterwards, we have to generate private ECDSA key alongside its public counterpart (compressed).


Firstly, we generate the private key.

```bash
openssl ecparam -name prime256v1 -genkey -out nfc_privkey.pem
```


Then, we generate the compressed public key.   
This is what we put into the pass


```bash
openssl ec -in nfc_privkey.pem -pubout -out nfc_pubkey.pem -conf_form compressed
```


We take the content of the `nfc_pubkey.pem`, removing the prefix and postfix lines, and stripping away newlines. Leaving behind a singular line of base64 text.

It's that simple!



---
A special thank you to [PassNinja's Article](https://www.passninja.com/tutorials/apple-platform/how-to-create-apple-wallet-nfc-encryption-keys) for providing inspiration for this doc.

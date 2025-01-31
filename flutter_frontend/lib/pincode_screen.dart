import 'package:flutter/material.dart';
import 'package:pin_code_fields/pin_code_fields.dart'; // Import the package

class PincodeScreen extends StatefulWidget {
  const PincodeScreen({super.key});

  @override
  State<PincodeScreen> createState() => _PincodeScreenState();
}

class _PincodeScreenState extends State<PincodeScreen> {
  String pincode = '';

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Enter Pincode'),
      content: PinCodeTextField(
        length: 6,
        obscureText: false,
        animationType: AnimationType.fade,
        keyboardType: TextInputType.number, // Show numeric keyboard
        pinTheme: PinTheme(
          shape: PinCodeFieldShape.box,
          borderRadius: BorderRadius.circular(5),
          fieldHeight: 50,
          fieldWidth: 40,
          activeFillColor: Colors.white,
          inactiveColor: Colors.grey,       // Customize inactive color
          activeColor: Colors.blue,        // Customize active color
          selectedColor: Colors.green,     // Customize selected color
        ),
        onChanged: (value) {
          setState(() {
            pincode = value;
          });
        },
        appContext: context, // Important for some functionalities
      ),
      actions: <Widget>[
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: () {
            if (pincode.length == 6) {
              Navigator.of(context).pop(pincode);
            } else {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Invalid PIN. Please enter 6 digits.')),
              );
            }
          },
          child: const Text('Submit'),
        ),
      ],
    );
  }
}

// ... (How to use remains the same as in the previous example) ...
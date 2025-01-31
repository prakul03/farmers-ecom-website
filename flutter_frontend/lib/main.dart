import 'package:flutter/material.dart';
import 'package:flutter_frontend/start_page.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Farm Fresh',
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFC83D3B), // Red theme color
          brightness: Brightness.light, // Ensure light mode
        ),
        appBarTheme: AppBarTheme(
          titleTextStyle: GoogleFonts.lobster(
            color: Colors.green,
            fontSize: 30,
            fontWeight: FontWeight.bold,
          ),
          backgroundColor: Color(0xFFC83D3B), // AppBar uses theme color
          foregroundColor: Colors.white, // Text color in AppBar
          elevation: 0,
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFFC83D3B), // Button color
            foregroundColor: Colors.white, // Button text color
            padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 20),
            
          ),
        ),
        filledButtonTheme: FilledButtonThemeData(
          style: FilledButton.styleFrom(
            backgroundColor: const Color(0xFFC83D3B),
            foregroundColor: Colors.white,
          ),
        ),
        textButtonTheme: TextButtonThemeData(
          style: TextButton.styleFrom(
            foregroundColor: const Color(0xFFC83D3B), // Red text buttons
          ),
        ),
      ),
      home: const StartPage(),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_frontend/pincode_screen.dart';

class StartPage extends StatefulWidget {
  const StartPage({super.key});

  @override
  State<StartPage> createState() => _StartPageState();
}

class _StartPageState extends State<StartPage> {
  String? enteredPincode;
  void handlePincodeChange() async {
    final result = await showDialog(
        context: context,
        builder: (BuildContext context) {
          return const PincodeScreen();
        });
    if (result != null) {
      setState(() {
        enteredPincode = result; // Update the state with the PIN
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true, // Allows AppBar to be drawn over the image
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            floating: true, // AppBar reappears when scrolling up
            backgroundColor: Colors.black, // Background color
            expandedHeight: 60,
            pinned: false,
            snap: true,
            elevation: 0,
            title: Row(
              mainAxisAlignment:
                  MainAxisAlignment.spaceBetween, // Space items apart
              children: [
                // Left Side - App Title
                const Text(
                  "Farmers Nest",
                ),

                // Right Side - Pin Button & Login/Signup Button
                Row(
                  children: [
                    // "Pin" Text Button
                    TextButton(
                      onPressed: () {
                        handlePincodeChange();
                      },
                      child: Text(
                        enteredPincode == null || enteredPincode!.isEmpty
                            ? "Enter Pincode"
                            : "Pincode: $enteredPincode",
                        style: GoogleFonts.lato(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),

                    const SizedBox(width: 10), // Space between buttons

                    // "Login / Sign Up" Elevated Button
                    ElevatedButton(
                      onPressed: () {},
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white, // Button color
                        foregroundColor: Colors.black, // Text color
                        shape: RoundedRectangleBorder(
                          borderRadius:
                              BorderRadius.circular(4), // Square shape
                        ),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 16, vertical: 10),
                      ),
                      child: Text(
                        "Login / Sign Up",
                        style: GoogleFonts.lato(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const SizedBox(
                      width: 35,
                    )
                  ],
                ),
              ],
            ),
          ),
          SliverList(
            delegate: SliverChildListDelegate(
              [
                Stack(
                  children: [
                    // Black background to make text pop
                    ClipPath(
                      clipper: BottomSemiCircleClipper(),
                      child: Container(
                        width: double.infinity,
                        height:
                            500, // Adjust height to control image visibility
                        color: Colors.black,
                        child: Opacity(
                          opacity: 0.50, // Adjust transparency
                          child: Image.asset(
                            "assets/main_page_photo.jpeg",
                            width: double.infinity,
                            height: 500,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                    ),
                    ClipPath(
                      clipper: BottomSemiCircleClipper(),
                      child: SizedBox(
                        width: double.infinity,
                        height:
                            500, // Adjust height to control image visibility
                        child: Center(
                          // Ensures the Column is centered vertically and horizontally
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment
                                .center, // Centers children vertically
                            crossAxisAlignment: CrossAxisAlignment
                                .center, // Centers children horizontally
                            children: [
                              Text(
                                "5+ categories  • 200+ products",
                                textAlign: TextAlign
                                    .center, // Ensures text is centered
                                style: GoogleFonts.lato(
                                  color: Colors.white,
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(
                                  height: 10), // Adds spacing between texts
                              Text(
                                "All your Homely\nneeds delivered same day",
                                textAlign: TextAlign.center, // Centers text
                                style: GoogleFonts.lato(
                                  color: Colors.white,
                                  fontSize: 36,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 20),
                              ElevatedButton(
                                onPressed: () {},
                                child:  Text(
                                  "Shop Now",
                                  style: GoogleFonts.dmSerifDisplay(
                                    color: Colors.white,
                                    fontSize: 24,
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20), // Space below the image
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Text(
                    "Welcome to Farmers Nest",
                    style: GoogleFonts.lato(
                      color: Colors.black,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                // Sample content for scrolling
                for (int i = 0; i < 10; i++)
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Text(
                      "Dynamic scrolling content #$i",
                      style: GoogleFonts.lato(
                        color: Colors.black,
                        fontSize: 18,
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// Custom Clipper to Create a Semi-Circle Bottom
class BottomSemiCircleClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    Path path = Path();
    path.lineTo(0, size.height - 50);
    path.quadraticBezierTo(
      size.width / 2, size.height + 50, // Curve control point
      size.width, size.height - 50, // End point
    );
    path.lineTo(size.width, 0);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) => false;
}

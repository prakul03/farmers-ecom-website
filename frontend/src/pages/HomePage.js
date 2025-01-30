import React, { useState } from "react";
import "../css/HomePage.css";

const HomePage = () => {
  const [pincode, setPincode] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Fruits");
  const [location, setLocation] = useState(null); // State to hold location
  const [isChecked, setIsChecked] = useState(false); // To manage the state after checking pincode

  const categories = ["Fruits", "Vegetables", "Dairy & Poultry"];

  const products = {
    Fruits: [
      { id: 1, name: "Apple", image: "apple.jpg" },
      { id: 2, name: "Banana", image: "banana.jpg" },
      { id: 3, name: "Grapes", image: "grapes.jpg" },
    ],
    Vegetables: [
      { id: 4, name: "Carrot", image: "carrot.jpg" },
      { id: 5, name: "Tomato", image: "tomato.jpg" },
      { id: 6, name: "Potato", image: "potato.jpg" },
    ],
    "Dairy & Poultry": [
      { id: 7, name: "Milk", image: "milk.jpg" },
      { id: 8, name: "Eggs", image: "eggs.jpg" },
      { id: 9, name: "Chicken", image: "chicken.jpg" },
    ],
  };

  const handlePincodeChange = (e, index) => {
    const value = e.target.value;
    setPincode((prevPincode) => {
      const newPincode = prevPincode.split("");
      newPincode[index] = value;
      return newPincode.join("");
    });
    if (value && index < 5) {
      document.getElementById(`pincode-input-${index + 1}`).focus();
    }
  };

  // Function to fetch location details based on pincode
  const handleCheckPincode = async () => {
    if (pincode.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        console.log(data);  // Check the API response
        if (data && data[0].Status === "Success") {
          const place = data[0].PostOffice[0];
          // Fallback to District if City is undefined
          const city = place.City || place.District || "Location not found";
          setLocation(`${city}, ${pincode}`);
          setIsChecked(true); // Set the flag to hide input boxes
        } else {
          setLocation("Location not found for this pincode");
        }
      } catch (error) {
        setLocation("Error fetching location");
      }
    } else {
      setLocation("Please enter a valid 6-digit pincode");
    }
  };

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <nav>
        <h1>FarmersNest</h1>
        <div className="pincode-flexbox">
          {/* Conditionally render inputs or location based on isChecked */}
          {!isChecked ? (
            <>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="text"
                  id={`pincode-input-${index}`}
                  maxLength="1"
                  value={pincode[index] || ""}
                  onChange={(e) => handlePincodeChange(e, index)}
                  placeholder="-"
                />
              ))}
              <button onClick={handleCheckPincode}>Check</button>
            </>
          ) : (
            <div className="location-info">
              {/* Display the city and pincode */}
              {location && <p>{location}</p>}
            </div>
          )}
        </div>
        <button className="home-button">Home</button>
      </nav>

      <div className="main-content">
        <div className="content-area">
          {/* Categories Section (Centered) */}
          <div className="Categories">
            <h2>Categories</h2>
            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={selectedCategory === category ? "active" : ""}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Product List */}
          <ProductList category={selectedCategory} products={products} />
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ category, products }) => {
  return (
    <div className="ProductList">
      <h2>{category}</h2>
      <div className="product-grid">
        {products[category].map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

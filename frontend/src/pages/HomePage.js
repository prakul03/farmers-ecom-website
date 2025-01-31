import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";

const HomePage = () => {
const navigate = useNavigate();
  const [pincode, setPincode] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Fruits");
  const [location, setLocation] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [availableProducts, setAvailableProducts] = useState([]); // Filtered products for the user's city

  const categories = ["Fruits", "Vegetables", "Dairy & Poultry"];

  // Sample database of sellers (this would normally come from a backend)
  const sellersData = [
    {
      id: 1,
      city: "Mysore",
      products: [
        { id: 101, name: "Apple", category: "Fruits", image: "apple.jpg", pricePerKg: 100, quantities: [250, 500, 1000] },
        { id: 102, name: "Carrot", category: "Vegetables", image: "carrot.jpg", pricePerKg: 40, quantities: [500, 1000] },
        { id: 103, name: "Milk", category: "Dairy & Poultry", image: "milk.jpg", pricePerKg: 50, quantities: [500, 1000] }
      ]
    },
    {
      id: 2,
      city: "Bangalore",
      products: [
        { id: 104, name: "Banana", category: "Fruits", image: "banana.jpg", pricePerKg: 60, quantities: [1000, 2000] },
        { id: 105, name: "Tomato", category: "Vegetables", image: "tomato.jpg", pricePerKg: 30, quantities: [500, 1000, 2000] },
        { id: 106, name: "Eggs", category: "Dairy & Poultry", image: "eggs.jpg", pricePerKg: 80, quantities: [6, 12] }
      ]
    }
  ];

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

  // Function to fetch city based on pincode
  const handleCheckPincode = async () => {
    if (pincode.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();

        if (data && data[0].Status === "Success") {
          const place = data[0].PostOffice[0];
          const city = place.District || "Unknown City";
          setLocation(`${city}, ${pincode}`);
          setIsChecked(true);

          // Filter products available in this city
          const sellersInCity = sellersData.find((seller) => seller.city === city);
          setAvailableProducts(sellersInCity ? sellersInCity.products : []);
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

  // Reset pincode to allow user to enter a new one
  const handleResetPincode = () => {
    setPincode("");
    setIsChecked(false);
    setLocation(null);
    setAvailableProducts([]);
  };

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <nav>
        <h1>FarmersNest</h1>
        <div className="pincode-flexbox">
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
              {location && <p>{location}</p>}
              <button onClick={handleResetPincode}>Change Pincode</button> {/* Allow to change pincode */}
            </div>
          )}
        </div>
        <button className="home-button" onClick={() => navigate("/")}>Home</button>
      </nav>

      <div className="main-content">
        <div className="content-area">
          {/* Categories Section */}
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
          <ProductList category={selectedCategory} products={availableProducts} />
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
        {products
          .filter((product) => product.category === category)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(product.quantities[0]); // Default quantity

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <p>Price: ₹{(product.pricePerKg * selectedQuantity) / 1000}</p>
      
      <select
        value={selectedQuantity}
        onChange={(e) => setSelectedQuantity(Number(e.target.value))}
      >
        {product.quantities.map((quantity) => (
          <option key={quantity} value={quantity}>
            {quantity}g
          </option>
        ))}
      </select>

      <button className="add-to-cart">Add</button>
    </div>
  );
};

export default HomePage;

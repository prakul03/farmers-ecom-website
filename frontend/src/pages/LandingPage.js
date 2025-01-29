import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../css/LandingPage.css"; 

const Navbar = () => {
  const navigate = useNavigate(); 

  const handleSignUp = () => {
    navigate("/signup"); 
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <h1>FarmersNest</h1>
      <div>
        <button className="sign-up" onClick={handleSignUp}>
          Sign Up
        </button>
        <button className="login" onClick={handleSignIn}>
          Login
        </button>
      </div>
    </nav>
  );
};

const HeroSection = () => (
  <section className="hero-section">
    <h1>Fresh Ingredients, Delivered</h1>
    <p>
      Sourcing the best for your restaurant, cloud kitchen, or food business.
      Fresh, organic, and locally sourced ingredients delivered directly to you.
    </p>
    <button>Shop</button>
  </section>
);

const WhyThisSection = () => (
  <section className="why-this-section">
    <h2>Why FarmersNest?</h2>
    <p>
      We ensure the freshest and most organic ingredients, direct from trusted
      farmers. Join us to revolutionize your kitchen sourcing with reliability
      and quality.
    </p>
  </section>
);

const CategoryCard = ({ category }) => (
  <div className="category-card">{category}</div>
);

const CategoriesSection = () => {
  const categories = ["Fresh Produce", "Dairy & Poultry", "Dry Groceries"];
  return (
    <section className="categories-section">
      <h2>Our Categories</h2>
      <div className="grid">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </section>
  );
};

const TestimonialCard = ({ text, author }) => (
  <div className="testimonial-card">
    <p>"{text}"</p>
    <p className="author">- {author}</p>
  </div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "FarmersNest has transformed our kitchen sourcing!",
      author: "Happy Restaurant Owner",
    },
  ];
  return (
    <section className="testimonial-section">
      <h2>What Our Customers Say</h2>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={index}
          text={testimonial.text}
          author={testimonial.author}
        />
      ))}
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2025 FarmersNest. All Rights Reserved.</p>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="container">
      <Navbar />
      <HeroSection />
      <WhyThisSection />
      <CategoriesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
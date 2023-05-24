import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "../CSS/category.css";

function CategoryProduct({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  const handleAllClick = () => {
    setSelectedCategory("");
    if (onCategorySelect) {
      onCategorySelect("");
    }
  };

  return (
    <div className="container">
      <ButtonGroup aria-label="Basic example" className="jarak">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={selectedCategory === category ? "primary" : "secondary"}
            className="mr-2"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
        <Button
          variant={selectedCategory === "" ? "primary" : "secondary"}
          className="mr-2"
          onClick={handleAllClick}
        >
          All
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default CategoryProduct;

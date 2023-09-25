import React, { useState, useEffect } from 'react';
import './AvailableMeals.css';
import Card from '../UI/Card';
import MealItem from './MealItem';
import axios from 'axios';

const AvailableMeals = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // It Fetches menu data from the database URL
    axios.get('https://cloud-kitchen-9d689-default-rtdb.firebaseio.com/menu.json')
      .then((response) => {
        const menuData = response.data;
  
        if (menuData !== null) { // It Checks if the menuData is not null or null
          const menuItems = [];
  
          for (const key in menuData) {
            menuItems.push({
              id: key,
              name: menuData[key].name,
              description: menuData[key].description,
              price: menuData[key].price,
            });
          }
  
          setMenu(menuItems);
          setIsLoading(false);
        } else {
           console.error('Menu data is null.');
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching menu data:', error);
        console.error('Requested URL:', 'https://cloud-kitchen-9d689-default-rtdb.firebaseio.com/menu.json');
        setIsLoading(false);
      });
      
  }, []);
  
  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Maps the fetched menu data to create a list of MealItem components
  const mealsList = menu.map((meal) => (
    <MealItem key={meal.id} id={meal.id} name={meal.name} price={meal.price} description={meal.description} />
  ));

  return (
    <section className="meals">
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

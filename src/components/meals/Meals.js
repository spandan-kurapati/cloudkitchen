import React from 'react'
import MealsSummary from './MealsSummary'
import AvailableMeals from './AvailableMeals'

export const Meals = () => {
  return (
    <>
    <MealsSummary/>
    <AvailableMeals/>
    </>
  )
}

export default Meals

//This component is the root component for displaying meal-related content. 
// It includes MealsSummary, which provides a summary of the available meals, and AvailableMeals, which lists the individual meal items.
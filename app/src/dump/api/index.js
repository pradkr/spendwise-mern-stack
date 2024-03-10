import { useState } from 'react'

const PORT = process.env.PORT || 5000;
const HOSTNAME_AND_PORT  = process.env.URL  || `http://localhost:${PORT}`;

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch(`${HOSTNAME_AND_PORT}/api/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			console.log('Login successful')
			window.location.href = '/dashboard'
		} else {
			console.log('Invalid login credentials')
		}
	}

// const recipes = {
//   appetizer: [
//     {
//       id: "app01",
//       title: "Pesto Puff Pastry Pinwheel",
//       description:
//         "With three main ingredients you can make this gorgeous giant puff pastry pinwheel in no time. Pesto and ricotta fill layers of puff pastry that are cut and twisted into a pinwheel which begs to be pulled apart!",
//       rating: 5,
//       ingredients: [
//         "2 sheets puff pastry",
//         "2 teaspoons all-purpose flour",
//         "8 1/2 ounces ricotta cheese",
//         "8 1/2 ounces pesto"
//       ],
//       prepTime: 25,
//       cookTime: 25,
//       instructions: [
//         {
//           id: 1,
//           text:
//             "Preheat oven to 400 degrees F (200 degrees C). Line a baking tray with parchment paper and dust lightly with flour."
//         },
//         {
//           id: 2,
//           text:
//             "Lay puff pastry on a flat work surface; cut a 12-inch circle from each sheet. Transfer 1 circle to the prepared baking sheet."
//         },
//         {
//           id: 3,
//           text:
//             "Spread ricotta evenly over the pastry circle. Top with an even layer of pesto. Lay the second pastry circle on top. Set a small glass upside down in the middle of the circle."
//         },
//         {
//           id: 4,
//           text:
//             "Cut the circle, away from the glass, into 4 equal quarters. Cut each quarter in half, then each eighth in half, to make 16 equal strips. Remove glass. Twist strips twice, two at a time, in the opposite direction. Pinch ends together. Repeat with remaining strips to make a pinwheel shape."
//         },
//         {
//           id: 5,
//           text:
//             "Bake in the preheated oven until pastry is browned, 25 to 30 minutes."
//         }
//       ]
//     },
//     {
//       id: "app02",
//       title: "Simple Deviled Eggs",
//       description:
//         "The eggs are delicious, and it's easy to make more for larger gatherings. I've added onion and celery for a little more flavor and texture.",
//       rating: 4,
//       ingredients: [
//         "6 hard-boiled eggs",
//         "2 tablespoons mayonnaise",
//         "1 teaspoon white sugar",
//         "1 teaspoon white vinegar",
//         "1 teaspoon prepared mustard",
//         "1/2 teaspoon salt",
//         "1 tablespoon finely chopped onion",
//         "1 tablespoon finely chopped celery",
//         "1 pinch paprika"
//       ],
//       prepTime: 15,
//       cookTime: 10,
//       instructions: [
//         {
//           id: 1,
//           text:
//             "Slice eggs in half lengthwise and remove yolks; set whites aside. Mash yolks with a fork in a small bowl. Stir in mayonnaise, sugar, vinegar, mustard, salt, onion, and celery; mix well. Stuff or pipe egg yolk mixture into egg whites. Sprinkle with paprika. Refrigerate until serving."
//         }
//       ]
//     },
//     {
//       id: "app03",
//       title: "Southwestern Egg Rolls",
//       description:
//         "These aren't traditional egg rolls! Small flour tortillas are stuffed with an exciting blend of Southwestern-style ingredients, then deep fried until golden brown.",
//       rating: 5,
//       ingredients: [
//         "2 tablespoon vegetable oil",
//         "1 skinless, boneless chicken breast half",
//         "2 tablespoons minced green onion",
//         "2 tablespoons minced red bell pepper",
//         "1/3 cup frozen corn kernels",
//         "1/4 cup black beans, rinsed and drained",
//         "2 tablespoons frozen chopped spinach, thawed and drained",
//         "2 tablespoons diced jalapeno peppers",
//         "1/2 tablespoon minched fresh parsley",
//         "1/2 teaspoon ground cumin",
//         "1/2 teaspoon chili powder",
//         "1/3 teaspoon salt",
//         "1 pinch ground cayenne pepper",
//         "3/4 cup shredded Monterey Jack cheese",
//         "5 flour tortillas",
//         "1 quart oil for deep frying"
//       ],
//       prepTime: 20,
//       cookTime: 12,
//       instructions: [
//         {
//           id: 1,
//           text:
//             "Rub 1 tablespoon vegetable oil over chicken breast. In a medium saucepan over medium heat, cook chicken approximately 5 minutes per side, until meat is no longer pink and juices run clear. Remove from heat and set aside."
//         },
//         {
//           id: 2,
//           text:
//             "Heat remaining 1 tablespoon vegetable oil in a medium saucepan over medium heat. Stir in green onion and red pepper. Cook and stir 5 minutes, until tender."
//         },
//         {
//           id: 3,
//           text:
//             "Dice chicken and mix into the pan with onion and red pepper. Mix in corn, black beans, spinach, jalapeno peppers, parsley, cumin, chili powder, salt and cayenne pepper. Cook and stir 5 minutes, until well blended and tender. Remove from heat and stir in Monterey Jack cheese so that it melts."
//         },
//         {
//           id: 4,
//           text:
//             "Wrap tortillas with a clean, lightly moist cloth. Microwave on high approximately 1 minute, or until hot and pliable."
//         },
//         {
//           id: 5,
//           text:
//             "Spoon even amounts of the mixture into each tortilla. Fold ends of tortillas, then roll tightly around mixture. Secure with toothpicks. Arrange in a medium dish, cover with plastic, and place in the freezer. Freeze at least 4 hours."
//         },
//         {
//           id: 6,
//           text:
//             "In a large, deep skillet, heat oil for deep frying to 375 degrees F (190 degrees C). Deep fry frozen, stuffed tortillas 10 minutes each, or until dark golden brown. Drain on paper towels before serving."
//         }
//       ]
//     }
//   ],
//   breakfast: [
//     {
//       id: "brk01",
//       title: "Soft Scrambled Eggs",
//       author: "Esther",
//       description:
//         "Eggs, milk and cheese are blended and scrambled slowly over low heat to keep texture soft.",
//       rating: 4,
//       ingredients: [
//         "5 eggs",
//         "1/2 cup milk",
//         "1/4 cup cottage cheese",
//         "salt and ground black pepper",
//         "1 tablespoon butter"
//       ],
//       prepTime: 5,
//       cookTime: 10,
//       instructions: [
//         {
//           id: 1,
//           text:
//             "Lightly beat eggs together using a fork in a large bowl. Add milk, cottage cheese, salt, and pepper; beat for approximately 1 minute."
//         },
//         {
//           id: 2,
//           text:
//             "Heat a large saute pan over medium heat. Melt butter in the hot pan, making sure not to let it burn. Give eggs 1 last mix and pour into the pan. Reduce heat to low and cook, stirring frequently and slowly, about 10 minutes. Remove from heat, allowing eggs to continue to cook slightly after heat is gone. Garnish with parsley and serve."
//         }
//       ]
//     },
//     {
//       id: "brk02",
//       title: "Apple Cinnamon Oatmeal",
//       author: "Doug",
//       description: "This is an amazing and simple recipe that kids will love!",
//       rating: 3,
//       ingredients: [
//         "1 cup water",
//         "1/4 cup apple juice",
//         "1 apple, cored and chopped",
//         "2/3 cup rolled oats",
//         "1 teaspoon ground cinnamon",
//         "1 cup milk"
//       ],
//       prepTime: 5,
//       cookTime: 5,
//       instructions: [
//         {
//           id: 1,
//           text:
//             "Combine the water, apple juice, and apples in a saucepan. Bring to a boil over high heat, and stir in the rolled oats and cinnamon. Return to a boil, then reduce heat to low, and simmer until thick, about 3 minutes. Spoon into serving bowls, and pour milk over the servings."
//         }
//       ]
//     },
//     {
//       id: "brk03",
//       title: "Breakfast Baked Potato",
//       author: "Shandel",
//       rating: 5,
//       description:
//         "A quick and excellent breakfast recipe that is easy to prepare and is super delicious!",
//       ingredients: [
//         "1 large potato",
//         "1 tablespoon vegetable oil",
//         "1 pinch salt",
//         "1/8 pound sausage",
//         "2 slices bacon",
//         "4 tablespoons butter",
//         "Salt and ground black pepper",
//         "2 eggs",
//         "1 tablespoon milk",
//         "1/4 cup shredded Cheddar cheese"
//       ],
//       prepTime: 15,
//       cookTime: 55,
//       instructions: [
//         {
//           id: 1,
//           text: "Preheat the oven to 425 degrees F (220 degrees C)"
//         },
//         {
//           id: 2,
//           text:
//             "Rub potato with vegetable oil and salt. Prick several times with a fork and wrap in aluminum foil. Place on a baking sheet."
//         },
//         {
//           id: 3,
//           text:
//             "Bake in the preheated oven until squeezable yet firm, about 50 minutes."
//         },
//         {
//           id: 4,
//           text:
//             "While potato is cooking, heat a large skillet over medium-high heat. Cook and stir sausage in the hot skillet until browned and crumbly, 5 to 7 minutes. Drain and discard grease. Set sausage aside in a bowl."
//         },
//         {
//           id: 5,
//           text:
//             "Place bacon in the large skillet and cook over medium-high heat, turning occasionally, until evenly browned, about 10 minutes. Drain bacon slices on paper towels. Let cool slightly; crumble."
//         },
//         {
//           id: 6,
//           text:
//             "Remove potato from the oven. Slice in the center to create a pocket; add 2 tablespoons butter, salt, and pepper to the potato. Stuff potato with crumbled sausage and bacon."
//         },
//         {
//           id: 7,
//           text: "Whisk eggs, milk, salt, and pepper together in a bowl."
//         },
//         {
//           id: 8,
//           text:
//             "Heat remaining 2 tablespoons butter in a nonstick skillet over medium heat. Pour egg mixture into skillet and scramble to desired doneness, about 5 minutes."
//         },
//         {
//           id: 9,
//           text:
//             "Place scrambled eggs on top of meat in potato. Sprinkle Cheddar cheese on top of warm eggs."
//         }
//       ]
//     }
//   ],
//   desserts: [
//     {
//       id: "dess01",
//       title: "Frosted Pumpkin Bars",
//       description:
//         "These bars mix up quickly. They're moist and delicious with a wonderful cream cheese frosting. They are especially good when chilled in the refrigerator before serving.",
//       rating: 5,
//       prepTime: 15,
//       cookTime: 35,
//       ingredients: [
//         "1 can solid pack pumpkin",
//         "2 1/2 cups white sugar",
//         "1 1/2 cups vegetable oil",
//         "5 eggs",
//         "3 cups all-purpose flour",
//         "1 tablespoon baking powder",
//         "2 teaspoons ground cinnamon",
//         "2 teaspoons pumpkin pie spice",
//         "1 1/2 teaspoons baking soda",
//         "1 1/2 teaspoons salt",
//         "2 packages cream cheese, softened",
//         "1/2 cup butter",
//         "2 teaspoons vanilla extract",
//         "2 cups sifted confectioners' sugar"
//       ],
//       instructions: [
//         {
//           id: 1,
//           text:
//             "Preheat oven to 350 degrees F (175 degrees C). Lightly grease a jelly roll pan."
//         },
//         {
//           id: 2,
//           text:
//             "Beat pumpkin, white sugar, vegetable oil, and eggs together in a large mixing bowl. Combine flour, baking powder, cinnamon, pumpkin pie spice, baking soda, and salt in a sifter; sift into the pumpkin mixture and mix well; pour into the prepared pan."
//         },
//         {
//           id: 3,
//           text:
//             "Bake in preheated oven until center springs back when lightly touched, 35 to 40 minutes. Cool completely before frosting."
//         },
//         {
//           id: 4,
//           text:
//             "Beat cream cheese and butter together in a bowl until smooth; add vanilla extract and beat. Gradually beat confectioners' sugar into the frosting, adding in small amounts and assuring each batch is incorporated before introducing the next. Spread over the pumpkin bars."
//         }
//       ]
//     },
//     {
//       id: "dess02",
//       title: "Black Walnut Ice Cream",
//       rating: 4,
//       description:
//         "Black walnuts taste very different from English walnuts, so this recipe was created to offer that unique flavour!",
//       prepTime: 10,
//       cookTime: 60,
//       ingredients: [
//         "1/2 cup superfine sugar",
//         "2 cups light cream",
//         "1 cup half-and-half cream",
//         "1/2 teaspoon black walnut extract",
//         "1/2 cup chopped black walnuts"
//       ],
//       instructions: [
//         {
//           id: 1,
//           text:
//             "In a medium bowl, stir together the sugar, light cream, half-and-half and black walnut extract. Pour into the container of an ice cream maker, and freeze according to the manufacturer's instructions. When ice cream is done, fold in walnuts, and transfer to a freezer container. Freeze until solid."
//         }
//       ]
//     },
//     {
//       id: "dess03",
//       title: "Too Much Chocolate Cake",
//       rating: 5,
//       description: "This cake won the first prize at the county fair!",
//       prepTime: 10,
//       cookTime: 40,
//       ingredients: [
//         "1 package devil's food cake",
//         "1 package instant chocolate pudding mix",
//         "1 cup sour cream",
//         "4 eggs",
//         "1/2 cup warm water",
//         "2 cups semisweet chocolate chips",
//         "1 cup vegetable oil"
//       ],
//       instructions: [
//         {
//           id: 1,
//           text: "Preheat oven to 350 degrees F (175 degrees C)."
//         },
//         {
//           id: 2,
//           text:
//             "In a large bowl, mix together the cake and pudding mixes, sour cream, oil, beaten eggs and water. Stir in the chocolate chips and pour batter into a well greased 12 cup bundt pan."
//         },
//         {
//           id: 3,
//           text:
//             "Bake for 50 to 55 minutes, or until top is springy to the touch and a wooden toothpick inserted comes out clean. Cool cake thoroughly in pan at least an hour and a half before inverting onto a plate If desired, dust the cake with powdered sugar."
//         }
//       ]
//     }
//   ]
// };

// export const getCategories = () => Promise.resolve(Object.keys(recipes));

// export const getRecipes = category =>
//   Promise.resolve(
//     recipes[category].map(
//               ({ id, title, prepTime, cookTime, description, rating }) => {
//         return { id, title, prepTime, cookTime, description, rating };
//       }
//     )
//   );

// export const getRecipe = id =>
//   Promise.resolve(
//     Object.values(recipes)
//       .flat()
//       .filter(i => i.id === id)
//   );

export const doLogin = (email, password) =>
  new Promise((resolve, reject) => {
    if (email === "homer@springfield.com" && password === "donuts") {
      resolve({ name: "Homer Simpson", userId: "HMSP01" });
    } else {
      reject("Incorrect email or password...");
    }
  });

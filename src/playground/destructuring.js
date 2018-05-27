//
// Object Destructuring
//

// const person = {
//   age: 26,
//   location: {
//     city: 'Tarlac',
//     temp: 32
//   }
// };

// const { name: firstName = 'Anonymous', age } = person;
// console.log(`${firstName} is ${age} year(s) old.`);

// const { city, temp: temperature } = person.location;

// if (city && temperature) {
//   console.log(`It's ${temperature} in ${city}.`);
// }

// const book = {
//   title: 'Programming in C',
//   author: 'Dennis Ritchie',
//   publisher: {
//     name: 'Burikat Paltik'
//   }
// };

// const { name: publisherName = 'Self-Published' } = book.publisher;
// console.log(publisherName);

//
// Array Destructuring
//

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
const [, city, state = 'Central Luzon'] = address;
console.log(`You are in ${city}, ${state}`);

const item = ['Coffee (Hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);
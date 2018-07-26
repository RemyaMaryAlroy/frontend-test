// Data array

let dataArray = [
	{ firstname: 'Jan', name: 'Müller', age: 35 },
	{ firstname: 'David', name: 'Johnson', age: 24 },
	{ firstname: 'John', name: 'Papa', age: 43 },
	{ firstname: 'Philip', name: 'Georges', age: 19 },
	{ firstname: 'Christian', name: 'Laval', age: 30 }
];



// For all answers, just log the result: console.log()

// Write a script to check if someone in the dataArray
// is more than 40 years old (script should return true or false)
// It should work with any array with the same structure

function ageCheck(inputArray) {
	var check = false;
	inputArray.forEach(item => {
		if(item.age > 40)
		 {
		 	check = true;
		 }
	 });
	return check;
};
console.log("AGE MORE THAN 40");
console.log(ageCheck(dataArray));

// Make an array containing only the names inside
// Result should be: [ 'Müller', 'Johnson', 'Papa', 'Georges', 'Laval']
function nameArray(inputArray){
	let nameArray = [];
	inputArray.forEach(item =>{
		 nameArray.push(item.name);
	});
	return nameArray;
};
console.log("NAME ARRAY");
console.log(nameArray(dataArray));

// Make from data array a new array with only the persons less than 35 years old inside
// The new array should look like this at the end :
/*
[
 { firstname: 'David', name: 'Johnson', age: 24 },
 { firstname: 'Philip', name: 'Georges', age: 19 },
 { firstname: 'Christian', name: 'Laval', age: 30 }
 ];
 
*/

function newArray(inputArray){
  let newArray = [];
  inputArray.forEach(item =>{
     if(item.age < 35){
     	newArray.push({'firstname': item.firstname, 'name': item.name, 'age': item.age});
     }
  });
  return newArray;
};
console.log("NEW ARRAY");
console.log(newArray(dataArray));










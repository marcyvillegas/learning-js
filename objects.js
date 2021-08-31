/*
    CODES WITH NOTES

    Topics:
    TOPIC #1: USING EVENTS
    TOPIC #2: PASS BY REFERENCE
    TOPIC #3: LOOPING THROUGH OBJECTS
    TOPIC #4: "THIS" KEYWORD
    TOPIC #5: GETTERS
    TOPIC #6: SETTERS
    TOPIC #7: FACTORY FUNCTIONS
    TOPIC #8: DESTRUCTED ASSIGNMENT
    TOPIC #9: CLASSES
    TOPIC #10: METHODS AND METHOD CALLS
*/

// TOPIC #1: USING EVENTS

//Object car
var cars = {
  label: 'Autos',
  subs: [
    {
      label: 'SUVs',
      subs: []
    },
    {
      label: 'Trucks',
      subs: [
        {
          label: '2 Wheel Drive',
          subs: []
        },
        {
          label: '4 Wheel Drive',
          subs: [
            {
              label: 'Ford',
              subs: []
            },
            {
              label: 'Chevrolet',
              subs: []
            }
          ]
        }
      ]
    },
    {
      label: 'Sedan',
      subs: []
    }
  ]
};


//Console log example
console.log(cars.subs[0].label); //SUVs
console.log(cars.subs[1].subs[1].label); //4 Wheel Drive
console.log(cars.label); //Autos


/*
BUTTON TRUCK

This will only print once because the element "p" has already been made. The creation of the element p is not inside the whenClicked() function.

This function also uses an attached event to the HTML.
*/
let textContainer = document.querySelector(".events-container");
let text = document.createElement("p");
textContainer.appendChild(text);

function whenClicked() {
  text.innerText = `The objects cars has a label property:  ${cars.subs[1].label}`; //Trucks
}

/*
BUTTON FORD

This will print multiple times because the creation of the element "p" is inside the Event Listener function.

This function used Event Handlers. The function will work regardless of what kind of event handlers you use.
*/
let button = document.querySelector("#sample-button");

button.addEventListener("click", () => {
  let text = document.createElement("p");
  textContainer.appendChild(text);
  text.innerText = `The object has many nested subs and has a label property of:  ${cars.subs[1].subs[1].subs[0].label}`; //Ford
});



// TOPIC #2: PASS BY REFERENCE

//Object spaceship
let spaceship = {
  'Fuel Type': 'Turbo Fuel',
  homePlanet: 'Earth',
  color: 'silver'
};

/*
As you can see, you can change the value of the property of an object using a function.
*/
let greenEnergy = () => {
  spaceship['Fuel Type'] = 'avocado oil';
}

greenEnergy();

/*
Objects can be passed as an reference. Meaning that we can use it arugment and the computer will generate it as a placeholder.

In the function paintIt() the "obj" is the placeholder and it is pointing to the object spaceship.
*/
let paintIt = obj => {
  obj.color = 'glorious gold'
};

paintIt(spaceship);

/*
We can also add a property using this
*/
let remotelyDisable = obj => {
  obj['disabled'] = true;
};

remotelyDisable(spaceship);

/*
Console log to see the results
*/
console.log(spaceship);
/* OUTPUT
Fuel Type: "avocado oil"
color: "glorious gold"
disabled: true
homePlanet: "Earth"
*/



// TOPIC #3: LOOPING THROUGH OBJECTS

//Object nasaShip
let nasaShip = {
  crew: {
    captain: {
      name: 'Lily',
      degree: 'Computer Engineering',
      cheerTeam() { console.log('You got this!') }
    },
    'chief officer': {
      name: 'Dan',
      degree: 'Aerospace Engineering',
      agree() { console.log('I agree, captain!') }
    },
    medic: {
      name: 'Clementine',
      degree: 'Physics',
      announce() { console.log(`Jets on!`) }
    },
    translator: {
      name: 'Shauna',
      degree: 'Conservation Science',
      powerFuel() { console.log('The tank is full!') }
    }
  }
};

/*
We can loop through objects using the for ... in.

Just like in a for loop, you need to declare a variable that will the placeholder of the value.

The variable "crewMember" here is used as a placeholder only for all the "crew" property of the nasaShip object. But when getting the value of a property under the variable "crewMember", we also need to call all the outer objects which is seen in "nasaShip.crew[crewMember].name"
*/
for (let crewMember in nasaShip.crew) {
  console.log(`${crewMember}: ${nasaShip.crew[crewMember].name}`);
}
/* OUTPUT
captain: Lily
medic: Clementine
chief officer: Dan
translator: Shauna
*/

/*
Outer objects are also included here since we want to loop the properties under the variable "crewMember"
*/
for (let crewMember in nasaShip.crew) {
  console.log(`${nasaShip.crew[crewMember].name}: ${nasaShip.crew[crewMember].degree}`);
}
/* OUTPUT
Lily: Computer Engineering
Dan: Aerospace Engineering
Clementine: Physics
Shauna: Conservation Science
*/



// TOPIC #4: "THIS" KEYWORD

//Object robot
const robot = {
  model: '1E78V2',
  energyLevel: 100,
  speed: 1000,
  provideInfo() {
    return `I am ${this.model} and my current energy level is ${this.energyLevel}.`;
  },
  giveSpeed() {
    console.log(`The speed is ${this.speed}.`);
  }
};
/*
To access the object robot's own property, we need to use the word THIS.

Also, don't use arrow functions when using THIS keyword because it will consider the "this.variable" as a global scope without the value of the property. The output will onlly return undefined.
*/

console.log(robot.provideInfo());
// OUTPUT: I am 1E78V2 and my current energy level is 100.

robot.giveSpeed();
// OUTPUT: TThe speed is 1000.



// TOPIC #5: GETTERS

//Object machine
const machine = {
  toaster: {
    _model: 'Wall-E',
    _energyLevel: 100,
    _numOfSensors: 15,
    get energyLevel() {
      if (typeof this._energyLevel === "number") {
        return "My energy level last time was " + this._energyLevel;
      } else {
        return "System malfunction: cannot retrieve energy level";
      }
    },
    set numOfSensors(num) {
      if (typeof num === "number" && num >= 0) {
        this._numOfSensors = num;
      } else {
        console.log("Pass in a number that is greater than or equal to 0");
      }
    }
  }
};
/*
The "_" before the variable are an indication for other developers to not reassign the value of it.

get functionName() is used instead of a normal function to add more privacy to the code.
This is used to get properties of the object.

Also, when returning you cannot use the ${ }. You can only append strings or the variable.
*/

console.log(machine.toaster.energyLevel);
//OUTPUT: My current energy level is 100



// TOPIC #6: SETTERS

//use Object machine
/*
We use setters to reassign values of existing properties within an object.

We must set a parameter. In this case we used "num."
*/

robot.numOfSensors = 35; //Assign a new value

console.log(robot.numOfSensors);
//OUTPUT: 35



// TOPIC #7: FACTORY FUNCTIONS

//Object robotFactory
const robotFactory = (model, mobile) => {
  return {
    model,
    mobile,
    beep() {
      console.log("Beep Boop");
    },
    get showModel() {
      return "The model is " + this.model;
    }
  }
};
/*
Factory functioning is like object constructors but instead of using "new" to create an object, factory functions simply creates an object and returns it.

Factory Functions in JavaScript are similar to constructor functions/class functions, but they do not require the use of the ‘this‘ keyword for inner values or the use of the ‘new‘ keyword when instantiating new objects.

Here we also used Property Value Shorthand where instead of "model: model" we only used "model"
But this is still not yet available to Internet Explorer 11.
*/

const tinCan = robotFactory("Mars123", true); //Created new object
const paperClip = robotFactory("Venus23", false); //Created another object
const rustedFork = robotFactory("Forky382", true); //Created another objectS

tinCan.beep(); //Calling the beep() method
//OUTPUT: Beep Boop

console.log(tinCan.showModel); //Calling the getter showModel
//OUTPUT: The model is Mars123

/*
There is another way to write factory functions in a short hand method way.

This is called Destructuring
*/
const personFactory = (name, age) => {
  const sayHello = () => console.log('hello!');

  return { name, age, sayHello };
};

// TOPIC #8: DESTRUCTED ASSIGNMENT

//Object obj
const obj = {
  name: 'Mr. Obj',
  pastTime: 'Volley Ball',
  yearsTraining: [ 1992, 1993, 1994, 1995, 1996],
  child: {
    bunso: "Margott",
    gitna: "Marcy",
    panganay: "Mikay",
  }
};

const { name } = obj;
console.log(name);
//OUTPUT: Mr. Obj

const { yearsTraining } = obj;
console.log(yearsTraining[0]);
//OUTPUT: 1992

const { bunso } = obj.child;
console.log(bunso);
//OUTPUT: Margott

/*
You can the value of a property using destructed assignment with the syntax of:

const { property } = object;
*/



// TOPIC #9: CLASSES

//Object literal halley
let dog_01 = {
  _name: 'Halley',
  _behavior: 0,
 
  get name() {
    return this._name;
  },
 
  get behavior() {
    return this._behavior;
  },
 
  incrementBehavior() {
    this._behavior++;
  }
};
/*
Instead of doing dog_01, dog_02, dog_03 and so on. You can create a class contrcutor for the object dog.
*/

//Class constructor
class Dog {
  constructor(name) {
    this._name = name;
    this._behavior = 0;
  }

  get name() {
    return this._name;
  }
  get behavior() {
    return this._behavior;
  }   

  incrementBehavior() {
    this._behavior ++;
  }
}
/*
You can create a new object Dog using the constructor.

This serves as a template or blueprint for creating Dog objects. A class has an object named constructor which is respansible for creating the properties and its values.

Here, you will put the parameters and use the "this" keyword to pass values when a new object will be created.
*/

const halley = new Dog('Halley'); //Create new object Dog or Dog instance

console.log(halley.name); // Print name value to console
console.log(halley.behavior); // Print behavior value to console
halley.incrementBehavior(); // Add one to behavior
console.log(halley.behavior); // Print behavior value to console

const ulap = new Dog('Ulap');
/*
With this, we can create instances(another object) using the ocnsttuctor. This uses the keyword "new"

Inside the parenthesis are parameters passed to the constructor which again creates the object for us.
*/



// TOPIC #10: METHODS AND METHOD CALLS

//Class constructor of Surgeon
class Surgeon {
  constructor(name, department) {        //Always close the constructor in  curly braces
    this._name = name;
    this._department = department;
    this._remainingVacationDays = 20;
  }

    get name(){                         //Separate from the getters, setters and methods
      return this._name;
    }

  get department(){
    return this._department;
  }

  get remainingVacationDays(){
    return this._remainingVacationDays;
  }

  takeVacationDays(daysOff){
    return this._remainingVacationDays -= daysOff;
  }
}

const surgeonRomero = new Surgeon('Francisco Romero', 'Cardiovascular');
const surgeonJackson = new Surgeon('Ruth Jackson', 'Orthopedics');

console.log(surgeonJackson.takeVacationDays(10));
//OUTPUT: 10
//sadfg


/*
-----------------------REMINDER---------------------------

We should use factory functions rather than Classes. This is because

---------------------------------------------------------
*/



// TOPIC #11: INHERITANCE I





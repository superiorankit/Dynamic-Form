const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR'
});


let price = 535.00;
let tPrice = 535.00;
let tax=35.40;
let total = 570.40;

let passList = [6, 5, 4, 3, 2]

let passLength = 1;;


let passengerBox = document.getElementById("passengerBox");

const addPass = (id) => {
  let addError = document.getElementById('addDelError');
  if (passList.length !== 0) {
    addError.innerHTML = ""
    passLength++;

    let passNum = passList.pop();

    let passDetailBox = document.createElement("div");

    passDetailBox.setAttribute("class", "passDetailBox");
    passDetailBox.id = `passenger${passNum}`;

    passDetailBox.innerHTML = `<div class="btnGrp">
    <img class="add" src="./assets/images/plus.png" onclick="addPass('passenger${passNum}')"/>
  </div><div class="passBorder" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
      <h3>Passenger ${passLength}</h3>
      <img class="delete" src="./assets/images/cross.png" onclick="delPass('passenger${passNum}')" />
    </div>

    <div class="passDetail">
    <div class="input">
      <label for="name1">Passenger name*</label>
      <input type="text" class="name" id="name${passNum}" oninput="handleKey(event,'name')"/>
      <p class="error"></p>
    </div>
    <div class="input">
      <label for="name1">Age*</label>
      <input type="text" class="age" id="age${passNum}"" onkeypress="handleLength(event,'age')" oninput="handleKey(event,'number')" />
      <p class="error"></p>
      </div> 
      <div class="input">
      <select name="gender${passNum}" class="gender" id="gender${passNum}">
        <option value="select" selected>Select Gender</option>
        <option value="male">Male</option>
        <option value=female">Female</option>
        <option value="other">Other</option>
      </select>
      <p class="error"></p>
      </div>
    </div>

    <div class="passBorder" style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;"></div>`;

    document.getElementById(id).insertAdjacentElement('afterend',passDetailBox);

    let passTxt = document.querySelector(`#${id} .passBorder h3`).innerHTML;
    let passNumber = Number(passTxt.at(-1));

    let list = document.querySelectorAll(`#${id}~.passDetailBox .passBorder h3`);

    for (let i = 0; i < list.length; i++) {
      list[i].innerHTML = `Passenger ${passNumber + i+1}`
    }

    // passengerBox.appendChild(passDetailBox);

    tPrice = tPrice + price;
    tax = (7 / 100) * tPrice;
    total = tPrice+tax;

    document.getElementById('fare').innerHTML = formatter.format(tPrice.toFixed(2));
    document.getElementById('tax').innerHTML = formatter.format(tax.toFixed(2));

    document.getElementById('total').innerHTML = formatter.format((tPrice + tax).toFixed(2));


  } else {
    addError.innerHTML = "Can't book ticket for more than 6 passenger.*"
  }
};

const delPass = (id) => {
  let delError = document.getElementById('addDelError');
  if (passList.length !== 5) {

    delError.innerHTML = ""
    let passenger = document.getElementById(id);

    let passTxt = document.querySelector(`#${id} .passBorder h3`).innerHTML;
    let passNumber = Number(passTxt.at(-1));

    let list = document.querySelectorAll(`#${id}~.passDetailBox .passBorder h3`);

    for (let i = 0; i < list.length; i++) {
      list[i].innerHTML = `Passenger ${passNumber + i}`
    }


    passList.push(Number(id.charAt(id.length - 1)));

    passengerBox.removeChild(passenger);

    passLength--;

    tPrice = tPrice - price;
    tax = (7 / 100) * tPrice;
    total = tPrice+tax;

    document.getElementById('fare').innerHTML = formatter.format(tPrice.toFixed(2));
    document.getElementById('tax').innerHTML = formatter.format(tax.toFixed(2));

    document.getElementById('total').innerHTML = formatter.format((tPrice + tax).toFixed(2));


  }

  else {
    delError.innerHTML = "Minimum one passenger needed for booking.*"
  }


};



const handleKey = (e, regKey) => {

  // isFill(e.target.form.id)

  // document.querySelector(`#${e.target.id}~.error`).style.display = "none";

  let regexObj = {
    name: /^[a-zA-Z\s]+$/,
    number: /^\d+$/,
  }

  const value = e.target.value;
  const tag = e.target;
 document.querySelector(`#${e.target.id}+.error`).innerHTML="";

  tag.style.border = "1px solid #3f5390"
  if (!regexObj[regKey].test(value)) {
    tag.style.animation = "vibrate 0.1s linear 5 alternate";
    tag.style.border = "1px solid red";
    tag.addEventListener("animationend", (e) => e.target.style.animation = '');
    tag.value = value.split(e.data).join('');
  }

}


const handleLength = (e, field) => {

  let value = e.target.value;

  if (field === "age") {
    if (value.length === 3)
      event.preventDefault();
  }

  if (field === "phone") {
    if (value.length === 10 || (value.length === 0 && e.key === "0"))
      event.preventDefault()
  }


}


const book = () => {

  let obj={};

  let isValid = true;

  let regexObj = {
    name: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
    phone: /^\d{10}$/,
    age: /^\d{1,3}$/
  }


  let name = document.querySelectorAll(`.name`);

  for (let i = 0; i < name.length; i++) {

    obj[`passenger${i+1}`]={};

    if(name[i].value.trim().length === 0 || !(regexObj.name.test(name[i].value.trim())))
    {
      isValid=false;
      let error = document.querySelector(`#${name[i].id}+.error`);
      name[i].style.animation = "vibrate 0.1s linear 5 alternate";
      name[i].style.borderColor = "red";
      error.innerHTML="Check your name*";
      name[i].addEventListener("animationend", (e) => e.target.style.animation = '');
      if(name[i].value.trim().length === 0 )
      {
        error.innerHTML="Name can't be empty*";
      }
    }
    else{
      obj[`passenger${i+1}`].name = name[i].value.trim();
    }
  }


  let age = document.querySelectorAll(`.age`);

  for (let i = 0; i < age.length; i++) {
    if(age[i].value.trim().length === 0 || age[i].value.trim() > 125 || !(regexObj.age.test(age[i].value.trim())))
    {
      isValid=false;
      let error = document.querySelector(`#${age[i].id}+.error`);
      age[i].style.animation = "vibrate 0.1s linear 5 alternate";
      age[i].style.borderColor = "red";
      error.innerHTML="Check your age*";
      age[i].addEventListener("animationend", (e) => e.target.style.animation = '');

      if(age[i].value.trim().length === 0)
      {
        error.innerHTML="Age can't be empty*";
      }

      else if(age[i].value.trim() > 125)
      {
        error.innerHTML="Age can't be greater than 125*";
      }
    }
    else{
      obj[`passenger${i+1}`].age = age[i].value.trim();
    }
  }

  let gender = document.querySelectorAll('.gender')


  for (let i = 0; i < gender.length; i++){
    let error = document.querySelector(`#${gender[i].id}~.error`);
    error.innerHTML="";

    if(gender[i].value === "select")
    {
      isValid=false;
      gender[i].style.animation = "vibrate 0.1s linear 5 alternate";
      gender[i].style.borderColor = "red";
      error.innerHTML="Select gender*";
      gender[i].addEventListener("animationend", (e) => e.target.style.animation = '');
    }
    else{
      obj[`passenger${i+1}`].gender = gender[i].value.trim();
    }
  }

  let phone = document.getElementById('phone');

  if(phone.value.trim().length === 0 || !(regexObj.phone.test(phone.value.trim())))
  {
    isValid=false;
    let error = document.querySelector(`#phone+.error`);
    phone.style.animation = "vibrate 0.1s linear 5 alternate";
    phone.style.borderColor = "red";
    error.innerHTML="Check your number*";
    phone.addEventListener("animationend", (e) => e.target.style.animation = '');

    if(phone.value.trim().length === 0)
    {
      error.innerHTML="Phone no. can't be empty*";
    }
  }
  else{
    obj.phone = phone.value.trim();
  }


  if(isValid)
  {
    obj.ticketPrice = tPrice;
    obj.tax = tax;
    obj.total = total

    localStorage.setItem('data',JSON.stringify(obj));


    let loader = document.getElementById('loader');

    loader.style.display = "grid";

    let form = document.getElementById('form');

    setTimeout(()=>{
      loader.style.display = "none";
      form.reset();
    },3000)


  }



}
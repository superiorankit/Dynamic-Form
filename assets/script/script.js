const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR'
});


let price = 535.00;
let tPrice = 535.00;
let tax = 37.45;
let total = 570.40;


let passLength = 0;


let passengerBox = document.getElementById("passengerBox");

const addPass = (id) => {
  let addError = document.querySelector(`#${id}>.error`);
  if (passLength < 5) {
    addError.innerHTML = ""

    let input = document.querySelectorAll(`#${id} input`);
    let select = document.querySelector(`#${id} select`);

    if(select.value ===  "select")
    {
      addError.innerHTML = "Fill all Details*";
      return;
    }

    for(let i=0;i<input.length;i++)
    {
      if(!input[i].value){
        addError.innerHTML = "Fill all Details*";
        return;
      }
    }


    passLength++;

    let currNum = Number(id.at(-1));

    let passDetailBox = document.createElement("div");

    passDetailBox.setAttribute("class", "passDetailBox");

    passDetailBox.innerHTML = `<p class="error"></p><div class="btnGrp">
    <img class="add" src="./assets/images/plus.png"/>
  </div><div class="passBorder" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
      <h3></h3>
      <img class="delete" src="./assets/images/cross.png" />
    </div>

    <div class="passDetail">
    <div class="input">
      <label for="name1">Passenger name*</label>
      <input type="text" class="name" oninput="handleKey(event,'name')"/>
      <p class="error"></p>
    </div>
    <div class="input">
      <label for="name1">Age*</label>
      <input type="text" class="age" onkeypress="handleLength(event,'age')" oninput="handleKey(event,'number')" />
      <p class="error"></p>
      </div> 
      <div class="input">
      <select class="gender">
        <option value="select" selected>Select Gender</option>
        <option value="male">Male</option>
        <option value=female">Female</option>
        <option value="other">Other</option>
      </select>
      <p class="error"></p>
      </div>
    </div>

    <div class="passBorder" style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;"></div>`;

    document.getElementById(id).insertAdjacentElement('afterend', passDetailBox);


    let passl = document.querySelectorAll(`#${id}~.passDetailBox`);

    for (let i = 0; i < passl.length; i++) {
      passl[i].id = `passenger${currNum + 1 + i}`
      document.querySelector(`#${passl[i].id} .add`).setAttribute('onclick', `addPass('${passl[i].id}')`);
      document.querySelector(`#${passl[i].id} .delete`).setAttribute('onclick', `delPass('${passl[i].id}')`);
      let num = passl[i].id.at(-1);
      document.querySelector(`#${passl[i].id} .passBorder h3`).innerHTML = `Passenger ${num}`
      document.querySelector(`#${passl[i].id} .name`).id = `name${num}`;
      document.querySelector(`#${passl[i].id} .age`).id = `age${num}`;
      document.querySelector(`#${passl[i].id} .gender`).id = `gender${num}`;
      document.querySelector(`#${passl[i].id} .gender`).name = `gender${num}`;

    }

    // passengerBox.appendChild(passDetailBox);

    tPrice = tPrice + price;
    tax = (7 / 100) * tPrice;
    total = tPrice + tax;

    document.getElementById('fare').innerHTML = formatter.format(tPrice.toFixed(2));
    document.getElementById('tax').innerHTML = formatter.format(tax.toFixed(2));

    document.getElementById('total').innerHTML = formatter.format((tPrice + tax).toFixed(2));


  } else {
    addError.innerHTML = "Can't book ticket for more than 6 passenger.*"
  }
};

const delPass = (id) => {
  console.log(id)
  let delError = document.querySelector(`#${id}>.error`);
  if (passLength !== 0) {

    passLength--;

    delError.innerHTML = ""
    let passenger = document.getElementById(id);

    let currNum = Number(id.at(-1));

    let passl = document.querySelectorAll(`#${id}~.passDetailBox`);

    passengerBox.removeChild(passenger);


    for (let i = 0; i < passl.length; i++) {
      passl[i].id = `passenger${currNum + i}`
      document.querySelector(`#${passl[i].id} .add`).setAttribute('onclick', `addPass('${passl[i].id}')`);
      document.querySelector(`#${passl[i].id} .delete`).setAttribute('onclick', `delPass('${passl[i].id}')`);
      let num = passl[i].id.at(-1);
      document.querySelector(`#${passl[i].id} .passBorder h3`).innerHTML = `Passenger ${num}`
      document.querySelector(`#${passl[i].id} .name`).id = `name${num}`;
      document.querySelector(`#${passl[i].id} .age`).id = `age${num}`;
      document.querySelector(`#${passl[i].id} .gender`).id = `gender${num}`;
      document.querySelector(`#${passl[i].id} .gender`).name = `gender${num}`;
    }



    tPrice = tPrice - price;
    tax = (7 / 100) * tPrice;
    total = tPrice + tax;

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
  document.querySelector(`#${e.target.id}+.error`).innerHTML = "";

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

  let obj = {
    passengerDetails: {}
  };

  let isValid = true;

  let regexObj = {
    name: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
    phone: /^\d{10}$/,
    age: /^\d{1,3}$/
  }


  let name = document.querySelectorAll(`.name`);

  for (let i = 0; i < name.length; i++) {

    obj.passengerDetails[`passenger${i + 1}`] = {};

    if (name[i].value.trim().length === 0 || !(regexObj.name.test(name[i].value.trim()))) {
      isValid = false;
      let error = document.querySelector(`#${name[i].id}+.error`);
      name[i].style.animation = "vibrate 0.1s linear 5 alternate";
      name[i].style.borderColor = "red";
      error.innerHTML = "Check your name*";
      name[i].addEventListener("animationend", (e) => e.target.style.animation = '');
      if (name[i].value.trim().length === 0) {
        error.innerHTML = "Name can't be empty*";
      }
    }
    else {
      obj.passengerDetails[`passenger${i + 1}`].name = name[i].value.trim();
    }
  }


  let age = document.querySelectorAll(`.age`);

  for (let i = 0; i < age.length; i++) {
    if (age[i].value.trim().length === 0 || age[i].value.trim() > 125 || !(regexObj.age.test(age[i].value.trim()))) {
      isValid = false;
      let error = document.querySelector(`#${age[i].id}+.error`);
      age[i].style.animation = "vibrate 0.1s linear 5 alternate";
      age[i].style.borderColor = "red";
      error.innerHTML = "Check your age*";
      age[i].addEventListener("animationend", (e) => e.target.style.animation = '');

      if (age[i].value.trim().length === 0) {
        error.innerHTML = "Age can't be empty*";
      }

      else if (age[i].value.trim() > 125) {
        error.innerHTML = "Age can't be greater than 125*";
      }
    }
    else {
      obj.passengerDetails[`passenger${i + 1}`].age = age[i].value.trim();
    }
  }

  let gender = document.querySelectorAll('.gender')


  for (let i = 0; i < gender.length; i++) {
    let error = document.querySelector(`#${gender[i].id}~.error`);
    error.innerHTML = "";

    if (gender[i].value === "select") {
      isValid = false;
      gender[i].style.animation = "vibrate 0.1s linear 5 alternate";
      gender[i].style.borderColor = "red";
      error.innerHTML = "Select gender*";
      gender[i].addEventListener("animationend", (e) => e.target.style.animation = '');
    }
    else {
      obj.passengerDetails[`passenger${i + 1}`].gender = gender[i].value.trim();
    }
  }

  let phone = document.getElementById('phone');

  if (phone.value.trim().length === 0 || !(regexObj.phone.test(phone.value.trim()))) {
    isValid = false;
    let error = document.querySelector(`#phone+.error`);
    phone.style.animation = "vibrate 0.1s linear 5 alternate";
    phone.style.borderColor = "red";
    error.innerHTML = "Check your number*";
    phone.addEventListener("animationend", (e) => e.target.style.animation = '');

    if (phone.value.trim().length === 0) {
      error.innerHTML = "Phone no. can't be empty*";
    }
  }
  else {
    obj.phone = phone.value.trim();
  }


  if (isValid) {

    let date = new Date();

    obj.ticketPrice = tPrice;
    obj.tax = tax;
    obj.total = total
    obj.pnr = (Math.random() * 10000000000).toFixed();

    let month;

    switch (date.getMonth()) {
      case 0:
        month = "JAN";
        break;
      case 1:
        month = "FEB";
        break;
      case 2:
        month = "MAR";
        break;
      case 3:
        month = "APR";
        break;
      case 4:
        month = "MAY";
        break;
      case 5:
        month = "JUN";
        break;
      case 6:
        month = "JUL";
        break;
      case 7:
        month = "AUG";
        break;
      case 8:
        month = "SEP";
        break;
      case 9:
        month = "OCT";
        break;
      case 10:
        month = "NOV";
        break;
      case 11:
        month = "DEC";
        break;
      default:
        month = "Invalid month";
    }


    obj.date = `${date.getDate()} ${month} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    localStorage.setItem('ticket', JSON.stringify(obj));


    let loader = document.getElementById('loader');

    loader.style.display = "grid";

    let form = document.getElementById('form');

    setTimeout(() => {
      loader.style.display = "none";
      form.reset();
      location.href = './ticket.html'
    }, 2500)


  }
  else {
    document.getElementById('mssgBox').style.display = 'grid';
  }



}


const hideMssg = () => {
  document.getElementById('mssgBox').style.display = 'none';
}
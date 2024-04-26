const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  });


let passenger = JSON.parse(localStorage.getItem('ticket'));

console.log(passenger)

let adultCount = 0;
let childCount = 0;


let box = document.getElementById('passengerBox');
let adult = document.getElementById('adult');
let child = document.getElementById('child');
let ticket = document.getElementById('ticket');
let tax = document.getElementById('tax');
let total = document.getElementById('total');
let pnr = document.getElementById('pnr');
let book = document.getElementById('book');

for(let data in passenger.passengerDetails)
{
    let pass = passenger.passengerDetails[data];

    console.log(pass)

    if(pass.age > 10)
    {
        adultCount++;
    }
    else{
        childCount++
    }

    let tr = document.createElement('tr');

    tr.innerHTML = `
    <td>
        <h6>${pass.name}</h6>
    </td>
    <td>
        <h6>${pass.age} ${pass.gender.substring(0,1)}</h6>
    </td>
    <td>
        <h6>B1</h6>
    </td>
    <td>
        <h6>71 SU</h6>
    </td>`

    box.appendChild(tr);
}

pnr.innerHTML = passenger.pnr;
adult.innerHTML = adultCount;
child.innerHTML = childCount;
 ticket.innerHTML = formatter.format(passenger.ticketPrice.toFixed(2));
 tax.innerHTML = formatter.format(passenger.tax.toFixed(2));
 total.innerHTML = formatter.format(passenger.total.toFixed(2));

 let d = new Date();

console.log(d)

 console.log(passenger.date);


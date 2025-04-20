const tap = document.querySelector(".tap")
const wallet = document.querySelector(".wallet")
const lvl = document.querySelector('.lvl-fill')
const hamster = document.querySelector("#hamster-skin")
const levelCounter = document.querySelector("#lvl-counter")
const energy = document.querySelector("#energy")

let account = {
    name:"Hamster",
    balance:0,
    money_per_hour:0,
    money_per_tap:1,
    level:{
        value:0,
        point:0,
        upgrade_price:100
    },
    energy:1000
}

const handleTap = (event) =>{
    if(account.energy <= 0){
        return;
    }
    
    tap.classList.add("tap-active")
    let timeout = setTimeout(()=>{
        tap.classList.remove("tap-active")
    },100)
    account.energy -= 1;
    energy.innerText = account.energy;
    account.balance += account.money_per_tap;
    wallet.innerText = account.balance.toFixed(0);

    let x = event.clientX;
    let y = event.clientY;
    generateMoneyEffect(x,y);


    ubdateLevelPoints();
}




const generateMoneyEffect= (x,y) =>{
    let money = document.createElement("img");
    money.classList.add("cost");
    money.src = "./img/coinx23.png";
    money.style.top = `${y}px`;
    money.style.left = `${x}px`;
    tap.append(money);
    let timeout = setTimeout(() => {
        money.remove();
        clearTimeout(timeout)
    }, 1000);
}

const ubdateLevelPoints = () => {
    
    if(account.level.point >= account.level.upgrade_price){
        account.level.value +=1;
        account.level.point = 0;
        account.level.upgrade_price += 100;
        levelCounter.innerText = `Level: ${account.level.value} / 10`
        return;
    }
    account.level.point +=1;
    lvl.style.width = (account.level.point / account.level.upgrade_price) * 100 + "%";
}

function gameLoop(){
    let interval = setInterval(()=>{
        if(account.energy<1000){
            account.energy +=1;
        }else{
            return;
        }
        energy.innerText = account.energy;
    }, 1000)
}

gameLoop()//zapusk igrovogo cikla

tap.addEventListener("click", handleTap);
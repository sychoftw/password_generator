const inputSlider=document.querySelector("[data-length-slider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyMsg=document.querySelector("[data-copy-message]");
const copyBtn=document.querySelector(".copy_button"); 
const lowercaseCheck=document.querySelector("#uppercase");
const uppercaseCheck=document.querySelector("#lowercase");
const numberCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".Gnenerate-button");
const allCheckBox =document.querySelectorAll("input[type=checkbox")

let password="";
let passwordLength=10;
let checkcount=0;
const symbols = '!@#$%^&*()_+{}|:"<>?-=[];\\\',./`~';
passwordDisplay.value=password; 
setindicator("#ccc");

handleslider();

//setpass length

function handleslider(){
    inputSlider.value=passwordLength;
lengthDisplay.innerText=passwordLength;  
const min=inputSlider.min;
const max=inputSlider.max;
inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%"
}
function setindicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}
function getrandomInt(min,max){
  return Math.floor(Math.random()*(max-min))+min;
}
function generaterandomNumber(){
    return getrandomInt(0,9);
}
function generatelowercase(){
   return String.fromCharCode(getrandomInt(97,123));
}
function generateuppercase(){
   return String.fromCharCode(getrandomInt(65,91));
}
function generateSymbol(){
   const num=getrandomInt(0,symbols.length);
    return symbols.charAt(num);
}

function calculatestrength(){
    let hasupper=false;
    let haslower=false;
    let hasnum=false;
    let hassymb=false;
    if(lowercaseCheck.checked)haslower=true;
    if(uppercaseCheck.checked)hasupper=true;
    if(numberCheck.checked)hasnum=true;
    if(symbolsCheck.checked)hassymb=true;

    if(hasupper&&haslower&&(hasnum||hassymb)&&passwordLength>=8){
        setindicator("#0f0");
    }else if(
    (haslower||hasupper)&&
    (hasnum||hassymb)&&
    passwordLength>=6)
    {
        setindicator("#ff0")
    }else{
        setindicator("#f00");
    }

}
async function copycontent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";

    }catch(e){
        copyMsg.innerText("failed");
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    },2000);
}

function shufflepassword(array){
    //fisher yates method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const tmp=array[i];
        array[i]=array[j];
        array[j]=tmp;
    }
    let str="";
    array.forEach((el)=>{
        str+=el;
    });
    return str;

}

function handlecheckboxchange(){
    
    checkcount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }
    })
    if(passwordLength<checkcount){
        passwordLength=checkcount;
        handleslider();
    }
    console.log("entered check count"+ checkcount);
}
allCheckBox.forEach((checkbox)=>{
    console.log("handlingcheck")
    checkbox.addEventListener('change',handlecheckboxchange)
})
inputSlider.addEventListener('input',(e)=>{
passwordLength=e.target.value;
handleslider();
});

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copycontent();
    }
})


generateBtn.addEventListener('click',()=>{
    console.log("entered generate")
 if(checkcount==0){
    return;
 }
 if(passwordLength<checkcount){
    passwordLength=checkcount;
    handleslider();
 }
 console.log("starting");
 //finding new pass;
 password="";

//  if(upper.checked){
//     password+=generateuppercase();
//  }
//  if(lower.checked){
//     password+=generatelowercase();
//  }
 
//  if(numb.checked){
//     password+=generaterandomNumber();
//  } 
//  if(symb.checked){
//     password+=generateSymbol();
//  }
 let funcArr=[];
 if(uppercaseCheck.checked){
    funcArr.push(generateuppercase);

 }
 if(lowercaseCheck.checked){
    funcArr.push(generatelowercase);
    
 }
 if(numberCheck.checked){
    funcArr.push(generaterandomNumber);
 }
 if(symbolsCheck.checked){
    funcArr.push(generateSymbol);
 }
 for(let i=0;i<funcArr.length;i++){
    password+=funcArr[i]();
 }
 console.log("comparlaryn");
 //
 for(let i=0;i<passwordLength-funcArr.length;i++){
    let random=getrandomInt(0,funcArr.length);
    console.log("random "+ random);
    password+=funcArr[random]();
 }
 console.log("remaning");
 console.log(password);
//  shuffle
password=shufflepassword(Array.from(password));
console.log("shuffle");
passwordDisplay.value=password;
console.log("ui added");
calculatestrength();
})



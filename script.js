let search = document.querySelector(".search")
let main = document.querySelector(".main")
let showXhide = $(".di")
let btn = $(".bars")
$(".bars").click(function(){
    if($(".di").css('left') == "-270px"){
    $(".di").animate({left: '0%'}, 500);
document.querySelector(".bars").classList.replace("fa-bars", "fa-x")
    
}else{
        $(".di").animate({left: '-270px'}, 500)
        document.querySelector(".bars").classList.replace("fa-x", "fa-bars")
}});

//just for loading screen
var allpost;
var req = new XMLHttpRequest();
function getApi(){
req.open("GET" , "https://www.themealdb.com/api/json/v1/1/categories.php");
req.send();
req.addEventListener("readystatechange", function (){
    if (req.readyState == 4 && req.status >= 200 && req.status < 300){
        allpost = JSON.parse(req.response)
        console.log(allpost)
        var load = document.querySelector(".load").classList.add("d-none")
    }
})

}
getApi()
function show() {
    search.innerHTML = `
    <div class="row py-4">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control pp1 bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control pp1 bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    main.innerHTML = ""
}
show()

async function searchByName(val) {


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
   val = document.querySelector(".word").value

}

async function searchByFLetter(val) {

    val == "" ? val = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    val = document.querySelector(".leter").value
}

function displayMeals(a) {
    let cartoona = "";

    for (let i = 0; i < a.length; i++) {
        cartoona += `
        <div>
                <div onclick="getMealDetails('${a[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer ">
                    <img class="w-100 img con" src="${a[i].strMealThumb}" alt="meal-img">
                    <div class="meal-layer position-absolute d-flex align-items-center bo text-black p-2 bg-white" style="z-index:99;">
                        <h3>${a[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
        
    }

    main.innerHTML = cartoona
}

async function getMealDetails(ID) {

    main.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])


}
function displayMealDetails(meal) {
    
    main.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class="text-white">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2 class="text-white">Instructions</h2>
                <p class="text-white" style="width:200%;">${meal.strInstructions}</p>
                <h3 class="text-white"><span class="fw-bolder text-white">Area : </span>${meal.strArea}</h3>
                <h3 class="text-white"><span class="fw-bolder text-white">Category : </span>${meal.strCategory}</h3>
                <h3 class="text-white">Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap text-white">
                    ${ingredients}
                </ul>

                <h3 class="text-white">Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap text-white">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    main.innerHTML = cartoona
    main.classList.add("overflow-hidden")
}



async function getCategories() {
var search = document.querySelector(".search").classList.add("d-none")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayCategories(response.categories)

}

function displayCategories(val) {
    let cartoona = "";

    for (let i = 0; i < val.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${val[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${val[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${val[i].strCategory}</h3>
                        <p>${val[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    main.innerHTML = cartoona
}
async function getCategoryMeals(category) {
    main.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))

}
async function getAreaMeals(area) {
    main.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))


}
async function getArea() {
    main.innerHTML = ""
    search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);
    displayArea(respone.meals)

}


function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3 text-white">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    main.innerHTML = cartoona
}
async function getIngredients() {
    main.innerHTML = ""


    search.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))


}


function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3 text-white">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    main.innerHTML = cartoona
}


async function getCategoryMeals(category) {
    main.innerHTML = ""


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))


}
async function getIngredientsMeals(ingredients) {
    main.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))

}
function showContacts() {
    search.innerHTML = "";
    main.innerHTML = `<div class="contactInfo min-vh-100 d-flex justify-content-center align-items-center w-100 h-100">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="Btn" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }



function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/[0-9]?[a-z][A-z][0-9]?[.][a-z]{1,5}/).test(document.getElementById("emailInput").value)
}

function phoneValidation() {
    return (/[+]?[0-9]{7||11}/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/[0-9]/.test(document.getElementById("ageInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
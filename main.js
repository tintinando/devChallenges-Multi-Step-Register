const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)

const formData = {
    name: '',
    email: '',
    interest: []
}

function handleSelect(e) {
    const target = e.target
    if (target.tagName !== "SPAN") return
    const interest = target.innerText

    target.classList.toggle("selected")

    if (target.classList.contains("selected")) {
        formData.interest.push(interest)
    } else {
        formData.interest = formData.interest.filter(f => f !== interest)
    }
}

function highlightPage(page) {
    $(".form-page h6").innerText = `Step ${page} of 3`
    $$(".form-page div").forEach((div, i) => {
        div.classList.toggle("selected", i === page - 1)
    })
}

function gotoForm2() {
    formData.name = $("#form1 #name").value
    formData.email = $("#form1 #email").value
    $("#form1").style.display = "none"
    $("#form2").style.display = "flex"
    $("#form2").addEventListener("click", handleSelect)

    highlightPage(2)
}

function gotoForm3() {
    $("#form2").style.display = "none"
    $("#form3").style.display = "flex"
    highlightPage(3)

    const htmlForm3 = `
    <p><span>Name: </span>${formData.name}</p>
    <p><span>Email: </span>${formData.email}</p>
    <ul>
        <p><span>Topics:</span></p>
        ${formData.interest.map(int => `<li>${int}</li>`).join('')}
    </ul>
    `

    $("#form3 div").innerHTML = htmlForm3
}

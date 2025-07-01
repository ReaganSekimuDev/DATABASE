let card = document.querySelector(".card");
let tbd = document.querySelector("#tbd");

let searc = document.getElementById("searc");
let txt5 = document.getElementById("txt5");
let txt1 = document.getElementById("txt1");
let txt2 = document.getElementById("txt2");
let txt4 = document.getElementById("txt4");
let txt3 = document.getElementById("txt3");

let table = document.querySelector("table");
let head = document.querySelector(".head");

let Uflag;
let Uindex;

let Data = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
window.addEventListener("load", DisplayContent())

function open() {
    card.style.display = "block";
}
function Gen() {
    open()
    Uflag = 1;
}
function Clr() {
    txt1.value = "";
    txt2.value = "";
    txt4.value = "";
    txt3.value = "";
    txt5.src = "";
}
function Can() {
    Clr()
    card.style.display = "none";
}


function Sav() {
    CreateContent()
}
function CreateContent() {
    let fee = (350000 - Number(txt4.value));
    let id = Math.floor(Math.random() * 1000);
    
    let name = txt1.value;
    let clas = txt2.value;
    let feeb = fee;
    let dob = txt3.value;
    let pic = txt5.src;

    if (Uflag == 1) {
        let obj = new Object();
        obj.Id = id;
        obj.Name = name;
        obj.Clas = clas;
        obj.Feeb = feeb;
        obj.Dob = dob;
        obj.Pic = pic;
        Data.push(obj)
    } else {
        Data[Uindex].Name = txt1.value;
        Data[Uindex].Clas = txt2.value;
        Data[Uindex].Feeb = (350000 - txt4.value);
        Data[Uindex].Dob = txt3.value;
        Data[Uindex].Pic = txt5.src;
    }
    
    localStorage.setItem("items", JSON.stringify(Data))
    location.reload();
    DisplayContent();
}
function DisplayContent() {
    let Dat = JSON.parse(localStorage.getItem("items"))

    let td = "";
    
    Dat.forEach((record, i) => {
        td += "<tr>"+
        "<td id='pic_column'>"+`<img src="${record.Pic}" id="recordPic">`+"</td>"+
        "<td id='id_column'>ST-"+record.Id+"</td>"+
        "<td id='name_column'>"+record.Name+"</td>"+
        "<td>"+record.Clas+"</td>"+
        "<td>"+record.Feeb+"</td>"+
        "<td>"+record.Dob+"</td>"+
        "<td id='btn_column'><input id='actionBtn1' type='button' onclick='Edit("+i+")' value='Edit'> <input type='button' id='actionBtn2' onclick='Del("+i+")' value='Delete'></td>"+
        "</tr>";
    })
    tbd.innerHTML = td
    
}
function Edit(index) {
    Uflag = 2;
    Uindex = index;
    txt1.value = Data[Uindex].Name
    txt2.value = Data[Uindex].Clas
    txt4.value = Math.abs((Data[Uindex].Feeb - 350000))
    txt3.value = Data[Uindex].Dob
    txt5.src = Data[Uindex].Pic
    open()
    
}
function Del(index) {
    Data.splice(index,1);
    localStorage.setItem("items", JSON.stringify(Data));
    location.reload()
}

searc.addEventListener("input", SearcgRecord);
function SearcgRecord(){
    let query = searc.value.toLowerCase();
    let rows = tbd.children;

    for (let row of rows) {
        let cells = row.children;
        let found = false;
        for (let cell of cells) {
            if (cell.textContent.toLowerCase().includes(query)) {
                found = true;
            }
        }
        if (found) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}


function Print() {
    head.style.display = "none";
    event.target.style.display = "none";
    window.print()
}

//console.log(Math.abs(-5))
function SelectPic(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
        txt5.src = e.target.result;
    }
    reader.readAsDataURL(file[0])
}
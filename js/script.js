const levels=[
 {
    title:"Mystery Box",
    question:"🍎 + ❓ = 🍎🍎🍎. How many apples are in the mystery box?",
    instruction:"Count the apples on the right 🍎",
    L:["x","🍎"],
    R:["🍎","🍎","🍎"],
    a:2,
    h:"There are 3 apples on the right and 1 apple already on the left. 3 − 1 = 2."
},
 {
    title:"Take One Away",
    question:"❓ + 🍪 = 🍪🍪🍪🍪. What is inside ❓?",
    instruction:"Take the same cookie away from both sides.",
    L:["x","🍪"],
    R:["🍪","🍪","🍪","🍪"],
    a:3,
    h:"Take 1 cookie away from both sides. 4 − 1 = 3."
},
 {
    title:"Two Mystery Boxes",
    question:"❓ + ❓ = 🍓🍓🍓🍓🍓🍓. How much is ONE box?",
    instruction:"Two equal boxes share the strawberries.",
    L:["x","x"],
    R:["🍓","🍓","🍓","🍓","🍓","🍓"],
    a:3,
    h:"6 strawberries split equally between 2 boxes gives 3 each."
},
 {
    title:"Build the Same Weight",
    question:"❓ + 🟡🟡 = 🟡🟡🟡🟡🟡. What is ❓?",
    instruction:"Remove 2 yellow blocks from both sides.",
    L:["x","🟡","🟡"],R:["🟡","🟡","🟡","🟡","🟡"],
    a:3,
    h:"5 blocks − 2 blocks = 3 blocks."
},
 {
    title:"Big Step",
    question:"❓ + 🍓🍓🍓 = 🍓🍓🍓🍓🍓🍓🍓. What is ❓?",
    instruction:"Make both sides match.",
    L:["x","🍓","🍓","🍓"],
    R:["🍓","🍓","🍓","🍓","🍓","🍓","🍓"],
    a:4,
    h:"7 strawberries − 3 strawberries = 4."
},
 {
    title:"Final Challenge",
    question:"❓ + 🍎🍎 = 🍎🍎🍎🍎🍎🍎. Can you solve it?",
    instruction:"You know the secret: keep both sides fair!",
    L:["x","🍎","🍎"],
    R:["🍎","🍎","🍎","🍎","🍎","🍎"],
    a:4,
    h:"6 apples − 2 apples = 4. Great thinking!"
}
];

let n=0,stars=0;
function draw(id,items){
    const e=document.getElementById(id);
    e.innerHTML="";
    items.forEach(v=>{
        let d=document.createElement("div");
        d.className="item "+(v==="x"?"x":"");
        d.textContent=v==="x"?"❓":v;
        e.appendChild(d)

    })
}
function render(){
 let q=levels[n];
 document.getElementById("title").textContent=q.title;
 document.getElementById("question").textContent=q.question;
 document.getElementById("instruction").textContent=q.instruction;
 draw("left",q.L);
 draw("right",q.R);
 document.getElementById("level").textContent=n+1;
 document.getElementById("progress").style.width=((n+1)/levels.length*100)+"%";
 document.getElementById("message").textContent="";
 document.getElementById("message").className="message";
 document.getElementById("ans").value="";
 document.getElementById("beam").style.transform="rotate(0deg)";
}
function hint(){
    document.getElementById("message").textContent="💡 "+levels[n].h;
    document.getElementById("message").className="message"
}
function check(){
 let val=Number(document.getElementById("ans").value);
 if(!Number.isFinite(val)||document.getElementById("ans").value===""){
    document.getElementById("message").textContent="Type your answer first 😊";return
}
 if(val===levels[n].a){
  stars++;
  document.getElementById("stars").textContent=stars;
  document.getElementById("message").textContent="🎉 Yes! The scale is happy! +1 ⭐";
  document.getElementById("message").className="message good";
  document.getElementById("beam").style.transform="rotate(0deg)";
  setTimeout(()=>{
    n++;
    if(n<levels.length)
        render();
    else finish()
    },900);
 }else{
  document.getElementById("message").textContent="Almost! 🤔 Count again and remember: both sides must be equal.";
  document.getElementById("message").className="message try";
  document.getElementById("beam").style.transform=val>levels[n].a?"rotate(5deg)":"rotate(-5deg)";
 }
}
function finish(){
    document.getElementById("finalText").textContent="You earned "+stars+" stars and learned how to keep both sides equal. ⭐";
    document.getElementById("modal").classList.add("show")

}
function closeModal(){
    document.getElementById("modal").classList.remove("show")
}
function resetGame(){
    n=0;
    stars=0;
    document.getElementById("stars").textContent=0;
    render()
}
document.getElementById("ans").addEventListener("keydown",e=>{
    if(e.key==="Enter")check()
    });
render();
const getButton=document.getElementById("get");
const question=document.getElementById("Question");
const answer=document.getElementById("Answer");

const database=firebase.database(); 
const rootRef=database.ref("answers");
console.log(rootRef);
getButton.addEventListener("click",(e)=>{
    e.preventDefault();
    rootRef.orderByKey().on('value',snapshot=>{
        console.log(snapshot.val());


    });
});
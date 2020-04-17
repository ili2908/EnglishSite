const getButton=document.getElementById("get");
const question=document.getElementById("Question");
const answer=document.getElementById("Answer");
const percent=document.getElementById("percent");
const database=firebase.database(); 
const rootRef=database.ref("answers");
console.log(rootRef);
getButton.addEventListener("click",(e)=>{
    e.preventDefault();
    rootRef.orderByKey().on('value',snapshot=>{

        var answers = snapshot.val()[question.value];
        console.log(answers);
        var cur=-1;
        var curi;
        var sum=0;
        for(var i in answers){
            
            
            if(answers[i]>cur){
                cur=answers[i];
                curi=i;
            }
            sum+=answers[i];
        }
        answer.value=curi;
        percent.innerText=(answers[curi]/sum)*100;
    });
});
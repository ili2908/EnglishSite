const getButton=document.getElementById("get");
const submitButton = document.getElementById("submit");
const question=document.getElementById("Question");
const answer=document.getElementById("Answer");
const percent=document.getElementById("percent");
const database=firebase.database(); 
const rootRef=database.ref("answers");
console.log(rootRef);

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    var number;
    var answers;
    rootRef.orderByKey().on('value', snapshot => {
        answers = snapshot.val()[question.value];
        console.log(answers);
        if (!answers) {
            number = -1;
        } else if (answer.value in answers) {
            number = answers[answer.value];
        } else {
            number = 0;
        }
    });
    setTimeout(()=> {
        console.log("number " + number);
        if (number == -1) {
            var o = {};
            o[answer.value] = 1;
            rootRef.child(question.value).set(o);
        } else if (number == 0) {
            var o = {};
            o[answer.value] = 1;
            for(var i in answers){
                o[i] = answers[i];
            }
            const newData = o;
            const updates = {};
            updates['/answers/' + question.value] = newData;
            database.ref().update(updates);
        } else if (number) {
            var o = {};
            o[answer.value] = number + 1;
            for(var i in answers){
                o[i] = answers[i];
            }
            const newData = o;
            const updates = {};
            updates['/answers/' + question.value] = newData;
            database.ref().update(updates);
        }
    }, 10);
});

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

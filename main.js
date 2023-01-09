import { EMPLOYEES } from "./MOCK_DATA.js";
import { renderData } from "./renderData.js";
import { CovertInformation } from "./covertInformation.js";
import toat from "./toat.js";
import { previous,next,upValue,pagerValue,pagerLimit,
        inputSearch,sortValue,inputItem,emailItem,jobItem,countItem,
        addItem,selectPerpage,inputItemModal,modalCount,modalEmail,addBtnModal,modalJob
        } 
from "./selectElement.js";
// Array render
let resultValue=[];
// Count page
let count =1 ; 
// Number page
let x=40;
// Length EMPLOYEES
pagerLimit.innerHTML = EMPLOYEES.length
// Pagination
const pagerCount = (value,n,perpage=40)=>{ 
    console.log("perpage",perpage)
    const valueSlice = value.slice((n-1)*perpage,(n-1)*perpage + perpage);
    return valueSlice
}
// Render 
function renderResult(data,count,perpage){
    resultValue = [...pagerCount(data,count,perpage)];
    upValue.innerHTML=renderData(resultValue)
    pagerValue.innerHTML = `${(count-1)*perpage }-${(count-1)*perpage+perpage}`
}
let test = [...EMPLOYEES]
renderResult(test,count,x);
// Click next
next.onclick=()=>{
    pagerLimit.innerHTML = test.length
    // Làm tròn trên để có thể check các page nằm trong các khoảng [a,b]
    if(count < Math.ceil(test.length/x)){
        count++;
        console.log(x)
        resultValue = [...pagerCount(test,count,x)];
        console.log(test)
        console.log(resultValue)
        upValue.innerHTML=renderData(resultValue)
        pagerValue.innerHTML = resultValue.length>=count*x?`${(count-1)*x }-${(count-1)*x+x}`:`${(count-1)*x }-${resultValue.length+(count-1)*x}`
        previous.style.opacity = 1;
    }
    else{
        previous.style.opacity = 1;
        next.style.opacity = 0.5;
        count = Math.ceil(test.length/x);
    }
    if(count === Math.ceil(test.length/x)){
        previous.style.opacity = 1;
        next.style.opacity = 0.5;
    }
    else{
        next.style.opacity = 1;
    }  
}
previous.style.opacity = count===1? 0.5:1;
next.style.opacity = count===Math.ceil(test.length/x)? 0.5:1;
//Click previous
previous.onclick=()=>{
    pagerLimit.innerHTML = test.length
    if(count>1){
        count--;
        renderResult(test,count,x);
        previous.style.opacity = 1;
        next.style.opacity = 1;
    } 
    else{
        previous.style.opacity = 0.5;
        count=1;
    }
    if(count<=1){
        next.style.opacity = 1;
        previous.style.opacity = 0.5;
    }
    else{
        previous.style.opacity = 1;
    }
}
let searchValue = []
// Search
inputSearch.onkeyup=(e)=>{
    const valueInput = e.target.value.toLocaleLowerCase().trim();
    if(e.keyCode == 13 &&valueInput){
        count=1;
        const resultInput = valueInput&&test.filter((value)=>{
            const checkBoolean = typeof value.email == "boolean";
            return (value.name.toLocaleLowerCase().includes(valueInput)||
            !checkBoolean&&value.email.toLocaleLowerCase().includes(valueInput)||
            value.job.toLocaleLowerCase().includes(valueInput))
        })
        if(resultInput.length>=1){
            searchValue = resultInput
            if(sortValue.value==1){
                searchValue = [...sortAz(searchValue)]
            }
            else if(sortValue.value==2){
                searchValue = [...sortZa(searchValue)]
            }
            pagerLimit.innerHTML = searchValue.length
            resultValue = [...pagerCount(searchValue,count,x)];
            console.log(resultValue)
            upValue.innerHTML=renderData(resultValue)
            pagerValue.innerHTML = resultValue.length>=x?`${(count-1)*x }-${(count-1)*x+x}`:`${(count-1)*x }-${resultValue.length}`
            previous.style.opacity = count===1? 0.5:1;
            next.style.opacity = count===Math.ceil(searchValue.length/x)? 0.5:1;
        }
        else{
            toat({
                title: 'Thất bại',
                message:'Tìm kiếm thất bại',
                type: 'error',
                duration: 300   
            })
        }
    }
}
// Value input = 0 => data = EMPLOYEES
inputSearch.oninput=(e)=>{
    if(!e.target.value){
        count=1
        test= [...EMPLOYEES];
        searchValue =[]  
        console.log('inputSearcj',sortValue.value)
        if(sortValue.value==1){
            test = [...sortAz(test)]
        }
        else if(sortValue.value==2){
            test = [...sortZa(test)]
        }
        previous.style.opacity = count===1? 0.5:1;
        next.style.opacity = count===Math.ceil(test.length/x)? 0.5:1;
        pagerLimit.innerHTML = test.length
        renderResult(test,count,x);
    }
}
// Select perpage
selectPerpage.onchange = (e)=>{
    count=1
    x = Number(e.target.value)
    renderResult(test,count,x);
    previous.style.opacity = count===1? 0.5:1;
    next.style.opacity = count===Math.ceil(test.length/x)? 0.5:1;
}
//Sort
const sortAz = (test)=>{     //Sort A-Z
    return [...test].sort(function (a, b) {
        const aname = a.name.split(' ');
        const bname = b.name.split(' ');
        // End number => take item in [length-2]
        const nameaSort = !Number(aname[aname.length -1]) ? aname[aname.length -1] : aname[aname.length -2]
        const namebSort = !Number(bname[bname.length -1]) ? bname[bname.length -1] : bname[bname.length -2]
        return ('' + nameaSort.localeCompare(namebSort));
    })
}
const sortZa = (test)=>{      //Sort Z-A
    return [...test].sort(function (a, b) {
        const aname = a.name.split(' ');
        const bname = b.name.split(' ');
        // End number => take item in [length-2]
        const nameaSort = !Number(aname[aname.length -1]) ? aname[aname.length -1] : aname[aname.length -2]
        const namebSort = !Number(bname[bname.length -1]) ? bname[bname.length -1] : bname[bname.length -2]
        return ('' + namebSort.localeCompare(nameaSort));
    })
}
sortValue.onchange =(e)=>{
    count=1
    if(e.target.value ==1){
        let testSort =[]
        if(searchValue.length>=1){
            testSort = sortAz(searchValue)
        }
        else{
            testSort = sortAz(test) 
        }
        test = [...testSort]
    }
    else if(e.target.value==2){
        let testSort =[]
        if(searchValue.length>=1){
            testSort = sortZa(searchValue)
        }
        else{
            testSort = sortZa(test) 
        }
        test = [...testSort]
    }
    previous.style.opacity = count===1? 0.5:1;
    next.style.opacity = count===Math.ceil(test.length/x)? 0.5:1;
    pagerLimit.innerHTML = test.length
    renderResult(test,count,x);
}

// Count pager = max id data
const maxCount = Math.max(...test.map(user => {
    return user.id;
  }));
let counter = maxCount +1 ;
countItem.innerHTML = counter
modalCount.innerHTML = counter
// Add data blur menu
inputItem.onblur=(e)=>{
    CovertInformation(e.target,test,emailItem)
}
// blur of modal
inputItemModal.onblur=(e)=>{
    CovertInformation(e.target,test,modalEmail)
}
console.log(searchValue)
const clickAddBtn = (inputValue,inputJob,inputMail)=>{
    const isCheck = inputValue.value.trim().replace(/[0-9]/g,'')
    if(inputValue.value.trim()&&isCheck.length>=1&&inputJob.value){
        const data = inputValue.value&&inputJob.value&&{
            id : counter,
            name:inputValue.value,
            email:inputMail.innerHTML,
            job:inputJob.value
        }
        EMPLOYEES.unshift(data)
        test = [...EMPLOYEES]
        console.log(searchValue)
        if(searchValue.length>=1){
            const valueInput = document.querySelector('.employess__input').value.toLocaleLowerCase().trim();
            const resultInput = valueInput&&test.filter((value)=>{
                const checkBoolean = typeof value.email == "boolean";
                return (value.name.toLocaleLowerCase().includes(valueInput)||
                !checkBoolean&&value.email.toLocaleLowerCase().includes(valueInput)||
                value.job.toLocaleLowerCase().includes(valueInput))
            })
            searchValue = resultInput
            if(sortValue.value==1){
                searchValue = [...sortAz(searchValue)]
            }
            else if(sortValue.value==2){
                searchValue = [...sortZa(searchValue)]
            }
            renderResult(searchValue,count,x);
        }
        else{
            if(sortValue.value==1){
                test = [...sortAz(test)]
            }
            else if(sortValue.value==2){
                test = [...sortZa(test)]
            }
            renderResult(test,count,x);
        }
        pagerLimit.innerHTML = test.length
        countItem.innerHTML = counter +1
        modalCount.innerHTML = counter +1
        counter++
        inputValue.value='';
        inputValue.focus();
        inputMail.innerHTML = 'Email'
        inputJob.value=''
        count=1;
        pagerValue.innerHTML = resultValue.length>=x?`${(count-1)*x }-${(count-1)*x+x}`:`${(count-1)*x }-${resultValue.length}`
        previous.style.opacity = count===1? 0.5:1;
        next.style.opacity = count===Math.ceil(test.length/x)? 0.5:1;
        modal.classList.remove('open')
        toat({
            title: 'Thành công',
            message:'Thêm thành công',
            type: 'success',
            duration: 300   
        })
    }
    else{
        toat({
            title: 'Thất bại',
            message:'Mời bạn nhập trường này',
            type: 'error',
            duration: 300   
        })  
    }
}
// Submit
addItem.onclick = ()=>{
    clickAddBtn(inputItem,jobItem,emailItem)
}
// Add when modal block
addBtnModal.onclick = ()=>{
    clickAddBtn(inputItemModal,modalJob,modalEmail)
}



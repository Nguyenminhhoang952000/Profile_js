import { EMPLOYEES } from "./MOCK_DATA.js";
import { renderData } from "./renderData.js";
import { CovertInformation } from "./covertInformation.js";
import toat from "./toat.js";
import { previous,next,upValue,pagerValue,pagerLimit,
        inputSearch,sortValue,inputItem,emailItem,jobItem,countItem,
        addItem,selectPerpage,inputItemModal,modalCount,modalEmail,addBtnModal,modalJob,hiddenName
        } 
from "./selectElement.js";
// Array render
let resultValue=[];
// Count page
let count =1 ; 
// Number page
let x=40;
let searchValue = []
// Length EMPLOYEES
let test = [...EMPLOYEES]
// Pagination
const pagerCount = (value,n,perpage=40)=>{ 
    console.log("perpage",perpage)
    const valueSlice = value.slice((n-1)*perpage,(n-1)*perpage + perpage);
    return valueSlice
}
renderResult(test,count,x);
// Render 
function renderResult(data,count,perpage){
    resultValue = [...pagerCount(data,count,perpage)];
    upValue.innerHTML=renderData(resultValue)
    pagerValue.innerHTML = resultValue.length>=count*perpage?`${(count-1)*perpage }-${(count-1)*perpage+perpage}`:`${(count-1)*perpage }-${resultValue.length+(count-1)*perpage}`
    pagerLimit.innerHTML = data.length
}
// Click next
const disable = ()=>{
    previous.style.opacity = count===1? 0.5:1;
    next.style.opacity = count===Math.ceil(test.length/x)? 0.5:1;
}
next.onclick=()=>{
    // Làm tròn trên để có thể check các page nằm trong các khoảng [a,b]
    const nextValue = searchValue.length>=1?searchValue:test
    if(count < Math.ceil(nextValue.length/x)){
        count++;
        if(searchValue.length>=1){
            renderResult(searchValue,count,x)
        }
        else{
            renderResult(test,count,x)
        }
        previous.style.opacity = 1;
    }
    else{
        previous.style.opacity = 1;
        next.style.opacity = 0.5;
        count = Math.ceil(nextValue.length/x);
    }
    if(count === Math.ceil(nextValue.length/x)){
        previous.style.opacity = 1;
        next.style.opacity = 0.5;
    }
    else{
        next.style.opacity = 1;
    }  
}

//Click previous
previous.onclick=()=>{
    if(count>1){
        count--;
        if(searchValue.length>=1){
            renderResult(searchValue,count,x)
        }
        else{
            renderResult(test,count,x)
        }
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
            renderResult(searchValue,count,x)
            disable()
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
        renderResult(test,count,x);
        disable()
    }
}
// Select perpage
selectPerpage.onchange = (e)=>{
    count=1
    x = Number(e.target.value)
    renderResult(test,count,x);
    disable()
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
    renderResult(test,count,x);
    disable()
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
    const covertValueNumber = e.target.value.replace(/[^0-9]/g,'')
    if( e.target.value.trim()&&!covertValueNumber){
        hiddenName.innerHTML=""
        CovertInformation(e.target,test,emailItem)
    }
    else{
        hiddenName.innerHTML="Tên nhân viên không hợp lệ"
        toat({
            title: 'Thất bại',
            message:'Tên nhân viên không hợp lệ',
            type: 'error',
            duration: 300   
        })
    }
}
inputItem.oninput=(e)=>{
    const covertValueNumber = e.target.value.replace(/[^0-9]/g,'')
    if( e.target.value&&!covertValueNumber){
        hiddenName.innerHTML=""
    }
    else{
        hiddenName.innerHTML="Tên nhân viên không hợp lệ"

    }
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
        if(searchValue.length>=1){
            console.log('search')
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
        countItem.innerHTML = counter +1
        modalCount.innerHTML = counter +1
        counter++
        inputValue.value='';
        inputValue.focus();
        inputMail.innerHTML = 'Email'
        inputJob.value=''
        count=1;
        disable()
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

// import removeVietnameseTones from "./removeVietnameseTones";
function removeVietnameseTones(str){
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str
}
export function CovertInformation(values,test,emailItem){
    const nameBlurNoVietnamese = values.value.toLocaleLowerCase().trim()
    const nameBlur = removeVietnameseTones(values.value.toLocaleLowerCase().trim());
    let nameEnd='';
    //Convert email => Standard email
    let emailBlur = nameBlur&&(nameBlur.split(' ').length==1||Number(nameBlur&&(nameBlur.split(' ')[1]))?
                        `${nameBlur.split(' ')[0]}@ntq-solution.com.vn`:
                        `${nameBlur.split(' ')[nameBlur.split(' ').length-1]}.${nameBlur.split(' ')[0]}@ntq-solution.com.vn`)
    nameBlur&&test.forEach((value)=>{
        const checkBoolean = typeof value.email == "boolean";
        let replaceEmail = !checkBoolean&&(value.email.replace(/[0-9]/g,''));
        if(value.name.toLocaleLowerCase().includes(nameBlurNoVietnamese)){
            const lengthName = test.filter((valueTest=>{
                return valueTest.name.includes(value.name);
            }))
            nameEnd = `${values.value} ${lengthName.length+1}`
        }
        if(!checkBoolean&&replaceEmail.includes(emailBlur)){
            const lengthEmail = test.filter((valueTest=>{
                let checkEmail = valueTest.email.toString().replace(/[0-9]/g,'');
                return checkEmail.includes(emailBlur);
            }))
            emailBlur=emailBlur.replace(/@ntq-solution.com.vn/,`${lengthEmail.length+1}@ntq-solution.com.vn`)
        }
    })
    nameEnd = nameEnd?nameEnd:values.value  
    console.log('Email:',emailBlur)
    console.log('Name:',nameEnd)
    emailItem.innerHTML = emailBlur
    values.value= nameEnd
}
export const renderData = (datas)=>{
    const valueResult = datas.map((data)=>{
        const dataName = data.name.split(' ');
        const nameImg = !Number(dataName[dataName.length -1]) ? dataName[dataName.length -1] : dataName[dataName.length -2]
        return (`<div class="information_item">
        <div class="kanban_image">
            ${data.img?`<img class="img" src=${data.img} alt="NMH"/>`:`<div class="img">${nameImg.slice(0,1).toUpperCase()}</div>`}
            <div class="kanban_icons">
                <span class="kanban_messages">
                    <i class="fas fa-comments"></i>
                    16
                </span>
                <span class="kanban_followers">
                    <i class="fas fa-cloud-meatball"></i>
                    16
                </span>
            </div>
            
        </div>
        <div class="kanban_detail">
            <div class="kanban_record-top">
                <div class="kanban_record-title">
                    ${data.name||"Noname"}
                </div>
                <li>${data.job||"Null"}</li>
            </div>
            <ul class="kanban_information">
                <li>
                    <i class="fas fa-envelope"></i>
                    <span>${data.email||"Null"}</span>
                </li>
                <li>
                    <i class="fas fa-phone-alt"></i>
                    <span>0981287660</span>
                </li>
            </ul>
            <button class="kanban_follow">Follow</button>
        </div>
    </div>`)
    }).join('')
    return valueResult;
}
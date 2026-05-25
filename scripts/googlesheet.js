var CONFIG={
    scriptUrl:'https://script.google.com/macros/s/AKfycbxIbOkIn48_nRDPEfQ69PuR8WoeU-jLm8FiQg5Uy26tgk9M9iPuvay8UK4vhEyrN87fPw/exec',
    sheetId:'1dOvHsJxH47L0eId6bwaX-jZ_rm2O5bAFzR71M9VUmYM'
};
async function findRowWhere(col1,col2,name){
    try{
        const response=await fetch(CONFIG.scriptUrl,{
            method:'POST',
            body:new URLSearchParams({
                action:'getAll',
                sheetId:CONFIG.sheetId,
                sheetName:name
            })
        });
        const data=await response.json();
        for(let i=0;i<data.length;i++){
            if(data[i][0]==col1&&data[i][1]==col2) return i+1;
        }
        return-1;
    }catch(error){
        console.error('Error:',error);
        return-1;
    }
}

async function readCell(row,col,name){
    try{
        const response=await fetch(CONFIG.scriptUrl,{
            method:'POST',
            body:new URLSearchParams({
                action:'read',
                sheetId:CONFIG.sheetId,
                sheetName:name,
                row:row,
                col:col
            })
        });
        const result=await response.json();
        return result.value;
    }catch(error){
        console.error('Error reading cell:',error);
        return null;
    }
}

async function writeCell(row,col,value,name){
    try{
        const response=await fetch(CONFIG.scriptUrl,{
            method:'POST',
            body:new URLSearchParams({
                action:'write',
                sheetId:CONFIG.sheetId,
                sheetName:name,
                row:row,
                col:col,
                value:value
            })
        });
        const result=await response.json();
        return result.success===true;
    }catch(error){
        console.error('Error writing cell:',error);
        return false;
    }
}

async function writeNewRow(rowData,name){
    try{
        const response=await fetch(CONFIG.scriptUrl,{
            method:'POST',
            body:new URLSearchParams({
                action:'getAll',
                sheetId:CONFIG.sheetId,
                sheetName:name
            })
        });
        const data=await response.json();
        const newRow=data.length+1;
        for(let i=0;i<rowData.length;i++) await writeCell(newRow,i+1,rowData[i],name);
        return newRow;
    }catch(error){
        console.error('Error writing new row:',error);
        return-1;
    }
}

async function getAllData(name){
    try{
        const response=await fetch(CONFIG.scriptUrl,{
            method:'POST',
            body:new URLSearchParams({
                action:'getAll',
                sheetId:CONFIG.sheetId,
                sheetName:name
            })
        });
        const data=await response.json();
        return data;
    }catch(error){
        console.error('Error getting all data:',error);
        return[];
    }
}
async function changeCell(row,col,newValue,name){return await writeCell(row,col,newValue,name);}

var CONFIG={
    scriptUrl:'https://script.google.com/macros/s/AKfycbx7WDDkQ6SD0EqIa4qf-4SU1IBUQf5eaO08z7qU2ABc-yaB-EvqcN6TDzjnu4jKquUp/exec',
    sheetId:'1EqgCYpYfwaKfUg4QMvLwqk_aWCNy-iapLLDCmVCWyDI'
};

async function findRowWhere(col1Matches,col2Matches,sheetName){
    try{
        const response=await fetch(CONFIG.scriptUrl,{
            method:'POST',
            body:new URLSearchParams({
                action:'getAll',
                sheetId:CONFIG.sheetId,
                sheetName:sheetName
            })
        });
        const data=await response.json();
        for(let i=0;i<data.length;i++){
            if(data[i][0]==col1Matches&&data[i][1]==col2Matches) return i+1;
        }
        return-1;
    }catch(error){
        console.error('Error:',error);
        return-1;
    }
}

async function readCell(row,col,sheetName){
    try{
        const response=await fetch(CONFIG.scriptUrl,{
            method:'POST',
            body:new URLSearchParams({
                action:'read',
                sheetId:CONFIG.sheetId,
                sheetName:sheetName,
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

async function writeCell(row,col,value,sheetName){
    try{
        const response=await fetch(CONFIG.scriptUrl,{
            method:'POST',
            body:new URLSearchParams({
                action:'write',
                sheetId:CONFIG.sheetId,
                sheetName:sheetName,
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

async function writeNewRow(rowData,sheetName){
    try{
        const response=await fetch(CONFIG.scriptUrl,{
            method:'POST',
            body:new URLSearchParams({
                action:'getAll',
                sheetId:CONFIG.sheetId,
                sheetName:sheetName
            })
        });
        const data=await response.json();
        const newRow=data.length+1;
        for(let i=0;i<rowData.length;i++) await writeCell(newRow,i+1,rowData[i],sheetName);
        return newRow;
    }catch(error){
        console.error('Error writing new row:',error);
        return-1;
    }
}

async function getAllData(sheetName){
    try{
        const response=await fetch(CONFIG.scriptUrl,{
            method:'POST',
            body:new URLSearchParams({
                action:'getAll',
                sheetId:CONFIG.sheetId,
                sheetName:sheetName
            })
        });
        const data=await response.json();
        return data;
    }catch(error){
        console.error('Error getting all data:',error);
        return[];
    }
}

async function changeCell(row,col,newValue,sheetName){
    return await writeCell(row,col,newValue,sheetName);
}
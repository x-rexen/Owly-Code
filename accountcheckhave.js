function checkhave(ph,pn){
    var un=localStorage.getItem('un');
    if(un){
        var pw=localStorage.getItem('pw');
        findRowWhere(un,pw,'account').then(row=>{
            if(row!==-1){if(pn!=null) window.location.href=pn;}
            else{
                localStorage.removeItem('un');
                localStorage.removeItem('pw');
                localStorage.removeItem('ph');
                localStorage.removeItem('n');
                localStorage.removeItem('r');
                localStorage.removeItem('mpn');
                //if(ph!=null) window.location.href=ph;
            }
        });
    }else if(ph!=null) window.location.href=ph;
}
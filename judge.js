const config={
    cors:'https://corsproxy.io/?',
    url:'https://wandbox.org/api/compile.json',
    tl:10
};
function geturl(){return config.cors+encodeURIComponent(config.url);}
async function run(code,input=''){
    const url=geturl();
    const st=performance.now();
    const con=new AbortController();
    const toid=setTimeout(()=>con.abort(),config.tl*1000);
    try{
        const res=await fetch(url,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                compiler:'gcc-head',
                code:code,
                stdin:input,
            }),
            signal:con.signal
        });
        clearTimeout(toid);
        const data=await res.json();
        const t=(performance.now()-st)/1000;
        let output='';
        let err='';
        if(data.program_output){output=data.program_output;}
        else if(data.compiler_error){
            output=data.compiler_error;
            err='Compiler error';
        }else if(data.program_error){
            output=data.program_error;
            err='Runtime error';
        }
        return {output:output,err:err,time:t,json:data};
    }catch(e){
        clearTimeout(toid);
        if(e.name==='AbortError'){return{output:'Time limit exceeded',err:'TLE',time:config.tl,json:null};}
        return{output:'',error:e.message,time:(performance.now()-st)/1000,json:null};
    }
}
async function judge(code,input='') {
    const blr=await run('int main(){}','');
    const baseline=blr.time;
    const res=await run(code,input);
    const estimatedTime=res.time-baseline;
    return {
        output:res.output,
        error:res.error,
        time:estimatedTime>0?estimatedTime:res.time,
        baseline:baseline,
        totalTime:res.time,
        json:res.json
    };
}

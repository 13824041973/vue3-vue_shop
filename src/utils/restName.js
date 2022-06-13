export const restName = (str) =>{
    if(str.length>7){
        let newStr = str.slice(0,14);
        return newStr;
    }else{
        return str;
    }
}
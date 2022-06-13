export default {
    // 获取storage
    getStorage(key){
        let result = localStorage.getItem(key);
        return JSON.parse(result);
    },
    // 存storage
    setStorage(key,val){
        localStorage.setItem(key,JSON.stringify(val));
    },
    // 删除单个storage
    removeStorage(key){
        localStorage.removeItem(key);
    },
    // 清空storage
    clearStorage(){
        localStorage.clear();
    }
}
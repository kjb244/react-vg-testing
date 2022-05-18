function fakeAjax(){
    return new Promise((resolve) =>{
        setTimeout((e) =>{
            resolve(['data']);
        },2000);
    })

}

export default fakeAjax;
export default  function ({ store, redirect ,$authApi }) {
    // If the user is not authenticated
    return $authApi.info().then(res =>{
        store.commit("SetInfo",res.data.data) 
        
    }).catch(()=>{
        return redirect('/login')
    })

}
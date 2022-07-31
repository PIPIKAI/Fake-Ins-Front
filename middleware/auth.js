export default  function ({ store, redirect ,$authApi }) {
    // If the user is not authenticated
    return $authApi.info().then(res =>{
        store.commit("info",res.data.data.user) 
    }).catch(()=>{
        return redirect('/login')
    })

}
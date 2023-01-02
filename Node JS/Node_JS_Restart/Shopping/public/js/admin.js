//This is client side code , so it will run on the browser not on the server
const deleteProduct = (btn)=>{
    console.log('Clicked the delete function!:',btn);
    console.log('ID of the clicked Product :',btn.parentNode.querySelector('[name=productId]').value);
    const prodId = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    const productElement = btn.closest('article');

    console.log('CSRF token:',csrf);
    fetch(
        '/admin/product/'+prodId,{
        method:'DELETE',
        headers:{
            'csrf-token':csrf
        }
}).then(result=>{
    console.log('client deletion result for product:',result);
    return result.json();
}).then(data=>{
    console.log('response data after deletion:',data);
    productElement.parentNode.removeChild(productElement);
})
.catch(err=>{
    console.log('client deletion error for product:',err);
});
}

import React from 'react'

const AddProducts = ({addProduct}) => {
    return (
        <div>
            <h3>Add Product</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                addProduct(e)
            }}>
                <label htmlFor="name">Name</label><br/>
                <input type="text" name='name' id='name' /><br/>
                <label htmlFor="price">Price</label><br/>
                <input type="number" name='price' id='price' /><br/>
                <label htmlFor="description">Description</label><br/>
                <input type="text" name='description' id='description' /><br />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default AddProducts

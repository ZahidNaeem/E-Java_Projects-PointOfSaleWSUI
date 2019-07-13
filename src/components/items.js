import React from 'react'

const Items = ({items: items}) => {
    return (
        <div>
            <center><h1>Item List</h1></center>
            {items.map((item) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{item.itemDesc}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{item.itemUom}</h6>
                        <p class="card-text">{item.itemBarcode}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Items
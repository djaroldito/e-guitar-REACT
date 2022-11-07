import React from 'react'
import { List, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin'


const ProductList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source='id' />
                <TextField source='type'/>
                <TextField source='brand'/>
                <TextField source='model'/>
                <TextField source='color'/>
                <TextField source='price' />
                <TextField source='discount' />
                <TextField source='stock' />
                <DateField source='createdAt' />
                <EditButton basepath='/product' />
                <DeleteButton basepath='/product' />
            </Datagrid>
        </List>
    );
}

export default ProductList;


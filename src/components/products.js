import * as React from "react";
import DeleteWithCustomConfirmButton from 'ra-delete-with-custom-confirm-button';
import Delete from '@material-ui/icons/Delete';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    NumberField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    SelectInput,
    TextInput,
    BooleanInput,
    NumberInput,
    Filter,
    ImageField,
    SimpleShowLayout,
    required,
    maxValue
} from 'react-admin';

const DeleteConfirmTitle = 'Are you sure you want to delete this product?';

const invalidMessages= {required: "This field is required",
                        maxDiscount: "The maximum number is 1",
                        maxStars: "The maximum number is 5"                        
                        };

const DeleteConfirmContent = (props) => {
    return (
      <SimpleShowLayout {...props} >
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="subcategory" />
        <NumberField source="price" />
      </SimpleShowLayout>
    );
};

const ProductFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <SelectInput source="category" choices={[
            { id: 'bedroom', name: 'bedroom' },
            { id: 'bathroom', name: 'bathroom' },
            { id: 'living room', name: 'living room' }
        ]} />
        <SelectInput source="subcategory" choices={[
            { id: 'bedding', name: 'bedding' },
            { id: 'blankets', name: 'blankets' },
            { id: 'towels', name: 'towels' },
            { id: 'storage', name: 'storage' },
            { id: 'pillows', name: 'pillows' },
            { id: 'accessories', name: 'accessories' }
        ]} />
        <BooleanInput source="inStock" label="In stock" />
        <NumberInput source="price" />
    </Filter>
);

export const ProductList = props => (
    <List filters={<ProductFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <ImageField source="images.0" label="Image" />
            <TextField source="category" />
            <TextField source="subcategory" />
            <BooleanField source="inStock" label="In stock" />
            <TextField source="name" />
            <NumberField source="price" />
            <NumberField source="discount" />
            <NumberField source="stars" />
            <EditButton />
            <DeleteWithCustomConfirmButton
                title={DeleteConfirmTitle}      // your custom title of delete confirm dialog
                content={DeleteConfirmContent}  // your custom contents of delete confirm dialog
                confirmColor='warning'          // color of delete button ('warning' or 'primary', default: 'warning')
                ConfirmIcon={Delete}            // icon of delete button (default: 'Delete')
                cancel='Cancel'                 // label of cancel button (default: 'Cancel')
                CancelIcon={ErrorOutline}       // icon of cancel button (default: 'ErrorOutline')
                undoable={true}                 // undoable (default: true)
            />
        </Datagrid>
    </List>
);


export const ProductEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <SelectInput source="category" choices={[
                { id: 'bedroom', name: 'bedroom' },
                { id: 'bathroom', name: 'bathroom' },
                { id: 'living room', name: 'living room' }
            ]} />
            <SelectInput source="subcategory" choices={[
                { id: 'bedding', name: 'bedding' },
                { id: 'blankets', name: 'blankets' },
                { id: 'towels', name: 'towels' },
                { id: 'storage', name: 'storage' },
                { id: 'pillows', name: 'pillows' },
                { id: 'accessories', name: 'accessories' }
            ]} />
            <BooleanInput source="inStock" label="In stock" />
            <TextInput source="name" />
            <NumberInput source="price" />
            <NumberInput source="discount" validate={[maxValue(1, invalidMessages.maxDiscount)]} />
            <NumberInput source="stars" validate={[maxValue(5, invalidMessages.maxStars)]} />
            <TextInput source="images.0" label="Image 1" />
            <TextInput source="images.1" label="Image 2" />
            <TextInput source="images.2" label="Image 3" />
        </SimpleForm>
    </Edit>
);

export const ProductCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <SelectInput source="category" validate={[required(invalidMessages.required)]} choices={[
                { id: 'bedroom', name: 'bedroom' },
                { id: 'bathroom', name: 'bathroom' },
                { id: 'living room', name: 'living room' }
            ]} />
            <SelectInput source="subcategory" validate={[required(invalidMessages.required)]} choices={[
                { id: 'bedding', name: 'bedding' },
                { id: 'blankets', name: 'blankets' },
                { id: 'towels', name: 'towels' },
                { id: 'towels', name: 'towels' },
                { id: 'storage', name: 'storage' },
                { id: 'pillows', name: 'pillows' },
                { id: 'accessories', name: 'accessories' }
            ]} />
            <BooleanInput source="inStock" label="In stock" />
            <TextInput source="name" validate={[required(invalidMessages.required)]} />
            <TextInput multiline source="description" validate={[required(invalidMessages.required)]} />
            <NumberInput source="price" validate={[required(invalidMessages.required)]} />
            <NumberInput source="discount" validate={[required(invalidMessages.required), maxValue(1, invalidMessages.maxDiscount)]} />
            <NumberInput source="stars" validate={[required(invalidMessages.required), maxValue(5, invalidMessages.maxStars)]} />
            <TextInput source="images.0" label="Image 1" validate={[required(invalidMessages.required)]} />
            <TextInput source="images.1" label="Image 2" />
            <TextInput source="images.2" label="Image 3" />
        </SimpleForm>
    </Create>
);
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
    ReferenceField,
    FunctionField,
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
    maxValue,
    ReferenceInput,
    ArrayInput,
    SimpleFormIterator,
    ImageInput
} from 'react-admin';

const DeleteConfirmTitle = 'Are you sure you want to delete this product?';

const invalidMessages = 
    {
        required: "This field is required",
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
        <TextInput label="Search" source="name" alwaysOn />
        <ReferenceInput source="category" reference="categories" >
            <SelectInput optionText="name" />
        </ReferenceInput>
        <BooleanInput source="inStock" label="In stock" />
        <NumberInput source="price" />
    </Filter>
);

export const ProductList = props => (
    <List filters={<ProductFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <ImageField source="product_images.0" label="Image" />
            <ReferenceField source="category" reference="categories">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="name" />
            <NumberField source="price" />
            <NumberField source="discount" />
            <FunctionField
                label="Actual Price"
                render={record => `${record.price * (1 - record.discount)}`}
            />
            <NumberField source="stars" />
            <BooleanField source="inStock" label="In stock" />
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
            <ReferenceInput source="category" reference="categories" validate={[required(invalidMessages.required)]}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <BooleanInput source="inStock" label="In stock" />
            <TextInput source="name" />
            <NumberInput source="price" />
            <NumberInput source="discount" validate={[maxValue(1, invalidMessages.maxDiscount)]} />
            <NumberInput source="stars" validate={[maxValue(5, invalidMessages.maxStars)]} />
            <ArrayInput source="product_images" validate={[required(invalidMessages.required)]}>
                <SimpleFormIterator>
                    <ImageInput />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const ProductCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="category" reference="categories" validate={[required(invalidMessages.required)]}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <BooleanInput source="inStock" label="In stock" defaultValue="true" />
            <TextInput source="name" validate={[required(invalidMessages.required)]} />
            <TextInput multiline source="description" validate={[required(invalidMessages.required)]} />
            <NumberInput source="price" validate={[required(invalidMessages.required)]} />
            <NumberInput source="discount" validate={[maxValue(1, invalidMessages.maxDiscount)]} />
            <NumberInput source="stars" validate={[required(invalidMessages.required), maxValue(5, invalidMessages.maxStars)]} />
            <ArrayInput source="product_images" validate={[required(invalidMessages.required)]}>
                <SimpleFormIterator>
                    <ImageInput source="product_images">
                        <ImageField source="path"/>
                    </ImageInput>
                </SimpleFormIterator>
            </ArrayInput>
            
        </SimpleForm>
    </Create>
);
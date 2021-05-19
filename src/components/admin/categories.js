import * as React from "react";
import DeleteWithCustomConfirmButton from 'ra-delete-with-custom-confirm-button';
import Delete from '@material-ui/icons/Delete';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import {
    List,
    Datagrid,
    TextField,
    Create,
    SimpleForm,
    TextInput,
    Filter,
    SimpleShowLayout,
    required,
    ArrayInput,
    SimpleFormIterator
} from 'react-admin';

const DeleteConfirmTitle = 'Are you sure you want to delete this category?';

const invalidMessages= { required: "This field is required" };

const DeleteConfirmContent = (props) => {
    return (
      <SimpleShowLayout {...props} >
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="parent" />
        <TextField source="path" />
      </SimpleShowLayout>
    );
};

const CategoryFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn />
        <TextInput source="name" />
        <TextInput source="parent" />
    </Filter>
);

export const CategoryList = props => (
    <List filters={<CategoryFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="parent" />
            <TextField source="path" />
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

export const CategoryCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required(invalidMessages.required)]} />
            <ArrayInput source="subcategories">
                <SimpleFormIterator>
                    <TextInput source="name" lable="name" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);
import * as React from "react";
import DeleteWithCustomConfirmButton from 'ra-delete-with-custom-confirm-button';
import Delete from '@material-ui/icons/Delete';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    Filter,
    SimpleShowLayout,
    required,
    maxValue
} from 'react-admin';

const DeleteConfirmTitle = 'Are you sure you want to delete this coupon?';

const invalidMessages = 
    {
        required: "This field is required",
        maxDiscount: "The maximum number is 0.99",
    };

const DeleteConfirmContent = (props) => {
    return (
      <SimpleShowLayout {...props} >
        <TextField source="id" />
        <TextField source="code" />
        <NumberField source="discount" />
      </SimpleShowLayout>
    );
};

const CouponFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="code" alwaysOn />
        <NumberInput source="discount" />
    </Filter>
);

export const CouponList = props => (
    <List filters={<CouponFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="code" />
            <NumberField source="discount" />
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

export const CouponEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="code" />
            <NumberInput source="discount" validate={[maxValue(0.99, invalidMessages.maxDiscount)]} />
        </SimpleForm>
    </Edit>
);

export const CouponCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="code" validate={[required(invalidMessages.required)]} />
            <NumberInput source="discount" validate={[maxValue(0.99, invalidMessages.maxDiscount)]} />
        </SimpleForm>
    </Create>
);
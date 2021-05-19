import * as React from "react";
import axios from 'axios';
import {
    required,
    minLength,
    List,
    Datagrid,
    TextField,
    BooleanField,
    EmailField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    SelectInput,
    TextInput,
    BooleanInput,
    Filter,
    PasswordInput
} from 'react-admin';

const roleOptions = [
    { id: 'admin', name: 'admin' },
    { id: 'site-owner', name: 'site-owner' },
    { id: 'client', name: 'client' }
]

const UserCreateAuth = async (data) => {
    try {
        await axios.post(`${process.env.REACT_APP_PROXY}/users/signup`, {
            email: data.email,
            password: data.password,
            active: true,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            role: data.role
        })
    }
    catch (err) {
        window.alert(err.message);
    }
}

// const DeleteConfirmTitle = 'Are you sure you want to delete this user?';

// const DeleteConfirmContent = (props) => {
//     return (
//       <SimpleShowLayout {...props} >
//         <TextField source="id" />
//         <TextField source="role" />
//         <TextField source="firstName" />
//         <TextField source="lastName" />
//         <TextField source="email" />
//       </SimpleShowLayout>
//     );
// };

export const UserList = props => (
    <List filters={<UserFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <BooleanField source="active" />
            <EmailField source="email" />
            <TextField source="role" />
            <TextField source="firstName" label="First Name" />
            <TextField source="lastName" label="Last Name" />
            <TextField source="phone" />
            <EditButton />
            {/* <DeleteWithCustomConfirmButton
                title={DeleteConfirmTitle}      // your custom title of delete confirm dialog
                content={DeleteConfirmContent}  // your custom contents of delete confirm dialog
                confirmColor='warning'          // color of delete button ('warning' or 'primary', default: 'warning')
                ConfirmIcon={Delete}            // icon of delete button (default: 'Delete')
                cancel='Cancel'                 // label of cancel button (default: 'Cancel')
                CancelIcon={ErrorOutline}       // icon of cancel button (default: 'ErrorOutline')
                undoable={true}                 // undoable (default: true)
            /> */}
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="email" disabled />
            <SelectInput source="role" choices={roleOptions} />
            <TextInput source="firstName" label="First Name" validate={[required()]} />
            <TextInput source="lastName" label="Last Name" validate={[required()]} />
            <TextInput source="phone" validate={[required()]} />
            <BooleanInput source="active" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm save={(data) => UserCreateAuth(data)} redirect="list">
            <SelectInput source="role" choices={roleOptions} validate={[required()]} />
            <TextInput source="email" validate={[required()]} />
            <TextInput source="firstName" label="First Name" />
            <TextInput source="lastName" label="Last Name"/>
            <TextInput source="phone" />
            <PasswordInput source="password" label="Password" validate={[required(), minLength(6)] } />
            <BooleanInput source="active" defaultValue={true} />
        </SimpleForm>
    </Create>
);

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <BooleanInput source="active" />
        <SelectInput source="role" choices={roleOptions} />
    </Filter>
);
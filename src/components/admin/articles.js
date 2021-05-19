import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    DateInput,
    Filter
} from 'react-admin';

const ArticleTitle = ({ record }) => {
    return <span>Article {record ? `"${record.title}"` : ''}</span>;
};

export const ArticleList = props => (
    
    <List filters={<ArticleFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <DateField source="date" />
            <TextField source="title" />
            <TextField source="brief" />
            <EditButton />
        </Datagrid>
    </List>
);

// export const ArticleShow = (props) => (
//     <Show title={<ArticleTitle />} {...props}>
//         <SimpleShowLayout>
//             <TextField source="title" />
//             <TextField source="brief" />
//             <RichTextField source="body" />
//             <DateField label="Publication date" source="date" />
//         </SimpleShowLayout>
//     </Show>
// );

export const ArticleEdit = props => (
    <Edit title={<ArticleTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <DateInput disabled source="date" />
            <TextInput source="title" />
            <TextInput source="brief" />
            <TextInput multiline source="body" />
            <TextInput source="img" label="image"/>
        </SimpleForm>
    </Edit>
);

export const ArticleCreate = props => (
    <Create {...props}>
        <SimpleForm>        
            <DateInput source="date" />
            <TextInput source="title" />
            <TextInput source="brief" />
            <TextInput multiline source="body" />
            <TextInput source="img" label="image"/>
        </SimpleForm>
    </Create>
);

const ArticleFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <DateInput source="date" />
    </Filter>
);
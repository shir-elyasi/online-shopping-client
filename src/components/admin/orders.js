import * as React from "react";
import DeleteWithCustomConfirmButton from 'ra-delete-with-custom-confirm-button';
import Delete from '@material-ui/icons/Delete';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { GridShowLayout, RaGrid, BoxedShowLayout, RaBox } from "ra-compact-ui";
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    EditButton,
    SelectInput,
    TextInput,
    Filter,
    SimpleShowLayout,
    DateField,
    DateInput,
    Show,
    ChipField,
    ArrayField,
    Edit,
    SimpleForm,
    ReferenceField
} from 'react-admin';


const DeleteConfirmTitle = 'Are you sure you want to delete this order?';

const statusOptions = [
    { id: 'ordered', name: 'ordered' },
    { id: 'in_proccess', name: 'in proccess' },
    { id: 'confirmed', name: 'confirmed' },
    { id: 'sent', name: 'sent' },
    { id: 'received', name: 'received' },
    { id: 'returned', name: 'returned' }
]

const DeleteConfirmContent = (props) => {
    return (
      <SimpleShowLayout {...props} >
        <TextField source="id" />
        <TextField source="status" />
        <DateField source="createdAt" label="Date" />
        <NumberField source="totalAmount" label="Total" />
        <TextField source="userId" label="Customer Id" />
      </SimpleShowLayout>
    );
};

const OrderFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="id" alwaysOn />
        <SelectInput source="status" choices={statusOptions} />
        <DateInput source="createdAt" label="Date" />
        {/* <ReferenceInput label="Customer Id" source="userId" reference="users" >
            <TextInput optionText="id" />
        </ReferenceInput> */}
        {/* <TextInput source="userId" label="Customer Id" /> */}
    </Filter>
);

export const OrderList = props => (
    <List filters={<OrderFilter />} {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="status" />
            <DateField source="createdAt" label="Date" />
            <NumberField source="totalAmount" label="Total" />
            <ReferenceField label="Customer Id" source="userId" reference="users">
                <TextField source="id" />
            </ReferenceField>
            
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

export const OrderShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <GridShowLayout className="gridShowLayout">
                <RaGrid container direction="row">
                    <RaGrid item xs>
                        <h6>Order</h6>
                        <TextField source="id" label="Order Id"/>
                        <DateField source="createdAt" label="Date" />                            
                        <ChipField source="status" label="Status" />
                    </RaGrid>
                    <RaGrid item xs>
                        <h6>Costumer</h6>
                        <ReferenceField label="Customer Id" source="userId" reference="users">
                            <TextField source="id" />
                        </ReferenceField>
                        <ReferenceField label="Customer Email" source="userId" reference="users">
                            <TextField source="email" />
                        </ReferenceField>
                    </RaGrid>
                    <RaGrid item xs>
                        <h6>Recipient</h6>
                        <TextField source="recipient.city" label="City"/>
                        <TextField source="recipient.street" label="Street"/>
                        <TextField source="recipient.homeNumber" label="Home Number"/>
                        <TextField source="recipient.apartmentNumber" label="Apartment Number"/>
                    </RaGrid>
                </RaGrid>
            </GridShowLayout>

            <h6 style={{marginTop: "40px"}}>Items</h6>
            <BoxedShowLayout>
                <RaBox flex="0 0 100%" display="flex" mt="20px">
                    <ArrayField source="products" style={{width: "100%"}}>
                        <Datagrid>
                            <ReferenceField label="Product Id" source="productId" reference="products">
                                <TextField source="id" />
                            </ReferenceField>
                            <ReferenceField label="Product Name" source="productId" reference="products">
                                <TextField source="name" />
                            </ReferenceField>
                            <NumberField source="quantity" />
                            <ReferenceField label="Product Price" source="productId" reference="products">
                                <TextField source="price" />
                            </ReferenceField>
                            <ReferenceField label="Discount" source="productId" reference="products">
                                <TextField source="discount" />
                            </ReferenceField>
                            <ReferenceField label="Actual Price" source="productId" reference="products">
                                <TextField source="actual_price" label="Actual Price" />
                            </ReferenceField>
                            {/* <NumberField source="total" /> */}
                        </Datagrid>
                    </ArrayField>
                </RaBox>
            </BoxedShowLayout>
            
            <h6 style={{marginTop: "50px"}}>Totals</h6>
            <GridShowLayout className="gridShowLayout">
                <RaGrid container direction="row">
                    <RaGrid item xs>
                        <NumberField source="subtotalAmount" label="Subtotal" />
                    </RaGrid>
                    <RaGrid item xs>
                        <NumberField source="taxesAmount" label="Taxes" />
                    </RaGrid>
                    <RaGrid item xs>
                        <NumberField source="couponDiscountAmount" label="Cupon Discount" />
                    </RaGrid>
                    <RaGrid item xs>
                        <NumberField source="deliveryAmount" label="Delivery" />
                    </RaGrid>
                    <RaGrid item xs>
                        <TextField source="totalAmount" label="Total" />
                    </RaGrid>
                </RaGrid>
            </GridShowLayout>
        </SimpleShowLayout>
    </Show>
);

export const OrderEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <SelectInput source="status" label="Status" choices={statusOptions} />
        </SimpleForm>
    </Edit>
);


import React, { useState } from 'react';
import Modal from '../../../../../components/Modal/Modal';
import Input from '../../../../../components/Inputs/Input';
import { Link } from 'react-router-dom';
import {AddMoreField, FieldContainer, FieldDivider, FieldLeftContainer1, FieldRightContainerItem, RemoveContianer } from '../../../TransportModule/TransportRoute/components/AddRouteStyles';


// Assets
import AddMoreIcon from '../../../../../images/add-more-icon.svg';
import RemoveIcon from '../../../../../images/delete-icon.svg';
import Button from '../../../../../components/Buttons/Button';

const AddItems = props => {

    const options = [
        {
            value: 1,
            label: "Primary Store"
        },
        {
            value: 2,
            label: "Secondary Store"
        }
    ];

    const { show, handleClose } = props;
    const [formValues, setFormValues] = useState(
        [
            {
                staff_member: "",
                route_name: "",
                stops: "",
                set_order: "",
                vehicle_number: "",
                vehicle_capacity: "",
                bus_help: "",
            }
        ]
    )

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { stops: "", set_order: "" }])
    }


    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            modalHeading={'Add New Items'}
            submitText='Confirm'
            cancelText='Cancel'
        >
            <form>
                <FieldContainer>
                    <Input
                        type="select"
                        label={'Select Store*'}
                        options={options}
                        placeholder={'---- Select store name ----'}
                        name='store_name'
                    />
                </FieldContainer>
                <FieldContainer>
                    <Input
                        type="select"
                        label={'Select Categories'}
                        options={options}
                        placeholder={'---- Select categories ----'}
                        name='store_name'
                    />
                </FieldContainer>
                <FieldContainer>
                    <Input
                        type="text"
                        label={'Alert Me If Item Count Falls Below'}
                        options={options}
                        placeholder={'Enter if item count falls below'}
                        name='store_name'
                    />
                </FieldContainer>
                <FieldContainer>
                    <Input
                        type="text"
                        label={'Add Email IDs For Alert'}
                        options={options}
                        placeholder={'Enter email address'}
                        name='store_name'
                    />
                </FieldContainer>
                {formValues.map((element, index) => (
                <FieldDivider>
                        <FieldLeftContainer1>
                            <Input
                                type="text"
                                options={options}
                                label={'Name'}
                                placeholder={'Enter name of the item'}
                                name='stops'
                                onChange={e => handleChange(index, e)}
                            />
                        </FieldLeftContainer1>
                        <FieldRightContainerItem>
                            <Input
                                type="text"
                                placeholder={'Enter purchase cost'}
                                label={'Purchase Cost'}
                                name={'set_order'}
                                onChange={e => handleChange(index, e)}
                            />
                        </FieldRightContainerItem>
                        {
                            index ?
                                <RemoveContianer>
                                    <Button
                                        className={'only-icon-button'}
                                        onlyIcon={RemoveIcon}
                                        onClick={() => removeFormFields(index)}
                                    />
                                </RemoveContianer>
                                : null
                        }
                    </FieldDivider>
                    ))}
                    {formValues.map((element, index) => (
                <FieldDivider>
                        <FieldLeftContainer1>
                            <Input
                                type="select"
                                options={options}
                                label={'Unit'}
                                placeholder={'---- Select unit ----'}
                                name='stops'
                                onChange={e => handleChange(index, e)}
                            />
                        </FieldLeftContainer1>
                        <FieldRightContainerItem>
                            <Input
                                type="select"
                                placeholder={'---- Select rtn/cns ----'}
                                label={'Rtn/Cns'}
                                name={'set_order'}
                                onChange={e => handleChange(index, e)}
                            />
                        </FieldRightContainerItem>
                        {
                            index ?
                                <RemoveContianer>
                                    <Button
                                        className={'only-icon-button'}
                                        onlyIcon={RemoveIcon}
                                        onClick={() => removeFormFields(index)}
                                    />
                                </RemoveContianer>
                                : null
                        }
                    </FieldDivider>
                    ))}
                {/* Add More field button */}
                <AddMoreField>
                    <Link onClick={() => addFormFields()}>
                        <img src={AddMoreIcon} alt="Icon" />
                        <span>Add Another Item</span>
                    </Link>
                </AddMoreField>
            </form>
        </Modal>
    );
};

export default AddItems;
import React, { useState } from 'react';
import Modal from '../../../../../components/Modal/Modal';
import Input from '../../../../../components/Inputs/Input';
import { FieldContainer, ModalBodyConatiner } from '../../../TransportModule/TransportRoute/components/AddRouteStyles';
import CustomCheckbox from '../../../../../components/Checkbox/CustomCheckbox';


const AddStore = props => {

    const { show, handleClose,saveAction } = props;
    const [isChecked, setIsChecked] = useState(true);
    const [inputs, setInputs] = useState({
        store_name: '',
        store_code: '',
        store_description: '',
        store_manager: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Validate Inputs
    const validate = () => {
        let fields = [
            {
                label: 'Store Name',
                key: 'store_name',
                required: true,
            },
            {
                label: 'Store Code',
                key: 'store_code',
                required: true,
            },
            {
                label: 'Store Description',
                key: 'store_description',
                required: true,
            },
            {
                label: 'Store Manager',
                key: 'store_manager',
                required: true,
            },
            
        ];

        let e = {};
        fields.forEach((field) => {
            if (
                field.required &&
                (inputs[field.key] === undefined ||
                    inputs[field.key] === null ||
                    inputs[field.key] === '')
            ) {
                e[field.key] = `Please enter ${field.label} `;
                return;
            }
        });
        
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChangechecked = () => {
        setIsChecked(!isChecked);
    };

    // Inputs handle change
    const handleChange = (e) => {
        let i = { ...inputs };
        i[e.target.name] = e.target.value;
        setInputs(i);
    };

    // OnSubmit Validate 
    const onSubmit = () => {
        if (!validate()) {
            return;
        }
        setLoading(true);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        setLoading(false);
        saveAction();
        
    }

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            modalHeading={'Add New Store'}
            submitText='Confirm'
            cancelText='Cancel'
            saveAction={onSubmit}
            loading={loading}
        >
            <form>
                <>
                <ModalBodyConatiner>
                <FieldContainer>
                    <Input
                        type="text"
                        label={'Store Name*'}
                        placeholder={'Enter store name'}
                        name='store_name'
                        value={inputs.store_name}
                        onChange={handleChange}
                        required={true}
                        error={errors.store_name}
                    />
                </FieldContainer>
                <FieldContainer>
                    <Input
                        type="text"
                        placeholder={'Enter store code'}
                        label={'Store Code*'}
                        name={'store_code'}
                        value={inputs.store_code}
                        onChange={handleChange}
                        required={true}
                        error={errors.store_code}
                    />
                </FieldContainer>
                <FieldContainer>
                    <Input
                        type="text"
                        placeholder={'Enter store description'}
                        label={'Store Description*'}
                        name={'store_description'}
                        value={inputs.store_description}
                        onChange={handleChange}
                        required={true}
                        error={errors.store_description}
                    />
                </FieldContainer>
                <FieldContainer>
                    <Input
                        type="text"
                        placeholder={'Enter store manager'}
                        label={'Store Manager*'}
                        name={'store_manager'}
                        value={inputs.store_manager}
                        onChange={handleChange}
                        required={true}
                        error={errors.store_manager}
                    />
                </FieldContainer>
                <CustomCheckbox
                    checkboxtext='Make this store primary'
                    isChecked={isChecked}
                    onChange={handleChangechecked}
                />
                </ModalBodyConatiner>
                </>
            </form>
        </Modal>
    );
};

export default AddStore;
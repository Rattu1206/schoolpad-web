import React, { useState } from 'react';
import Modal from '../../../../../components/Modal/Modal';
import Input from '../../../../../components/Inputs/Input';
import { FieldContainer, ModalBodyConatiner } from '../../../TransportModule/TransportRoute/components/AddRouteStyles';
import CustomCheckbox from '../../../../../components/Checkbox/CustomCheckbox';
import axios from 'axios';
import config from '../../../../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastModals from '../../../../../components/Toaster/ToastModals';

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

    const options = [
        { label: "Grapes", value: "grapes" },
        { label: "Mango", value: "mango" },
        { label: "Strawberry", value: "strawberry", disabled: false },
    ];

    const option1 = [
        { label: "Grapes", value: "grapes" },
        { label: "Mango", value: "mango" },
        { label: "Strawberry", value: "strawberry", disabled: false },
    ];

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

    const hideModal = () => {
    setId(false);
    }
    
    const showToastMessage = () => {
    //   hideModal();
      toast(
        <ToastModals type='successful' message='Your have Added 1 stop successfully.' />
      );
  };
  const baseURL = config.baseUrl +"api/v1/inventory/store";
    const handleConfirmClicked = () => {
        axios.post(baseURL, {
            storeName: storeName,
            storeCode:storeCode,
            storeDesc:storeDesc,
            storeManager:storeManager,
            userId:214,
            sessionId:8
          })
          .then(function (response) {
            // console.log(response.status);
            if(response.status===200)
            {
                showToastMessage();
                alert(response.data.message);
            }
            else if(response.status === 201){
                let errorMessage = response.data.details.error;
                console.log(errorMessage);
                let messageList = errorMessage.split('-');
                console.log(messageList);
                alert(messageList);
            }
            else{
                alert(response.data.message);
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
  };
    // Inputs handle change
    const handleChange = (e) => {
        let i = { ...inputs };
        i[e.target.name] = e.target.value;
        setInputs(i);
    };

    // OnSubmit Validate 
    const onSubmit = () => {
        let e = {};
        if (!validate()) {
            return;
        }
        // console.log({inputs});
        setLoading(true);
        const baseURL = config.baseUrl +"api/v1/inventory/store";
        axios.post(baseURL, {
            storeName: inputs.store_name,
            storeCode:inputs.store_code,
            storeDesc:inputs.store_description,
            storeManager:inputs.store_name,
            userId:214,
            sessionId:8
          })
          .then(function (response) {
            if(response.data.code == '002')
            {
                e['store_code'] = response.data.message;
                setErrors(e);
            }
            else if(response.data.code == '001')
            {
                e['store_name'] = response.data.message;
                setErrors(e);
            }
            else
            {
                // saveAction();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                setLoading(false);
                saveAction();
            }
            
          })
          .catch(function (error) {});
        // setLoading(true);
        // setTimeout(() => {
        //     window.location.reload();
        // }, 2000);
        // setLoading(false);
        // saveAction();
        
    }

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            modalHeading={'Add New Store'}
            submitText='Save and Close'
            actionText={'Save and Continue'}
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
                {/* <CustomCheckbox
                    checkboxtext='Make this store primary'
                    isChecked={isChecked}
                    onChange={handleChangechecked}
                /> */}
                </ModalBodyConatiner>
                </>
            </form>
        </Modal>
    );
};

export default AddStore;
import React from "react";
import {Button, Modal, Alert, bsStyle} from 'react-bootstrap';
import {FxForm} from '../fx-form';

export const FxFormView = (props) => {
        return (                
            <div className="row">
                <Modal show={props.fxFormViewModel} onHide={props.fxFormViewModelHideHandle}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.fxMultiAddFormTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        {props.errorMsg &&
                            <Alert bsStyle="danger">
                                {props.errorMsg}
                            </Alert>
                        }

                        {props.successMsg &&                    
                                <Alert bsStyle="success">
                                    {props.successMsg}
                                </Alert>
                        }
                        <form role="form" onSubmit={(e) => {e.preventDefault();}}>
                            <FxForm
                                config={props.fxFormConfig}
                                ref={(form) => {
                                    props.handleBoundFormUpdate(form);
                                }}
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                       <Button className={props.fxMultiAddFormExtraConfig.cssClasses.formCloseBtn ? props.fxMultiAddFormExtraConfig.cssClasses.formCloseBtn :'btn text-btn red'} onClick={props.fxFormViewModelHideHandle}>{props.fxMultiAddFormExtraConfig.formCloseBtnText ? props.fxMultiAddFormExtraConfig.formCloseBtnText :'Close'}</Button>
                       <Button className={props.fxMultiAddFormExtraConfig.cssClasses.formSaveBtn ? props.fxMultiAddFormExtraConfig.cssClasses.formSaveBtn :'btn text-btn green'} onClick={props.handleSubmit} disabled={props.submitted ? true : false}>{props.submitted ? (props.fxMultiAddFormExtraConfig.formSaveRequestBtnText ? props.fxMultiAddFormExtraConfig.formSaveRequestBtnText : 'Please Wait...') : (props.fxMultiAddFormExtraConfig.formSaveBtnText ? props.fxMultiAddFormExtraConfig.formSaveBtnText :'Save')}</Button>
                    </Modal.Footer>
                 </Modal>
            </div>
    );

}

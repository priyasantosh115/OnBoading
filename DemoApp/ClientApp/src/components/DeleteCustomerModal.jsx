import React, { Component } from 'react';
import { Button, Icon, Modal, ModalActions } from 'semantic-ui-react';

export default class DeleteCustomerModal extends Component {
    constructor(props) {
        super();
        this.state = {
            open: false,
        };
    };
    showPopup = () => {
        this.setState({ open: !this.state.open });
    }
    handleDelete = (id) => {
        fetch('https://priyankaapp.azurewebsites.net/Customer/Delete/'+this.props.state.id,{
            method:'POST',
            headers:{'Content-Type':'application/json'}
        })
            .then(response=>
                {
                    this.props.getDataDelete();
                    window.location.reload();
                });
         };

    render() {
        return (
            <div>
                <Button color='red' onClick={this.showPopup}>
                    <Icon name='trash'  /> Delete</Button>
                <Modal
                    open={this.state.open}
                    size='Small'>
                    <Modal.Header>Delete Customer</Modal.Header>
                    <Modal.Content><h4> Are you sure you want to delete record?</h4>
                        <ModalActions>
                            <Button color='black' onClick={this.showPopup}>Cancel</Button>
                            <Button color='red' onClick={this.handleDelete}>Delete <Icon name='remove'/></Button>
                        </ModalActions>
                    </Modal.Content>
                </Modal>
            </div>);
    };
}


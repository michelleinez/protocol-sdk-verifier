import * as React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

import {ModalProps, ModalState} from '../interfaces/IModal';

import I18n from '../utils/I18n';

import '../css/Common.css';
import '../css/Modal.css';

export default class Modal extends React.Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);
        this.state = {
            open: true
        }
    }

    renderTransition = (props: any) => {
        return <Slide direction="up" {...props} />;
    }

    close = () => {
        this.setState({open: false});
    }

    render() {
        return (
            <Dialog
                data-cy="modal-container"
                open={this.state.open}
                TransitionComponent={this.renderTransition}
                keepMounted
                onClose={this.close}>
                <DialogContent id="modal-box" className="DialogContent">
                    <div className="ModalBody">
                        <ErrorIcon className="modal-icon error"/>
                        <div className="ModalBodyErrorMessage">
                            <div>
                                {this.props.text}
                            </div>
                        </div>
                        <Button onClick={this.close}
                            data-cy="modal-button"
                            className="error">
                            {I18n.getKey('CLOSE')}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}
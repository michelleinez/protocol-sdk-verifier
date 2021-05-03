import Grid from '@material-ui/core/Grid';
import * as React from "react";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import I18n from '../utils/I18n';
import { IAgent } from '../interfaces/AgentInterfaces';
import KivaAgent from '../agents/KivaAgent';
import LocalAgent from '../agents/LocalAgent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {VerificationRequirementProps, VerificationRequirementState} from '../interfaces/VerificationRequirementProps';
import {flowController} from "../KernelContainer";
import auth from '../utils/AuthService';

import '../css/Common.css';
import '../css/VerificationRequirementScreen.css';

export default class VerificationRequirementScreen extends React.Component<VerificationRequirementProps, VerificationRequirementState> {
    public readonly agent: IAgent;
    
    constructor(props:any) {
        super(props);
        this.state = {
            verificationRequired: ''
        }
        this.agent = KivaAgent.init(auth.getToken());
        this.getProofRequestOptions();
    }

    getProofRequestOptions() {
        return this.agent.fetchProfiles();
    }

    handleChange(event: React.ChangeEvent<{ value: unknown }>) {
        this.setState({verificationRequired: (event.target as HTMLInputElement).value});
    };
    
    render() {
        const integrationName = this.props.integrationName;
        return <div className="VerificationRequirement screen">
            <Grid container
                direction="column"
                justify="center"
                alignItems="center">
                <Grid item>
                    <Typography component="h2" variant="h6" gutterBottom>
                        {I18n.getKey('VERIFICATION_REQUIRED')}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container
                direction="column"
                justify="center"
                alignItems="center">
                <Grid item>
                    <Typography gutterBottom>
                        {I18n.getKey('PLEASE_SELECT')}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container
                direction="column"
                justify="center"
                alignItems="center">
                <Grid item>
                    <FormControl className="form-control">
                        <InputLabel >Verification Requirement</InputLabel>
                        <Select
                            value={this.state.verificationRequired}
                            onChange={this.handleChange.bind(this)}
                        >
                            <MenuItem value={1}>1 - Credentials not revoked</MenuItem>
                            <MenuItem value={2}>2 - Issuer DID = 12345</MenuItem>
                            <MenuItem value={3}>3 - Type = "Employee"</MenuItem>
                            <MenuItem value={4}>4 - Hire Date is on or after Dec 30, 2017</MenuItem>
                            <MenuItem value={5}>5 - Team attribute is not null</MenuItem>
                            <MenuItem value={6}>6 = Email ends in "@kiva.org"</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container
                direction="row"
                justify="center"
                alignItems="center">
                <Grid item>
                    <Button
                        className="back"
                        onClick={() => flowController.goTo('PREVIOUS')}>
                        {I18n.getKey('BACK')}
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        className="accept"
                        onClick={() => flowController.goTo('NEXT')}>
                        {I18n.getKey('CONTINUE')}
                    </Button>
                </Grid>
            </Grid>
        </div>;
    }
}
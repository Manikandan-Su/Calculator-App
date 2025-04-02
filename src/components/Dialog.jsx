import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createPortal } from 'react-dom';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { format, parseISO } from "date-fns";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';

export default function AlertDialog({ open, handleClickOpen, handleClose, eventsRecord }) {
    return (
        <React.Fragment>
            {createPortal(<Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                {eventsRecord && <DialogContent>
                    <Grid container>
                    <Grid onClick={handleClose} style={{width: '100%', textAlign: 'right', cursor: 'pointer'}} id='closeModal' item md={12}>
                            <CloseIcon style={{color: 'grey'}}/>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={6} xs={12} style={{ border: '1px solid #80808040', padding: '5px' }}>
                            <Typography style={{ fontFamily: 'Poppins', fontSize: '14px', padding: '5px' }}>Interview with: {eventsRecord?.user_det?.candidate?.candidate_firstName + ' ' + eventsRecord?.user_det?.candidate?.candidate_lastName} </Typography>
                            <Typography style={{ fontFamily: 'Poppins', fontSize: '14px', padding: '5px' }}>Position: {eventsRecord?.user_det?.job_id?.jobRequest_Title}</Typography>
                            <Typography style={{ fontFamily: 'Poppins', fontSize: '14px', padding: '5px' }}>Created By: {eventsRecord?.user_det?.handled_by?.firstName}</Typography>
                            <Typography style={{ fontFamily: 'Poppins', fontSize: '14px', padding: '5px' }}>Interview Date: {format(parseISO(eventsRecord?.end), "dd/MM/yyy")}</Typography>
                            <Typography style={{ fontFamily: 'Poppins', fontSize: '14px', padding: '5px' }}>Interview Time: {format(parseISO(eventsRecord?.start), "hh:mm a")} - {format(parseISO(eventsRecord?.end), "hh:mm a")}</Typography>
                            <Typography style={{ fontFamily: 'Poppins', fontSize: '14px', padding: '5px' }}>Interview Via: Google Meet</Typography>
                            <Typography style={{ fontFamily: 'Poppins', fontSize: '14px', padding: '5px', textAlign: 'center' }}><Button variant="outlined" style={{ width: '100%' }}>Resume.docx<RemoveRedEyeIcon style={{ height: '20px' }} /></Button></Typography>
                            <Typography style={{ fontFamily: 'Poppins', fontSize: '14px', padding: '5px', textAlign: 'center' }}><Button variant="outlined" style={{ width: '100%' }}>Aadharcard <RemoveRedEyeIcon style={{ height: '20px' }} /></Button></Typography>
                        </Grid>
                        <Grid item md={6} xs={12} style={{ border: '1px solid #80808040' }}>
                            <Grid style={{ width: '100%', paddingLeft: '16%' }}>
                                <img src="https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-96dp/logo_meet_2020q4_color_2x_web_96dp.png" alt="google_meet" />
                            </Grid>
                            <Grid style={{ paddingTop: '5px', textAlign: 'center' }}>
                                <button onClick={() => {
                                    window.open(eventsRecord?.link, '_blank')
                                }} style={{ backgroundColor: '#0b65c3', fontFamily: 'Poppins', width: '120px' }} type="button" className="btn btn-primary">Join</button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent> || null}
            </Dialog>, document.getElementById('root-modal'))}
        </React.Fragment>
    );
}
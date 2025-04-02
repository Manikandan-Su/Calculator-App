import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { format, parseISO } from "date-fns";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { height } from '@mui/system';
import { ClickAwayListener } from '@mui/material';
import AlertDialog from './Dialog';

export default function PositionedPopper({ anchorEl, open, placement, handleClick, allEvents, setOpen, alertOpen, setAlertOpen, eventsRecord, setEventsRecord, handleClickOpen, handleClose }) {
    console.log('open', open)
    
    const handleClickAway = (e) => {
        if (anchorEl && anchorEl.contains(event.target)) {
            return; // Prevent closing when clicking the anchor element
        }
        setOpen(false);
    }
    // const [alertOpen, setAlertOpen] = React.useState(false);
    // const [eventsRecord, setEventsRecord] = React.useState(false);

    // const handleClickOpen = () => {
    //     setAlertOpen(true);
    //   };
    
    //   const handleClose = () => {
    //     setAlertOpen(false);
    //   };


    return (
        <>
        <Box sx={{ width: 500 }}>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Popper
                    sx={{ zIndex: 1200 }}
                    open={open}
                    anchorEl={anchorEl}
                    placement={placement}
                    transition
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <Paper
                                    data-bs-toggle="popover"
                                    data-bs-html="true"
                                    data-bs-content="<b>Bold text</b> and <i>italic text</i>"
                                    draggable
                                >
                                    <Box style={{ textAlign: 'left' }}>
                                        {allEvents && allEvents.map((eventRecord) => {
                                            return <>
                                                <Grid
                                                    onClick={() => {
                                                        setOpen(false);
                                                        setAlertOpen(true);
                                                        setEventsRecord(eventRecord);

                                                    }}
                                                    style={{ display: 'inline-block', width: '350px', paddingLeft: '10px', cursor: 'pointer' }}
                                                >
                                                    <Grid container>
                                                        <Grid item md={10}>
                                                            <span style={{ fontSize: '12px', fontWeight: '500' }}>{eventRecord?.user_det?.job_id?.jobRequest_Title}</span>
                                                        </Grid>

                                                        {/* <Grid item md={2} style={{ paddingTop: '5px', paddingRight: '10px', textAlign: 'right' }}>
                                                            <OpenInNewIcon onClick={() => {
                                                                setOpen(false);
                                                                setAlertOpen(true);
                                                                setEventsRecord(eventRecord);
                                                                
                                                            }} style={{ height: '18px', width: '18px', cursor: 'pointer' }} />
                                                        </Grid> */}
                                                    </Grid>

                                                    <Grid container>
                                                        <Grid item md={5}>
                                                            <span style={{ fontSize: '12px' }}>{eventRecord?.summary}</span>
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <span style={{ fontSize: '12px' }}>Interviewer: {eventRecord?.user_det?.handled_by?.firstName}</span>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container>
                                                        <Grid item md={5}>
                                                            <span style={{ fontSize: '12px' }}>Date: {format(parseISO(eventRecord?.end), "dd/MM/yyy")}</span>
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <span style={{ fontSize: '12px' }}>Time: {format(parseISO(eventRecord?.start), "hh:mm a")} - {format(parseISO(eventRecord?.end), "hh:mm a")}</span>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <hr style={{ margin: 0, color: 'rgb(11, 101, 195)' }} />
                                            </>
                                        })}
                                    </Box>
                                </Paper>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </ClickAwayListener>
        </Box>
        <AlertDialog eventsRecord={eventsRecord} open={alertOpen} handleClickOpen={handleClickOpen} handleClose={handleClose}/>
        </>
    );
}

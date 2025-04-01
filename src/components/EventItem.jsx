import React from "react"
import PropTypes from 'prop-types'
import { Box, Paper, Typography } from "@mui/material"
import { format, parseISO } from "date-fns";
import { textAlign, width } from "@mui/system";
import Badge from '@mui/material/Badge';
import PositionedPopper from "./PopOver";
import { ClickAwayListener } from '@mui/material';


function EventItem(props) {
  const {
    event,
    rowId,
    sx,
    boxSx,
    elevation,
    isMonthMode,
    onClick,
    eventsCount,
    allEvents
  } = props

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();


  const [alertOpen, setAlertOpen] = React.useState(false);
  const [eventsRecord, setEventsRecord] = React.useState(false);

  const handleClickOpen = () => {
    setAlertOpen(true);
  };

  const handleClose = () => {
    setAlertOpen(false);
  };

  const handleClick = (newPlacement) => (event) => {
    // event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
    console.log('comes')
    setPlacement(newPlacement);
  };

  const handleEventClick = () => {
    console.log('Open',allEvents )
    if(allEvents && allEvents.length > 1){
      handleClick('right');
    } else {
      setEventsRecord(allEvents[0]);
      setAlertOpen(true);
    }
  }


  return (
    <>
      <Badge invisible={eventsCount <= 1} style={!eventsCount ? { display: 'none' } : { color: 'black' }} badgeContent={eventsCount && eventsCount > 1 && eventsCount || false} color="warning" onClick={allEvents && allEvents.length > 1 ? handleClick('right') : handleEventClick}>
        <Paper
          data-bs-toggle="popover"
          data-bs-html="true"
          data-bs-content="<b>Bold text</b> and <i>italic text</i>"
          sx={sx}
          draggable
          elevation={elevation || 0}
          key={`item-d-${event?.id}-${rowId}`}
        >
          <Box style={{ width: '12px', background: '#0b65c3' }}>
          </Box>
          <Box sx={boxSx} style={{ textAlign: 'left' }}>
            <Typography variant="body2" sx={{ fontSize: 12, fontFamily: 'Poppins', fontWeight: '500' }}>
              {event?.user_det?.job_id?.jobRequest_Title}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 10, fontFamily: 'Poppins', paddingTop: '5px' }}>
              <span style={{ color: 'grey' }}>Time:</span> {format(parseISO(event?.start), "hh:mm a")} - {format(parseISO(event?.end), "hh:mm a")}
            </Typography>

            <Typography variant="body2" sx={{ fontSize: 10, fontFamily: 'Poppins' }}>
              <span style={{ color: 'grey' }}>Interviewer:</span> {event?.user_det?.handled_by?.firstName + ' ' + event?.user_det?.handled_by?.lastName || ''}
            </Typography>
          </Box>
        </Paper>
      </Badge>
        <PositionedPopper
          allEvents={allEvents}
          anchorEl={anchorEl}
          open={open}
          setOpen={setOpen}
          placement={placement}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          eventsRecord={eventsRecord}
          setEventsRecord={setEventsRecord}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />      
    </>
  )
}

EventItem.propTypes = {
  sx: PropTypes.object,
  boxSx: PropTypes.object,
  event: PropTypes.object.isRequired,
  rowId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  isMonthMode: PropTypes.bool,
  onClick: PropTypes.func,
  handleTaskClick: PropTypes.func,
  onCellDragStart: PropTypes.func
}

export default EventItem
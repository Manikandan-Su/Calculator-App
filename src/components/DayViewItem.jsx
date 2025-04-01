import React from "react"
import PropTypes from 'prop-types'
import { Box, Paper, Typography, Grid } from "@mui/material"
import { format, parseISO } from "date-fns";
import { textAlign, width } from "@mui/system";
import Badge from '@mui/material/Badge';
import PositionedPopper from "./PopOver";

function  DayViewEventItem(props) {
  const {
    event,
    rowId,
    sx,
    boxSx,
    elevation,
    isMonthMode,
    onClick,
    onDragStart,
    eventsCount,
    allEvents
  } = props

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    console.log('open')
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <>
      <Badge invisible={eventsCount <= 1} style={!eventsCount ? { display: 'none' } : { color: 'black' }} badgeContent={eventsCount && eventsCount > 1 && eventsCount || false} color="warning" onClick={handleClick('right')}>
        <Paper
          sx={sx}
          draggable
          onClick={onClick}
          onDragStart={onDragStart}
          elevation={elevation || 0}
          key={`item-d-${event?.id}-${rowId}`}
        >
          <Box sx={boxSx} style={{ textAlign: 'left', width: '100%' }}>
            <Grid container style={{ background: '#0B65C3' }}>
              <Grid item md={12} xs={12} style={{ padding: '5px', textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#FFF', fontSize: 12, fontFamily: 'Poppins', fontWeight: '500' }}>
                  {event?.user_det?.job_id?.jobRequest_Title}
                </Typography>
              </Grid>
            </Grid>

            <Grid container style={{ padding: '5px' }}>
              <Grid item md={6} xs={6} style={{ padding: '5px', textAlign: 'center' }}>
                <span style={{ color: 'grey', fontFamily: 'Poppins' }}>Interviewer:</span> <span style={{ fontWeight: '600' }}>{event?.user_det?.handled_by?.firstName + ' ' + event?.user_det?.handled_by?.lastName || ''}</span>
              </Grid>

              <Grid item md={6} xs={6} style={{ padding: '5px', textAlign: 'center' }}>
                <span style={{ color: 'grey', fontFamily: 'Poppins' }}>Time:</span> <span style={{ fontWeight: '600' }}>{format(parseISO(event?.start), "hh:mm a")} - {format(parseISO(event?.end), "hh:mm a")}</span>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Badge>
      <PositionedPopper
        allEvents={allEvents}
        anchorEl={anchorEl}
        open={open}
        setOpen={setOpen}
        placement={placement}
        handleClick={handleClick}
      />
    </>
  )
}

DayViewEventItem.propTypes = {
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

export default DayViewEventItem
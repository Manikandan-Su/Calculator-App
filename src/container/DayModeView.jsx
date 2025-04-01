import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { display, styled, width } from "@mui/system"
import { useTheme } from '@mui/material/styles'
import {
  Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, tableCellClasses, Tooltip
} from "@mui/material"
import { format, parse, add, differenceInMinutes, isValid } from 'date-fns'
import DateFnsLocaleContext from "../../locales/dateFnsContext.js";
import DayViewEventItem from '../components/DayViewItem.jsx'
import EventItem from '../components/EventItem.jsx'
import { getDay, parseISO, isSameDay, isSameHour } from 'date-fns'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    paddingLeft: 4,
    paddingRight: 4,
    borderTop: `1px solid #ccc !important`,
    borderBottom: `1px solid #ccc !important`,
    borderLeft: `1px solid #ccc !important`,
    ['&:nth-of-type(1)']: {
      borderLeft: `0px !important`
    }
  },
  [`&.${tableCellClasses.body}`]: {
    verticalAlign: 'top',
    fontSize: 12,
    height: 108,
    width: 128,
    maxWidth: 128,
    cursor: 'pointer',
    borderLeft: `1px solid #ccc`,
    ['&:nth-of-type(1)']: { borderLeft: 0 }
  },
  [`&.${tableCellClasses.body}:hover`]: {
    backgroundColor: "#eee"
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  ['&:last-child td, &:last-child th']: {
    border: 0
  }
}))

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  ['&::-webkit-scrollbar']: {
    width: 7,
    height: 6
  },
  ['&::-webkit-scrollbar-track']: {
    WebkitBoxShadow: "inset 0 0 6px rgb(125, 161, 196, 0.5)"
  },
  ['&::-webkit-scrollbar-thumb']: {
    WebkitBorderRadius: 4,
    borderRadius: 4,
    background: "rgba(0, 172, 193, .5)",
    WebkitBoxShadow: "inset 0 0 6px rgba(25, 118, 210, .5)"
  },
  ['&::-webkit-scrollbar-thumb:window-inactive']: {
    background: "rgba(125, 161, 196, 0.5)"
  }
}))

function DayModeView(props) {
  const {
    options,
    columns,
    rows,
    searchResult,
    onTaskClick,
    onCellClick,
    onEventsChange,
    eventsRecord
  } = props
  const theme = useTheme()
  const [state, setState] = useState({ columns, rows })

  /**
   * @name handleCellClick
   * @description
   * @param event
   * @param row
   * @param day
   * @return void
   */
  const handleCellClick = (event, row, day) => {
    event.preventDefault()
    event.stopPropagation()
    //setState({...state, activeItem: day})
    onCellClick && onCellClick(event, row, day)
  }

  /**
   * @name renderTask
   * @description
   * @param tasks
   * @param rowLabel
   * @param rowIndex
   * @param dayIndex
   * @return {unknown[] | undefined}
   */
  const renderTask = (tasks, rowLabel, rowIndex, time) => {
    let isSameDayOccurs = Array.isArray(eventsRecord) && eventsRecord.filter((eventData) => {
      const givenDate = new Date(eventData.start);
      const noonTime = parse(time, "hh:mm a", givenDate);
      return isSameDay(rowIndex.date, parseISO(eventData.start)) && isSameHour(givenDate, noonTime)
    }
    );

    let eventHeight = 0;
    if (isSameDayOccurs && Array.isArray(isSameDayOccurs) && isSameDayOccurs.length > 0) {
      const startTime = parseISO(isSameDayOccurs[0]?.start); // Directly parse the ISO string
      const endTime = parseISO(isSameDayOccurs[0]?.end);

      const durationInMinutes = differenceInMinutes(endTime, startTime);
      const minuteHeightFactor = 2 // 2px per minute (Adjust as needed)
      eventHeight = durationInMinutes * minuteHeightFactor;
      console.log('dayIndex', rowIndex)
      const element = document.getElementById(`tableCellEvent-${rowIndex}`);
      console.log("Found element:", element);
      if (element) {
        element.style.display = 'flex';
        element.style.flexDirection = 'column';
        element.style.setProperty("display", "flex", "important");
        element.style.setProperty("flex-direction", "column", "important");
      }
    }

    return isSameDayOccurs && Array.isArray(isSameDayOccurs) && isSameDayOccurs.length ?
      <EventItem
        draggable
        event={isSameDayOccurs[0]}
        elevation={0}
        boxSx={{ px: 0.3 }}
        eventsCount={isSameDayOccurs.length}
        allEvents={isSameDayOccurs}
        sx={{
          position: 'relative',
          top: '-7px',
          width: '300px',
          overflow: 'hidden',
          py: 0,
          my: .3,
          // color: "#fff",
          display: 'inline-flex',
          border: '1px solid #dadada',
          borderRadius: '5px',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          transition: '0.3s',
          height: `${eventHeight}px`, // Set dynamic height
        }}
      /> : null
  }

  return (
    <StyledTableContainer
      component={Paper}
      sx={{ maxHeight: options?.maxHeight || 540 }}
    >
      <Table
        size="small"
        aria-label="simple table"
        stickyHeader sx={{ minWidth: options.minWidth || 540 }}
      >
        <TableHead sx={{ height: 24 }}>
          <StyledTableRow>
            <StyledTableCell align="left" />
            {
              columns?.map((column, index) => (
                <StyledTableCell
                  align="center" colSpan={2}
                  key={`weekday-${column?.day}-${index}`}
                >
                  {column?.weekDay} {column?.month}/{column?.day}
                </StyledTableCell>
              ))
            }
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {
            rows?.map((row, rowIndex) => {
              let lineTasks = row.days?.reduce((prev, curr) => prev + curr?.data?.length, 0)
              console.log('Row', row)
              return (
                <StyledTableRow
                  key={`timeline-${rowIndex}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <Tooltip
                    placement="right"
                    title={`${lineTasks} event${lineTasks > 1 ? 's' : ''} on this week timeline`}
                  >
                    <StyledTableCell
                      scope="row" align="center"
                      component="th" sx={{ px: 1 }}
                    >
                      <Typography variant="body2">{row?.label}</Typography>
                      {/* {row?.data?.length > 0 && renderTask(row?.data, row.id)} */}
                    </StyledTableCell>
                  </Tooltip>
                  {row?.days?.map((day, dayIndex) => {
                    return (
                      <StyledTableCell
                        key={day?.id}
                        scope="row"
                        align="center"
                        component="th"
                        colSpan={2}
                        sx={{ px: .3, py: .5 }}
                      >
                        {(renderTask(day?.data, row?.id, day, row?.label))}
                      </StyledTableCell>
                    )
                  })}
                </StyledTableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}

DayModeView.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  date: PropTypes.string,
  options: PropTypes.object,
  searchResult: PropTypes.object,
  onDateChange: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  onCellClick: PropTypes.func.isRequired,
  onEventsChange: PropTypes.func.isRequired
}

DayModeView.defaultProps = {

}

export default DayModeView
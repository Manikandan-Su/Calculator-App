import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { format, getDay, parseISO, isSameDay } from 'date-fns'
import { useTheme, styled, alpha } from '@mui/material/styles'
import {
  Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, tableCellClasses, Box
} from "@mui/material"
import { getDaysInMonth, isSameMonth } from 'date-fns'
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded'
import EventItem from "../components/EventItem"
import { useTranslation } from "react-i18next"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    borderTop: `1px ${theme.palette.divider} solid !important`,
    borderBottom: `1px ${theme.palette.divider} solid !important`,
    borderLeft: `1px ${theme.palette.divider} solid !important`,
    ['&:nth-of-type(1)']: {
      borderLeft: `0px !important`
    }
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    height: 96,
    width: 64,
    maxWidth: 64,
    cursor: 'pointer',
    fontFamily: 'Poppins',
    verticalAlign: "top",
    borderLeft: `1px ${theme.palette.divider} solid`,
    ['&:nth-of-type(7n+1)']: {
      borderLeft: 0
    },
    ['&:nth-of-type(even)']: {
      //backgroundColor: theme.palette.action.hover
    },
  },
  [`&.${tableCellClasses.body}:hover`]: {
    //backgroundColor: "#eee"
  }
}));

const StyledHeaderTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    borderTop: `1px ${theme.palette.divider} solid !important`,
    borderBottom: `1px ${theme.palette.divider} solid !important`,
    borderLeft: `1px ${theme.palette.divider} solid !important`,
    ['&:nth-of-type(1)']: {
      borderLeft: `0px !important`
    }
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    height: 50,
    width: 64,
    maxWidth: 64,
    cursor: 'pointer',
    fontFamily: 'Poppins',
    borderLeft: `1px ${theme.palette.divider} solid`,
    ['&:nth-of-type(7n+1)']: {
      borderLeft: 0
    },
    ['&:nth-of-type(even)']: {
      //backgroundColor: theme.palette.action.hover
    },
  },
  [`&.${tableCellClasses.body}:hover`]: {
    //backgroundColor: "#eee"
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  ['&:last-child td, &:last-child th']: {
    border: 0
  }
}))

function MonthModeView(props) {
  const {
    rows,
    locale,
    options,
    columns,
    legacyStyle,
    searchResult,
    onTaskClick,
    onCellClick,
    onEventsChange,
    onClickToday,
    eventsRecord
  } = props
  const theme = useTheme()
  const [state, setState] = useState({})
  const { t } = useTranslation(['common'])
  const today = new Date()
  let daysText = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  let currentDaySx = {
    width: 24,
    height: 22,
    margin: 'auto',
    display: 'block',
    paddingTop: '2px',
    borderRadius: '50%',
    //padding: '1px 7px',
    //width: 'fit-content'
  }

  /**
   * @name renderTask
   * @description
   * @param tasks
   * @param rowId
   * @return {unknown[] | undefined}
   */
  const renderTask = (tasks = [], rowId, day) => {
    let isSameDayOccurs = eventsRecord && eventsRecord.filter((eventData) => isSameDay(day.date, parseISO(eventData.start)));
    return isSameDayOccurs && Array.isArray(isSameDayOccurs) && isSameDayOccurs.length ? <EventItem
      isMonthMode
      event={isSameDayOccurs[0]}
      rowId={rowId}
      eventsCount={isSameDayOccurs.length}
      allEvents={isSameDayOccurs}
      elevation={0}
      boxSx={{ px: 0.5 }}
      key={`item-d-${isSameDayOccurs[0]?.id}-${rowId}`}
      onClick={e => handleTaskClick(e, isSameDayOccurs[0])}
      sx={{
        width: "100%",
        py: 0,
        my: .3,
        // color: "#fff",
        display: 'inline-flex',
        border: '1px solid #dadada',
        borderRadius: '5px',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s'
        // backgroundColor: isSameDayOccurs[0]?.color || theme.palette.primary.light
      }}
    /> : null
  }

  /**
   * @name handleTaskClick
   * @description
   * @param event
   * @param task
   * @return void
   */
  const handleTaskClick = (event, task) => {
    event.preventDefault()
    event.stopPropagation()
    onTaskClick && onTaskClick(event, task)
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <Table
        size="small"
        aria-label="simple table"
        stickyHeader sx={{ minWidth: options?.minWidth || 650 }}
      >
        <TableBody>
          <StyledTableRow
            style={{ height: '50px' }}
            sx={{
              height: '50px',
              '&:last-child th': {
                border: 0,
                borderLeft: `1px ${theme.palette.divider} solid`,
                '&:firs-child': {
                  borderLeft: 0
                }
              }
            }}
          >
            {daysText && daysText.map((days, index) => {
              return <StyledHeaderTableCell
                scope="row"
                align="center"
                component="th"
                key={`day_${index + 1}`}
                sx={{ px: 0.5, position: 'relative', height: '50px' }}
              >
                <Box sx={{ overflowY: 'visible' }}>
                  <Typography style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: '500' }}>{days}</Typography>
                </Box>
              </StyledHeaderTableCell>
            })}
          </StyledTableRow>
          {rows?.map((row, index) => (
            <StyledTableRow
              key={`row-${row.id}-${index}`}
              sx={{
                '&:last-child th': {
                  border: 0,
                  borderLeft: `1px ${theme.palette.divider} solid`,
                  '&:firs-child': {
                    borderLeft: 0
                  }
                }
              }}
            >
              {row?.days?.map((day, indexD) => {
                const currentDay = (
                  day.day === today.getUTCDate() && isSameMonth(day.date, today)
                );
                const isCurrentMonth = isSameMonth(day.date, today);
                return (
                  <StyledTableCell
                    scope="row"
                    align="center"
                    component="th"
                    sx={{ px: 0.5, position: 'relative' }}
                    key={`day-${day.id}`}
                  >
                    <Box sx={{ height: '100%', overflowY: 'visible' }}>
                      <Typography
                        variant="body2"
                        style={{
                          width: '100%',
                          textAlign: 'right'
                        }}
                        sx={{
                          ...currentDaySx,
                          color: (currentDay && '#fff')
                        }}
                      >
                        <span style={currentDay ? { color: '#fff', background: alpha(theme.palette.primary.main, 1), padding: '5px', borderRadius: '15px' } : { padding: '5px' }}>{day.day}</span>
                      </Typography>

                      {(renderTask(day?.data, row?.id, day))}
                      {legacyStyle && day?.data?.length === 0 &&
                        <EventNoteRoundedIcon
                          fontSize="small"
                          htmlColor={theme.palette.divider}
                        />}
                    </Box>
                  </StyledTableCell>
                )
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

MonthModeView.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  date: PropTypes.string,
  options: PropTypes.object,
  onDateChange: PropTypes.func,
  onTaskClick: PropTypes.func,
  onCellClick: PropTypes.func
}

MonthModeView.defaultProps = {
  columns: [],
  rows: []
}

export default MonthModeView
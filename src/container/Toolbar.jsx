import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { format, add, sub, getDaysInMonth, parse } from 'date-fns'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {
  Typography, Toolbar, IconButton, Button, ToggleButton,
  TextField, Hidden, Alert, Collapse, ToggleButtonGroup,
  Divider, ListItemIcon, Menu, MenuItem, Grid, Stack
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import StaticDatePicker from '@mui/lab/StaticDatePicker'
import CloseIcon from '@mui/icons-material/Close'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
//import MoreVertIcon from '@mui/icons-material/MoreVert'
import TodayIcon from '@mui/icons-material/Today'
import SettingsIcon from '@mui/icons-material/Settings'
import ArchiveIcon from '@mui/icons-material/Archive'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import GridViewIcon from '@mui/icons-material/GridView'
import DateFnsLocaleContext from '../../locales/dateFnsContext.js'
import BasicDatePicker from '../components/DatePicker.jsx';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTabs(props) {

  const handleChange = (event, newValue) => {
    console.log('EEE', newValue)
    props.setMode(newValue);
  };

  return (
    <Box sx={{ color: '#0b65c3', fontFamily: 'Poppins' }}>
      <Box sx={{ borderColor: 'divider', color: '#0b65c3', fontFamily: 'Poppins', fontWeight: 'none' }}>
        <Tabs style={{ color: '#0b65c3', fontFamily: 'Poppins' }} value={props.value} onChange={handleChange} aria-label="basic tabs example">
          <Tab style={{ color: '#0b65c3', fontFamily: 'Poppins' }} value={'day'} label="Day" {...a11yProps(0)} />
          <Tab style={{ color: '#0b65c3', fontFamily: 'Poppins' }} value={'week'} label="Week" {...a11yProps(1)} />
          <Tab style={{ color: '#0b65c3', fontFamily: 'Poppins' }} value={'month'} label="Month" {...a11yProps(2)} />
        </Tabs>
      </Box>
    </Box>
  );
}


function SchedulerToolbar(props) {
  const {
    locale,
    today,
    switchMode,
    alertProps,
    toolbarProps,
    onModeChange,
    onDateChange,
    onSearchResult,
    onAlertCloseButtonClicked,
    onClickToday,
    currentSelectedDate
  } = props

  const theme = useTheme()
  const { t } = useTranslation(['common'])
  const [mode, setMode] = useState(switchMode)
  const [searchResult, setSearchResult] = useState()
  const [anchorMenuEl, setAnchorMenuEl] = useState(null)
  const [anchorDateEl, setAnchorDateEl] = useState(null)
  const [selectedDate, setSelectedDate] = useState(today || new Date())
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(selectedDate))

  const openMenu = Boolean(anchorMenuEl)
  const openDateSelector = Boolean(anchorDateEl)
  const dateFnsLocale = useContext(DateFnsLocaleContext)
  const isDayMode = mode.toLowerCase() === 'day'
  const isWeekMode = mode.toLowerCase() === 'week'
  const isMonthMode = mode.toLowerCase() === 'month'


  const menus = [
    {
      label: "Read events",
      icon: <PlayCircleOutlineIcon fontSize="small" />
    },
    {
      label: "Refresh",
      icon: <AutorenewIcon fontSize="small" />
    },
    {
      label: "Export",
      icon: <ArchiveIcon fontSize="small" />
    },
    {
      label: "Print",
      icon: <LocalPrintshopIcon fontSize="small" />
    },
  ]

  const handleCloseMenu = () => {
    setAnchorMenuEl(null)
  }

  const handleOpenDateSelector = (event) => {
    setAnchorDateEl(event.currentTarget)
  }

  const handleCloseDateSelector = () => {
    setAnchorDateEl(null)
  }

  /**
   * @name handleChangeDate
   * @description
   * @param method
   * @return void
   */
  const handleChangeDate = (method) => {
    if (typeof method !== 'function') {
      return
    }
    let options = { months: 1 }
    if (isWeekMode) {
      options = { weeks: 1 }
    }
    if (isDayMode) {
      options = { days: 1 }
    }
    let newDate = method(selectedDate, options)
    setDaysInMonth(getDaysInMonth(newDate))
    setSelectedDate(newDate)
  }

  const handleCloseAlert = (e) => {
    onAlertCloseButtonClicked && onAlertCloseButtonClicked(e)
  }

  useEffect(() => {
    if (mode && onModeChange) { onModeChange(mode) }
    // eslint-disable-next-line
  }, [mode])

  useEffect(() => {
    onDateChange && onDateChange(daysInMonth, selectedDate)
    // eslint-disable-next-line
  }, [daysInMonth, selectedDate])

  useEffect(() => {
    onSearchResult && onSearchResult(searchResult)
    // eslint-disable-next-line
  }, [searchResult])

  useEffect(() => {
    if (switchMode !== mode) {
      setMode(switchMode)
    }
  }, [switchMode]);

  return (
    <Toolbar
      variant="dense"
      style={{ width: '1150px', background: 'aliceblue' }}
      sx={{
        px: '0px !important',
        display: 'block',
        borderBottom: `1px ${theme.palette.divider} solid`,
      }}
    >
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Grid item xs={1} sm md={4} style={{ paddingTop: '12px' }}>
          {toolbarProps?.showDatePicker &&
            <Typography component="div" sx={{ display: 'flex', paddingLeft: '25px' }}>
              <Hidden smDown>

                <nav aria-label="Page navigation example">
                  <ul style={{ color: 'grey' }} className="pagination justify-content-center">
                    <li onClick={() => handleChangeDate(sub)} className="page-item"><a className="page-link" href="#"><ChevronLeftIcon style={{ color: 'grey' }} /></a></li>
                    <li onClick={() => handleChangeDate(add)} className="page-item"><a className="page-link" href="#"><ChevronRightIcon style={{ color: 'grey' }} /></a></li>
                  </ul>
                </nav>

                <Grid style={{ paddingLeft: '5px', paddingTop: '5px' }}>
                  <button onClick={() => {
                    setSelectedDate(new Date());
                    onClickToday()
                  }} style={{ backgroundColor: '#0b65c3', fontFamily: 'Poppins', width: '120px' }} type="button" className="btn btn-primary">Today</button>
                </Grid>
              </Hidden>
            </Typography>}
        </Grid>

        <Grid item xs={1} sm md style={{ textAlign: 'center' }}>
          <Button
            size="small"
            id="basic-button"
            aria-haspopup="true"
            //endIcon={<TodayIcon />}
            aria-controls="basic-menu"
            style={{ fontFamily: 'Poppins', fontSize: '18px' }}
            onClick={handleOpenDateSelector}
            sx={{ color: 'text.primary' }}
            aria-expanded={openDateSelector ? true : undefined}
          >
            {format(
              selectedDate,
              isMonthMode ? 'MMMM, dd - yyyy' : 'PPP',
              { locale: dateFnsLocale }
            )}
          </Button>
          <BasicDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} anchorDateEl={anchorDateEl} handleCloseDateSelector={handleCloseDateSelector} />
        </Grid>

        <Grid item xs sm md sx={{ textAlign: 'right' }}>
          <Stack
            direction="row"
            sx={{
              pr: .5,
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '25px'
            }}>

            <Hidden mdDown>
              {toolbarProps?.showSwitchModeButtons ?
                <BasicTabs
                  setMode={setMode}
                  onChange={(value) => { setMode(value) }}
                  value={mode}
                  data={[
                    { label: 'Month', value: 'month' },
                    { label: 'Week', value: 'week' },
                    { label: 'Day', value: 'day' }
                  ]}
                /> : null}
            </Hidden>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{}}>
          <Menu
            id="menu-menu"
            open={openMenu}
            anchorEl={anchorMenuEl}
            onClose={handleCloseMenu}
            onClick={handleCloseMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {menus.map((menu, index) => (
              <MenuItem key={menu.label}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <Typography variant="body2">{menu.label}</Typography>
              </MenuItem>
            ))}
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">Settings</Typography>
            </MenuItem>
          </Menu>

        </Grid>
      </Grid>
    </Toolbar>
  )
}

SchedulerToolbar.propTypes = {
  today: PropTypes.object.isRequired,
  switchMode: PropTypes.string.isRequired,
  alertProps: PropTypes.object,
  toolbarProps: PropTypes.object,
  onDateChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  onSearchResult: PropTypes.func.isRequired,
  onAlertCloseButtonClicked: PropTypes.func.isRequired,
}

SchedulerToolbar.defaultProps = {
  alertProps: {
    open: false,
    message: '',
    color: 'info',
    severity: 'info',
    showActionButton: true,
  },
  toolbarProps: {
    showSearchBar: true,
    showSwitchModeButtons: true,
    showDatePicker: true,
    showOptions: false
  }
}

export default SchedulerToolbar

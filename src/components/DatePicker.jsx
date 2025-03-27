import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { Menu } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, add, sub, getDaysInMonth, parse } from 'date-fns'

export default function BasicDatePicker({ selectedDate, setSelectedDate, anchorDateEl, handleCloseDateSelector }) {
    const [value, setValue] = React.useState(selectedDate);
    return (
        <Menu
            id="date-menu"
            anchorEl={anchorDateEl}
            open={anchorDateEl}
            onClose={handleCloseDateSelector}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={['StaticDatePicker']}>
                    <StaticDatePicker
                        label="Basic date picker"
                        value={selectedDate}
                        onChange={(newValue) => {
                            console.log('newValue', newValue)
                            setSelectedDate(newValue)
                        }}
                        onClose={handleCloseDateSelector} />
                </DemoContainer>
            </LocalizationProvider>
        </Menu>
    );
}
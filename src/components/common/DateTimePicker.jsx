import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import * as S from './DateTimePicker.styles';

export default function DateTimePicker({ label, value, onChange, error }) {
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null,
  );
  const [selectedTime, setSelectedTime] = useState(
    value ? format(new Date(value), 'HH:mm') : '00:00',
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      // 기존 시간을 유지하면서 날짜만 변경
      const [hours, minutes] = selectedTime.split(':');
      const dateWithTime = new Date(date);
      dateWithTime.setHours(parseInt(hours), parseInt(minutes));
      onChange(format(dateWithTime, "yyyy-MM-dd'T'HH:mm"));
    } else {
      onChange('');
    }
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setSelectedTime(newTime);
    if (selectedDate) {
      const [hours, minutes] = newTime.split(':');
      const dateWithTime = new Date(selectedDate);
      dateWithTime.setHours(parseInt(hours), parseInt(minutes));
      onChange(format(dateWithTime, "yyyy-MM-dd'T'HH:mm"));
    }
  };

  const renderLabel = () => {
    if (!label) return null;

    if (label.includes('*')) {
      const parts = label.split('*');
      return (
        <S.Label>
          {parts[0]}
          <S.RequiredAsterisk>*</S.RequiredAsterisk>
          {parts[1]}
        </S.Label>
      );
    }

    return <S.Label>{label}</S.Label>;
  };

  return (
    <S.Container>
      {renderLabel()}

      <S.DateTimeWrapper>
        <S.DatePickerWrapper>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText=""
            locale={ko}
            popperPlacement="bottom-start"
            className="custom-datepicker"
            wrapperClassName="custom-datepicker-wrapper"
          />
          <Calendar className="calendar-icon" />
        </S.DatePickerWrapper>

        <S.TimePickerWrapper>
          <S.TimeInput
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
          />
          <Clock className="clock-icon" />
        </S.TimePickerWrapper>
      </S.DateTimeWrapper>

      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.Container>
  );
}

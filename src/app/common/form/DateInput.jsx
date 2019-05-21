import React, {Component} from 'react'
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class DateInput extends Component {
    render() {
        const {input: {value, onChange, onBlur, ...restInput}, width, placeholder, meta: {touched, error}, ...rest} = this.props;
        return (
            <Form.Field error={touched && !!error} width={width} >
                <DatePicker
                    {...rest}
                    placeholderText={placeholder}
                    selected={value ? (Object.prototype.toString.call(value) !== '[object Date]') ? value.toDate() : value : null}
                    onChange={onChange}
                    onBlur={() => onBlur()}
                    autoComplete='off'
                    {...restInput}
                />
                {touched && error && <Label basic color='red'>{error}</Label>}
            </Form.Field>
        )
    }
};

export default DateInput
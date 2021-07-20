import React from 'react';

import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

interface TInputProps extends InputProps {
    onChange: (val: any) => void;
}

const MyInput: React.FC<TInputProps> = (props: TInputProps) => (
    <Input
        {...props}
        onChange={e => {
            props.onChange(e.target.value);
        }}
    />
);

export default MyInput;

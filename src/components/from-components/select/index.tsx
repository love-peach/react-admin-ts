import React from 'react';

import { Select, SelectProps } from 'antd';

const { Option } = Select;

interface TSelectProps extends SelectProps<string | number> {
    valueField?: string;
    labelField?: string;
}

const MySelect: React.FC<TSelectProps> = (props: TSelectProps) => {
    const { valueField = 'value', labelField = 'label', ...selectProps } = props;
    return <Select {...selectProps}></Select>;
};

export default MySelect;

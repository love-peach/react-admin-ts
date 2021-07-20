import React, { FC, useState } from 'react';
import './index.scss';
const encryptText = (text: string) => {
    if (!text) {
        return '';
    }
    let left = 1;
    let right = 1;
    const len = text.length;
    if (len <= 5) {
        left = right = 1;
    } else {
        left = Math.floor((len - 4) / 2);
        right = len - 4 - left;
    }

    return `${text.slice(0, left)}****${text.slice(-right)}`;
};

interface IProps {
    text: string;
}

const EncryptText: FC<IProps> = ({ text }: IProps) => {
    const [visible, setVisible] = useState(false);

    return visible ? (
        <span className="comp-decrypt" onClick={() => setVisible(false)}>
            {text}
        </span>
    ) : (
        <span className="comp-encrypt" onClick={() => setVisible(true)}>
            {encryptText(text)}
        </span>
    );
};

export default EncryptText;
